// Graba la vista previa del museo: un loop de unos segundos con tres canales en vivo.
// Uso:  node herramientas/vista.mjs [canal canal canal]      (por defecto, 8 9 10; consecutivos, se sintonizan con →)
// Deja vista.mp4 en la raíz, que es lo que el hub pide en https://museo.nicolasdalessandro.dev/vista.mp4.
//
// El formato es un contrato (ADR-0010 del hub): MP4 H.264 sin audio, 640×480, hasta 8 s y hasta 1,5 MB.
// Al final el script lo comprueba y sale con código 1 si no se cumple.
//
// Chrome con ventana (no headless) para que WebGL use la GPU, a 1280×960 para que se vea el layout de
// escritorio; ffmpeg lo baja a 640×480. Los cuadros salen del screencast de Chrome, así que necesita
// ffmpeg y ffprobe en el PATH además de Google Chrome.
//
// El loop no necesita fundido: empieza justo en el corte de un cambio de canal y termina en el canal
// estable anterior al corte. Al reiniciar, el video hace lo que el museo hace al cambiar de canal.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright-core';
import { raiz, servir } from './servidor.mjs';

const ANCHO = 1280;
const ALTO = 960;
const SALIDA = { ancho: 640, alto: 480, fps: 30 };
const POR_CANAL = 2.5;                 // segundos de cada canal, contando el corte, la nieve y la sintonía
const MAX_SEGUNDOS = 8;
const MAX_BYTES = 1_500_000;
const CRFS = Array.from({ length: 15 }, (_, i) => 22 + i);   // de 22 a 36, de a uno

const canales = process.argv.slice(2).map(Number).filter(Boolean);
if (!canales.length) canales.push(8, 9, 10);
const duracion = POR_CANAL * canales.length;
if (duracion > MAX_SEGUNDOS) throw new Error(`${canales.length} canales de ${POR_CANAL} s pasan los ${MAX_SEGUNDOS} s del formato`);

const carpeta = path.join(raiz, 'herramientas', 'capturas', 'vista');
fs.rmSync(carpeta, { recursive: true, force: true });
fs.mkdirSync(carpeta, { recursive: true });

const pausa = (ms) => new Promise((ok) => setTimeout(ok, ms));
const nn = (n) => String(n).padStart(2, '0');

const { servidor, base } = await servir();
const navegador = await chromium.launch({
  channel: 'chrome',
  headless: false,
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'],
});

const cuadros = [];
let cortes = [];
try {
  const contexto = await navegador.newContext({ viewport: { width: ANCHO, height: ALTO }, deviceScaleFactor: 1 });
  const pagina = await contexto.newPage();
  const errores = [];
  pagina.on('pageerror', (e) => errores.push(e.message));
  await pagina.addInitScript(() => {
    // Cuándo se apretó cada tecla, en la misma hora (época, en segundos) que traen los cuadros del screencast.
    window.__teclas = [];
    addEventListener('keydown', (e) => window.__teclas.push((performance.timeOrigin + e.timeStamp) / 1000), true);
    // El mouse real, si pasa por encima de la ventana, haría aparecer el mando y movería la chispa.
    for (const tipo of ['pointermove', 'pointerdown']) addEventListener(tipo, (e) => e.stopImmediatePropagation(), true);
  });
  const antes = nn(canales[0] - 1);
  await pagina.goto(`${base}#/${antes}`);
  await pagina.waitForTimeout(1500);

  // Calentamiento: cada canal compila su shader la primera vez que se sintoniza, y eso trabaría la grabación.
  // Entre tecla y tecla hay que esperar: el canal actual recién cambia al terminar el corte.
  for (let i = 0; i < canales.length; i++) {
    await pagina.keyboard.press('ArrowRight');
    await pagina.waitForTimeout(1200);
  }
  for (let i = 0; i < canales.length; i++) {
    await pagina.keyboard.press('ArrowLeft');
    await pagina.waitForTimeout(700);
  }
  if (await pagina.evaluate(() => location.hash) !== `#/${antes}`) throw new Error(`No volvió al canal ${antes}: ¿son consecutivos?`);
  // Que el OSD se apague, para que el primer cuadro del loop sea el corte y no el final de una sintonía.
  await pagina.waitForTimeout(4000);
  await pagina.evaluate(() => { window.__teclas.length = 0; });

  const sesion = await contexto.newCDPSession(pagina);
  sesion.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    cuadros.push({ t: metadata.timestamp, data: Buffer.from(data, 'base64') });
    sesion.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await sesion.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: ANCHO, maxHeight: ALTO, everyNthFrame: 1 });
  await pausa(500);

  for (let i = 0; i < canales.length; i++) {
    const inicio = Date.now();
    await pagina.keyboard.press('ArrowRight');
    await pausa(Math.max(0, POR_CANAL * 1000 - (Date.now() - inicio)));
  }
  await sesion.send('Page.stopScreencast');
  cortes = await pagina.evaluate(() => window.__teclas);
  const llegado = await pagina.evaluate(() => location.hash);
  if (llegado !== `#/${nn(canales.at(-1))}`) throw new Error(`Terminó en ${llegado} y no en el canal ${canales.at(-1)}`);
  if (errores.length) throw new Error(`La página tiró errores: ${errores.join(' | ')}`);
} finally {
  await navegador.close();
  servidor.close();
}

