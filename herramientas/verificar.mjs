// Abre el museo en Chrome (con GPU) y verifica un canal.
// Uso:  node herramientas/verificar.mjs [canal]      (por defecto, el último)
// Deja capturas en herramientas/capturas/ e imprime un JSON con el resultado.
// Sale con código 1 si el canal no compila o la imagen no carga.

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { raiz, servir } from './servidor.mjs';

const salida = path.join(raiz, 'herramientas', 'capturas');
fs.mkdirSync(salida, { recursive: true });

const { servidor, base } = await servir();

const navegador = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'],
});

const errores = [];
const resultado = { capturas: [] };

try {
  const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
  pagina.on('pageerror', (e) => errores.push(e.message));
  await pagina.goto(base);
  const total = await pagina.evaluate(() => window.MUSEO_CANALES.length);
  const canal = Number(process.argv[2]) || total;
  const nn = String(canal).padStart(2, '0');
  const obra = await pagina.evaluate((i) => window.MUSEO_CANALES[i], canal - 1);
  Object.assign(resultado, { canal, titulo: obra?.titulo, imagen: obra?.imagen ?? null });

  await pagina.goto(`${base}#/${nn}`);
  await pagina.reload();
  await pagina.waitForTimeout(3000);
  const captura = async (p, nombre) => {
    const f = path.join(salida, nombre);
    await p.screenshot({ path: f });
    resultado.capturas.push(f);
  };
  await captura(pagina, `${nn}-pantalla.png`);

  await pagina.keyboard.press('i');
  await pagina.waitForTimeout(300);
  resultado.error = await pagina.$eval('#tt-error', (e) => (e.hidden ? null : e.textContent));
  await pagina.keyboard.press('i');
  await pagina.keyboard.press('g');
  await pagina.waitForTimeout(1500);
  await captura(pagina, `${nn}-guia.png`);

  const movil = await navegador.newPage({ viewport: { width: 390, height: 844 } });
  await movil.goto(`${base}#/${nn}`);
  await movil.waitForTimeout(2500);
  await captura(movil, `${nn}-movil.png`);

  resultado.renderizador = await pagina.evaluate(() => {
    const g = document.createElement('canvas').getContext('webgl2');
    const d = g && g.getExtension('WEBGL_debug_renderer_info');
    return d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'desconocido';
  });
} finally {
  await navegador.close();
  servidor.close();
}

resultado.erroresDePagina = errores;
console.log(JSON.stringify(resultado, null, 2));
process.exit(resultado.error || errores.length ? 1 : 0);
