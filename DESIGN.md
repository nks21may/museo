---
name: museo
description: A personal collection of tweet-sized shaders, always on air.
colors:
  on-air-red: "#c40000"
  signal-red: "#ff3b2f"
  dead-air-black: "#000000"
  phosphor-white: "#ececec"
  standby-grey: "#9a9a9a"
  low-grey: "#7c7c7c"
  scanline: "#1d1d1d"
typography:
  display:
    fontFamily: "UnifrakturMaguntia, Old English Text MT, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
  headline:
    fontFamily: "UnifrakturMaguntia, Old English Text MT, serif"
    fontSize: "clamp(1.7rem, 3.4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "UnifrakturMaguntia, Old English Text MT, serif"
    fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.05
  osd-numeral:
    fontFamily: "Doto, Martian Mono, monospace"
    fontSize: "clamp(3.4rem, 10vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  body:
    fontFamily: "Martian Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
  code:
    fontFamily: "Martian Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Martian Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  hairline: "1px"
  strip-y: "2px"
  strip-x: "1ch"
  teletext-step: "14px"
  row: "18px"
  cluster: "24px"
  control-gap: "28px"
  margin: "clamp(16px, 3.2vw, 48px)"
components:
  control-key:
    backgroundColor: "transparent"
    textColor: "{colors.standby-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 4px"
    height: "44px"
  control-key-hover:
    textColor: "{colors.phosphor-white}"
  control-key-teletext:
    textColor: "{colors.phosphor-white}"
  control-key-teletext-hover:
    textColor: "{colors.signal-red}"
  remote-strip:
    backgroundColor: "{colors.dead-air-black}"
    rounded: "{rounded.none}"
    padding: "0 12px"
  osd-channel:
    backgroundColor: "{colors.dead-air-black}"
    textColor: "{colors.on-air-red}"
    typography: "{typography.osd-numeral}"
    rounded: "{rounded.none}"
    padding: "0.1em 0.12em 0.06em 0.16em"
  osd-ident:
    backgroundColor: "{colors.dead-air-black}"
    textColor: "{colors.phosphor-white}"
    typography: "{typography.headline}"
    padding: "0.12em 0.3em 0.16em"
  teletext-line:
    backgroundColor: "{colors.dead-air-black}"
    textColor: "{colors.phosphor-white}"
    typography: "{typography.body}"
    padding: "2px 1ch"
  guide-row:
    backgroundColor: "transparent"
    textColor: "{colors.standby-grey}"
    padding: "18px 0"
  guide-row-current:
    textColor: "{colors.on-air-red}"
---

# Design System: museo

## Overview

**Creative North Star: "Transmisión nocturna"**

museo is a late-night pirate broadcast. Every shader is a channel on air, and the interface is the broadcaster's own overlay: an on-screen display that announces the channel and fades, a remote that appears only when a hand moves, a channel guide, and a teletext page carrying the original source. The work plays at full bleed; everything else is a thin black caption laid over the signal and withdrawn as soon as it has been read.

The world is absolute black with one red. Three voices carry all type: blackletter for the channel idents, a dot-matrix face for the numerals the OSD shows, and a monospace for teletext and controls. Density is low on air (a channel number, a title, one line of keys) and strict in the guide and teletext, which read as ruled, tabular broadcast data. Depth never comes from shadows or cards; legibility over a live image comes from opaque black strips sized to each line, like a station super.

Motion is the broadcast's own: overlays fade out slowly and snap in, and a channel change is always the same measured sequence of cut, snow and tune roll.

**Key Characteristics:**
- Absolute black ground; the live shader is the only large colour field.
- One red, reserved for whatever is on air.
- Blackletter idents, Doto dot-matrix numerals, Martian Mono everything else.
- Black caption strips instead of panels, shadows or blur.
- Square corners everywhere; 1px hairlines are the only rules.
- Interface fades away; the work is what remains.

## Colors

A broadcast palette: dead-air black, phosphor white, two standby greys and a single red that means "on air".

### Primary
- **On-Air Red** (`on-air-red`): the channel number in the OSD and the current channel's numeral in the guide, text selection background. Used only at large sizes (about 3.3:1 on black), and only for what is currently being transmitted.
- **Signal Red** (`signal-red`): the same red lifted for small sizes: the teletext page number, alert status lines, error text, link underlines and link hover in teletext, the code caret, and every focus ring.