// El loop va del primer corte hasta `duracion` segundos después; el resto se descarta.
const t0 = cortes[0];
const elegidos = cuadros.filter((c) => c.t >= t0 && c.t < t0 + duracion);
if (elegidos.length < 2) throw new Error('El screencast no devolvió cuadros');
elegidos.forEach((c, i) => fs.writeFileSync(path.join(carpeta, `${String(i).padStart(4, '0')}.jpg`), c.data));
// El screencast solo manda cuadros cuando la página cambia: el concat le da a cada uno lo que duró en pantalla.
const lista = elegidos.map((c, i) => {
  const hasta = i + 1 < elegidos.length ? elegidos[i + 1].t : t0 + duracion;
  return `file '${String(i).padStart(4, '0')}.jpg'\nduration ${(hasta - c.t).toFixed(4)}`;
});
lista.push(`file '${String(elegidos.length - 1).padStart(4, '0')}.jpg'`);
fs.writeFileSync(path.join(carpeta, 'lista.txt'), lista.join('\n'));

const fps = (elegidos.length / duracion).toFixed(1);
console.log(`${elegidos.length} cuadros en ${duracion} s (${fps} por segundo), cortes en ${cortes.map((c) => (c - t0).toFixed(2)).join(' / ')} s`);

const codificar = (crf, destino) => execFileSync('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-f', 'concat', '-safe', '0', '-i', 'lista.txt',
  // El JPEG del screencast es de rango completo (JFIF): se pasa a rango limitado y a BT.709, y se declara,
  // para que ningún navegador adivine otra cosa por ser de definición estándar.
  '-vf', `fps=${SALIDA.fps},scale=${SALIDA.ancho}:${SALIDA.alto}:flags=lanczos+accurate_rnd:in_range=full:out_range=limited:out_color_matrix=bt709,format=yuv420p`,
  '-t', String(duracion),
  '-c:v', 'libx264', '-preset', 'veryslow', '-crf', String(crf), '-profile:v', 'high',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
  '-an', '-movflags', '+faststart', '-map_metadata', '-1',
  destino,
], { cwd: carpeta });

// El CRF más bajo (la mejor calidad) que entra en el tope de tamaño.
let elegido = null;
for (const crf of CRFS) {
  const destino = path.join(carpeta, `crf${crf}.mp4`);
  codificar(crf, destino);
  const bytes = fs.statSync(destino).size;
  console.log(`crf ${crf}: ${bytes} bytes`);
  if (bytes <= MAX_BYTES) { elegido = { crf, destino, bytes }; break; }
}
if (!elegido) throw new Error(`Ni con crf ${CRFS.at(-1)} entra en ${MAX_BYTES} bytes`);

const final = path.join(raiz, 'vista.mp4');
fs.copyFileSync(elegido.destino, final);

// Comprobación del contrato.
const sonda = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', final]).toString());
const v = sonda.streams.filter((s) => s.codec_type === 'video');
const segundos = Number(sonda.format.duration);
const problemas = [];
if (sonda.streams.length !== 1 || v.length !== 1) problemas.push('tiene que tener una sola pista, la de video (sin audio)');
if (v[0]?.codec_name !== 'h264') problemas.push(`el codec es ${v[0]?.codec_name}, no h264`);
if (v[0]?.width !== SALIDA.ancho || v[0]?.height !== SALIDA.alto) problemas.push(`mide ${v[0]?.width}x${v[0]?.height}`);
if (v[0]?.pix_fmt !== 'yuv420p') problemas.push(`pix_fmt ${v[0]?.pix_fmt}, no yuv420p`);
if (segundos > MAX_SEGUNDOS) problemas.push(`dura ${segundos} s`);
if (fs.statSync(final).size > MAX_BYTES) problemas.push(`pesa ${fs.statSync(final).size} bytes`);

console.log(JSON.stringify({ archivo: final, crf: elegido.crf, bytes: fs.statSync(final).size, segundos, canales, problemas }, null, 2));
process.exit(problemas.length ? 1 : 0);
