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
    titulo: 'Tormenta atlántica',
    autor: 'pieza propia · a partir de XorDev',
    fuente: 'https://x.com/XorDev/status/1922716290545783182',
    fecha: '2026-09-26',
    codigo: String.raw`float i,d,z=3.,F=floor(t/5.),L=step(.45,fract(sin(F*91.7)*43758.5))*exp(-mod(t,5.)*5.)*(.6+.4*sin(t*70.));for(;i++<1e2;o+=vec4(.7,.85,1,1)*(1.+14.*L)/d/z){vec3 p=z*(FC.rgb*2.-r.xyy)/r.y;p.xy*=rotate2D(.09*sin(t*.6));p.y+=.25*sin(t*.35);for(d=1.;d<3e1;d/=.7)p+=(.35+.2*sin(t*.25))*sin(p*rotate3D(d,r.xyy)*d+t*1.4)/d;z+=d=.01+.4*max(d=p.y+p.z*.5+2.,-d*.1);}o=tanh(o/vec4(16,9,6,1)/2e2);vec2 u=FC.xy/r.y,w=vec2(u.x*90.+u.y*18.,u.y*1.5+t*5.);float R=fract(sin(floor(w.x)*12.9)*437.);o.rgb+=vec3(.5,.6,.7)*(.08+.5*L)*step(.75,R)*smoothstep(.2,.0,abs(fract(w.x)-.5))*smoothstep(.85,1.,fract(w.y+R*9.))+vec3(.35,.4,.5)*L*smoothstep(.3,1.,FC.y/r.y)*1.2;`,
  },
  {
    titulo: 'Ojo del ciclón',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(v) fract(sin(dot(v,vec2(127.1,311.7)))*43758.5)
#define N(v) (i=floor(v),g=fract(v),g*=g*(3.-2.*g),mix(mix(H(i),H(i+vec2(1,0)),g.x),mix(H(i+vec2(0,1)),H(i+1.),g.x),g.y))
#define K(P) d=0.;W=0.;for(j=0.;j<2.;j++){T=fract(t/8.+j*.5);w=1.-abs(2.*T-1.);q=P;L=length(q);q=q*rotate2D(T*3.*(.4/(L+.2))-1.3*log(L))+j*vec2(5.3,2.9);q+=.25*vec2(N(q*2.),N(q*2.+7.));e=0.;A=.5;for(k=0.;k<7.;k++){e+=A*N(q*4.);q=q*mat2(1.6,1.2,-1.2,1.6)+t*.03;A*=.5;}d+=w*e;W+=w*w;}q=P;L=length(q);d=(d-.5)/sqrt(W)+.5+.22*sin(2.*(atan(q.y,q.x)+1.8*log(L)-t*.2))*smoothstep(.15,.6,L)+.25*smoothstep(.75,.15,L)+.35*exp(-pow((L-.14)/.05,2.))-.8*smoothstep(.12,.03,L)-.3*smoothstep(.6,1.4,L);y=d;d=smoothstep(.42,.72,d);
vec2 p=(FC.xy*2.-r)/r.y*1.1,q,i,g,s=vec2(-.7,.7)*.02;float L,T,w,W,d,e,A,j,k,b,c,y,B;vec3 C,O;K(p)b=d;B=y;K(p+s)c=d;O=vec3(.015,.05,.11)*(.8+.4*N(p*4.+t*.05));C=mix(O*(1.-.6*c),mix(vec3(.35,.4,.5),vec3(1,.98,.95),clamp(.6+(B-y)*7.,0.,1.))*(.7+.45*smoothstep(.45,1.,B)),b);C=mix(C,vec3(.25,.4,.6),.05*dot(p,p));C*=1.-.15*dot(p*.5,p*.5);C+=(H(FC.xy+fract(t))-.5)*.03;o=vec4(C,1);`,
  },
  {
    titulo: 'Talasofobia',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin(x)*43758.5)
vec2 p=(FC.xy*2.-r)/r.y,g,q,v,w;float i,a=.5,f=2.,e,h,s,b,T=mod(t,40.)/40.,A=r.x/r.y,d,X;vec3 n,C,V,L=normalize(vec3(.15,.2,1));for(i=0.;i<24.;i++){e=.5+(H(i*7.3)-.5)*2.2;q=vec2(cos(e),sin(e));e=dot(q,p)*f+t*sqrt(f)*.8+H(i)*6.3;h+=a*sin(e);g+=a*f*q*cos(e);a*=.78;f*=1.22;}g*=.06;n=normalize(vec3(-g,1));q=p+n.xy*.25;X=mix(-A-1.4,A+1.4,T);v=(q-vec2(X,-.1+.2*sin(T*5.)))*rotate2D(-.25+.1*sin(T*9.))/1.3;v.y+=.05*sin(v.x*2.5-t*.8)*smoothstep(0.,-1.,v.x);d=length(v/vec2(1.1,.24*(1.-.5*smoothstep(-.1,-1.1,v.x))))-1.;d=min(d,length((v-vec2(-1.2,.04*sin(t*.8)))/vec2(.1,.34))-1.);w=vec2(v.x-.28,abs(v.y)-.36)*rotate2D(-.8);d=min(d,length(w/vec2(.22,.055))-1.);s=smoothstep(.2,-.3,d)*(.8+.15*sin(t*.13));b=dot(g,normalize(vec2(-.6,-.8)));C=(vec3(.004,.03,.055)+vec3(0,.1,.12)*(.4+h*.2))*clamp(1.+b*2.5,.3,2.);C*=1.-.88*s;V=normalize(vec3(p*.3,-1));C+=vec3(.35,.5,.6)*(4.*pow(1.-max(-dot(V,n),0.),5.)+(1.-n.z)*1.2)+vec3(1,.95,.85)*pow(max(dot(reflect(V,n),L),0.),900.)*1.6;C+=vec3(.8,.9,.95)*.4*smoothstep(.5,.9,length(g))*smoothstep(.3,1.,h);C*=1.-.3*dot(p*.5,p*.5);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.02;o=vec4(tanh(C*1.3),1);`,
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
#define FUNDIDO .08
float px=max(PIXEL,floor(r.y/300.)),T=floor(t*12.),F[3];vec2 P=floor(FC.xy/px),u=((P+.5)*px/r-.5)/ZOOM+.5+CENTRO,e=vec2(px*2./r.x,0);for(int k=0;k<3;k++){vec2 c=fotoUV(u+vec2(k==1,k==2)*px*3./r);float x=c.x,y=c.y,X=x*.8,R=floor(y*55.),b=step(.15,fract(y*55.))*step(.1,fract(X*22.+.5*R)),L=.25+.1*smoothstep(1.,.5,y)+.09*sin(X*5.+t*.06+sin(y*9.+X*2.)*1.3)*sin(y*13.-X*3.+t*.04);vec2 g=vec2(X*28.,y*36.);g.x+=.5*floor(g.y);L=mix(L,.06+.06*b,step(y,.57+.03*step(.5,fract(X*9.))+.25*step(fract(X*.7+.2),.09)));L=mix(L,.08+.12*fract(sin(dot(floor(c*vec2(70,90)),vec2(12.9,78.2)))*43758.5),step(y,.43));L=mix(L,.17+.09*smoothstep(.5,.3,length(fract(g)-.5)),step(y,.3));L=mix(L,.13+.15*b*(.4+.6*sin(clamp((x-.74)/.56,0.,1.)*3.14)),step(.74,x)*step(x,1.3)*step(.3,y)*step(y,1.12+.04*step(.5,fract(X*12.))));F[k]=L;}float w=smoothstep(0.,FUNDIDO,margen(u)),L=mix(F[0],dot(foto(u,1.).rgb,vec3(.3,.59,.11)),w);L=clamp((L-.5)*CONTRASTE+.5,0.,1.);float n=fract(52.9829*fract(dot(P+T*vec2(5.3,1.7),vec2(.0671,.0058)))),E=mix((abs(F[1]-F[0])+abs(F[2]-F[0]))*2.,(length(foto(u+e,2.).rgb-foto(u-e,2.).rgb)+length(foto(u+e.yx,2.).rgb-foto(u-e.yx,2.).rgb))*step(.99,w),w),k=step(.97,fract(sin(P.y*.1+floor(t*3.))*43758.5));o=vec4(mix(TINTA*step(n,L),ACENTO,step(BORDE,E)*step(.45,n))*(1.-.6*k*step(.5,fract(P.x*.05+t))),1);`,
  },
  {
    titulo: 'Avenida Neón',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-25',
    codigo: String.raw`vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.6)),P=vec3(sin(t*.2)*.8,2.5,t*5.),p,b,c,g,M,F=vec3(.3,.06,.35);float i,e,h,k,a=1.,z,j,u,s,T,n,W;vec2 q,l,w,v;d.yz*=rotate2D(.1);d.xy*=rotate2D(sin(t*.2)*.06);for(;i++<150.;){p=P;q=floor(p.xz/4.+.5);l=p.xz-q*4.;k=fract(sin(dot(q,vec2(12.9,78.2)))*43758.5);h=q.x==0.?-9.:3.+k*k*16.;T=step(0.,h)*step(.45,fract(k*31.))*(2.+fract(k*57.)*7.);n=max(abs(l.x),abs(l.y));b=abs(vec3(l.x,p.y-h*.5,l.y))-vec3(1.5,h*.5,1.5);e=length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.);b=abs(vec3(l.x,p.y-(h+T)*.5,l.y))-vec3(1.05,(h+T)*.5,1.05);e=min(min(min(e,length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)),q.x==0.?2.5-abs(p.x):2.1-n),p.y);j=length(vec2(n-1.5,p.y-h));s=length(vec2(n-1.05,p.y-h-T));b=vec3(l.x,p.y-h-T-.7,l.y);g+=a*step(0.,h)*(.003*(hsv(k>.5?.52:.88,.8,1.)/(j*j+.03)+step(.1,T)*hsv(k>.5?.88:.52,.8,1.)/(s*s+.03))+vec3(1,.08,.05)*.0003/(dot(b,b)+.003)*step(.6,fract(t*.8+k*9.)));if(e<.001+z*.002){if(p.y<.05&&a>.9){a=.6;w=fract(p.xz*1.5)-.5;s=fract(t*1.4+fract(sin(dot(floor(p.xz*1.5),vec2(27.1,61.7)))*43758.5));d.xz+=.015*sin(p.zx*6.+t*4.)+w*.6*smoothstep(.05,0.,abs(length(w)-s*.45))*(1.-s);d.y=-d.y;d=normalize(d);M=vec3(.06,.02,.1)+vec3(1,.6,.2)*.3*step(abs(p.x),.06)*step(.5,fract(p.z*.2));P.y=.06;}else break;}P+=d*e;z+=e;if(p.y>28.||z>90.){z=1e3;break;}}if(i>150.&&e>.3)z=1e3;W=p.y<h?1.5:1.05;u=abs(l.x)>abs(l.y)?l.y:l.x;s=fract(k*23.);w=vec2(u*5.,p.y*4.);v=floor(w/vec2(s<.35?4.:1.,1.));c=vec3(.012,.012,.03)*(1.+fract(sin(dot(floor(w),vec2(5.1,7.3)))*43758.5))+step(W-.03,n)*step(.62,fract(sin(dot(v+q*9.,vec2(3.1,17.7)))*43758.5))*step(abs(fract(w.y)-.5),.28)*(s<.35?1.:step(abs(fract(w.x)-.5),.3))*mix(vec3(1,.55,.25),vec3(.3,.8,1),step(.55,fract(k*13.)))*(.3+.7*fract(sin(dot(v,vec2(9.7,3.3)))*9e3))+vec3(.05,.06,.1)*step(.9,fract(p.y*.5))+step(.7,fract(k*41.))*step(W-.07,abs(u))*hsv(.52,.6,2.);v=vec2(l.y-.9,p.y-2.-k*5.);s=step(abs(q.x),1.)*step(1.49,abs(l.x))*step(l.x*q.x,0.)*step(p.y,h)*step(abs(v.x),.35)*step(abs(v.y-1.5),1.5);c+=s*hsv(k*7.,.75,3.)*(step(.45,fract(sin(dot(floor(v*vec2(9,7)),vec2(7,13))+q.y)*43758.5))+step(.29,abs(v.x))+step(1.43,abs(v.y-1.5)))*step(.08,fract(sin(floor(t*9.)+k*99.)*999.));c=z>999.?mix(F,vec3(.02,0,.06),clamp(d.y*3.,0.,1.)):mix(c*a,F,1.-exp(-z*.025));c+=g+M;for(i=0.;i++<3.;){n=8.+i*14.;w=rotate2D(.15)*FC.xy/r.y;k=fract(sin(floor(w.x*n)*91.7+i*13.)*43758.5);s=fract(w.y*(.8+i*.5)+t*(2.2-i*.4)+k*9.);c+=(vec3(.5,.6,.9)+g*.6)*step(k,.25+.12*i)*step(s,.3/i)*(1.-s*i/.3)*smoothstep(n/r.y*(3.-i*.6),0.,abs(fract(w.x*n)-.5-(k-.05)*2.))*(1.6-i*.4);}o=vec4(tanh(c*1.3),1);`,
  },
  {
    titulo: 'Tinta en agua',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-25',
    codigo: String.raw`vec2 p=(FC.xy*2.-r)/r.y,q=p,K,g;float i,j,a,h,s;for(;i++<60.;){g=vec2(0);for(j=0.;j++<7.;){K=rotate2D(j*2.4)*vec2(j*1.3+.8,0);a=dot(K,q)+t*(.3+j*.11)-i*.015*j+j*j;g+=K*cos(a)/(j*length(K));}q-=vec2(g.y,-g.x)*.035;}h=sin(q.y*3.+sin(q.x*2.+t*.1)*1.5);s=smoothstep(.9,1.,sin(q.x*9.+q.y*4.));vec3 c=mix(vec3(.01,.03,.09),vec3(.05,.35,.75),smoothstep(-.6,.6,h));c=mix(c,vec3(1,.45,.12),smoothstep(.85,.97,h));c=mix(c,vec3(.95),s*.7);vec2 n=vec2(dFdx(h+s*.3),dFdy(h+s*.3))*r.y*.015;c+=pow(max(0.,dot(normalize(vec3(-n,1)),normalize(vec3(.4,.6,1)))),60.)*.6;o=vec4(c*(1.-.12*dot(p,p)),1);`,
  },
  {
    titulo: 'Horizonte',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-25',
    codigo: String.raw`vec2 p=(FC.xy*2.-r)/r.y;float e=.12+.07*sin(t*.13),l,i,h,a,A,k,u,s;vec3 P=vec3(0,sin(e),-cos(e))*15.,V=normalize(vec3(p,1.7)),Q,c,x,v,n,g;V.yz=rotate2D(e)*V.yz;V.xz=rotate2D(.3*sin(t*.07))*V.xz;h=dot(cross(P,V),cross(P,V));for(;i++<100.;){l=length(P);if(l<1.){A=1.;break;}k=.08*l;Q=P;V-=1.5*h*P/pow(l,5.)*k;P+=V*k;if(Q.y*P.y<0.){x=mix(Q,P,Q.y/(Q.y-P.y));u=length(x.xz);a=atan(x.z,x.x)-t*4./pow(u,1.5);s=.5+.5*sin(u*6.+sin(a*3.+u*2.)*1.5)*sin(a*7.-u*4.);v=vec3(-x.z,0,x.x)/u;a=smoothstep(2.6,3.4,u)*smoothstep(10.,5.,u);c+=(1.-A)*a*mix(vec3(1,.3,.06),vec3(1,.85,.6),smoothstep(8.,3.,u))*(.25+s)*pow(1.+.6*dot(v,-normalize(V)),3.)*14./u/u;A+=(1.-A)*a*.92;}if(l>40.&&dot(P,V)>0.)break;}n=normalize(V);k=fract(floor(t/5.)*.618+.2);s=mod(t,5.)/1.8;if(s<1.&&k>.45){Q=normalize(vec3(fract(k*5.)*.9-.45,fract(k*7.)*.3-.2,1));a=fract(k*13.)*6.28;x=normalize(cross(Q,vec3(cos(a),sin(a),0)));v=cross(Q,x);u=(s-.5)*1.1-atan(dot(n,x),dot(n,Q));a=dot(n,v);h=.002+.025*max(u,0.);c+=(1.-A)*sin(s*3.14)*(step(0.,u)*exp(-u*7.)*exp(-a*a/h/h)*mix(vec3(1),vec3(.5,.45,1),min(u*3.,1.))*2.+vec3(1,.95,.9)*.00002/(u*u+a*a+.000004));}g=n*90.;k=fract(sin(dot(floor(g),vec3(12.9,78.2,37.7)))*43758.5);c+=(1.-A)*(vec3(.8,.9,1)*step(.93,k)*smoothstep(.3,0.,length(fract(g)-.5))*(k-.93)*14.+exp(-abs(n.y+.25*n.x+.1*sin(n.z*6.))*7.)*vec3(.25,.18,.35)*(.5+.5*sin(n.x*20.+n.z*13.)*sin(n.y*31.)));o=vec4(tanh(c*1.2),1);`,
  },
  {
    titulo: 'Fractales oceánicos',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.8)),p,c,q=vec3(.3,.2,t*.06);float i,j,z=.1,a,l,s,f=1.;d.xz*=rotate2D(.4*sin(t*.04));d.yz*=rotate2D(.15+.1*sin(t*.07));for(;i++<40.;z+=.07){p=q+z*d;p=abs(1.-mod(p,2.));a=l=0.;for(j=0.;j++<12.;l=s){p=abs(p)/dot(p,p)-.53-.02*sin(t*.2+z);s=length(p);a+=abs(s-l);}a=pow(a*.065,5.);c+=f*a*.03*mix(vec3(.3,1,.85),vec3(.05,.25,1),z*.4);c+=f*vec3(0,.02,.06)*.12;f*=.86;}c+=vec3(.2,.6,.8)*pow(max(0.,d.y+.2),3.)*(.06+.06*sin(d.x*20.+t*.5+sin(d.x*7.-t*.3)*2.));o=vec4(tanh(c),1);`,
  },
  {
    titulo: 'Jardín múltiple',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.4)),P=vec3(0,0,t*1.5),q,a,x,n,w,c,F,G;float i,e,z,s,k,g=floor(t/9.),A=(g+smoothstep(5.,9.,mod(t,9.)))*1.5708,H=.07+t*.01;d.xy*=rotate2D(A);d.xz*=rotate2D(.35*sin(t*.11));d.yz*=rotate2D(.25*sin(t*.07));for(;i++<99.;){q=mod(P+d*z,6.)-3.;a=abs(q)-1.5;e=length(max(a,0.))+min(max(a.x,max(a.y,a.z)),0.);s=1.;for(k=0.;k++<4.;){a=abs(1.-3.*abs(mod(q*s/1.5,2.)-1.));s*=3.;e=max(e,(min(max(a.x,a.y),min(max(a.y,a.z),max(a.z,a.x)))-1.)*1.5/s);}a=abs(q);e=min(e,min(max(a.x,a.y),min(max(a.y,a.z),max(a.z,a.x)))-.18);if(e<.001*z||z>70.)break;z+=e;}x=P+d*z;w=abs(normalize(cross(dFdx(x),dFdy(x))));w=step(w.yzx,w)*step(w.zxy,w);n=-w*sign(d);G=vec3(1,0,0)+vec3(-1,1,0)*(.5+.5*cos(t*.06));c=mix(vec3(1,.98,.95)*(.85+.15*w.z),hsv(H,.7,1.),dot(w,G))*(.72+.38*dot(n,normalize(vec3(.4,.8,.5))))*(1.-i/170.);F=hsv(H+.06,.28,1.);c=mix(c,F,z>70.?1.:1.-exp(-z*.045));o=vec4(c*(1.-.15*dot(FC.xy/r-.5,FC.xy/r-.5)),1);`,
  },
  {
    titulo: 'Testigo',
    autor: 'pieza propia · a partir de The Witness',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define N z=(z^z>>15)*2654435769u+1013904223u
vec2 p=(FC.xy-.5*r)/min(r.x,r.y),w=(m-.5)*vec2(.08,.05)+vec2(.012*sin(t*.19),.008*sin(t*.13+2.)),g=(p+w*.3)/.14,Y=w*.5+vec2(.014,-.018),a,b,e;float C=floor(t/9.),u=mod(t,9.),A=1./(.14*min(r.x,r.y)),s=max(u-1.,0.)*3.6,d=9.,D=9.,I=9.,h,k,F,E,G,S;highp uint z=uint(C)*2654435769u+99u,V,R,Q=30583u,U=4095u,q;int P[26],x,y,n,i,j,l,L;ivec2 v;for(i=0;i<int(mod(C,4.));i++){g=vec2(-g.y,g.x);Y=vec2(-Y.y,Y.x);}h=mod(C,8.)<4.?1.:-1.;g.x*=h;Y.x*=h/.14;Y.y/=.14;g+=2.;for(j=0;j<40;j++){x=y=L=0;V=1u;P[0]=0;for(i=0;i<24;i++){if(x+y==8)break;N;n=int(z>>30);for(l=0;l<4;l++){v=ivec2(x,y)+ivec2((n+l)%4==0?1:(n+l)%4==2?-1:0,(n+l)%4==1?1:(n+l)%4==3?-1:0);if(v.x>=0&&v.x<5&&v.y>=0&&v.y<5&&(V>>(v.x+5*v.y)&1u)==0u){x=v.x;y=v.y;V|=1u<<(x+5*y);P[++L]=x+5*y;break;}}if(l>3)break;}if(x+y==8&&L>9&&L<21)break;}S=float(L)+.5;F=1.+S/3.6;for(i=0;i<=L;i++){a=vec2(P[i]%5,P[i]/5);b=i<L?vec2(P[i+1]%5,P[i+1]/5):vec2(4,4.5);if(i<L){if(a.y==b.y){y=int(a.y);if(y>0&&y<4)U&=~(1u<<(int(min(a.x,b.x))+4*y-4));}else{x=int(a.x);if(x>0&&x<4)Q&=~(1u<<(x-1+4*int(min(a.y,b.y))));}}q=uint(i*7+int(C)*131)*2654435769u;q^=q>>15;q*=2246822519u;e=abs(g-a);if(i>0&&i<L&&q>>29<2u)D=min(D,max(e.x*.866+e.y*.5,e.y)-.1);k=clamp((s-float(i))/length(b-a),0.,1.);e=g-a;b-=a;if(k>0.){d=min(d,length(e-b*clamp(dot(e,b)/dot(b,b),0.,k)));e-=Y;I=min(I,length(e-b*clamp(dot(e,b)/dot(b,b),0.,k)));}}d=min(d-.12,s>0.?length(g)-.3:9.);I=min(I-.12,s>0.?length(g-Y)-.3:9.);a=clamp(g,0.,4.);h=min(min(length(vec2(g.x-clamp(round(g.x),0.,4.),g.y-a.y)),length(vec2(g.x-a.x,g.y-clamp(round(g.y),0.,4.)))),length(vec2(g.x-4.,g.y-clamp(g.y,4.,4.5))))-.12;h=min(h,length(g)-.3);v=ivec2(floor(g));R=1u<<(v.x+4*v.y);for(i=0;i<16;i++)R|=(R&Q)<<1|R>>1&Q|(R&U)<<4|R>>4&U;q=uint(v.x+4*v.y+int(C)*57)*2654435769u;q^=q>>15;q*=2246822519u;e=abs(fract(g)-.5);G=all(greaterThanEqual(v,ivec2(0)))&&all(lessThan(v,ivec2(4)))&&q>>30<2u?length(max(e-.13,0.))-.07:9.;q=(R&1u)<<31^2147483648u;E=smoothstep(0.,.7,u)*smoothstep(9.,8.5,u);k=u>F?exp(-(u-F)*3.):0.;float H=fract(.55+C*.29);p-=w;vec3 c=mix(vec3(1,.84,.64),vec3(.42,.66,.88),smoothstep(-.1,.5,p.y));c=mix(c,vec3(1,.97,.93),.4*smoothstep(.5,1.,sin(p.x*3.+t*.03+sin(p.y*7.))*sin(p.y*9.+p.x-t*.02))*smoothstep(-.1,.3,p.y));p+=w*.3;c=mix(c,vec3(.56,.66,.74),smoothstep(A*.1,0.,p.y+.1-.05*sin(p.x*2.3+1.)-.03*sin(p.x*5.7)));p+=w*.25;c=mix(c,mix(vec3(.82,.3,.18),vec3(1,.66,.32),.5+.5*sin(p.x*47.+sin(p.y*31.)*3.)*sin(p.y*29.-p.x*13.)),smoothstep(A*.1,0.,p.y+.24-.06*sin(p.x*4.1+2.)-.035*sin(p.x*13.3)-.015*sin(p.x*41.)));p+=w*.2;c=mix(c,vec3(.5,.62,.28)*(.9+.1*sin(p.x*90.+p.y*20.)),smoothstep(A*.1,0.,p.y+.4-.01*sin(p.x*9.)));p+=w*.55;e=abs(p-vec2(.02,-.025)-w*.6)-.4;c*=1.-.45*smoothstep(.08,-.02,length(max(e,0.))-.03);e=vec2(abs(p.x-.2),p.y+.47);S=min(length(max(abs(e-vec2(0,.04))-vec2(.012,.05),0.)),length(max(abs(p-vec2(1.2,-.47))-vec2(1.,.012),0.)))-.004;c=mix(c,vec3(.12,.12,.14)+hsv(H-.05,.25,1.)*smoothstep(.05,0.,-.43-p.y+(p.x-.2)-(u-F)*.8)*step(F,u)*1.3*E,smoothstep(A*.1,0.,S));e=abs(p)-.4;S=length(max(e,0.))-.03;c=mix(c,vec3(.72,.72,.74)*(1.1-.3*smoothstep(-.5,.5,p.y)),smoothstep(A*.1,0.,S));vec3 W=hsv(H,.55,.38),B=hsv(H,.4,.58),K=hsv(H-.05,.18,1.)*(1.+2.*k);W=mix(W,B,smoothstep(A,0.,h)*E);W*=1.-.35*smoothstep(.25,-.05,I)*E*smoothstep(9.,8.4,u);W+=K*.25*exp(-max(d,0.)*4.)*E*(.4+k);W=mix(W,K,smoothstep(A,0.,d)*E*smoothstep(9.,8.4,u));W=mix(W,vec3(q>>31>0u?.96:.04)+K*k*.3*float(q>>31),smoothstep(A,0.,G)*E);W=mix(W,vec3(.06),smoothstep(A,0.,D)*E);c=mix(c,W,smoothstep(A*.1,-A*.1,S+.018));o=vec4(pow(c,vec3(.95)),1);`,
  },
  {
    titulo: 'Teseracto',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define J(A) A.xw*=rotate2D(T*.7);A.zw*=rotate2D(T*.43);A.xyz*=3./(4.-A.w);A.xz*=rotate2D(T*.2+m.x*3.);A.yz*=rotate2D(.45);A.xy*=1.8/(4.5-A.z);
vec2 p=(FC.xy*2.-r)/min(r.x,r.y),e,g;vec4 A,B;vec3 c=vec3(.02,.015,.04)*(1.-.4*dot(p,p)),C;float T,d,h,l,s;for(;s<4.;s++){T=t*.5-s*.035;for(int n=0;n<16;n++)for(int k=0;k<4;k++){if((n>>k&1)>0)continue;int q=n|1<<k;A=vec4(n&1,n>>1&1,n>>2&1,n>>3&1)*2.-1.;B=vec4(q&1,q>>1&1,q>>2&1,q>>3&1)*2.-1.;J(A)J(B)e=p-A.xy;g=B.xy-A.xy;h=clamp(dot(e,g)/dot(g,g),0.,1.);d=length(e-g*h);l=.5+mix(A.w,B.w,h)*.25;C=hsv(float(k)*.18+.5+.05*sin(t*.3),.7,1.)*(.25+l)*exp(-s*.9);c+=C*(smoothstep(.003+.003*l,0.,d)*(s>0.?.3:1.)+.0012/(d+.004));if(k==0)c+=C*(4e-5/(dot(e,e)+2e-5)+4e-5/(dot(p-B.xy,p-B.xy)+2e-5))*step(s,0.);}}o=vec4(tanh(c*1.2),1);`,
  },
  {
    titulo: 'Córdoba',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define S(q) C=mix(vec3(1,.62,.38),vec3(.2,.26,.52),smoothstep(-.2,.9,q.y));C+=vec3(1,.55,.45)*.18*smoothstep(.4,1.,sin(q.x*1.5+t*.03+sin(q.y*9.+q.x)*1.2)*sin(q.y*23.+q.x*2.))*smoothstep(.15,.5,q.y);l=length(q-vec2(.55,.26));C+=vec3(1,.7,.4)*(.015/(l+.01)+smoothstep(.08,.075,l));for(j=0.;j<4.;j++){x=q.x*(1.+j*.5)+t*.015*(j+1.)+j*7.;h=.14-j*.1+(.13-j*.02)*(.6*sin(x*1.3)+.3*sin(x*3.1+1.)+.15*sin(x*7.3+2.)+.05*sin(x*17.+j));C=mix(C,mix(vec3(.96,.62,.5),vec3(.28,.16,.26),j/3.)+vec3(1,.5,.3)*.25*smoothstep(-.04,0.,q.y-h)*(1.-j/4.),smoothstep(A,-A,q.y-h));}
vec2 p=(FC.xy*2.-r)/r.y,q,w;vec3 C;float A=1.5/r.y,L=-.28,j,x,h,l,z,k,i,s,d;if(p.y>L){S(p)}else{z=1./(L-p.y+.03);q=vec2(p.x+.006*sin(p.x*9.+z*2.-t*1.5)*(L-p.y)*4.,2.*L-p.y+.004*sin(z*6.-t*2.));S(q)C*=vec3(.62,.62,.78);C+=vec3(1,.75,.45)*exp(-abs(p.x-.55)*(30.-z*.3))*step(.5,sin(p.x*90.+z*9.-t*3.)*sin(z*23.+t*2.));}x=p.x+t*.08;h=-.68+.08*sin(x*1.1)+.1*sin(x*.53+1.)+.03*pow(max(sin(x*23.)*sin(x*7.1),0.),.5)+.006*sin(x*97.);C=mix(C,vec3(.07,.045,.07)+vec3(1,.45,.3)*.12*smoothstep(-.02,0.,p.y-h),smoothstep(A,-A,p.y-h));for(i=0.;i<2.;i++){s=1.-i*.45;w=(p-vec2(-.4+i*.7+.35*sin(t*.09+i*3.),.48-i*.14+.05*sin(t*.21+i)))*rotate2D(.15*sin(t*.17+i*2.))/s;k=abs(w.x);d=min(abs(w.y-(.1*k+4.*k*k*k)*(1.+.3*sin(t*.8+i*4.)))-.011*(1.-k/.15),length(w*vec2(1,2.5))-.014);C=mix(C,vec3(.05,.035,.05),smoothstep(A/s,-A/s,d)*step(k,.15));}C+=(fract(sin(dot(FC.xy,vec2(12.9,78.2))+t)*43758.5)-.5)*.03;o=vec4(pow(C*(1.-.25*dot(p*.5,p*.5)),vec3(1.1)),1);`,
  },
  {
    titulo: 'Solo hay guerra',
    autor: 'pieza propia · a partir de Warhammer 40.000',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin(x)*43758.5453)
