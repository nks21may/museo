// Servidor estático mínimo para el museo (sin dependencias).
// Desde file:// el navegador no deja leer imágenes en WebGL ni cargar las fuentes.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const tipos = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
};

export async function servir(puerto = 0) {
  const servidor = http.createServer((req, res) => {
    const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const archivo = path.join(raiz, ruta === '/' ? 'index.html' : ruta);
    if (!archivo.startsWith(raiz) || !fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      'Content-Type': tipos[path.extname(archivo).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(archivo).pipe(res);
  });
  await new Promise((ok) => servidor.listen(puerto, '127.0.0.1', ok));
  return { servidor, base: `http://127.0.0.1:${servidor.address().port}/` };
}

// node herramientas/servidor.mjs  →  sirve el museo en el puerto 8420 y lo abre en el navegador.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { base } = await servir(8420);
  console.log(`museo en ${base}  (Ctrl+C para cerrar)`);
  if (process.platform === 'win32') (await import('node:child_process')).exec(`start "" ${base}`);
}
