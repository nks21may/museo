---
name: obra-desde-imagen
description: Convierte una imagen (foto, pintura, captura) en una obra viva del museo de P:\museo, aplicándole un efecto shader en tiempo real (trazos rojos sobre bordes estilo YUDHO, semitono o grano 1-bit) y la verifica en Chrome con GPU. Usar cuando el usuario pasa una imagen o un link a una imagen para sumar a la colección.
---

# Obra desde imagen

La imagen se guarda en `obras/` y la obra es un shader que la lee con `foto()` y la transforma en tiempo real. La imagen se reconoce, pero está viva: tiembla, llueve, el grano corre.

Para shaders sin imagen, usá la skill `obra-nueva`. Esta skill reusa sus reglas de formato, créditos y verificación: leé `.claude/skills/obra-nueva/SKILL.md` si no la tenés cargada.

## 1. Juntar los datos

- **La imagen:** ruta local o URL.
- **Título:** si no hay, preguntá o usá el nombre de la imagen.
- **Autor y fuente:**
  - Si la imagen es de otra persona (foto, pintura, captura), `autor` es quien hizo la imagen y `fuente` es de dónde viene.
  - Si la imagen es del usuario, `autor: 'pieza propia'`.
  - **Nunca adivines.** Si no lo sabés, `null`.
- **Efecto:** si el usuario no eligió, proponé uno según la imagen:

| Efecto | Archivo | Va bien con | Se ve |
|---|---|---|---|
| **trazos** | `efectos/trazos.glsl` | figuras con contornos claros, fondos limpios, alto contraste | trazos rojos cortos sobre los bordes, con parpadeo y lluvia diagonal. Es el look de YUDHO |
| **semitono** | `efectos/semitono.glsl` | retratos, formas grandes, luces y sombras marcadas | puntos rojos de imprenta que giran despacio |
| **grano** | `efectos/grano.glsl` | cualquier cosa, incluso fotos con mucho detalle | píxeles 1-bit crema con grano que corre, bordes en rojo y cortes de señal |

## 2. Preparar la imagen

Guardala en `P:\museo\obras\` con un nombre corto en minúsculas y sin espacios (`obras/<slug>.jpg`). Reducila a **1600 px como máximo** del lado largo: pesa menos, y el suavizado de los efectos está calibrado para ese tamaño.

```
ffmpeg -y -i "<origen>" -vf "scale='min(1600,iw)':'min(1600,ih)':force_original_aspect_ratio=decrease" -q:v 3 obras/<slug>.jpg
```

- Si la imagen tiene transparencia y se quiere conservar, usá `.png`.
- Si viene por URL, bajala primero con `curl -L`. No mandes datos del usuario en headers ni en la URL.

## 3. Armar la obra

1. Copiá el contenido del efecto elegido desde `.claude/skills/obra-desde-imagen/efectos/`.
2. Agregá la obra **al final** de `window.MUSEO_CANALES` en `shaders.js`:

```js
{
  titulo: '...',
  autor: null,
  fuente: null,
  fecha: 'AAAA-MM-DD',
  imagen: 'obras/<slug>.jpg',
  codigo: String.raw`<contenido del efecto, con los #define ajustados>`,
},
```

3. Ajustá solo los `#define` del principio. El resto del código del efecto no se toca.

| Parámetro | Efecto | Qué hace |
|---|---|---|
| `ZOOM` | todos | 1 = la imagen cubre la obra (recortada como `object-fit: cover`). Mayor que 1 acerca |
| `CENTRO` | todos | desplaza el encuadre. `vec2(0,.2)` muestra más de **arriba** de la imagen, `vec2(.2,0)` más de la **derecha** |
| `SENS` | trazos | cuánto gradiente cuenta como borde. Subilo si salen pocos trazos, bajalo si todo es ruido |
| `SUAVE` | trazos | nivel de desenfoque antes de buscar bordes. Subilo (3–4) si la imagen tiene textura fina, como pinceladas, craquelado o ruido de foto |
| `RELLENO` | trazos | trazos sueltos en las zonas oscuras (0 = ninguno) |
| `LLUVIA` | trazos | intensidad de la lluvia diagonal (0 = sin lluvia) |
| `CELDA` | semitono | cantidad de filas de puntos. Más celdas, más detalle |
| `GIRO` | semitono | velocidad de giro de la trama |
| `PIXEL` | grano | tamaño mínimo del píxel |
| `CONTRASTE` | grano | contraste antes de tramar |
| `BORDE` | grano | umbral para pintar un borde de rojo. Subilo si hay demasiado rojo |
| `TINTA`, `ACENTO` | todos | colores |

**Encuadre:**
- Las imágenes verticales en pantalla apaisada muestran solo la franja del medio. Si hay una cara, casi siempre hace falta `ZOOM` 1.3–1.8 y `CENTRO` con y positiva para subir hasta ella.
- Revisalo también en la captura del celular, donde pasa lo contrario: se ve la imagen entera de alto y se recortan los costados.

## 4. Verificar (obligatorio)

Desde `P:\museo`:

```
node herramientas/verificar.mjs
```

1. `error` tiene que ser `null`. Si dice `No se pudo cargar la imagen`, revisá la ruta de `imagen`.
2. **Mirá** las tres capturas (`herramientas/capturas/NN-pantalla.png`, `NN-guia.png` y `NN-movil.png`) y preguntate si **la imagen se reconoce**.
   - Si todo es ruido: `trazos` → subí `SUAVE` o bajá `SENS`; `grano` → subí `BORDE`.
   - Si casi no se ve nada: `trazos` → subí `SENS`; `semitono` → subí `CELDA`.
   - Si el encuadre corta lo importante: ajustá `ZOOM` y `CENTRO`.
3. Iterá **como máximo 3 veces**, cambiando solo los `#define`. Después mostrale al usuario la captura y preguntale.

## 5. Cerrar

Contale al usuario:
- el canal y el link (`#/NN`)
- el efecto y los parámetros que cambiaste
- qué se ve, en una línea
- los créditos que quedaron en `null`

Si la imagen es de otra persona, recordale en una línea que el museo la publica si lo sube a un hosting.

## Si ningún efecto sirve

Se puede escribir un efecto nuevo con la misma interfaz:
- `foto(u)` o `foto(u, suave)`, con `u` de 0 a 1 dentro de la obra y `suave` = nivel de mipmap
- `#define` para los parámetros al principio
- estilo twigl

Si queda bien, **proponé** guardarlo en `efectos/` para reusarlo.
