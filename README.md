# museo

Colección personal de shaders de un tuit, siempre al aire.

Cada obra es un fragment shader en formato [twigl](https://twigl.app) (el golf de `#つぶやきGLSL`) que corre en vivo en el navegador, no una grabación. El museo se recorre como una tele: cada obra es un canal, hay guía de programación y un teletexto con la ficha y el código original.

En línea: <https://museo.nicolasdalessandro.dev>

## Cómo se usa

| Tecla | Qué hace |
|---|---|
| `←` `→` / `↑` `↓` / `PgUp` `PgDn` | Canal anterior / siguiente |
| `0`–`9` | Sintonizar un canal por número |
| `G` | Guía: lista de canales (flechas para elegir, `Enter` para sintonizar) |
| `I` | Teletexto: ficha de la obra y su código, con botón para copiarlo |
| `Espacio` / `P` | Pausa |
| `F` | Pantalla completa |
| `Esc` | Cerrar guía o teletexto |

También se cambia de canal con la rueda del mouse o deslizando en el celular. Cada canal tiene su URL: `#/05` abre el canal 5.

## Correrlo local

No hay build ni dependencias: son archivos estáticos. Pero no se puede abrir `index.html` con doble clic, porque desde `file://` el navegador no carga las fuentes ni deja leer imágenes en WebGL. Hace falta un servidor:

```sh
node herramientas/servidor.mjs
```

Sirve el museo en <http://127.0.0.1:8420/> (y en Windows lo abre solo). `abrir-museo.cmd` hace lo mismo con doble clic. Requiere Node y un navegador con WebGL2.

## Cómo está hecho

| Archivo | Qué es |
|---|---|
| [index.html](index.html) | La página: canvas, OSD, mando, guía y teletexto |
| [shaders.js](shaders.js) | **La colección.** Un array `window.MUSEO_CANALES` con una entrada por obra |
| [museo.js](museo.js) | Porta twigl a GLSL ES 3.00, dibuja en WebGL2 y maneja la navegación |
| [museo.css](museo.css) | Estilos |
| [fuentes/](fuentes/) | UnifrakturMaguntia, Doto y Martian Mono, servidas localmente |
| [obras/](obras/) | Imágenes que leen las obras hechas a partir de una foto |

Las obras se guardan **tal como se publicaron**, en el dialecto de twigl (modo *geekest 300 es*: `FC`, `r`, `t`, `o`, `hsv`, `rotate3D`, variables sin inicializar). `museo.js` las traduce al cargar: les antepone un preludio con los uniforms y las funciones que twigl da gratis, e inicializa en cero las variables declaradas sin valor, porque GLSL no lo garantiza.

Además de lo de twigl, el preludio suma algunas extensiones propias del museo:

- `foto(u)`, `fotoUV(u)`, `margen(u)`, `entera()`: leen la imagen de la obra (`imagen` en la ficha) recortada como `object-fit: cover`.
- `clic`: dónde fue el último clic o toque, si sigue apretado y cuándo empezó.
- `hayMouse`: 1 mientras hay un mouse sobre la página.
- `chispa[40]`: el recorrido reciente de una chispa que sigue la x del mouse.

La identidad visual (negro absoluto, un solo rojo, títulos en blackletter, estética de señal de TV) está documentada en [DESIGN.md](DESIGN.md); el propósito y los principios del producto, en [PRODUCT.md](PRODUCT.md).

## Sumar una obra

Agregar un objeto **al final** de `window.MUSEO_CANALES` en [shaders.js](shaders.js). La última obra es el canal que se ve al abrir el museo.

```js
{
  titulo: 'Sin título',
  autor: 'Yohei Nishitsuji',       // null si no está confirmado: nunca adivinar
  fuente: 'https://x.com/...',     // link al tuit o a twigl; null si no hay
  fecha: '2026-09-25',             // día en que entró a la colección
  imagen: 'obras/foto.jpg',        // opcional; el código la lee con foto(FC.xy/r)
  codigo: String.raw`...`,         // el código original, sin tocar
},
```

Las imágenes de `obras/` van en `.jpg` o `.webp`: los `.png` no se publican (son capturas de revisión).

Con Claude Code hay dos skills del proyecto que hacen todo el recorrido, incluida la verificación: `obra-nueva` (a partir de código de twigl o de una idea) y `obra-desde-imagen` (a partir de una foto, con efectos de trazos, semitono, grano, etc.).

### Verificar

[herramientas/verificar.mjs](herramientas/verificar.mjs) abre el museo en Chrome con GPU vía Playwright, sintoniza un canal y saca capturas de pantalla, de la guía y en tamaño celular. Sale con código 1 si el shader no compila, si la imagen no carga o si la página tira errores.

```sh
cd herramientas
npm install
node verificar.mjs        # verifica el último canal
node verificar.mjs 3      # o uno en particular
```

Necesita Google Chrome instalado. Las capturas quedan en `herramientas/capturas/` (ignorada por git). Los flags de GPU que usa (`--use-angle=d3d11`) son de Windows.

[twigl/](twigl/) es un banco de pruebas aparte: `ver.html` emula el entorno de twigl para probar shaders sueltos (`twigl/*.glsl`, compilados a `obras.js`) sin pasar por el museo. No se publica.

## Deploy

Cada push a `main` dispara [.github/workflows/deploy.yml](.github/workflows/deploy.yml), que construye la imagen Docker (un `nginx-unprivileged` con los archivos estáticos) y la publica en GHCR con los tags `latest` y el SHA del commit. Se guardan las últimas cinco versiones.

El VPS no tiene puertos abiertos: todo entra por un Cloudflare Tunnel. Así que en vez de que GitHub empuje el deploy, el VPS lo tira: un timer de systemd ([deploy/museo-deploy.timer](deploy/museo-deploy.timer)) corre cada dos minutos `git pull`, `docker compose pull` y `docker compose up -d`. Si la imagen no cambió, no pasa nada. La instalación en el VPS está en los comentarios de [deploy/museo-deploy.service](deploy/museo-deploy.service).

- **Rollback:** `IMAGE_TAG=<sha> docker compose up -d` en el VPS.
- **Probar la imagen local:** `docker compose up -d --build` y abrir <http://127.0.0.1:8420/>.
- **Qué se publica:** el [Dockerfile](Dockerfile) copia con lista blanca (`index.html`, `museo.css`, `museo.js`, `shaders.js`, `fuentes/`, `obras/`). Lo demás no llega a la imagen.
- **Cabeceras:** [deploy/nginx.conf](deploy/nginx.conf) define una CSP estricta (`'self'`, sin inline), así que cualquier `<style>`, `style=""` o `<script>` inline en el HTML se rompe en producción: va en `museo.css` o `museo.js`.

El contenedor corre read-only, sin capabilities y escuchando solo en loopback.