### Neutral
- **Dead-Air Black** (`dead-air-black`): page ground, canvas clear colour, and the fill of every caption strip.
- **Phosphor White** (`phosphor-white`): idents, teletext body and code, hovered or pressed controls, the guide brand.
- **Standby Grey** (`standby-grey`): resting controls, guide rows at rest, metadata values, status lines.
- **Low Grey** (`low-grey`): keyboard hints, metadata labels, idle guide numerals, scrollbar thumbs, the guide footer.
- **Scanline** (`scanline`): 1px hairlines between guide rows and the outline around guide previews. Never text.

### Named Rules
**The On-Air Rule.** Red marks only what is on air or what has focus: the live channel number, the current guide row, the page number, focus, alerts. Nothing decorative is ever red; if it is not live, it is grey or white.

**The Two Reds Rule.** On-Air Red for large numerals; Signal Red for anything small (text under about 24px, focus rings, underlines). Never set small text in On-Air Red.

## Typography

**Display Font:** UnifrakturMaguntia (with Old English Text MT, serif)
**Numeral Font:** Doto, variable dot-matrix (with Martian Mono, monospace)
**Body/Label Font:** Martian Mono (with ui-monospace, Cascadia Mono, monospace)

All three are self-hosted woff2 in `fuentes/`; Doto and UnifrakturMaguntia are preloaded.

**Character:** Blackletter gives each channel a station-ident gravity; the dot-matrix numerals are what a real on-screen display looks like; the mono is teletext. The three never trade roles.

### Hierarchy
- **Display** (400, clamp(3rem, 8vw, 6rem), 0.9): the "museo" brand at the head of the guide.
- **OSD Numeral** (Doto 900, clamp(3.4rem, 10vw, 7.5rem), 0.86, -0.02em, tabular): the on-air channel number. Its "CH" prefix is the same face at 0.34em (min 11px), 800, +0.08em. Guide numerals use Doto 900 at 2.6rem (2rem under 720px).
- **Headline** (400, clamp(1.7rem, 3.4vw, 3rem), 1.05, balanced): the channel title in the OSD; the teletext title runs larger at clamp(2.2rem, 5vw, 3.6rem), 1.1.
- **Title** (400, clamp(1.6rem, 2.8vw, 2.6rem), 1.05): channel titles in guide rows.
- **Body** (13px, 1.55, max 76ch): teletext page. Base document size is 14px.
- **Code** (12.5px, 1.7, pre-wrap, break-all): the original twigl source, verbatim.
- **Label** (0.8rem, +0.14em, uppercase): remote keys and the "CH" label. Status lines use 0.82rem at +0.12em; guide data +0.12em; guide metadata 0.8rem at +0.06em, lowercase, tabular.
- **Key hint** (`kbd`: max(11px, 0.8em), +0.04em, not uppercased, Low Grey): the key letter after a control's name.

### Named Rules
**The Three Voices Rule.** Blackletter is for names of channels and the house; Doto is for channel numbers; Martian Mono is for everything else. Never blackletter for UI, never Doto for words.

**The Tabular Rule.** Any number that can change (channel, clock, character count, date) uses tabular numerals.

## Layout

Full-viewport stage: the WebGL canvas is fixed at inset 0 and the overlays are fixed on top. A single fluid margin (`margin` token) plus safe-area insets anchors everything to the corners: OSD top-right and right-aligned (max min(80vw, 40rem)), remote bottom-left, teletext top-left (max 76ch, scrolls within the margin box).

The guide is a full-screen scrolling page: a header with the brand left and count/clock right (24px gap, 28-56px below), then a ruled list whose rows are a strict four-column grid (5.5rem numeral, 10-17rem 16:9 preview, up to 26rem title, 16-24rem metadata; column gap clamp(16px, 2.6vw, 40px); 18px vertical padding). Metadata is a two-column label grid (11ch labels, 6px x 1ch gap). Teletext data uses the same 11ch label column.

Rhythm: 1ch horizontal padding on strips, 14px between teletext blocks, 24px between clusters, 28px between remote groups, 44px minimum control target.

**Breakpoint (720px):** guide rows collapse to two columns (3.4rem numeral, then preview, title and metadata stacked in column two, 12px row gap) and the guide footer's key hints are hidden.

## Elevation & Depth