vec2 p=(FC.xy*2.-r)/r.y,u,v,g;float i,j,k,l,s,h,b,X,Y,Z,P,A=2./r.y,m,e,n,a,T;vec3 c=mix(vec3(.85,.24,.06),vec3(.02,.005,.012),smoothstep(-.7,.9,p.y)),W;e=sin(p.x*2.+t*.07+sin(p.y*5.-t*.05)*1.5)*sin(p.y*7.+p.x*1.3+t*.04);c*=.75+.3*e;u=p-vec2(.55,.3);c+=vec3(1,.4,.12)*(.5*smoothstep(.16,.15,length(u))*(.7+.3*e)+.2*exp(-length(u)*3.));u=p-vec2(mod(t*.015+2.2,4.6)-2.,.52);s=abs(u.y)-.05*clamp(-u.x/.25,0.,1.);T=.05+.1*H(floor(u.x*28.))*step(u.x,-.3)+.14*step(abs(u.x+1.1),.07)+.06*step(abs(u.x+1.1),.2)+.2*max(0.,1.-abs(u.x+1.1)/.012);m=smoothstep(A,-A,max(max(-1.3-u.x,u.x),min(s,max(u.y-T,-u.y))));c=mix(c,vec3(.14,.05,.04)+vec3(.35,.1,.03)*smoothstep(.04,-.05,u.y)+vec3(1,.7,.4)*step(.975,H(floor(u.x*150.)+floor(u.y*150.)*7.3))*step(.5,fract(t*.3+H(floor(u.x*150.)))),m);v=u+vec2(1.32,0);c+=vec3(.4,.6,1)*1.6*exp(-v.y*v.y*2e3+v.x*2.)*smoothstep(0.,-.03,v.x)*(.9+.1*sin(t*30.));for(j=0.;j<4.;j++){a=.5*sin(t*(.2+j*.07)+j*2.);v=vec2(sin(a),cos(a));u=p-vec2(j*.9-1.35,-1.);l=dot(u,v);s=abs(dot(u,vec2(v.y,-v.x)));c+=vec3(.9,.85,.7)*.18*smoothstep(.015+l*.05,0.,s)*step(0.,l)*exp(-l*.5)*(.8+.2*e);}for(j=0.;j<5.;j++){n=t/3.+H(j*7.1+1.)*3.;k=fract(n);n=floor(n);v=normalize(vec2(.35,-1));u=p-vec2(H(n*3.1+j)*3.-1.7,1.3)-v*k*3.;l=dot(u,-v);s=abs(dot(u,vec2(v.y,-v.x)));c+=vec3(1,.45,.12)*smoothstep(.004+l*.02,0.,s)*step(0.,l)*max(0.,1.-l*1.8)*.9+vec3(1,.8,.5)*.0006/(dot(u,u)+.0004);}for(i=0.;i<5.;i++){Z=5.-i*.8;X=(p.x+t*(.01+.012*i))*Z+i*9.3;Y=(p.y+.25+i*.13)*Z;k=H(floor(X)*1.3+i*31.7);l=fract(X)-.5;b=.22+.18*H(k*7.);h=.2+1.8*k*k;P=abs(l)<b?h:h*.45;P=max(P,abs(l)<b*.5?h+.15:0.);P=max(P,h+.15+(.3+1.2*H(k*13.))*(1.-abs(l)/.06));P=max(P,h+.2-7.*abs(abs(l)-b));m=smoothstep(A*Z,-A*Z,Y-P);g=floor(vec2(l*14.,Y*6.));W=vec3(1,.5,.12)*step(abs(l),b-.03)*step(Y,h-.1)*step(.78,H(dot(g,vec2(7.1,13.7))+k*99.))*step(abs(fract(l*14.)-.5),.22)*step(fract(Y*6.),.55)*(.4+.15*i)*(.8+.2*sin(t*2.+g.y*3.+g.x));c=mix(c,mix(vec3(.55,.15,.06),vec3(.012,.006,.01),pow(i/4.,.6))+vec3(.5,.1,.02)*exp(-Y*2.)*(.4+.3*sin(t*1.3+X))+W,m);}for(j=0.;j<3.;j++){g=p*(5.+j*4.)+vec2(sin(t*.4+j*2.+p.y*2.)*.5,-t*(.6+j*.3));v=floor(g);k=H(dot(v,vec2(12.9,78.2))+j);u=fract(g)-.5-(vec2(H(k*3.),H(k*5.))-.5)*.6;c+=vec3(1,.4,.08)*step(.8,k)*smoothstep(.06,0.,length(u))*(.5+.5*sin(t*6.+k*40.));}c*=1.-.35*dot(p*.6,p*.6);c+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t)*9.)-.5)*.04;o=vec4(tanh(c*1.3),1);`,
  },
  {
    titulo: 'Pato',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin((x)*91.7)*43758.5)
#define Z(O,D) z=1e9;K=-1.;for(k=0.;k<8.;k++){C=k<1.?vec3(0):k<2.?vec3(.72,.85,0):k<3.?vec3(1.08,.7,0):k<5.?vec3(-.15,.22,(k-3.5)*1.24):k<6.?vec3(-.78,.28,0):vec3(1.,.95,(k-6.5)*.5);R=k<1.?vec3(1,.55,.7):k<2.?vec3(.42,.4,.38):k<3.?vec3(.2,.055,.15):k<5.?vec3(.55,.2,.1):k<6.?vec3(.45,.24,.4):vec3(.055,.065,.05);w=k<2.?0.:k<3.?.1:k<5.?.3:k<6.?.55:0.;Q=(O)-C;Q.xy*=rotate2D(-w);e=D;e.xy*=rotate2D(-w);if(length(cross(Q,e))<1.3*max(R.x,max(R.y,R.z))){A=-1e9;B=1e9;for(int i=0;i<20;i++){N=V[i]/R;a=dot(N,e);b=1.-dot(N,Q);if(a<0.){if(b/a>A){A=b/a;M=N;j=float(i);}}else if(b/a<B)B=b/a;}if(A<B&&A>0.&&A<z){z=A;G=M;K=k;W=w;Y=R;x=Q+e*A;n=j;}}}
#define F(D) N=normalize(G);N.xy*=rotate2D(W);g=1e9;for(int i=0;i<20;i++){E=V[i]/Y;l=(1.-dot(E,x))/length(E);if(l>1e-4)g=min(g,l);}C=K==2.?vec3(1,.45,.1):K>5.?vec3(.02):vec3(1,.78,.15);C*=.9+.2*H(n+K*7.);f=pow(.5+.5*dot(N,L),1.5);S=C*(mix(vec3(.4,.22,.3),vec3(1.2,1.08,.95),f)+vec3(.1,.15,.3)*(.5+.5*N.y))+vec3(.4,.6,1)*.3*pow(1.+dot(N,D),3.)+pow(max(dot(reflect(D,N),L),0.),30.)*(K>5.?1.2:.25);S*=1.+.15*smoothstep(P*z*1.5,0.,g);
vec2 p=(FC.xy*2.-r)/min(r.x,r.y),u;vec3 V[20],c,L=normalize(vec3(.5,.8,-.6)),O=vec3(0,.12,-4),D=normalize(vec3(p/2.2,1)),C,R,Q,e,N,M,G,x,Y,I,J,E,S,X,U;float T=t*.3,P=1./min(r.x,r.y)/1.1,k,a,b,w,W,f,g,l,z,A,B,K,n,j;for(int i=0;i<20;i++){a=i<1?0.:i>18?3.1416:float((i-1)/6+1)*.785;b=(float(i)+.5*float((i-1)/6))*1.047;V[i]=vec3(sin(a)*cos(b),cos(a),sin(a)*sin(b));}O.yz*=rotate2D(-.35);D.yz*=rotate2D(-.35);L.yz*=rotate2D(-.35);I=O;J=D;c=mix(vec3(.03,.04,.1),vec3(.35,.22,.38),exp(-max(J.y,0.)*5.));O.xz*=rotate2D(-T);D.xz*=rotate2D(-T);L.xz*=rotate2D(-T);O+=vec3(.15,.1-.03*sin(t*1.3),0);Z(O,D)if(K>=0.){F(D)c=S;}if(J.y<0.){l=(-.46-I.y)/J.y;if(l<z){X=I+J*l;a=length(X.xz);f=.04*sin(a*10.-t*2.)*exp(-a*.4);u=X.xz*1.6;n=H(dot(floor(u),vec2(1.7,9.3))+step(fract(u.x),fract(u.y))*.37);g=.08*smoothstep(12.,3.,l);U=reflect(J,normalize(vec3(X.x/a*f+g*sin(t*.9+n*6.28),1,X.z/a*f+g*cos(t*.7+n*9.))));c=mix(vec3(.02,.03,.08),mix(vec3(.03,.04,.1),vec3(.35,.22,.38),exp(-U.y*5.)),.25+.6*pow(1.+J.y,4.));c*=(.5+.5*smoothstep(.5,1.5,a))*(1.+.25*(n-.5)*smoothstep(12.,3.,l));X.xz*=rotate2D(-T);U.xz*=rotate2D(-T);X+=vec3(.15,.1-.03*sin(t*1.3),0);Z(X,U)if(K>=0.){F(U)c=mix(c,S*.5,.6);}for(k=0.;k<3.;k++){f=fract(t*.12+k/3.);c+=vec3(.4,.6,1)*.35*(1.-f)*smoothstep(0.,.1,f)*smoothstep(.012+P*l,0.,abs(a-1.1-f*2.6+.01*sin(atan(X.z,X.x)*9.+t)));}}}o=vec4(tanh(c*1.1),1);`,
  },
  {
    titulo: 'Inmiscibles',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin((x)*91.7)*43758.5)
