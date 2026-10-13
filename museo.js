(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const pad = (n) => String(n).padStart(2, '0');
  const reducido = matchMedia('(prefers-reduced-motion: reduce)');

  const CANALES = (window.MUSEO_CANALES || []).map((c, i) => ({ ...c, n: i + 1, prog: null, error: null }));
  const N = CANALES.length;

  const canvas = $('#senal');
  const ui = {
    osd: $('#osd'), num: $('#osd-num'), titulo: $('#osd-titulo'), estado: $('#osd-estado'),
    mando: $('#mando'), pausa: $('#tecla-pausa'),
    guia: $('#guia'), lista: $('#guia-lista'), cuenta: $('#guia-cuenta'), relojGuia: $('#guia-reloj'),
    tt: $('#teletexto'), ttPagina: $('#tt-pagina'), ttReloj: $('#tt-reloj'), ttTitulo: $('#tt-titulo'),
    ttDatos: $('#tt-datos'), ttError: $('#tt-error'), ttCodigo: $('#tt-codigo'), ttFin: $('#tt-fin'), ttCopiar: $('#tt-copiar'),
  };

  // ————————————————————————————————————————————— twigl → GLSL ES 3.00

  const VERTICE = `#version 300 es
in vec2 p;
void main(){gl_Position=vec4(p,0.,1.);}`;

  // Lo que twigl (modo geekest 300 es) le da gratis al código.
  const PRELUDIO = `#version 300 es
precision highp float;
uniform vec2 r;
uniform float t;
uniform float f;
uniform vec2 m;
uniform vec2 museoOrigen;
// Extensión del museo (no existe en twigl): el último clic o toque.
// xy = dónde fue (0 a 1, como m), z = 1 mientras está apretado, w = el t en que empezó.
uniform vec4 clic;
// Extensión del museo (no existe en twigl): 1 mientras hay un mouse sobre la página, 0 si no.
uniform float hayMouse;
// Extensión del museo (no existe en twigl): una chispa que va hacia la x del mouse a la
// velocidad máxima de un vaivén (.5+.275*sin(t*.5)) y, sin mouse, vuelve a él.
// chispa[i] = dónde estaba (x de 0 a 1, como m) hace i*.07 s.
uniform float chispa[40];
uniform sampler2D museoImagen;
uniform vec2 museoImagenTam;
out vec4 o;
// Extensión del museo (no existe en twigl): la imagen de la obra, recortada para cubrir
// el cuadro como object-fit: cover. u va de 0 a 1 dentro de la obra (FC.xy/r).
// suave es el nivel de mipmap: 0 = nítida, cada +1 promedia el doble de píxeles.
// Fuera de la imagen devuelve negro.
vec2 fotoUV(vec2 u){
  float ra=r.x/r.y,ri=museoImagenTam.x/museoImagenTam.y;
  return (u-.5)*(ra>ri?vec2(1,ri/ra):vec2(ra/ri,1))+.5;
}
vec4 foto(vec2 u,float suave){
  vec2 c=fotoUV(u);
  return c==clamp(c,0.,1.)?textureLod(museoImagen,c,suave):vec4(0,0,0,1);
}
vec4 foto(vec2 u){return foto(u,0.);}
// Distancia de u al borde de la imagen, en unidades de la imagen (0 a .5 adentro, negativa afuera).
float margen(vec2 u){vec2 c=fotoUV(u);c=min(c,1.-c);return min(c.x,c.y);}
// El zoom que muestra la imagen entera (object-fit: contain), para usar como ZOOM.
float entera(){float a=r.x/r.y/(museoImagenTam.x/museoImagenTam.y);return min(a,1./a);}
mat2 rotate2D(float a){return mat2(cos(a),sin(a),-sin(a),cos(a));}
mat3 rotate3D(float angle,vec3 axis){
  vec3 a=normalize(axis);float s=sin(angle),c=cos(angle),k=1.-c;
  return mat3(a.x*a.x*k+c,a.y*a.x*k+a.z*s,a.z*a.x*k-a.y*s,
              a.x*a.y*k-a.z*s,a.y*a.y*k+c,a.z*a.y*k+a.x*s,
              a.x*a.z*k+a.y*s,a.y*a.z*k-a.x*s,a.z*a.z*k+c);
}
vec3 hsv(float h,float s,float v){
  vec4 k=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(vec3(h)+k.xyz)*6.-vec3(k.w));
  return v*mix(vec3(k.x),clamp(p-vec3(k.x),0.,1.),s);
}
`;

  // En modo golf se declaran variables sin valor ("float i,d,z=3.;"). GLSL no garantiza
  // que valgan 0, así que se inicializan explícitamente antes de compilar.
  function inicializar(src) {
    const decl = /(^|[;{}(])(\s*)(float|int|vec[234]|mat[234])\s+(?=[A-Za-z_])/g;
    let salida = '';
    let desde = 0;
    let m;
    while ((m = decl.exec(src))) {
      const tipo = m[3];
      const inicio = m.index + m[0].length;
      let prof = 0;
      let i = inicio;
      for (; i < src.length; i++) {
        const ch = src[i];
        if (ch === '(' || ch === '[') prof++;
        else if (ch === ')' || ch === ']') { if (prof === 0) break; prof--; }
        else if (ch === ';' && prof === 0) break;
      }
      const partes = [];
      let actual = '';
      prof = 0;
      for (const ch of src.slice(inicio, i)) {
        if (ch === '(' || ch === '[') prof++;
        else if (ch === ')' || ch === ']') prof--;
        if (ch === ',' && prof === 0) { partes.push(actual); actual = ''; } else actual += ch;
      }
      partes.push(actual);
      const cuerpo = partes
        .map((p) => (/^\s*[A-Za-z_]\w*\s*$/.test(p) ? `${p.trim()}=${tipo}(0)` : p))
        .join(',');
      salida += src.slice(desde, inicio) + cuerpo;
      desde = i;
      decl.lastIndex = i;
    }
    return salida + src.slice(desde);
  }

  const portar = (codigo) =>
    `${PRELUDIO}void main(){
o=vec4(0.);
vec4 FC=vec4(gl_FragCoord.xy-museoOrigen,gl_FragCoord.zw);
#line 1
${inicializar(codigo)}
}`;

  const RUIDO = `#version 300 es
precision highp float;
uniform vec2 r;
uniform float t;
uniform float a;
uniform vec2 museoOrigen;
out vec4 o;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 p=gl_FragCoord.xy-museoOrigen;
  float cuadro=floor(t*50.);
  float corte=step(.9,h(vec2(floor(p.y/3.),cuadro)));
  float n=h(floor(p/1.5)+vec2(cuadro*7.13,cuadro*3.71)+corte*17.);
  n=n*n*(.75+.25*sin(p.y*1.3+t*80.));
  o=vec4(vec3(n*.9),a);
}`;

  // El OSD y el teletexto cuando viajan dentro de la señal (ver «HTML en la señal»): la obra
  // llega en escena, el OSD en rotulo y la página del teletexto en pagina, y las dos capas
  // pasan por el tubo encima de la obra.
  const TUBO = `#version 300 es
precision highp float;
uniform vec2 r;
uniform float t;
uniform float k;
uniform float alfa;
uniform float interferencia;
uniform float ruidoRotulo;
uniform float vivo;
uniform sampler2D escena;
uniform sampler2D rotulo;
uniform sampler2D pagina;
out vec4 o;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float cuadro;
// Una capa vista a través del tubo. ruido: 0 estable, 1 sin enganchar. golpe: 1 en los
// cuadros sueltos en que la señal da un tirón.
vec4 capa(sampler2D s,vec2 px,float ruido,float golpe){
  // Tirones: unas franjas de renglones se corren de lado, como una señal que engancha mal.
  float franja=floor(px.y/k/(4.+20.*h(vec2(cuadro,.37))));
  float salta=step(1.-(.07*golpe+.5*ruido),h(vec2(franja,cuadro)));
  vec2 c=px+vec2(salta*(h(vec2(franja,cuadro+.5))-.5)*(6.+70.*ruido)*k,0);
  // Aberración: el rojo y el azul no caen del todo donde el verde.
  vec2 ab=vec2((.75+3.*ruido)*k,0);
  vec4 g=texture(s,c/r);
  vec3 col=vec3(texture(s,(c+ab)/r).r,g.g,texture(s,(c-ab)/r).b);
  // Nieve mientras la señal no engancha.
  col=mix(col,vec3(.9*h(floor(px/(1.5*k))+cuadro*vec2(7.13,3.71))),ruido*.45);
  return vec4(col,g.a);
}
void main(){
  vec2 px=gl_FragCoord.xy;
  cuadro=floor(t*24.);
  // El OSD sale del aparato, no de la emisión: comparte el tubo pero no los tirones sueltos.
  vec4 a=capa(rotulo,px,ruidoRotulo,0.);
  vec4 b=capa(pagina,px,interferencia,step(.95,h(vec2(cuadro,.71)))*vivo);
  // Renglones de barrido cada 3 px y una banda clara que baja despacio.
  float barrido=(.84+.16*smoothstep(0.,.6,abs(sin(px.y/k*1.0472))))
    *(1.+.08*vivo*smoothstep(.97,1.,sin(px.y/r.y*2.-t*.6)));
  vec3 col=texture(escena,px/r).rgb;
  col=mix(col,a.rgb*barrido,a.a);
  col=mix(col,b.rgb*barrido,b.a*alfa);
  o=vec4(col,1);
}`;

  // ————————————————————————————————————————————— WebGL

  const gl = canvas.getContext('webgl2', {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, powerPreference: 'high-performance',
  });

  let ruido = null;

  function crearShader(tipo, fuente) {
    const s = gl.createShader(tipo);
    gl.shaderSource(s, fuente);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(s) || 'error desconocido';
      gl.deleteShader(s);
      throw new Error(log.trim());
    }
    return s;
  }

  function crearPrograma(fuente) {
    const vs = crearShader(gl.VERTEX_SHADER, VERTICE);
    let fs;
    try { fs = crearShader(gl.FRAGMENT_SHADER, fuente); } catch (e) { gl.deleteShader(vs); throw e; }
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.bindAttribLocation(p, 0, 'p');
    gl.linkProgram(p);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error((log || 'error de enlace').trim());
    }
    const u = (n) => gl.getUniformLocation(p, n);
    return {
      p, r: u('r'), t: u('t'), f: u('f'), m: u('m'), clic: u('clic'), hayMouse: u('hayMouse'), chispa: u('chispa'), a: u('a'), origen: u('museoOrigen'),
      imagen: u('museoImagen'), imagenTam: u('museoImagenTam'),
    };
  }

  function prepararGL() {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    ruido = crearPrograma(RUIDO);
    vacia = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, vacia);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    for (const c of CANALES) { c.prog = null; c.error = null; c.tex = null; c.cargando = false; }
    if (tele.activo) prepararTele();
  }

  // Obras con imagen: se carga la primera vez que el canal se dibuja; hasta entonces, negro.
  let vacia = null;

  function textura(c) {
    if (c.capa) return texturaCartel(c);
    if (!c.imagen) return vacia;
    if (c.tex) return c.tex;
    if (!c.cargando) {
      c.cargando = true;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        } catch {
          // Desde file:// el navegador no deja subir imágenes a WebGL.
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.deleteTexture(tex);
          c.error = location.protocol === 'file:'
            ? 'Las obras con imagen necesitan un servidor: abrí el museo con abrir-museo.cmd'
            : `No se pudo leer la imagen ${c.imagen}`;
          estado.forzar = true;
          return;
        }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        c.tex = tex;
        c.imagenTam = [img.naturalWidth, img.naturalHeight];
        estado.forzar = true;
      };
      img.onerror = () => { c.error = `No se pudo cargar la imagen ${c.imagen}`; estado.forzar = true; };
      img.src = c.imagen;
    }
    return vacia;
  }

  // Compila cuando el canal se necesita por primera vez.
  function programa(c) {
    if (c.prog || c.error) return c.prog;
    try { c.prog = crearPrograma(portar(c.codigo)); } catch (e) { c.error = e.message; }
    return c.prog;
  }

  function dibujar(prog, x, y, w, h, tiempo, extra) {
    gl.useProgram(prog.p);
    if (prog.imagen) {
      const c = extra?.canal;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, c ? textura(c) : vacia);
      gl.uniform1i(prog.imagen, 0);
      const tam = c?.imagenTam || [1, 1];
      gl.uniform2f(prog.imagenTam, tam[0], tam[1]);
    }
    gl.viewport(x, y, w, h);
    gl.scissor(x, y, w, h);
    gl.uniform2f(prog.r, w, h);
    gl.uniform2f(prog.origen, x, y + (extra?.rodar || 0));
    gl.uniform1f(prog.t, tiempo);
    if (prog.f) gl.uniform1f(prog.f, cuadros);
    if (prog.m) gl.uniform2f(prog.m, puntero.x, puntero.y);
    if (prog.clic) gl.uniform4f(prog.clic, clic.x, clic.y, clic.apretado, clic.inicio);
    if (prog.hayMouse) gl.uniform1f(prog.hayMouse, puntero.mouse);
    if (prog.chispa) gl.uniform1fv(prog.chispa, chispa.v);
    if (prog.a) gl.uniform1f(prog.a, extra?.alfa ?? 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function dibujarRuido(x, y, w, h, tiempo, alfa) {
    gl.enable(gl.BLEND);
    dibujar(ruido, x, y, w, h, tiempo, { alfa });
    gl.disable(gl.BLEND);
  }

  // ————————————————————————————————————————————— estado

  const estado = {
    modo: 'aire',          // 'aire' | 'guia'
    actual: 0,
    pausa: false,
    tiempo: 0,
    cambio: null,          // { inicio, destino, cambiado }
    escala: 0.75,          // píxeles de la señal por píxel CSS
    forzar: true,
  };
  const ESCALA_GUIA = 0.6;
  const escalaMax = () => Math.min(window.devicePixelRatio || 1, 1.5);

  let cuadros = 0;
  const puntero = { x: 0.5, y: 0.5, mouse: 0 };
  // inicio arranca muy en el pasado, así t - clic.w es grande antes del primer clic.
  const clic = { x: 0.5, y: 0.5, apretado: 0, inicio: -1e4 };

  // El cambio de canal es siempre la misma secuencia: corte, nieve, sintonía.
  const CORTE = 70;
  const NIEVE = 230;
  const SINTONIA = 420;

  // ————————————————————————————————————————————— dibujo por cuadro

  function ajustar(escala) {
    const w = Math.max(1, Math.round(canvas.clientWidth * escala));
    const h = Math.max(1, Math.round(canvas.clientHeight * escala));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      return true;
    }
    return false;
  }

  function limpiar(W = canvas.width, H = canvas.height) {
    gl.disable(gl.SCISSOR_TEST);
    gl.viewport(0, 0, W, H);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);
  }

  function dibujarAire(ahora) {
    let redimensionado, W, H;
    if (tele.activo) [redimensionado, W, H] = lienzoTele();
    else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      redimensionado = ajustar(estado.escala);
      W = canvas.width;
      H = canvas.height;
    }
    dibujarEscena(ahora, W, H, redimensionado);
    if (tele.activo) componerTele(ahora);
  }

  function dibujarEscena(ahora, W, H, redimensionado) {
    const c = CANALES[estado.actual];

    if (estado.cambio) {
      const e = ahora - estado.cambio.inicio;
      if (e >= CORTE && !estado.cambio.cambiado) {
        estado.actual = estado.cambio.destino;
        estado.cambio.cambiado = true;
      }
      if (e < CORTE) { limpiar(W, H); return; }
      if (e < NIEVE) { limpiar(W, H); dibujarRuido(0, 0, W, H, estado.tiempo, 1); return; }
      if (e < SINTONIA) {
        const k = (e - NIEVE) / (SINTONIA - NIEVE);
        const prog = programa(CANALES[estado.actual]);
        limpiar(W, H);
        if (prog) dibujar(prog, 0, 0, W, H, estado.tiempo, { rodar: (1 - k) ** 3 * H * 0.42, canal: CANALES[estado.actual] });
        dibujarRuido(0, 0, W, H, estado.tiempo, (1 - k) ** 2);
        return;
      }
      estado.cambio = null;
      estado.forzar = true;
      mostrarOSD();
    }

    if (estado.pausa && !estado.forzar && !redimensionado) return;
    estado.forzar = false;

    const prog = c && programa(c);
    limpiar(W, H);
    if (prog) dibujar(prog, 0, 0, W, H, estado.tiempo, { canal: c });
    else dibujarRuido(0, 0, W, H, estado.tiempo, 0.55); // sin señal
  }

  const visibles = new Set();

  function dibujarGuia() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    ajustar(ESCALA_GUIA);
    limpiar();
    const k = canvas.width / canvas.clientWidth;
    const alto = canvas.clientHeight;
    for (const el of visibles) {
      const c = CANALES[+el.dataset.i];
      const prog = programa(c);
      const b = el.getBoundingClientRect();
      const x = Math.round(b.left * k);
      const y = Math.round((alto - b.bottom) * k);
      const w = Math.max(1, Math.round(b.width * k));
      const h = Math.max(1, Math.round(b.height * k));
      if (prog) dibujar(prog, x, y, w, h, estado.tiempo, { canal: c });
      else dibujarRuido(x, y, w, h, estado.tiempo, 0.55);
    }
  }

  // Calidad adaptativa: baja la resolución si los cuadros tardan, la sube despacio si sobra.
  const muestras = [];
  let ultimo = 0;
  let ultimaBaja = 0;

  function medir(ahora) {
    const dt = ahora - ultimo;
    ultimo = ahora;
    if (estado.modo !== 'aire' || estado.pausa || estado.cambio || dt > 250) { muestras.length = 0; return; }
    muestras.push(dt);
    if (muestras.length < 40) return;
    muestras.sort((a, b) => a - b);
    const mediana = muestras[20];
    muestras.length = 0;
    if (mediana > 24) {
      estado.escala = Math.max(0.3, estado.escala * 0.82);
      ultimaBaja = ahora;
    } else if (mediana < 17.8 && ahora - ultimaBaja > 8000 && estado.escala < escalaMax()) {
      estado.escala = Math.min(escalaMax(), estado.escala * 1.1);
    }
  }

  // La chispa: persigue la x del mouse sin pasar la velocidad máxima del vaivén (sin mouse,
  // persigue al vaivén hasta alcanzarlo). Guarda su recorrido para ubicar lo que ya soltó.
  const vaiven = (t) => 0.5 + 0.275 * Math.sin(t / 2);
  const chispa = { x: 0.5, huella: [], v: new Float32Array(40) };

  function moverChispa(dt) {
    const t = estado.tiempo;
    const meta = puntero.mouse ? Math.min(Math.max(puntero.x, 0.02), 0.98) : vaiven(t);
    const paso = 0.1375 * dt;
    chispa.x += Math.max(-paso, Math.min(paso, meta - chispa.x));
    const h = chispa.huella;
    h.push(t, chispa.x);
    while (h.length > 4 && h[2] < t - 3) h.splice(0, 2);
    let j = h.length - 2;
    for (let i = 0; i < 40; i++) {
      const s = t - i * 0.07;
      while (j > 0 && h[j] > s) j -= 2;
      if (h[j] > s) chispa.v[i] = vaiven(s);
      else if (j + 2 >= h.length) chispa.v[i] = h[j + 1];
      else chispa.v[i] = h[j + 1] + (h[j + 3] - h[j + 1]) * (s - h[j]) / Math.max(h[j + 2] - h[j], 1e-6);
    }
  }

  let previo = 0;

  function cuadro(ahora) {
    requestAnimationFrame(cuadro);
    const dt = previo ? Math.min(ahora - previo, 100) : 0;
    previo = ahora;
    if (!estado.pausa) { estado.tiempo += dt / 1000; cuadros++; moverChispa(dt / 1000); }
    if (gl.isContextLost()) return;
    if (estado.modo === 'guia') dibujarGuia();
    else dibujarAire(ahora);
    medir(ahora);
  }

  // ————————————————————————————————————————————— OSD y mando

  let osdTimer = 0;
  let mandoTimer = 0;
  let numeroTimer = 0;
  let numero = '';

  function mostrarOSD(texto) {
    const c = CANALES[estado.actual];
    ui.num.textContent = texto ?? (c ? pad(c.n) : '--');
    ui.titulo.textContent = c ? c.titulo : 'Sin canales';
    let aviso = '';
    if (!c) aviso = 'Agregá piezas en shaders.js';
    else if (c.error) aviso = 'Sin señal: el código no compila';
    else if (estado.pausa) aviso = 'En pausa';
    ui.estado.textContent = aviso;
    ui.estado.classList.toggle('alerta', Boolean(c && c.error) || !c);
    ui.osd.classList.add('visible');
    clearTimeout(osdTimer);
    if (!estado.pausa && c && !c.error) {
      osdTimer = setTimeout(() => ui.osd.classList.remove('visible'), 3200);
    }
  }

  function mostrarMando() {
    ui.mando.classList.add('visible');
    clearTimeout(mandoTimer);
    mandoTimer = setTimeout(() => ui.mando.classList.remove('visible'), 2600);
  }

  // ————————————————————————————————————————————— sintonizar

  function sintonizar(i, { historial = true } = {}) {
    if (!N) return;
    const destino = ((i % N) + N) % N;
    if (historial && destino !== estado.actual) history.pushState({ canal: destino }, '', `#/${pad(destino + 1)}`);
    if (reducido.matches || estado.modo !== 'aire') {
      estado.actual = destino;
      estado.cambio = null;
      estado.forzar = true;
      mostrarOSD();
    } else {
      estado.cambio = { inicio: performance.now(), destino, cambiado: false };
      ui.num.textContent = pad(destino + 1);
      ui.titulo.textContent = CANALES[destino].titulo;
      ui.osd.classList.add('visible');
      clearTimeout(osdTimer);
    }
    if (!ui.tt.hidden) llenarTeletexto(destino);
  }

  function canalDesdeHash() {
    const m = location.hash.match(/^#\/(\d+)/);
    if (!m) return null;
    const n = parseInt(m[1], 10) - 1;
    return n >= 0 && n < N ? n : null;
  }

  function teclearNumero(d) {
    numero = (numero + d).slice(-2);
    ui.num.textContent = numero.length === 1 ? `${numero}_` : numero;
    ui.osd.classList.add('visible');
    clearTimeout(osdTimer);
    clearTimeout(numeroTimer);
    const cerrar = () => {
      const n = parseInt(numero, 10) - 1;
      numero = '';
      if (n >= 0 && n < N) sintonizar(n);
      else { ui.num.textContent = '--'; ui.estado.textContent = 'Canal vacío'; mostrarOSD('--'); }
    };
    if (numero.length === 2 || parseInt(numero, 10) * 10 > N) cerrar();
    else numeroTimer = setTimeout(cerrar, 1200);
  }

  function pausar(valor = !estado.pausa) {
    estado.pausa = valor;
    estado.forzar = true;
    ui.pausa.setAttribute('aria-pressed', String(valor));
    ui.pausa.firstChild.textContent = valor ? 'Seguir ' : 'Pausa ';
    mostrarOSD();
  }

  // ————————————————————————————————————————————— guía

  const fechaCorta = (iso) => (iso ? iso.split('-').reverse().join('.') : 'sin fecha');

  function armarGuia() {
    ui.cuenta.textContent = `${N} ${N === 1 ? 'canal' : 'canales'}`;
    ui.lista.innerHTML = '';
    const obs = new IntersectionObserver((entradas) => {
      for (const en of entradas) {
        if (en.isIntersecting) visibles.add(en.target); else visibles.delete(en.target);
      }
    }, { root: ui.guia });

    CANALES.forEach((c, i) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'fila';
      b.dataset.i = i;
      b.setAttribute('aria-label', `Canal ${pad(c.n)}: ${c.titulo}`);
      b.innerHTML = `
        <span class="fila-ch" aria-hidden="true">${pad(c.n)}</span>
        <span class="fila-vista" data-i="${i}" aria-hidden="true"></span>
        <span class="fila-titulo"></span>
        <span class="fila-meta"><span class="dt">autor</span><span class="dd fila-autor"></span><span class="dt">caracteres</span><span class="dd">${c.codigo.length}</span><span class="dt">agregado</span><span class="dd">${fechaCorta(c.fecha)}</span></span>`;
      b.querySelector('.fila-titulo').textContent = c.titulo;
      b.querySelector('.fila-autor').textContent = c.autor || 'sin confirmar';
      b.addEventListener('click', () => { cerrarGuia(); sintonizar(i); });
      li.append(b);
      ui.lista.append(li);
      obs.observe(b.querySelector('.fila-vista'));
    });
  }

  let volverFoco = null;

  function abrirGuia() {
    if (!N) return;
    cerrarTeletexto();
    volverFoco = document.activeElement;
    estado.modo = 'guia';
    estado.cambio = null;
    ui.osd.classList.remove('visible');
    ui.mando.classList.remove('visible');
    ui.guia.hidden = false;
    for (const b of ui.lista.querySelectorAll('.fila')) {
      b.setAttribute('aria-current', String(+b.dataset.i === estado.actual));
    }
    const actual = ui.lista.querySelector(`.fila[data-i="${estado.actual}"]`);
    actual.focus({ preventScroll: true });
    actual.scrollIntoView({ block: 'nearest' });
    reloj();
  }

  function cerrarGuia() {
    if (estado.modo !== 'guia') return;
    estado.modo = 'aire';
    estado.forzar = true;
    ui.guia.hidden = true;
    muestras.length = 0;
    if (volverFoco && volverFoco.isConnected && volverFoco !== document.body) volverFoco.focus({ preventScroll: true });
    mostrarOSD();
  }

  function moverEnGuia(paso) {
    const filas = [...ui.lista.querySelectorAll('.fila')];
    const i = filas.indexOf(document.activeElement);
    const sig = filas[Math.max(0, Math.min(filas.length - 1, (i < 0 ? estado.actual : i) + paso))];
    sig.focus();
  }

  // ————————————————————————————————————————————— teletexto

  function fila(dt, dd) {
    const d = document.createElement('div');
    const t = document.createElement('dt');
    const v = document.createElement('dd');
    t.textContent = dt;
    if (dd instanceof Node) v.append(dd); else v.textContent = dd;
    d.append(t, v);
    return d;
  }

  function llenarTeletexto(i = estado.actual) {
    const c = CANALES[i];
    if (!c) return;
    ui.ttPagina.textContent = `P1${pad(c.n)}`;
    ui.ttFin.textContent = `Fin de la página P1${pad(c.n)}`;
    ui.ttTitulo.textContent = c.titulo;
    let fuente = 'sin fuente';
    // Solo https: una fuente javascript: o data: se ejecutaría al hacer clic.
    if (c.fuente && /^https:\/\//i.test(c.fuente)) {
      fuente = document.createElement('a');
      fuente.href = c.fuente;
      fuente.target = '_blank';
      fuente.rel = 'noopener noreferrer';
      fuente.textContent = c.fuente.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
    ui.ttDatos.replaceChildren(
      fila('canal', pad(c.n)),
      fila('autor', c.autor || 'sin confirmar'),
      fila('fuente', fuente),
      fila('agregado', fechaCorta(c.fecha)),
      fila('caracteres', String(c.codigo.length)),
      ...(c.cartel ? [fila('cartel', tele.activo ? 'HTML en vivo' : c.imagen ? 'imagen de respaldo' : 'necesita HTML-in-Canvas')] : []),
      ...(c.imagen ? [fila('imagen', c.imagen)] : []),
    );
    programa(c);
    ui.ttError.hidden = !c.error;
    ui.ttError.textContent = c.error ? `Sin señal. El compilador dice:\n${c.error}` : '';
    ui.ttCodigo.textContent = c.codigo;
    ui.ttCopiar.textContent = 'Copiar código';
  }

  function abrirTeletexto() {
    if (!N || estado.modo === 'guia') return;
    llenarTeletexto();
    ui.tt.hidden = false;
    ui.osd.classList.remove('visible');
    tele.abre = performance.now();
    if (tele.activo) tele.pagina.lista = false;
    reloj();
  }

  function cerrarTeletexto() {
    if (!ui.tt.hidden) tele.cierra = performance.now();
    ui.tt.hidden = true;
  }

  ui.ttCopiar.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CANALES[estado.actual].codigo);
      ui.ttCopiar.textContent = 'Copiado';
    } catch {
      const sel = getSelection();
      const rango = document.createRange();
      rango.selectNodeContents(ui.ttCodigo);
      sel.removeAllRanges();
      sel.addRange(rango);
      ui.ttCopiar.textContent = 'Seleccionado: Ctrl+C';
    }
  });

  // ————————————————————————————————————————————— HTML en la señal
  // Con HTML-in-Canvas (Chrome, por ahora detrás de un flag) el OSD, el teletexto y los
  // carteles de las obras viven dentro del canvas: el navegador los maqueta, los hace
  // accesibles y les da los clics, pero no los pinta. Cada uno es una capa: un hijo directo
  // del canvas, del tamaño del canvas, que se sube como textura cada vez que cambia.
  // - El OSD y el teletexto los compone TUBO encima de la obra. La obra se dibuja a su
  //   resolución adaptativa en una textura y las capas a la del dispositivo, para que el
  //   texto se lea nítido.
  // - Los carteles no se ven: la obra los lee con foto(), como si fueran su imagen.
  // Sin la API, el OSD y el teletexto quedan como HTML encima del canvas y las obras con
  // cartel usan su imagen de respaldo.

  const APERTURA = 180;   // la página entra de golpe y la señal tarda esto en engancharse
  const CIERRE = 520;     // y se va despacio, como todo lo que sale del aire

  const tele = {
    activo: false,        // la API existe y las capas están dentro del canvas
    capas: new Map(),     // hijo del canvas → { el, tex, sucia, lista }
    rotulo: null,         // la capa del OSD
    pagina: null,         // la capa del teletexto
    prog: null, escena: null, fbo: null, w: 0, h: 0,
    abre: -1e9, cierra: -1e9,
  };

  function meterEnSenal() {
    if (!('layoutSubtree' in canvas) || typeof gl.texElementImage2D !== 'function') return;
    const capa = (clase, contenido) => {
      const el = document.createElement('div');
      el.className = `en-senal ${clase}`;
      if (typeof contenido === 'string') el.innerHTML = contenido; else el.append(contenido);
      canvas.append(el);
      const c = { el, tex: null, sucia: true, lista: false };
      tele.capas.set(el, c);
      return c;
    };
    for (const c of CANALES) {
      if (!c.cartel) continue;
      c.capa = capa('cartel', c.cartel);
      c.capa.el.setAttribute('aria-hidden', 'true');
      c.capa.el.dataset.canal = c.n;
    }
    tele.rotulo = capa('rotulo', ui.osd);
    tele.pagina = capa('pagina', ui.tt);
    canvas.setAttribute('layoutsubtree', '');
    canvas.removeAttribute('aria-hidden');
    canvas.addEventListener('paint', alPintar);
    tele.activo = true;
    prepararTele();
  }

  function prepararTele() {
    tele.prog = crearPrograma(TUBO);
    const u = (n) => gl.getUniformLocation(tele.prog.p, n);
    Object.assign(tele.prog, {
      k: u('k'), alfa: u('alfa'), interferencia: u('interferencia'), ruidoRotulo: u('ruidoRotulo'), vivo: u('vivo'),
      escena: u('escena'), rotulo: u('rotulo'), pagina: u('pagina'),
    });
    const nueva = (mipmaps) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      // Una textura sin datos se lee como negro opaco: hasta la primera subida, transparente.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      return tex;
    };
    // Los carteles se leen con foto(u, suave), que pide mipmaps.
    for (const capa of tele.capas.values()) {
      capa.tex = nueva(capa.el.classList.contains('cartel'));
      capa.sucia = true;
      capa.lista = false;
    }
    tele.escena = nueva(false);
    tele.fbo = gl.createFramebuffer();
    tele.w = tele.h = 0;
  }

  // El navegador avisa con paint qué capas cambiaron (el OSD que aparece o se apaga, la
  // página que se llena o se desplaza, el reloj de un cartel). Se marcan y se suben cuando
  // se usan.
  function alPintar(e) {
    for (const el of e.changedElements ?? tele.capas.keys()) {
      const capa = tele.capas.get(el);
      if (capa) capa.sucia = true;
    }
    if (estado.pausa && CANALES[estado.actual]?.capa?.sucia) estado.forzar = true;
    // El cuadro de este frame ya se compuso con el OSD y la página viejos: se recompone ahora.
    if (estado.modo === 'aire') componerTele(performance.now());
  }

  function subir(capa, tam) {
    gl.bindTexture(gl.TEXTURE_2D, capa.tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    try {
      gl.texElementImage2D(gl.TEXTURE_2D, gl.RGBA8, capa.el, tam ? { width: tam[0], height: tam[1] } : {});
      capa.sucia = false;
      capa.lista = true;
      return true;
    } catch (e) {
      // Sin pintura todavía (InvalidStateError): se reintenta en el próximo uso. Cualquier
      // otro error no se arregla reintentando; se espera al próximo paint.
      if (e.name !== 'InvalidStateError') capa.sucia = false;
      return false;
    } finally {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    }
  }

  // El cartel se sube a la resolución del dispositivo, no a la del canvas, que baja cuando
  // la obra pesa. Hasta la primera subida la obra ve negro, como con una imagen que carga.
  function texturaCartel(c) {
    const capa = c.capa;
    if (capa.sucia) {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const tam = [Math.max(1, Math.round(canvas.clientWidth * d)), Math.max(1, Math.round(canvas.clientHeight * d))];
      if (subir(capa, tam)) {
        gl.generateMipmap(gl.TEXTURE_2D);
        c.imagenTam = tam;
      }
    }
    return capa.lista ? capa.tex : vacia;
  }

  // El canvas pasa a la resolución del dispositivo y la obra se dibuja en tele.escena.
  function lienzoTele() {
    let cambio = ajustar(Math.min(window.devicePixelRatio || 1, 2));
    const w = Math.max(1, Math.round(canvas.clientWidth * estado.escala));
    const h = Math.max(1, Math.round(canvas.clientHeight * estado.escala));
    if (tele.w !== w || tele.h !== h) {
      tele.w = w;
      tele.h = h;
      gl.bindTexture(gl.TEXTURE_2D, tele.escena);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, tele.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tele.escena, 0);
      cambio = true;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, tele.fbo);
    return [cambio, w, h];
  }

  function senalTele(ahora) {
    if (reducido.matches) return { alfa: ui.tt.hidden ? 0 : 1, interferencia: 0, rotulo: 0 };
    // Un cambio de canal sacude las dos capas: la página, porque la señal es una sola; el
    // OSD, menos, porque tiene que seguir diciendo adónde se va.
    let cambio = 0;
    if (estado.cambio) {
      const k = Math.min(1, Math.max(0, (ahora - estado.cambio.inicio - NIEVE) / (SINTONIA - NIEVE)));
      cambio = 0.5 * (1 - k) ** 2;
    }
    if (ui.tt.hidden) {
      const k = Math.min(1, (ahora - tele.cierra) / CIERRE);
      return { alfa: (1 - k) ** 2, interferencia: Math.max(0.6 * k, cambio), rotulo: 0.6 * cambio };
    }
    const apertura = Math.max(0, 1 - (ahora - tele.abre) / APERTURA) ** 2;
    return { alfa: 1, interferencia: Math.max(apertura, cambio), rotulo: 0.6 * cambio };
  }

  function componerTele(ahora) {
    if (!tele.w || gl.isContextLost()) return;
    if (tele.rotulo.sucia) subir(tele.rotulo);
    // Mientras la página se apaga no se sube: la página ya vacía borraría la que se va.
    if (tele.pagina.sucia && !ui.tt.hidden) subir(tele.pagina);
    const { alfa, interferencia, rotulo } = senalTele(ahora);
    const W = canvas.width;
    const H = canvas.height;
    const p = tele.prog;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, W, H);
    gl.scissor(0, 0, W, H);
    gl.useProgram(p.p);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, tele.pagina.tex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, tele.rotulo.tex);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tele.escena);
    gl.uniform1i(p.escena, 0);
    gl.uniform1i(p.rotulo, 1);
    gl.uniform1i(p.pagina, 2);
    gl.uniform2f(p.r, W, H);
    gl.uniform1f(p.t, ahora / 1000);
    gl.uniform1f(p.k, W / Math.max(1, canvas.clientWidth));
    gl.uniform1f(p.alfa, tele.pagina.lista ? alfa : 0);
    gl.uniform1f(p.interferencia, interferencia);
    gl.uniform1f(p.ruidoRotulo, rotulo);
    gl.uniform1f(p.vivo, reducido.matches ? 0 : 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // ————————————————————————————————————————————— reloj

  const formatoHora = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  const formatoDia = new Intl.DateTimeFormat('es-AR', { weekday: 'short', day: '2-digit', month: 'short' });

  // Los carteles pueden tener su propio reloj: un elemento con data-reloj muestra la hora
  // (hh:mm:ss); con data-reloj="h", "m" o "s", solo esa parte; con "fecha", el día
  // (dd.mm.aaaa, como el resto del museo), o sus partes "dia", "mes" y "anio"; con
  // "semana", el día de la semana (lun, mar…).
  let relojesCartel = [];
  const formatoFecha = new Intl.DateTimeFormat('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });

  function reloj() {
    const d = new Date();
    if (!ui.tt.hidden) ui.ttReloj.textContent = `${formatoDia.format(d)} ${formatoHora.format(d)}`;
    if (!ui.guia.hidden) ui.relojGuia.textContent = formatoHora.format(d).slice(0, 5);
    if (!relojesCartel.length) return;
    const partes = Object.fromEntries([...formatoHora.formatToParts(d), ...formatoFecha.formatToParts(d)].map((p) => [p.type, p.value]));
    const valor = {
      h: partes.hour, m: partes.minute, s: partes.second,
      fecha: `${partes.day}.${partes.month}.${partes.year}`, dia: partes.day, mes: partes.month, anio: partes.year,
      semana: partes.weekday,
    };
    for (const el of relojesCartel) el.textContent = valor[el.dataset.reloj] ?? formatoHora.format(d);
  }
  setInterval(reloj, 1000);

  // ————————————————————————————————————————————— entrada

  const acciones = {
    anterior: () => sintonizar(estado.actual - 1),
    siguiente: () => sintonizar(estado.actual + 1),
    guia: () => (estado.modo === 'guia' ? cerrarGuia() : abrirGuia()),
    info: () => (ui.tt.hidden ? abrirTeletexto() : cerrarTeletexto()),
    pausa: () => pausar(),
  };

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-accion]');
    if (b) acciones[b.dataset.accion]();
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (k === 'g' || k === 'G') { acciones.guia(); e.preventDefault(); return; }
    if (k === 'Escape') { if (estado.modo === 'guia') cerrarGuia(); else cerrarTeletexto(); return; }

    if (estado.modo === 'guia') {
      if (k === 'ArrowDown' || k === 'ArrowRight') { moverEnGuia(1); e.preventDefault(); }
      else if (k === 'ArrowUp' || k === 'ArrowLeft') { moverEnGuia(-1); e.preventDefault(); }
      return;
    }

    if (k === 'i' || k === 'I') { acciones.info(); e.preventDefault(); return; }
    if (e.target.closest('button, a, pre')) {
      if (k === ' ' || k === 'Enter') return;
    }
    if (k === 'ArrowRight' || k === 'ArrowUp' || k === 'PageUp') { acciones.siguiente(); e.preventDefault(); }
    else if (k === 'ArrowLeft' || k === 'ArrowDown' || k === 'PageDown') { acciones.anterior(); e.preventDefault(); }
    else if (k === ' ' || k === 'p' || k === 'P') { pausar(); e.preventDefault(); }
    else if (k === 'f' || k === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (/^\d$/.test(k)) teclearNumero(k);
    else if (k === 'Tab') mostrarMando();
  });

  let rueda = 0;
  let ruedaBloqueo = 0;
  document.addEventListener('wheel', (e) => {
    if (estado.modo !== 'aire' || e.target.closest('.teletexto')) return;
    const ahora = performance.now();
    if (ahora < ruedaBloqueo) return;
    rueda += e.deltaY;
    if (Math.abs(rueda) > 60) {
      sintonizar(estado.actual + (rueda > 0 ? 1 : -1));
      rueda = 0;
      ruedaBloqueo = ahora + 450;
    }
  }, { passive: true });

  let toque = null;
  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    toque = { x: t.clientX, y: t.clientY };
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!toque || estado.modo !== 'aire' || e.target.closest('.teletexto, .mando')) { toque = null; return; }
    const t = e.changedTouches[0];
    const dx = t.clientX - toque.x;
    const dy = t.clientY - toque.y;
    toque = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 50) { mostrarOSD(); mostrarMando(); return; }
    if (Math.abs(dy) > Math.abs(dx)) sintonizar(estado.actual + (dy < 0 ? 1 : -1));
    else sintonizar(estado.actual + (dx < 0 ? 1 : -1));
  }, { passive: true });

  document.addEventListener('pointermove', (e) => {
    puntero.x = e.clientX / innerWidth;
    puntero.y = 1 - e.clientY / innerHeight;
    puntero.mouse = e.pointerType === 'mouse' ? 1 : 0;
    if (e.pointerType === 'mouse' && estado.modo === 'aire') mostrarMando();
  });
  document.documentElement.addEventListener('pointerleave', () => { puntero.mouse = 0; });

  // Solo cuenta el clic sobre la obra, no sobre el mando ni el teletexto.
  document.addEventListener('pointerdown', (e) => {
    if (estado.modo !== 'aire' || e.button !== 0 || e.target.closest('button, a, .mando, .teletexto')) return;
    puntero.x = clic.x = e.clientX / innerWidth;
    puntero.y = clic.y = 1 - e.clientY / innerHeight;
    clic.apretado = 1;
    clic.inicio = estado.tiempo;
  });
  const soltar = () => { clic.apretado = 0; };
  document.addEventListener('pointerup', soltar);
  document.addEventListener('pointercancel', soltar);
  addEventListener('blur', () => { soltar(); puntero.mouse = 0; });

  addEventListener('popstate', () => {
    const n = canalDesdeHash();
    if (n !== null && n !== estado.actual) sintonizar(n, { historial: false });
  });

  addEventListener('resize', () => { estado.forzar = true; });

  canvas.addEventListener('webglcontextlost', (e) => e.preventDefault());
  canvas.addEventListener('webglcontextrestored', () => { prepararGL(); estado.forzar = true; });

  // ————————————————————————————————————————————— arranque

  if (!gl) {
    ui.num.textContent = '--';
    ui.titulo.textContent = 'Sin señal';
    ui.estado.textContent = 'Este navegador no tiene WebGL2';
    ui.estado.classList.add('alerta');
    ui.osd.classList.add('visible');
    ui.mando.hidden = true;
    return;
  }

  prepararGL();
  meterEnSenal();
  relojesCartel = [...canvas.querySelectorAll('.cartel [data-reloj]')];
  reloj();
  armarGuia();
  const inicial = canalDesdeHash();
  estado.actual = inicial ?? 0;
  if (N) history.replaceState({ canal: estado.actual }, '', `#/${pad(estado.actual + 1)}`);
  programa(CANALES[estado.actual]);
  mostrarOSD();
  mostrarMando();
  requestAnimationFrame(cuadro);
})();