Flat. There are no shadows, blurs or translucent panels anywhere. Separation over the live image is made by opaque black strips sized to their content (`width: fit-content`), one per line, the way a broadcast super sits on picture. Depth in the guide is made by hairlines and by the previews themselves.

### Named Rules
**The Caption Strip Rule.** Any text that sits on the live signal gets its own solid black strip behind it, fitted to the line, square-cornered. Never a shadow, blur, gradient scrim or shared panel.

## Shapes

Every corner is square (0px). The only strokes are 1px: Scanline hairlines between guide rows, a Scanline outline around guide previews, and the 1px Signal Red focus ring. Icons are 16px line SVG chevrons, 1.5 stroke, square caps, in `currentColor`. Previews are 16:9.

## Components

### Control Keys (remote)
Quiet, text-only keys, like labels printed on a remote.
- **Shape:** no fill, no border, square; minimum 44 x 44px target, 4px side padding.
- **Default:** Standby Grey label type, uppercase; a Low Grey `kbd` hint follows the name at 0.9em gap.
- **Hover / Pressed:** text turns Phosphor White (0.2s, `sale` ease). Pause uses `aria-pressed` for its on state.
- **Focus:** 1px Signal Red outline, 4px offset.
- **In teletext:** keys rest in Phosphor White and hover to Signal Red.
- **Container:** the remote is one black strip (0 12px padding, 4px x 28px gaps) at bottom-left. It fades in within 0.15s on pointer, touch or keyboard, stays while it contains focus, and fades out over 0.9s after 2.6s idle.

### OSD (on-screen display)
The broadcast's channel announcement, top-right.
- Red Doto channel number with a small "CH" prefix, then the blackletter title in white, then an optional uppercase status line in Standby Grey (Signal Red when it is an alert: no signal, empty channel, compile error).
- Each line has its own caption strip.
- Appears instantly, holds about 3.2s, fades over 1.1s. It is a polite live region.

### Channel Guide Row
A ruled broadcast listing, not a card.
- Full-width button in the four-column grid above; 1px Scanline rule above and below.
- **Rest:** numeral Low Grey, title and metadata Standby Grey, preview live at reduced resolution.
- **Hover / Focus:** numeral and title turn Phosphor White (0.2s); focus ring draws inside the row (offset -1px).
- **Current channel:** numeral in On-Air Red (`aria-current`).

### Teletext Page
The source page, laid over the live channel.
- Header line: Signal Red page number (P1xx), house name, live clock, all in Standby Grey mono.
- Blackletter title strip, a data list (Standby Grey 11ch labels, Phosphor White values; links white with a Signal Red underline offset 3px), action keys, then the verbatim code block (12px x 1ch padding, Signal Red caret, focusable).
- Each block is its own black strip; the page ends with a "Fin de la página" line.
- Scrollbars are thin, Low Grey thumb (4px), no track.

### Channel Change (signature)
Every channel change is the same measured sequence on the canvas: a black cut to 70ms, full snow to 230ms, then a tune roll to 420ms where the incoming image rolls into place (cubic falloff, 42% of height) while snow clears (quadratic). The OSD shows the destination channel as the sequence starts. Under reduced motion the sequence is skipped and the channel switches directly; CSS transitions are removed.

## Do's and Don'ts

### Do:
- **Do** keep red to what is on air or focused: On-Air Red for large numerals, Signal Red for small text, focus rings and underlines.
- **Do** put a fitted black strip behind every line of text that sits on the live signal.
- **Do** use blackletter only for channel and house names, Doto only for channel numerals, Martian Mono for everything else.
- **Do** let overlays fade after use (OSD about 3.2s, remote 2.6s) and snap in on demand.
- **Do** keep every corner square and every rule 1px.
- **Do** run every channel change through cut 70ms, snow to 230ms, tune roll to 420ms, and skip it under reduced motion.
- **Do** keep controls at a 44px minimum target and focus visible as a 1px Signal Red outline.

### Don't:
- **Don't** use shadows, blurs, gradient scrims or translucent panels for legibility; use black strips.
- **Don't** round corners or wrap content in cards; guide entries are ruled rows.
- **Don't** introduce a second accent hue or use red decoratively.
- **Don't** set small text in On-Air Red (#c40000); it only clears 3:1 at large sizes.
- **Don't** cover the work with persistent UI; anything shown on air must fade.