#define F(U) q=U;for(i=1.;i<6.;i++)q+=vec2(sin(q.y*i*4.+t*.7+i),cos(q.x*i*2.7-t*.9+i*i))*.07*a/i*exp(-9.*q.y*q.y);d=q.y-.22*s*q.x+.02*sin(q.x*4.-t*1.3);for(j=0.;j<16.;j++){z=j<8.?-1.:1.;k=t*(z<0.?.11:.23)+H(j*1.7);n=floor(k);k=fract(k);x=(H(n*3.1+j)*2.-1.)*A*.9;v=q-vec2(x+.04*sin(k*7.+j),.22*s*x+z*(z<0.?.55:.3)*(.4+.6*H(n*7.3+j))*4.*k*(1.-k));R=(.025+.045*H(n*5.7+j))*smoothstep(0.,.1,k)*smoothstep(1.,.88,k);b=R-length(v*vec2(1,1.+.25*(1.-2.*k)*z));e=-z*d;h=max(.07-abs(e-b),0.)/.07;e=max(e,b)+h*h*.0175;d=-z*e;}
vec2 p=(FC.xy*2.-r)/r.y,q,v,g;float A=r.x/r.y,a=.8+.5*sin(t*.37),s=sin(t*.5),i,j,k,n,z,x,R,b,h,e,d,D,S,w;vec3 C,L,W;F(p)D=d;F((p+vec2(.003,0)))g.x=d-D;F((p+vec2(0,.003)))g.y=d-D;g/=.003;S=D/max(length(g),.1);w=1.5/r.y;g=normalize(g);L=mix(vec3(.7,.28,.03),vec3(1,.78,.32),smoothstep(-.3,1.,p.y));L+=vec3(1,.7,.3)*.18*smoothstep(.5,1.,sin(p.x*9.+sin(p.y*7.+t*.8)*1.5)*sin(p.y*8.+sin(p.x*5.-t*.6)*1.5));L*=.6+.4*smoothstep(0.,.1,S);W=mix(vec3(.004,.012,.04),vec3(.02,.1,.26),smoothstep(-1.,.3,p.y));W+=vec3(.9,.4,.08)*.3*exp(min(S,0.)*18.);C=mix(W,L,smoothstep(-w,w,S));C+=vec3(1,.95,.8)*pow(max(dot(-sign(S)*g,normalize(vec2(-.4,1))),0.),6.)*smoothstep(0.,.006,abs(S))*smoothstep(.03,.01,abs(S))*(S>0.?.5:.35);C+=vec3(1,.85,.55)*smoothstep(2.*w,0.,abs(S))*.5;C*=1.-.3*dot(p*.5,p*.5);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.03;o=vec4(tanh(C*1.2),1);`,
  },
  {
    titulo: 'Sacudida',
    autor: 'pieza propia · a partir de Inmiscibles',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin((x)*91.7)*43758.5)
#define F(U) q=U;X=q.x*G;E=X<M?exp(-(M-X)*.9):exp(-(M-X)*(M-X)*30.);for(i=1.;i<7.;i++)q+=vec2(sin(q.y*i*5.+t*1.9+i),cos(q.x*i*3.3-t*2.3+i*i))*.08*a*(1.+1.5*E)/i*exp(-4.*q.y*q.y);v=vec2(mod(X-t*.9,.6)-.3,q.y-s*q.x);q+=vec2(G,1)*(v*rotate2D(8.*E*exp(-dot(v,v)*60.)*smoothstep(.3,.2,abs(v.x)))-v);y=s*q.x+.14*a*(.5-abs(sin(q.x*2.2-t*2.6+s*3.)))+.03*sin(q.x*11.+t*6.);d=q.y-y;for(j=0.;j<24.;j++){z=j<12.?-1.:1.;k=t*(.35+.3*H(j*3.3))+H(j*1.7);n=floor(k);k=fract(k);x=(H(n*3.1+j)*2.-1.)*A*.95;c=(H(n*9.1+j)-.5)*.8;v=q-vec2(x+c*k,s*x+z*(.2+.8*H(n*7.3+j))*4.*k*(1.-k));R=(.012+.07*H(n*5.7+j)*H(n*2.3+j))*smoothstep(0.,.08,k)*smoothstep(1.,.85,k);b=R-length(v*vec2(1.+.4*abs(1.-2.*k),1.-.45*abs(1.-2.*k)));e=-z*d;h=max(.05-abs(e-b),0.)/.05;e=max(e,b)+h*h*.0125;d=-z*e;}
vec2 p=(FC.xy*2.-r)/r.y,q,v,g;float A=r.x/r.y,T=fract(t/6.),G=sign(sin(floor(t/6.)*9.1+.5)),M=-A-.3+T*(2.*A+.6)*2.5,P=exp(-pow((T-.2)*8.,2.)),a=.9+.4*sin(t*.61),s=.1*sin(t*.4),X,E,i,j,k,n,z,x,y,c,R,b,h,e,d,D,S,w;vec3 C,L,W;p+=(vec2(H(floor(t*40.)),H(floor(t*40.)+.5))-.5)*.03*P;F(p)D=d;F((p+vec2(.003,0)))g.x=d-D;F((p+vec2(0,.003)))g.y=d-D;g/=.003;S=D/max(length(g),.1);w=1.5/r.y;g=normalize(g);L=mix(vec3(1.2,.3,.02),vec3(.25,0,.02),smoothstep(0.,.9,S))+vec3(1,.75,.2)*.6*pow(max(sin(p.x*7.+sin(p.y*9.-t*3.)*2.)*sin(p.y*6.+sin(p.x*8.+t*2.5)*2.),0.),3.)*smoothstep(.02,.1,S);W=vec3(.006,.004,.012)+vec3(0,.35,.8)*.2*exp(min(S,0.)*5.)+vec3(1,.25,0)*.5*exp(min(S,0.)*25.);C=mix(W,L,smoothstep(-w,w,S));C+=vec3(1,.95,.8)*pow(max(dot(-sign(S)*g,normalize(vec2(-.4,1))),0.),6.)*smoothstep(0.,.006,abs(S))*smoothstep(.03,.01,abs(S))*(S>0.?.5:.6);C+=vec3(1,.85,.5)*smoothstep(2.*w,0.,abs(S))*(.6+P);C+=vec3(1,.5,.15)*.3*E*exp(-abs(S)*8.)+vec3(1,.3,.05)*.08*P;C*=1.-.4*dot(p*.5,p*.5);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.05;o=vec4(tanh(C*1.4),1);`,
  },
  {
    titulo: 'Remolino',
    autor: 'pieza propia · a partir de Yohei Nishitsuji',
    fuente: 'https://x.com/YoheiNishitsuji/status/1915756430084256054',
    fecha: '2026-09-26',
    codigo: String.raw`float i,e,R,s;vec3 q,p,d=vec3((FC.xy-r*.5)/r.y*.6,.1);for(q.zx--;i++<99.;){o.rgb+=hsv(.5+p.x*.07,.7,min(e*s,.4-e)/25.);s=2.;p=q+=d*e*R*.7;p=vec3(log2(R=length(p))+t*.4,exp2(.9-p.z/R),atan(p.y,p.x)*3.+log2(R)*1.5+t*.2);for(e=--p.y;s<5e2;s+=s)e+=(abs(dot(sin(p.zxy*s),cos(p.yzx*s)))-1.2)/s*.3;}`,
  },
  {
    titulo: 'Gravedad',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin((x)*91.7)*43758.5)
