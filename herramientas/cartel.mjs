// Saca la imagen de respaldo de una obra con cartel: el cartel como se ve a 1920×1080.
// Uso:  node herramientas/cartel.mjs [canal]      (por defecto, la última obra con cartel)
// La guarda en el `imagen` de la ficha, que es lo que ven los navegadores sin HTML-in-Canvas.
//
// Abre el museo con HTML-in-Canvas para que museo.js arme el cartel y llene sus data-reloj,
// y lo copia encima de todo: dentro del canvas el cartel no se pinta, y la captura no lo vería.

import path from 'node:path';
import { chromium } from 'playwright-core';
import { raiz, servir } from './servidor.mjs';

const { servidor, base } = await servir();
const navegador = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--enable-blink-features=CanvasDrawElement'],
});

try {
  const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 } });
  await pagina.goto(base);
  const canales = await pagina.evaluate(() => window.MUSEO_CANALES.map((c) => ({ cartel: Boolean(c.cartel), imagen: c.imagen, titulo: c.titulo })));
  const pedido = Number(process.argv[2]);
  const i = pedido ? pedido - 1 : canales.findLastIndex((c) => c.cartel);
  const obra = canales[i];
  if (!obra?.cartel) throw new Error(pedido ? `El canal ${pedido} no tiene cartel` : 'Ninguna obra tiene cartel');
  if (!obra.imagen || !/\.(jpe?g)$/i.test(obra.imagen)) {
    throw new Error(`«${obra.titulo}» necesita imagen: 'obras/<nombre>.jpg' en la ficha para guardar el respaldo`);
  }

  const copiado = await pagina.evaluate(async (n) => {
    const vivo = document.querySelector(`#senal .cartel[data-canal="${n}"]`);
    if (!vivo) return false;
    const el = document.createElement('div');
    el.className = 'cartel';
    el.style.cssText = 'position:fixed;inset:0;z-index:10';
    el.innerHTML = vivo.innerHTML;
    document.body.append(el);
    await document.fonts.ready;
    return true;
  }, i + 1);
  if (!copiado) throw new Error('Este Chrome no trae HTML-in-Canvas: museo.js no armó el cartel');
  await pagina.waitForTimeout(300);

  const destino = path.join(raiz, obra.imagen);
  await pagina.screenshot({ path: destino, type: 'jpeg', quality: 88 });
  console.log(JSON.stringify({ canal: i + 1, titulo: obra.titulo, respaldo: destino }, null, 2));
} finally {
  await navegador.close();
  servidor.close();
}
