// La colección. Cada canal guarda el código twigl tal como se publicó
// (modo "geekest (300 es)": FC, r, t, o, hsv, rotate3D...). El museo lo porta al cargar.
//
// Para sumar un canal, agregá un objeto al final:
//   titulo  nombre de la pieza
//   autor   quien la publicó; null si no está confirmado (nunca adivinar)
//   fuente  link al tuit o a twigl; null si no hay
//   fecha   día en que entró a la colección (AAAA-MM-DD)
//   codigo  el código original, entre String.raw`...`
//   imagen  (opcional) ruta a una imagen en obras/; el código la lee con foto(FC.xy/r)

window.MUSEO_CANALES = [
  {
    titulo: 'Atlantic',
    autor: 'XorDev',
    fuente: 'https://x.com/XorDev/status/1922716290545783182',
    fecha: '2026-09-25',
    codigo: String.raw`for(float i,d,z=3.;i++<1e2;o+=1.2/d/z){vec3 p=z*(FC.rgb*2.-r.xyy)/r.y,v=p;for(d=1.;d<3e1;d/=.7)p+=.3*sin(p*rotate3D(d,r.xyy)*d+t)/d;z+=d=.01+.4*max(d=p.y+p.z*.5+2.,-d*.1);}o=tanh(o/vec4(9,6,3,1)/2e2);`,
  },
  {
    titulo: 'Sin título',
    autor: 'Yohei Nishitsuji',
    fuente: 'https://x.com/YoheiNishitsuji/status/1915756430084256054',
    fecha: '2026-09-25',
    codigo: String.raw`float i,e,R,s;vec3 q,p,d=vec3((FC.xy-r*.5)/r,.1);for(q.zx--;i++<99.;){o.rgb+=hsv(.1,e,min(e*s,.4-e)/25.);s=2.;p=q+=d*e*R*.7;p=vec3(log2(R=length(p))-t*.5,exp2(.9-p.z/R),atan(p.y,p.x)+cos(t*.5)*.1);for(e=--p.y;s<6e2;s+=s)e+=dot(cos(p.yzy*s)-.5,1.-cos(p*s))/s*.3;}`,
  },
  {
    titulo: 'Aguacero',
    autor: 'pieza propia · a partir de yudho.xyz',
    fuente: 'https://yudho.xyz/',
    fecha: '2026-09-25',
    codigo: String.raw`float S=max(r.y/120.,1.5),T=floor(t*10.),a=0.,w=.7/S;vec2 c=floor(FC.xy/S),g=FC.xy/S-c-.5;vec3 H=fract(sin(vec3(dot(c,vec2(127.1,311.7)),dot(c,vec2(269.5,183.3)),dot(c,vec2(419.2,371.9))))*43758.5453);float K=fract(sin(dot(c,vec2(41.3,289.1))+T*1.37)*43758.5),F[3];for(int k=0;k<3;k++){vec2 p=((c+.5)*S*2.-r)/r.y+vec2(k==1,k==2)*.015;p+=.14*sin(p.yx*vec2(3,4)+t*.15)+.04*sin(p.yx*vec2(13,11)-t*.3);F[k]=smoothstep(.55,1.,sin(length(p-vec2(.4,.1))*7.-t*.4)+sin(p.x*2.3-p.y*1.7+t*.2)*1.2)+.6*smoothstep(1.2,1.5,sin(length(p+vec2(.6,.3))*5.+t*.3)+sin(p.y*3.+t*.1));}vec2 G=vec2(F[1]-F[0],F[2]-F[0])/.015,d=normalize(G+vec2(cos(H.y*6.3),sin(H.y*6.3))*1e-3);d=rotate2D(H.y-.5)*vec2(-d.y,d.x);float e=clamp(length(G)*.06,0.,1.),u=dot(g,d),v=dot(g,vec2(-d.y,d.x)),l=.3+.55*H.z;a=(step(H.x,e*.95)+step(.993,fract(H.x*17.)))*step(.1,K)*step(abs(u),l)*smoothstep(w+.08,w,abs(v));vec2 Q=mat2(.9,-.44,.44,.9)*FC.xy/S;float h=fract(sin(floor(Q.x/2.)*91.7)*43758.5),y=fract(Q.y/70.+t*(.5+h)+h*9.);a+=.6*step(.72,h)*step(abs(fract(Q.x/2.)-.5),.35/S)*step(y,.1)*step(.35,fract(Q.y*.7));o=vec4(vec3(.86,.03,.02)*a*(.55+.6*fract(H.z*9.)),1);`,
  },
  {
    titulo: 'Solaire de Astora',
    autor: null,
    fuente: null,
    fecha: '2026-09-25',
    imagen: 'obras/solaire.jpg',
    codigo: String.raw`#define ZOOM entera()
#define CENTRO vec2(0)
#define PIXEL 3.
#define CONTRASTE 1.6
#define BORDE .42
#define TINTA vec3(.93,.9,.85)
#define ACENTO vec3(1,.1,.06)
#define RAYOS 8.
#define FUNDIDO .06
float px=max(PIXEL,floor(r.y/300.)),T=floor(t*12.);vec2 P=floor(FC.xy/px),u=((P+.5)*px/r-.5)/ZOOM+.5+CENTRO,e=vec2(px*2./r.x,0),p=((P+.5)*px-.5*r)/r.y;float w=smoothstep(0.,FUNDIDO,margen(u)),L=dot(foto(u,1.).rgb,vec3(.3,.59,.11));L=clamp((L-.5)*CONTRASTE+.5,0.,1.);float n=fract(52.9829*fract(dot(P+T*vec2(5.3,1.7),vec2(.0671,.0058)))),E=(length(foto(u+e,2.).rgb-foto(u-e,2.).rgb)+length(foto(u+e.yx,2.).rgb-foto(u-e.yx,2.).rgb))*step(.99,w),k=step(.97,fract(sin(P.y*.1+floor(t*3.))*43758.5)),d=length(p),a=atan(p.y,p.x),R=smoothstep(.1,.8,cos(RAYOS*a+t*.12+sin(d*9.-t*.7)*.7))*smoothstep(1.5,.35,d),h=fract(sin(dot(P-vec2(0,floor(t*14.)),vec2(12.9898,78.233)))*43758.5);vec3 F=mix(TINTA*step(n,.05*exp(-d*1.2)),ACENTO,step(n,R*.75))+TINTA*step(.997,h)*step(.3,R+.2),I=mix(TINTA*step(n,L),ACENTO,step(BORDE,E)*step(.45,n));o=vec4(mix(F,I,step(fract(n*7.31),w))*(1.-.6*k*step(.5,fract(P.x*.05+t))),1);`,
  },
  {
    titulo: 'Avenida Neón',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-25',
    codigo: String.raw`vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.6)),P=vec3(sin(t*.2)*.8,2.5,t*5.),p,b,c,g,M,F=vec3(.3,.06,.35);float i,e,h,k,a=1.,z,j,u,s,T,n,W;vec2 q,l,w,v;d.yz*=rotate2D(.1);d.xy*=rotate2D(sin(t*.2)*.06);for(;i++<150.;){p=P;q=floor(p.xz/4.+.5);l=p.xz-q*4.;k=fract(sin(dot(q,vec2(12.9,78.2)))*43758.5);h=q.x==0.?-9.:3.+k*k*16.;T=step(0.,h)*step(.45,fract(k*31.))*(2.+fract(k*57.)*7.);n=max(abs(l.x),abs(l.y));b=abs(vec3(l.x,p.y-h*.5,l.y))-vec3(1.5,h*.5,1.5);e=length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.);b=abs(vec3(l.x,p.y-(h+T)*.5,l.y))-vec3(1.05,(h+T)*.5,1.05);e=min(min(min(e,length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)),q.x==0.?2.5-abs(p.x):2.1-n),p.y);j=length(vec2(n-1.5,p.y-h));s=length(vec2(n-1.05,p.y-h-T));b=vec3(l.x,p.y-h-T-.7,l.y);g+=a*step(0.,h)*(.003*(hsv(k>.5?.52:.88,.8,1.)/(j*j+.03)+step(.1,T)*hsv(k>.5?.88:.52,.8,1.)/(s*s+.03))+vec3(1,.08,.05)*.0003/(dot(b,b)+.003)*step(.6,fract(t*.8+k*9.)));if(e<.001+z*.002){if(p.y<.05&&a>.9){a=.6;w=fract(p.xz*1.5)-.5;s=fract(t*1.4+fract(sin(dot(floor(p.xz*1.5),vec2(27.1,61.7)))*43758.5));d.xz+=.015*sin(p.zx*6.+t*4.)+w*.6*smoothstep(.05,0.,abs(length(w)-s*.45))*(1.-s);d.y=-d.y;d=normalize(d);M=vec3(.06,.02,.1)+vec3(1,.6,.2)*.3*step(abs(p.x),.06)*step(.5,fract(p.z*.2));P.y=.06;}else break;}P+=d*e;z+=e;if(p.y>28.||z>90.){z=1e3;break;}}if(i>150.&&e>.3)z=1e3;W=p.y<h?1.5:1.05;u=abs(l.x)>abs(l.y)?l.y:l.x;s=fract(k*23.);w=vec2(u*5.,p.y*4.);v=floor(w/vec2(s<.35?4.:1.,1.));c=vec3(.012,.012,.03)*(1.+fract(sin(dot(floor(w),vec2(5.1,7.3)))*43758.5))+step(W-.03,n)*step(.62,fract(sin(dot(v+q*9.,vec2(3.1,17.7)))*43758.5))*step(abs(fract(w.y)-.5),.28)*(s<.35?1.:step(abs(fract(w.x)-.5),.3))*mix(vec3(1,.55,.25),vec3(.3,.8,1),step(.55,fract(k*13.)))*(.3+.7*fract(sin(dot(v,vec2(9.7,3.3)))*9e3))+vec3(.05,.06,.1)*step(.9,fract(p.y*.5))+step(.7,fract(k*41.))*step(W-.07,abs(u))*hsv(.52,.6,2.);v=vec2(l.y-.9,p.y-2.-k*5.);s=step(abs(q.x),1.)*step(1.49,abs(l.x))*step(l.x*q.x,0.)*step(p.y,h)*step(abs(v.x),.35)*step(abs(v.y-1.5),1.5);c+=s*hsv(k*7.,.75,3.)*(step(.45,fract(sin(dot(floor(v*vec2(9,7)),vec2(7,13))+q.y)*43758.5))+step(.29,abs(v.x))+step(1.43,abs(v.y-1.5)))*step(.08,fract(sin(floor(t*9.)+k*99.)*999.));c=z>999.?mix(F,vec3(.02,0,.06),clamp(d.y*3.,0.,1.)):mix(c*a,F,1.-exp(-z*.025));c+=g+M;for(i=0.;i++<3.;){n=8.+i*14.;w=rotate2D(.15)*FC.xy/r.y;k=fract(sin(floor(w.x*n)*91.7+i*13.)*43758.5);s=fract(w.y*(.8+i*.5)+t*(2.2-i*.4)+k*9.);c+=(vec3(.5,.6,.9)+g*.6)*step(k,.25+.12*i)*step(s,.3/i)*(1.-s*i/.3)*smoothstep(n/r.y*(3.-i*.6),0.,abs(fract(w.x*n)-.5-(k-.05)*2.))*(1.6-i*.4);}o=vec4(tanh(c*1.3),1);`,
  },
];
