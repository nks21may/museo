# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step and no dependencies. Served by any local static server or static host. WebGL2 for rendering.

## Users

The owner (single primary user): collects short "tweet-sized" GLSL shaders found on Twitter/X (twigl.app golf format, `#つぶやきGLSL`) to keep, revisit, and study them.

## Product Purpose

A personal museum of generative shaders. Each piece runs live, not as a recording. Success: opening the museum and seeing the collection alive at once, then entering any single piece full-screen to watch it and read its source.

## Positioning

Pieces are stored as their original twigl source and ported automatically at load time, so the archive keeps the code exactly as it was posted, and every piece stays live and inspectable.

## Operating Context

- New pieces are added by editing a single data file (`shaders.js`): paste the twigl code with title, author and source link.
- The twigl shorthand (`FC`, `r`, `t`, `o`, `hsv`, `rotate3D`, uninitialised locals) is translated to GLSL ES 3.00 by the museum.
- Viewed mainly on a desktop/laptop browser; must stay usable on phones.

## Capabilities and Constraints

- One shared WebGL2 context and canvas for the whole page; each piece is drawn into its card's rect (viewport + scissor). Browsers cap WebGL contexts per page.
- Only visible pieces render; thumbnails render at reduced resolution; the full-screen view renders one piece at a time.
- Pieces are GPU-heavy (~1000 transcendental ops per pixel), so performance safeguards are part of the product, not polish.
- Initial collection: "Atlantic" (raymarched ocean), a log-polar golden fractal zoom (author unconfirmed), and an original piece: red edge strokes with diagonal rain.

## Brand Commitments

Name: "museo". The user explicitly referenced yudho.xyz (YUDHO, "Artifacts") as the aesthetic anchor: absolute black, a single red accent, blackletter titles, minimal UI.

## Evidence on Hand

No author attributions are confirmed beyond what each tweet shows; unknown authors must be shown as unknown, never guessed.

## Product Principles

1. The work leads; interface recedes.
2. Source is sacred: keep the original code verbatim and visible.
3. Live over recorded: every piece runs in real time.
4. Stay light: performance safeguards before ornament.