#define S(a) x=X;y=Y;u=U;v=V;b=a;for(k=0.;k<4.;k++){c=(v+sqrt(v*v+2.*g*y))/g;if(b<c)break;b-=c;x+=u*c;y=0.;v=(g*c-v)*.55;u*=.8;}x+=u*b;y=max(y+v*b-.5*g*b*b,0.);x=j-abs(mod(x+j,4.*j)-2.*j);
vec2 p=(FC.xy*2.-r)/r.y,q,w,P,Q;float A=r.x/r.y,j=A*.97,F=-.72,g=2.4,i,k,n,a,b,c,x,y,u,v,X,Y,U,V,d,e,s,l,z;vec3 C,K;z=p.y<F?.3:1.;q=vec2(p.x+.006*sin(p.y*90.+t*4.)*step(p.y,F),p.y<F?2.*F-p.y:p.y);C=vec3(.008,.01,.025)+vec3(.1,.2,.45)*.12*exp(-abs(p.y-F)*4.);for(i=0.;i<190.;i++){if(i<130.){l=2.6;a=t/l+H(i);n=floor(a);a=fract(a)*l;e=i+n*17.;b=a/.07;X=(mix(chispa[int(b)],chispa[int(b)+1],fract(b))*2.-1.)*A;Y=0.;c=.3*sin((t-a)*1.3)+(H(e+.2)-.5)*.45;b=1.8+.5*H(e+.3);U=b*sin(c);V=b*cos(c);s=smoothstep(l,l*.5,a);K=hsv(.52+.3*H(e+.4),.65*(1.-exp(-a*4.)),1.)*(1.+2.*exp(-a*3.));}else{a=t-clic.w;w=clic.xy;e=floor(clic.w*7.);if(a>3.5||a<0.){n=floor(t/3.);a=mod(t,3.);w=vec2(.2+.6*H(n*1.3),.45+.35*H(n*2.7));e=n*11.;}e+=i*3.1;c=H(e)*6.283;b=.3+1.4*H(e+.5)*H(e+.6);X=(w.x*2.-1.)*A;Y=max(w.y*2.-1.-F,0.);U=b*cos(c);V=b*sin(c)+.5;s=smoothstep(3.,1.,a)*smoothstep(0.,.15,a);K=hsv(.02+.1*H(e+.7),.8*(1.-exp(-a*5.)),1.)*(1.+1.5*exp(-a*4.));}S(a)P=vec2(x,y+F);if(length(q-P)>.3)continue;S(max(a-.025,0.))Q=vec2(x,y+F)-P;w=q-P;d=length(w-Q*clamp(dot(w,Q)/max(dot(Q,Q),1e-7),0.,1.));C+=K*s*z*(smoothstep(.006,.0015,d)+exp(-d*30.)*.14);}C+=vec3(.5,.8,1)*z*.012/(length((q-vec2((chispa[0]*2.-1.)*A,F))*vec2(1,2))+.01)+vec3(.4,.6,1)*.5*smoothstep(3./r.y,0.,abs(p.y-F));C*=1.-.25*dot(p*.4,p*.4);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.03;o=vec4(tanh(C*1.3),1);`,
  },
  {
    titulo: 'Hiperred',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define H(x) fract(sin(mod((x)*127.1,6.2832))*43758.5)
#define P4(A,Z,I,J,U) y=1.-2.*((J)+.5)/(U);z=2.4*(J)+(I)*1.3;v=M*vec4(((I)-2.)*s,sqrt(1.-y*y)*cos(z)*.5,y*.5,sqrt(1.-y*y)*sin(z)*.5);Z=2.6/(2.6-v.w);A=v.xy*Z*2.1/(3.-v.z*Z);
vec2 p=(FC.xy-r*.5)/min(r.x,r.y),P,Q,D;if(r.x<r.y)p=vec2(-p.y,p.x);vec4 v;float N[5]=float[](4.,6.,8.,6.,4.);float a=t*.21+hayMouse*(m.x-.5)*5.,b=t*.13+hayMouse*(m.y-.5)*4.,g=t*.09,s=.36,w=1.5/min(r.x,r.y),c=floor(t/6.),e=fract(t/6.),B=step(.6,e),u=B<1.?e/.6*4.6-.3:4.3-(e-.6)/.4*4.6,k,n,x,i,j,h,d,W,z,y,E,L,q,l,Za,Zb,R;mat4 M=mat4(cos(g),0,sin(g),0,0,1,0,0,-sin(g),0,cos(g),0,0,0,0,1)*mat4(cos(a),0,0,sin(a),0,1,0,0,0,0,1,0,-sin(a),0,0,cos(a))*mat4(1,0,0,0,0,cos(b),0,sin(b),0,0,1,0,0,-sin(b),0,cos(b));vec3 C=vec3(.01,.012,.02),K,F=mix(vec3(1,.85,.55),vec3(1,.25,.7),B);for(k=0.;k<4.;k++){n=N[int(k)];x=N[int(k)+1];for(i=0.;i<n;i++){P4(P,Za,k,i,n)E=H(k*13.+i*3.1+c*.7);for(j=0.;j<x;j++){P4(Q,Zb,k+1.,j,x)D=Q-P;h=clamp(dot(p-P,D)/(dot(D,D)+1e-6),0.,1.);d=length(p-P-D*h);L=mix(Za*Za,Zb*Zb,h);z=k*67.+i*9.+j;W=sin(6.2832*H(z)+(c+smoothstep(.6,1.,e))*(H(z+.5)-.5)*.8);K=W>0.?vec3(.2,.65,1):vec3(1,.4,.15);q=smoothstep(w,0.,d-.001*abs(W)*L);z=h-u+k;y=exp(-z*z*300.)*abs(W)*(B<1.?E:H(k*5.+j*11.+c*1.3));C+=L*(K*abs(W)*.22*q+mix(K,F,.6)*y*(q*3.+exp(-d*70.)*.5));}}}for(l=0.;l<5.;l++){n=N[int(l)];for(j=0.;j<n;j++){P4(P,Za,l,j,n)d=length(p-P);R=.02*Za;E=H(l*13.+j*3.1+c*.7);h=exp(-(u-l)*(u-l)*20.);z=B<1.?smoothstep(l-.15,l+.05,u):.35+.65*smoothstep(l-.05,l+.15,u);q=smoothstep(w,-w,d-R);C=C*(1.-.8*q)+q*(vec3(.02,.04,.07)+mix(vec3(.2,.5,1),vec3(1,.9,.7),E)*E*z*1.2)*Za+vec3(.4,.6,.9)*smoothstep(w,0.,abs(d-R))*.8*Za+F*h*exp(-max(d-R,0.)*35.)*.7;}}C*=1.-.3*dot(p,p);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.03;o=vec4(tanh(C*1.2),1);`,
  },
  {
    titulo: 'Cúmulos',
    autor: 'pieza propia · a partir de Caída infinita',
    fuente: null,
    fecha: '2026-09-27',
    codigo: String.raw`#define H(x) fract(sin((x)*91.7)*43758.5)
#define M(P) y=floor((P).y/14.);Y=vec2(H(y),H(y+.5))*14.;X=vec3((P).x+Y.x,(P).y,(P).z+Y.y);c=floor(X/14.);l=X-c*14.-7.;q=7.05-abs(l);w=min(q.x,min(q.y,q.z))+.3;k=H(dot(c,vec3(7.1,3.7,11.3)));J=(vec3(H(k+.1),H(k+.2),H(k+.3))-.5)*3.;l-=J;S=2.2+1.6*H(k+.7);if(k<.35||length(c.xz*14.+7.+J.xz-Y-vec2(.8,.5))<1.5+S*1.3)d=w;else{l.xz*=rotate2D(t*(k-.5)*.6+k*20.);l/=S;d=length(l*vec3(1,1.5,1))-.6;for(j=1.;j<7.;j++){e=length(l-(vec3(H(j+k*3.),H(j*1.3+k),H(j*1.7+k*5.))-.5)*vec3(1.6,.5,1.2))-.25-.25*H(j*2.1+k);h=max(.3-abs(d-e),0.);d=min(d,e)-h*h*.8;}d+=.05*sin(l.x*9.+t)*sin(l.y*9.+k*6.)*sin(l.z*9.-t);d=min(d*S*.8,w);}
vec2 p=(FC.xy*2.-r)/r.y,v=vec2(.004,-.004),Y;float i,j,d,e,z,k,w,h,s,u,a,b,g,y,S;vec3 O=vec3(.8+.3*sin(t*.7),-t*10.,.5+.3*cos(t*.53)),D=normalize(vec3(p.x,-1.3,p.y)),P,X,c,l,q,J,n,C,K;D.xz*=rotate2D(t*.25);D.xy*=rotate2D(.15*sin(t*.4));for(i=0.;i++<120.;){P=O+D*z;M(P)if(d<.001*z||z>140.)break;z+=d;}K=mix(vec3(.32,.66,1),vec3(.92,.98,1.08),pow(max(-D.y,0.),5.));C=K;if(d<.002*z){M((P+v.xyy))a=d;M((P+v.yyx))b=d;M((P+v.yxy))g=d;M((P+v.xxx))n=normalize(v.xyy*a+v.yyx*b+v.yxy*g+v.xxx*d);M((P+n*.6))g=clamp(d/.6,0.,1.);M(P)u=sin(l.x*6.+t*1.3+sin(l.y*5.+t))*sin(l.y*7.-t+sin(l.z*6.))*sin(l.z*6.+t*.9+sin(l.x*4.));h=fract(atan(l.z,l.x)/6.283+u*.5+t*.6);s=smoothstep(.45+.35*u,.75+.2*u,1.-abs(dot(n,D)));C=mix(K,mix(vec3(.75,.85,1.1),vec3(1.8),.5+.5*dot(n,normalize(-D+vec3(.3,.5,0))))*(.75+.25*g)*(1.-s)+hsv(h,1.,1.)*s*1.8,exp(-z*.014));}C*=1.-.25*dot(p*.5,p*.5);o=vec4(tanh(C*1.1),1);`,
  },
  {
    titulo: 'Erebo',
    autor: 'pieza propia · a partir de Hades II (Supergiant Games)',
    fuente: 'https://www.supergiantgames.com/games/hades-ii/',
    fecha: '2026-09-27',
    codigo: String.raw`#define H(x) fract(sin((x)*91.7)*43758.5)
#define N(v) (i=floor(v),g=fract(v),g*=g*(3.-2.*g),mix(mix(H(i.x+i.y*57.),H(i.x+i.y*57.+1.),g.x),mix(H(i.x+i.y*57.+57.),H(i.x+i.y*57.+58.),g.x),g.y))
#define Y(P) q=(P)-M;c=mix(vec3(.03,.08,.13),vec3(.32,.62,.64),exp(-length(q)*1.5))+vec3(.85,1,.95)*smoothstep(.14,.125,length(q))+vec3(.4,.2,.5)*.12*smoothstep(0.,-1.,(P).y);for(j=0.;j<3.;j++){s=1.3-j*.4;x=(P).x*s+j*3.7+D*(j+1.);k=floor(x);f=x-k-.5;h=H(k+j*13.);y=(P).y*s;f-=(h-.5)*.5+.05*sin(y*3.+k)+.025*sin(y*8.+k*2.);w=(.035+.02*h)*(1.+1.5*smoothstep(-.3,-.75,y))*(1.-.35*clamp(y,0.,1.));n=floor(y*3.+h*5.);e=f*(mod(n,2.)*2.-1.);l=.15+.2*H(n+k);d=min(abs(f)-w,max(max(max(abs(y-(n+.3-h*5.)/3.-e*.8)*.7-.024*(1.-e/l)*(1.-e/l),-e),e-l),-.25-y))/s+step(h,.25+.3*step(1.5,j))*9.;K=mix(vec3(.14,.32,.34),vec3(.015,.045,.06),j*.5)*(.85+.3*N(vec2(f*30.,y*4.)));K=mix(K,vec3(.5,.85,.8)*(.4+.3*j),smoothstep(.2,.8,f*sign(M.x-(P).x)/w)*step(abs(f),w)*exp(-length(q)*.6));c=mix(c,K,smoothstep(.006,-.006,d));if(j<1.5)c=mix(c,vec3(.2,.42,.45),(.35-.1*j)*smoothstep(.2,-.6,(P).y)*(.5+.5*N(vec2((P).x*1.5-t*.04*(j+1.),(P).y*5.+j*3.))));if(j==1.){e=(P).x+D*2.5;l=-.5+.07*sin(e*1.3+1.)+.04*N(vec2(e*3.,1.));c=mix(c,mix(vec3(.05,.08,.11),vec3(.1,.06,.14),N(vec2(e*2.,(P).y*6.)))+vec3(.2,.38,.38)*.5*exp(-length(vec2((P).x-M.x*.6,((P).y+.62)*3.))*1.6),smoothstep(.006,-.006,(P).y-l));U=vec2(e*6.,(P).y*7.);G=floor(U);h=H(G.x+G.y*57.);U=(fract(U)-.5-(vec2(H(h*3.),H(h*7.))-.5)*.5)*rotate2D(.3*sin(t*.8+h*9.));n=length(U);f=.2*(.45+.55*abs(cos(3.*atan(U.y,U.x)+h*3.)));h=step(.62,h)*step((P).y,l-.04);c=mix(c,mix(vec3(1,.7,.2),vec3(1,.97,.75),smoothstep(f*.7,0.,n)),smoothstep(f+.02,f-.02,n)*h);c+=vec3(1,.75,.3)*.15*W*exp(-n*5.)*h;}}q=(P)-M;c+=vec3(.35,.6,.55)*.2*smoothstep(.45,.9,N(vec2(atan(q.x,-q.y)*10.,t*.08)))*exp(-length(q)*.7)*step(q.y,0.);e=(P).x+D*3.5;l=1.1-.3*abs((P).x)+.08*sin(e*2.+1.)+.1*N(vec2(e*5.,(P).y*3.))+.06*N(vec2(e*20.,(P).y*20.));c=mix(c,vec3(.01,.035,.05),smoothstep(-.006,.006,(P).y-l));l=-.9+.06*N(vec2(e*4.,3.))+.1*pow(abs(sin(e*13.+sin(e*5.)*2.+.1*sin(t))),8.);c=mix(c,vec3(.01,.025,.035),smoothstep(.006,-.006,(P).y-l));
vec2 p=(FC.xy*2.-r)/r.y,i,g,q,u,v,z,G,U,M=vec2(.3*min(1.,r.x/r.y),.42);float j,s,x,k,f,h,y,w,n,e,l,d,A=.8+(N(p*1.2)-.5)*1.2,B,E,T=r.x/r.y,D=.03*t+hayMouse*(m.x-.5)*.2,W=1.+2.*exp(-(t-clic.w)*2.);vec3 c,K,C;u=p*rotate2D(A);z=p+.006*(vec2(N(u*vec2(5,80)),N(u*vec2(5,80)+7.))-.5);Y(z)C=c;v=u/vec2(.05,.017);v.x+=.5*mod(floor(v.y),2.);z=floor(v);B=H(z.x*1.7+z.y*57.3);v=fract(v)-.5;z=((z+.5-vec2(.5*mod(z.y,2.),0)+(vec2(H(B*3.),H(B*5.))-.5)*.3)*vec2(.05,.017))*rotate2D(-A);Y(z)E=smoothstep(0.,.1,.42-length(v+(vec2(H(B*9.),H(B*11.))-.5)*.2)-.15*(N(vec2(v.x*4.,v.y*9.)+B*20.)-.5));C=mix(C,c*(.9+.2*B)*(.9+.2*N(vec2(v.x*3.,v.y*25.)+B*40.)),E*.85);C*=.93+.14*N(FC.xy*.4);for(j=0.;j<2.;j++){z=p*(5.+j*4.)+vec2(sin(t*.3+p.y*2.+j*3.)*.5+D*(4.+j*4.),-t*(.2+j*.15));v=floor(z);B=H(v.x+v.y*57.+j*7.);z=fract(z)-.5-(vec2(H(B*3.),H(B*5.))-.5)*.6;C+=mix(vec3(.4,1,.85),vec3(1,.8,.35),step(.6,H(B*13.)))*step(.85,B)*(.5+.5*sin(t*2.+B*50.))*W*.7*exp(-length(z)*(14.+j*4.));}C+=vec3(.5,.9,.8)*.5*exp(-length(p-(clic.xy*2.-1.)*vec2(T,1))*5.)*exp(-(t-clic.w)*1.5);C*=1.-.3*dot(p*.45,p*.45);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.03;o=vec4(tanh(C*1.2),1);`,
  },
];
