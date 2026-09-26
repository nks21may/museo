---
name: obra-nueva
description: Agrega una obra (shader twigl) al museo de P:\museo, pegando el código de un tuit o generándola a partir de una idea, y la verifica en Chrome con GPU. Usar cuando el usuario pasa código GLSL/twigl, un link de un shader o describe una idea de animación para sumar a la colección.
---

# Obra nueva

Suma una obra a la colección de `shaders.js`, a partir de **código** (lo más común: un tuit de twigl) o de una **idea** que hay que escribir desde cero.

Si el usuario pasa una **imagen** para transformar, usá la skill `obra-desde-imagen`.

## 1. Juntar los datos

Hacen falta: título, autor, fuente (link) y el código o la idea.

- Si falta el título y el código viene de un tuit, usá el título del tuit. Si no tiene, usá `'Sin título'`.
- **Nunca adivines un autor.** Si el usuario no lo dice y no está en el link que pasó, dejá `autor: null`. Podés decir de quién te parece el estilo, pero no lo escribas en la obra.
- Si el link es de X/Twitter, no se puede leer sin sesión. Pedile al usuario los datos que falten en vez de inventarlos.
- Una obra generada por vos lleva `autor: 'pieza propia'`, y en `fuente` la referencia que haya dado el usuario (o `null`).

## 2. El formato

Cada obra se agrega **al final** del array `window.MUSEO_CANALES` en `shaders.js`, así pasa a ser el canal que se ve al abrir el museo:

```js
{
  titulo: 'Atlantic',
  autor: 'XorDev',
  fuente: 'https://x.com/...',
  fecha: 'AAAA-MM-DD',          // hoy
  codigo: String.raw`...`,
},
```

`codigo` es el cuerpo de `main()` en el modo **"geekest (300 es)"** de twigl. El museo agrega el resto (ver `portar` y `PRELUDIO` en `museo.js`).

| Disponible | Qué es |
|---|---|
| `FC` | `gl_FragCoord`, relativo a la obra (sirve igual en miniatura y a pantalla completa) |
| `r` | `vec2` resolución de la obra |
| `t` | tiempo en segundos |
| `f` | número de cuadro |
| `m` | mouse, de 0 a 1 |
| `clic` | `vec4`, extensión del museo: `xy` dónde fue el último clic o toque (0 a 1, como `m`), `z` = 1 mientras está apretado, `w` = el `t` en que empezó (`t-clic.w` = segundos desde el clic; antes del primero es muy grande) |
| `o` | `vec4` de salida, arranca en 0 |
| `hsv(h,s,v)`, `rotate2D(a)`, `rotate3D(a,eje)` | las funciones auxiliares de twigl |
| `foto(u)`, `foto(u,suave)` | solo para obras con imagen (ver `obra-desde-imagen`) |

**No hay** backbuffer `b`, `snoise`, ni otras funciones de twigl. Si el código las usa, avisale al usuario: no va a compilar.

Además:
- Se permiten `#define` en su propia línea.
- No se pueden declarar funciones, porque el código vive adentro de `main()`.
- Las variables declaradas sin valor (`float i,d;`) se inicializan en 0 automáticamente.
- Adentro de `String.raw` no puede haber comillas invertidas (`` ` ``) ni `${`.

## 3a. Si viene código

- Se guarda **verbatim**, tal como se publicó: no se reformatea, no se "mejora" y no se agregan comentarios.
- Solo se toca si no compila. En ese caso hacé el cambio mínimo y decile al usuario exactamente qué cambiaste y por qué.

## 3b. Si viene una idea

1. Antes de escribir, contale al usuario en 3–4 líneas **qué técnica** vas a usar y por qué encaja. Técnicas que ya están en la colección y funcionan:
   - raymarching de un plano deformado con turbulencia (Atlantic)
   - coordenadas log-polares para un zoom infinito (canal 02)
   - grilla de trazos orientados según el gradiente de un campo (Aguacero)
   - SDFs 2D con grano y píxeles gruesos (las obras de `twigl/`)
2. Escribila **en estilo twigl**: variables de una letra, sin comentarios, compacta. Tiene que parecer un tuit, aunque no hace falta que entre en 280 caracteres.
3. Tiene que estar **viva**: movimiento con `t`, no una imagen fija.
4. Normalizá con `r.y` para que no se deforme con el aspecto.
5. **Presupuesto:** fluida a pantalla completa en una GPU media. Como techo, unos 100 pasos de raymarching × 10 octavas. Si te pasás, bajá pasos antes que calidad visual.

## 4. Verificar (obligatorio)

Desde `P:\museo`:

```
node herramientas/verificar.mjs          # verifica el último canal
node herramientas/verificar.mjs 4        # o uno puntual
```

Si `herramientas/node_modules` no existe, primero corré `npm install` en `herramientas/`.

El script levanta su propio servidor, abre el canal en Chrome con GPU y deja capturas en `herramientas/capturas/`: `NN-pantalla.png`, `NN-guia.png` y `NN-movil.png`. Imprime un JSON donde `error` es el mensaje del compilador (o `null`), y sale con código 1 si algo falla.

1. `error` tiene que ser `null`.
2. **Mirá** `NN-pantalla.png` y `NN-guia.png`. Confirmá que la miniatura de la guía también se lee.
3. Si es una idea y la captura no coincide con lo pedido, iterá **como máximo 2 veces**. Después mostrale al usuario lo que hay y preguntale.

## 5. Cerrar

Contale al usuario en pocas líneas:
- el número de canal y el link (`#/NN`)
- qué se ve, en una línea
- si tocaste el código original, qué cambiaste
- qué datos quedaron en `null`
