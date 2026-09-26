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
    codigo: String.raw`vec2 p=(FC.xy*2.-r)/r.y;float e=.12+.07*sin(t*.13),l,i,h,a,A,k,u,s;vec3 P=vec3(0,sin(e),-cos(e))*15.,V=normalize(vec3(p,1.7)),Q,c,x,v,n,g;V.yz=rotate2D(e)*V.yz;V.xz=rotate2D(.3*sin(t*.07))*V.xz;h=dot(cross(P,V),cross(P,V));for(;i++<100.;){l=length(P);if(l<1.){A=1.;break;}k=.08*l;Q=P;V-=1.5*h*P/pow(l,5.)*k;P+=V*k;if(Q.y*P.y<0.){x=mix(Q,P,Q.y/(Q.y-P.y));u=length(x.xz);a=atan(x.z,x.x)-t*4./pow(u,1.5);s=.5+.5*sin(u*6.+sin(a*3.+u*2.)*1.5)*sin(a*7.-u*4.);v=vec3(-x.z,0,x.x)/u;a=smoothstep(2.6,3.4,u)*smoothstep(10.,5.,u);c+=(1.-A)*a*mix(vec3(1,.3,.06),vec3(1,.85,.6),smoothstep(8.,3.,u))*(.25+s)*pow(1.+.6*dot(v,-normalize(V)),3.)*14./u/u;A+=(1.-A)*a*.92;}if(l>40.&&dot(P,V)>0.)break;}n=normalize(V);g=n*90.;k=fract(sin(dot(floor(g),vec3(12.9,78.2,37.7)))*43758.5);c+=(1.-A)*(vec3(.8,.9,1)*step(.93,k)*smoothstep(.3,0.,length(fract(g)-.5))*(k-.93)*14.+exp(-abs(n.y+.25*n.x+.1*sin(n.z*6.))*7.)*vec3(.25,.18,.35)*(.5+.5*sin(n.x*20.+n.z*13.)*sin(n.y*31.))+.04*vec3(.3,.5,1)*smoothstep(.97,1.,cos(atan(n.z,n.x)*24.))+.04*vec3(.3,.5,1)*smoothstep(.97,1.,cos(asin(n.y)*24.)));o=vec4(tanh(c*1.2),1);`,
  },
{
    titulo: 'Fractales oceánicos',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.8)),p,c,q=vec3(.3,.2,t*.06);float i,j,z=.1,a,l,s,f=1.;d.xz*=rotate2D(.4*sin(t*.04));d.yz*=rotate2D(.15+.1*sin(t*.07));for(;i++<40.;z+=.07){p=q+z*d;p=abs(1.-mod(p,2.));a=l=0.;for(j=0.;j++<12.;l=s){p=abs(p)/dot(p,p)-.53-.02*sin(t*.2+z);s=length(p);a+=abs(s-l);}a=pow(a*.065,5.);c+=f*a*.03*mix(vec3(.3,1,.85),vec3(.05,.25,1),z*.4);c+=f*vec3(0,.02,.06)*.12;f*=.86;}c+=vec3(.2,.6,.8)*pow(max(0.,d.y+.2),3.)*(.06+.06*sin(d.x*20.+t*.5+sin(d.x*7.-t*.3)*2.));o=vec4(tanh(c),1);`,
  },
  {
    titulo: 'Caleidoscopio',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`vec2 p=(FC.xy*2.-r)/r.y,q,b;float l=length(p),n=.5236,a=abs(mod(atan(p.y,p.x)+t*.04,2.*n)-n),i,k,d,s,e;q=vec2(cos(a),sin(a))*l;vec3 c=hsv(.75+.1*sin(a*9.+l*4.-t*.2),.8,.12)*(1.+.3*sin(l*60.-t)),g;for(;i++<30.;){k=fract(sin(i*91.7)*43758.5);e=n*(.5+.9*sin(t*.09*(1.+fract(k*7.))+i));b=(.1+.8*(.5+.5*sin(t*.07*(1.+k)+i*1.7)))*vec2(cos(e),sin(e));g=hsv(fract(k*3.1+t*.01),.75,1.);s=.05+.12*fract(k*13.);d=length(rotate2D(i+t*.1*(k-.5))*(q-b)*vec2(1,1.+3.*step(.6,k)))-s;c=mix(c,c*.25+g*(.5+.8*smoothstep(-s,0.,d)),smoothstep(.006,0.,d)*.75);c*=1.-.5*smoothstep(.012,0.,abs(d));}c*=smoothstep(.98,.9,l);o=vec4(pow(c,vec3(.9)),1);`,
  },
  {
    titulo: 'Jardín múltiple',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.4)),P=vec3(0,0,t*1.5),q,a,x,n,w,c,F,G;float i,e,z,s,k,g=floor(t/9.),A=(g+smoothstep(5.,9.,mod(t,9.)))*1.5708,H=.07+g*.19;d.xy*=rotate2D(A);d.xz*=rotate2D(.35*sin(t*.11));d.yz*=rotate2D(.25*sin(t*.07));for(;i++<99.;){q=mod(P+d*z,6.)-3.;a=abs(q)-1.5;e=length(max(a,0.))+min(max(a.x,max(a.y,a.z)),0.);s=1.;for(k=0.;k++<4.;){a=abs(1.-3.*abs(mod(q*s/1.5,2.)-1.));s*=3.;e=max(e,(min(max(a.x,a.y),min(max(a.y,a.z),max(a.z,a.x)))-1.)*1.5/s);}a=abs(q);e=min(e,min(max(a.x,a.y),min(max(a.y,a.z),max(a.z,a.x)))-.18);if(e<.001*z||z>70.)break;z+=e;}x=P+d*z;w=abs(normalize(cross(dFdx(x),dFdy(x))));w=step(w.yzx,w)*step(w.zxy,w);n=-w*sign(d);G=mod(g,2.)<1.?vec3(0,1,0):vec3(1,0,0);c=mix(vec3(1,.98,.95)*(.85+.15*w.z),hsv(H,.7,1.),dot(w,G))*(.72+.38*dot(n,normalize(vec3(.4,.8,.5))))*(1.-i/170.);F=hsv(H+.06,.28,1.);c=mix(c,F,z>70.?1.:1.-exp(-z*.045));o=vec4(c*(1.-.15*dot(FC.xy/r-.5,FC.xy/r-.5)),1);`,
  },
  {
    titulo: 'Juego de la vida',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define B(c) uvec2(c<32?1u<<(c):0u,c>31?1u<<((c)-32):0u)
float s=r.y/36.,T=t*6.,N=floor(T),P=32.,C=floor(N/P),n=N-C*P,e=fract(T),K=floor(clic.w*6.)-C*P,A,L,G,d,i,F;int X=int(mod(floor((FC.x-r.x*.5)/s)+32.,64.)),Y=min(int(FC.y/s),35),x0=clamp(int(mod(floor((clic.x-.5)*r.x/s)+32.,64.)),1,62),y0=min(int(clic.y*r.y/s),35);highp uint H=0u;highp uvec2 g[36],a,b,h,p,x,q,v,w,z,u,M,J,R,S,Z,D;for(int y=0;y<36;y++){u=uvec2(y*2,y*2+1)*1013u+uint(C)*7919u;for(int j=0;j<2;j++){u=u*747796405u+2891336453u;u=((u>>((u>>28)+4u))^u)*277803737u;u^=u>>22;b=j==0?u:b&u;}g[y]=b;}for(int k=0;k<32;k++){if(float(k)==K){a=B(x0);for(int y=0;y<36;y++)g[y]|=y==(y0+1)%36?a|B(x0+1):y==y0?a|B(x0-1):y==(y0+35)%36?a:uvec2(0);}for(int y=0;y<36;y++)w=y==Y?g[y]:w;H=H<<1|(X<32?w.x:w.y)>>(X&31)&1u;if(float(k)>=n)break;x=g[35];q=x<<1|x.yx>>31;u=x>>1|x.yx<<31;v=q^u;a=v^x;b=q&u|v&x;x=g[0];q=x<<1|x.yx>>31;u=x>>1|x.yx<<31;h=q^u;p=q&u;R=Z=h^x;S=D=p|h&x;for(int y=0;y<36;y++){x=g[(y+1)%36];q=x<<1|x.yx>>31;u=x>>1|x.yx<<31;v=q^u;w=q&u;M=y==35?Z:v^x;J=y==35?D:w|v&x;x=a^h;z=a&h|M&x;q=b^p;u=J^z;g[y]=(q^u)&~(b&p|J&z)&(x^M|g[y]);a=R;b=S;h=v;p=w;R=M;S=J;}}for(i=0.;i<8.;i++){if((H>>int(i)&1u)==0u)break;L++;}for(i=1.;i<9.;i++)G=max(G,float(H>>int(i)&1u)*exp(-(i-1.+e)*.45));F=smoothstep(0.,1.5,n+e)*smoothstep(P,P-2.,n+e);A=mix(float(H>>1&1u),float(H&1u),smoothstep(0.,.3,e))*F;G*=F*(1.-A);vec2 l=fract(vec2((FC.x-r.x*.5)/s,FC.y/s))-.5;d=length(max(abs(l)-.28,0.))-.12;vec3 E=hsv(.11+.38*smoothstep(1.,6.,L),.7,1.),c=vec3(.015,.018,.03)+vec3(.03,.035,.06)*step(.46,max(abs(l.x),abs(l.y)));c+=vec3(.25,.12,.6)*G*.6*smoothstep(.02,-.02,d+.1);c=mix(c,E*(1.15-.5*length(l)),A*smoothstep(.02,-.02,d));c+=E*A*.3*exp(-max(d,0.)*30.);o=vec4(pow(c,vec3(.9)),1);`,
  },
  {
    titulo: 'Pasillos',
    autor: 'pieza propia',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define X(a) (length(max(a,0.))+min(max(a.x,max(a.y,a.z)),0.))
#define M(U) p=U-floor((U.x+U.z)/32.)*vec3(16,-3,16);g=p.y+.3*clamp(ceil((p.x-4.)/.6),0.,10.);e=min(-min(min(X((abs(p-vec3(0,1.5,0))-vec3(2.5,1.5,10.5))),X((abs(p-vec3(8,0,8))-vec3(10.5,3,2.5)))),X((abs(p-vec3(16,-1.5,16))-vec3(2.5,1.5,10.5)))),g);c=p.x>8.?p-vec3(16,-3,16):p;c=vec3(abs(c.x),c.y,c.z-2.2*clamp(round(c.z/2.2),-2.,2.));k=min(min(X((abs(c-vec3(1.8,.75,0))-vec3(.6,.03,.8))),X((abs(c-vec3(2.2,.37,.4))-vec3(.25,.37,.3)))),X((abs(c-vec3(2.2,1.05,0))-vec3(.03,.25,.4))));m=k<e?2.:0.;e=min(e,k);
vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.3)),P,p,c,x,n,C=vec3(.93),y;float T=t*6.,s=mod(T,32.),i,z,e,g,k,m,A=1.5708*(smoothstep(6.,10.,s)-smoothstep(22.,26.,s));P=s<8.?vec3(0,0,s):s<24.?vec3(s-8.,-3.*clamp((s-12.3)/6.,0.,1.),8):vec3(16,-3,s-16.);P.y+=1.6+.05*abs(sin(T*1.9635));d.yz*=rotate2D(-.06-.2*smoothstep(10.,12.,s)*(1.-smoothstep(16.,19.,s)));d.xy*=rotate2D(.02*sin(T*.9817));d.xz*=rotate2D(A);for(;i++<120.;){x=P+d*z;M(x)if(e<.001*z||z>60.)break;z+=e*.8;}x=P+d*z;n=normalize(cross(dFdx(x),dFdy(x)));n=faceforward(n,d,n);y=abs(n);n=sign(n)*step(y.yzx,y)*step(y.zxy,y);y=vec3(0);M(x)if(m>1.)C=c.y>.8?vec3(.06):c.x>1.95&&c.y<.72?vec3(1,.5,.15):vec3(.95);else if(p.x>4.&&p.x<10.2&&abs(p.z-8.)<2.45&&g<.32)C=g>.02?vec3(.35):mix(vec3(.95),vec3(1.6,.12,.06),step(.75,fract((p.x-4.)/.6)));else if(n.y>.5)C=vec3(.72,.74,.78);else if(n.y<-.5)y=vec3(3,2.9,2.7)*step(fract((p.x+p.z)/3.),.3)*step(min(min(abs(p.x),abs(p.z-8.)),abs(p.x-16.)),.4);else if(n.z<-.5&&abs(p.x)<2.5||n.x<-.5&&abs(p.z-8.)<2.5)C=abs(n.z<-.5?p.x:p.z-8.)<.7&&g<2.2?vec3(1.6,.12,.06):C;else if(n.x<-.5){C=vec3(.3);y=step(.9,g)*step(g,2.6)*step(.05,fract(p.z/1.6))*mix(vec3(1),vec3(.45,.7,1),(g-.9)/1.7)*2.;}else if(abs(n.z)>.5)C=abs(p.y+.3*clamp((p.x-4.)/.6,0.,10.)-1.)<.06?vec3(1.6,.12,.06):vec3(1,.62,.3);C*=vec3(.75,.8,.9)*(.75+.25*n.y)+vec3(1,.95,.85)*.7*max(dot(n,normalize(vec3(.5,.8,.2))),0.);M((x+n*.3))C=C*(.5+.5*clamp(e/.3,0.,1.))*(1.-i/240.)+y;C=z>60.?vec3(.95,.97,1):mix(C,vec3(.95,.97,1),1.-exp(-z*.03));o=vec4(pow(tanh(C*1.5),vec3(.85)),1);`,
  },
  {
    titulo: 'Testigo',
    autor: 'pieza propia · a partir de The Witness',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define N z=(z^z>>15)*2654435769u+1013904223u
vec2 p=(FC.xy-.5*r)/min(r.x,r.y),g=p/.14,a,b,e;float C=floor(t/9.),u=mod(t,9.),A=1./(.14*min(r.x,r.y)),s=max(u-1.,0.)*3.6,d=9.,D=9.,h,k,F,E,G,S;highp uint z=uint(C)*2654435769u+99u,V,R,Q=30583u,U=4095u,q;int P[26],x,y,n,i,j,l,L;ivec2 v;for(i=0;i<int(mod(C,4.));i++)g=vec2(-g.y,g.x);g.x*=mod(C,8.)<4.?1.:-1.;g+=2.;for(j=0;j<40;j++){x=y=L=0;V=1u;P[0]=0;for(i=0;i<24;i++){if(x+y==8)break;N;n=int(z>>30);for(l=0;l<4;l++){v=ivec2(x,y)+ivec2((n+l)%4==0?1:(n+l)%4==2?-1:0,(n+l)%4==1?1:(n+l)%4==3?-1:0);if(v.x>=0&&v.x<5&&v.y>=0&&v.y<5&&(V>>(v.x+5*v.y)&1u)==0u){x=v.x;y=v.y;V|=1u<<(x+5*y);P[++L]=x+5*y;break;}}if(l>3)break;}if(x+y==8&&L>9&&L<21)break;}S=float(L)+.5;F=1.+S/3.6;for(i=0;i<=L;i++){a=vec2(P[i]%5,P[i]/5);b=i<L?vec2(P[i+1]%5,P[i+1]/5):vec2(4,4.5);if(i<L){if(a.y==b.y){y=int(a.y);if(y>0&&y<4)U&=~(1u<<(int(min(a.x,b.x))+4*y-4));}else{x=int(a.x);if(x>0&&x<4)Q&=~(1u<<(x-1+4*int(min(a.y,b.y))));}}q=uint(i*7+int(C)*131)*2654435769u;q^=q>>15;q*=2246822519u;e=abs(g-a);if(i>0&&i<L&&q>>29<2u)D=min(D,max(e.x*.866+e.y*.5,e.y)-.1);k=clamp((s-float(i))/length(b-a),0.,1.);e=g-a;b-=a;if(k>0.)d=min(d,length(e-b*clamp(dot(e,b)/dot(b,b),0.,k)));}d=min(d-.12,s>0.?length(g)-.3:9.);a=clamp(g,0.,4.);h=min(min(length(vec2(g.x-clamp(round(g.x),0.,4.),g.y-a.y)),length(vec2(g.x-a.x,g.y-clamp(round(g.y),0.,4.)))),length(vec2(g.x-4.,g.y-clamp(g.y,4.,4.5))))-.12;h=min(h,length(g)-.3);v=ivec2(floor(g));R=1u<<(v.x+4*v.y);for(i=0;i<16;i++)R|=(R&Q)<<1|R>>1&Q|(R&U)<<4|R>>4&U;q=uint(v.x+4*v.y+int(C)*57)*2654435769u;q^=q>>15;q*=2246822519u;e=abs(fract(g)-.5);G=all(greaterThanEqual(v,ivec2(0)))&&all(lessThan(v,ivec2(4)))&&q>>30<2u?length(max(e-.13,0.))-.07:9.;q=(R&1u)<<31^2147483648u;E=smoothstep(0.,.7,u)*smoothstep(9.,8.5,u);k=u>F?exp(-(u-F)*3.):0.;float H=fract(.55+C*.29);vec3 c=mix(vec3(1,.84,.64),vec3(.42,.66,.88),smoothstep(-.1,.5,p.y));c=mix(c,vec3(1,.97,.93),.4*smoothstep(.5,1.,sin(p.x*3.+t*.03+sin(p.y*7.))*sin(p.y*9.+p.x-t*.02))*smoothstep(-.1,.3,p.y));c=mix(c,vec3(.56,.66,.74),smoothstep(A*.1,0.,p.y+.1-.05*sin(p.x*2.3+1.)-.03*sin(p.x*5.7)));c=mix(c,mix(vec3(.82,.3,.18),vec3(1,.66,.32),.5+.5*sin(p.x*47.+sin(p.y*31.)*3.)*sin(p.y*29.-p.x*13.)),smoothstep(A*.1,0.,p.y+.24-.06*sin(p.x*4.1+2.)-.035*sin(p.x*13.3)-.015*sin(p.x*41.)));c=mix(c,vec3(.5,.62,.28)*(.9+.1*sin(p.x*90.+p.y*20.)),smoothstep(A*.1,0.,p.y+.4-.01*sin(p.x*9.)));e=abs(p-vec2(.02,-.025))-.4;c*=1.-.45*smoothstep(.08,-.02,length(max(e,0.))-.03);e=vec2(abs(p.x-.2),p.y+.47);S=min(length(max(abs(e-vec2(0,.04))-vec2(.012,.05),0.)),length(max(abs(p-vec2(1.2,-.47))-vec2(1.,.012),0.)))-.004;c=mix(c,vec3(.12,.12,.14)+hsv(H-.05,.25,1.)*smoothstep(.05,0.,-.43-p.y+(p.x-.2)-(u-F)*.8)*step(F,u)*1.3*E,smoothstep(A*.1,0.,S));e=abs(p)-.4;S=length(max(e,0.))-.03;c=mix(c,vec3(.72,.72,.74)*(1.1-.3*smoothstep(-.5,.5,p.y)),smoothstep(A*.1,0.,S));vec3 W=hsv(H,.55,.38),B=hsv(H,.4,.58),K=hsv(H-.05,.18,1.)*(1.+2.*k);W=mix(W,B,smoothstep(A,0.,h)*E);W+=K*.25*exp(-max(d,0.)*4.)*E*(.4+k);W=mix(W,K,smoothstep(A,0.,d)*E*smoothstep(9.,8.4,u));W=mix(W,vec3(q>>31>0u?.96:.04)+K*k*.3*float(q>>31),smoothstep(A,0.,G)*E);W=mix(W,vec3(.06),smoothstep(A,0.,D)*E);c=mix(c,W,smoothstep(A*.1,-A*.1,S+.018));o=vec4(pow(c,vec3(.95)),1);`,
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
    titulo: 'Línea de montaje',
    autor: 'pieza propia · a partir de Satisfactory',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define X(a) (length(max(a,0.))+min(max(a.x,max(a.y,a.z)),0.))
#define M(U) p=U;k=floor(p.x/8.);s=mod(k,2.)*2.-1.;q=vec3(mod(p.x,8.)-4.,p.yz);c=vec3(p.x,p.y-4.5,mod(p.z,40.)-20.);e=p.y;m=0.;a=min(min(min(X((abs(q-vec3(0,1.2,0))-vec3(.7,.06,1e3))),X((abs(vec3(abs(q.x)-.75,q.y-1.3,0))-vec3(.06,.12,1e3)))),X((abs(vec3(q.x,q.y-.6,mod(q.z,6.)-3.))-vec3(.12,.6,.12)))),min(min(X((abs(c)-vec3(1e3,.06,.7))),X((abs(vec3(c.x,c.y-.1,abs(c.z)-.75))-vec3(1e3,.12,.06)))),X((abs(vec3(mod(p.x+4.,8.)-4.,p.y-2.25,c.z))-vec3(.15,2.25,.15)))));if(a<e){e=a;m=1.;}a=min(X((abs(vec3(q.x,q.y-1.42,mod(q.z-s*t*1.5,1.5)-.75))-vec3(.26,.12,.26))),X((abs(vec3(mod(p.x-t*1.5,1.5)-.75,c.y-.2,c.z))-vec3(.26,.12,.26))))-.03;if(a<e){e=a;m=2.;}a=X((abs(vec3(q.x,q.y-2.,mod(q.z+k*11.,30.)-15.))-vec3(1.8,2.,3.)))-.1;if(a<e){e=a;m=3.;}
#define Y(D) mix(vec3(1,.7,.48),vec3(.3,.42,.8),smoothstep(-.05,.35,D.y))
vec3 d=normalize(vec3((FC.xy*2.-r)/r.y,1.6)),P=vec3(1.5*sin(t*.11),7.+.6*sin(t*.17),t*2.5),p,q,c,x,n,C,E,L=normalize(vec3(-.6,.55,.5)),S;vec2 H=vec2(.005,-.005);float z,e,a,k,s,m,i,h,A=1.,j=.05;d.yz*=rotate2D(-.3);d.xz*=rotate2D(.25*sin(t*.07));for(;i++<100.;){x=P+d*z;M(x)if(e<.001*z||z>90.)break;z+=e*.9;}x=P+d*z;M((x+H.xyy))n=H.xyy*e;M((x+H.yyx))n+=H.yyx*e;M((x+H.yxy))n+=H.yxy*e;M((x+H.xxx))n+=H.xxx*e;n=normalize(n);M(x)if(m<1.){S=vec3(abs(fract(p.xz/8.)-.5),0);C=vec3(.55,.56,.58)*(.9+.1*fract(sin(dot(floor(p.xz/8.),vec2(12.9,78.2)))*43758.5))*(1.-.4*step(.485,max(S.x,S.y)));S.xy=abs(fract(p.xz/2.)-.5);C*=1.-.1*step(.47,max(S.x,S.y));C=mix(C,vec3(1,.65,.1),step(abs(abs(q.x)-1.4),.06));}else if(m<2.){C=vec3(.45,.47,.5);if(n.y>.5&&(abs(p.y-1.26)<.02&&abs(q.x)<.7||abs(p.y-4.56)<.02&&abs(c.z)<.7))C=vec3(.1)*(.8+.5*step(.5,fract(p.y>3.?(p.x-t*1.5)*3.:(q.z-s*t*1.5)*3.)));}else if(m<3.){h=fract(sin(p.y>3.?floor((p.x-t*1.5)/1.5):floor((q.z-s*t*1.5)/1.5)+k*37.)*43758.5);C=h<.4?vec3(.62,.66,.72):hsv(.03+.15*(h-.4),.8,1.);}else{S=vec3(q.x,p.y-2.,mod(p.z+k*11.,30.)-15.);C=(S.y>.5?vec3(1,.45,.1):vec3(.26,.27,.3))*(1.-.35*step(.88,fract(S.y*1.5)));E=vec3(.3,.8,1.)*step(abs(S.y+.8),.35)*step(abs(S.z),2.)*step(.5,abs(n.x))*(.8+.4*sin(t*4.+k+S.z));}for(i=0.;i++<40.;){M((x+n*.02+L*j))A=min(A,8.*e/j);j+=clamp(e,.05,1.);if(e<.001||j>25.)break;}A=clamp(A,0.,1.);C=C*(vec3(.35,.4,.58)*(.6+.4*n.y)+vec3(1.3,1.05,.8)*max(dot(n,L),0.)*A)+E+step(1.5,m)*pow(max(dot(reflect(d,n),L),0.),24.)*A*.6;S=Y(d);a=dot(d,normalize(vec3(-.55,.18,1)));S=mix(S,vec3(.85,.82,.95)*(.9+.1*sin(d.y*90.+d.x*20.))*(.35+.75*smoothstep(.1,-.12,d.x+.475)),.55*smoothstep(.993,.9934,a));S=mix(S,vec3(.3,.32,.46),.85*smoothstep(.002,0.,abs(atan(d.x,d.z)-.42)-.012*(1.-d.y))*smoothstep(-.03,.03,d.y));C=z>90.?S:mix(C,S,1.-exp(-max(z-12.,0.)*.04));o=vec4(pow(tanh(C*1.1),vec3(.9)),1);`,
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
    titulo: 'Ruta de neón',
    autor: 'pieza propia · a partir de Euro Truck Simulator 2',
    fuente: null,
    fecha: '2026-09-26',
    codigo: String.raw`#define R(d) (9.*sin((d)*.011)+5.*sin((d)*.027+1.))
#define K(z) (R(V+(z))-R(V)-(z)*(R(V+.5)-R(V-.5)))
#define L(d,w,F) (clamp(1.-(abs(d)-(w))/(F),0.,1.)*min(1.,2.*(w)/(F))+.25*exp(-abs(d)*4.))
vec2 p=(FC.xy*2.-r)/r.y,w=p+vec2(0,.005*sin(t*11.)*sin(t*1.7)),q,v;vec3 P=vec3(1,.15,.55),Q=vec3(.1,.75,1),c,C;float A=r.x/r.y,e=2./r.y,y=.12,f=1.4,H=2.3,V=t*22.,g=R(V+.5)-R(V-.5),z,u,D,a,b,s,l,h,i,j,k,x,d,n,Z,X,Y,E;s=w.y-y;x=w.x+g*f;c=mix(vec3(1,.3,.42),vec3(.03,.01,.1),pow(clamp(s*1.5,0.,1.),.45));v=floor(vec2(x,w.y)*80.);c+=step(.994,fract(sin(dot(v,vec2(12.9,78.2)))*43758.5))*smoothstep(.15,.6,s)*(.5+.5*sin(t*3.+v.x));q=vec2(x-.3,s-.22);l=length(q);c=mix(c,mix(vec3(1,.15,.5),vec3(1,.85,.3),smoothstep(-.3,.3,q.y)),smoothstep(.3,.295,l)*step(clamp(.08-q.y*1.2,0.,.8),fract(q.y*16.-t*.4)));c+=vec3(1,.3,.5)*.3*exp(-max(l-.3,0.)*5.);h=y+.015+.08*abs(sin(x*1.9))*abs(sin(x*.7+1.))+.04*abs(sin(x*4.7+2.))+.01*sin(x*17.);c=mix(c,vec3(.07,.01,.12)+P*.15*smoothstep(-.1,0.,w.y-h),smoothstep(e,-e,w.y-h));c+=P*smoothstep(2.*e,0.,abs(w.y-h))*.9;z=f*H/max(y-w.y,1e-4);u=w.x*z/f+1.9-K(z);D=V+z;a=fwidth(u);b=fwidth(D);if(w.y<y){n=exp(-z*.007);k=smoothstep(8.,8.5,abs(u));C=vec3(.02,.012,.04)*(1.3-.3*k)+vec3(1,.3,.45)*.2*exp(-(y-w.y)*5.)+vec3(1,.35,.6)*.5*exp(-abs(x-.3)*5.)*exp(-(y-w.y)*2.5)*(1.-k);C+=k*P*.6*(L((fract(u/6.+.5)-.5)*6.,.04,a)+L((fract(D/6.)-.5)*6.,.04,b))*n;C+=(Q*L(abs(u)-7.6,.12,a)+P*L(abs(u)-.25,.08,a)+vec3(1,.7,.95)*L(length(vec2(abs(u)-3.8,max(abs(mod(D+3.3,12.)-6.)-2.7,0.))),.08,a))*n*1.4;c=mix(vec3(.6,.15,.4),C,n);}c+=P*.4*exp(-abs(w.y-y)*80.);for(i=0.;i<3.;i++){z=230.-mod(t*38.+i*81.,230.);s=f/z;X=(K(z)-3.8-3.8*mod(i,2.))*s;n=exp(-z*.006)*smoothstep(2.,10.,z);for(j=-1.;j<2.;j+=2.){v=w-vec2(X+j*.8*s,y+(.7-H)*s);l=length(v);c+=vec3(.75,.9,1)*n*(smoothstep(.2*s,.05*s,l)*2.+.4*exp(-l/(.8*s))+.3*exp(-abs(v.x)/(.25*s))*step(v.y,-.7*s)*exp((v.y+.7*s)/(4.*s)));}}Z=40.+14.*sin(t*.21);for(i=16.;i>0.;i--){z=25.*i-mod(V,25.);if(z<Z&&k<2.){k=2.;s=f/Z;X=K(Z)*s;q=w-vec2(X,y+(2.3-H)*s);v=abs(q)-vec2(1.25,2.)*s;d=length(max(v,0.))+min(max(v.x,v.y),0.);n=exp(-Z*.006);c=mix(c,vec3(.03,.01,.05),smoothstep(e,-e,d));c+=(Q*(smoothstep(1.5*e,0.,abs(d))+.3*exp(-abs(d)/(.3*s)))+P*.8*smoothstep(e,0.,abs(q.y+s)-.06*s)*step(d,0.))*n;for(j=-1.;j<2.;j+=2.){v=w-vec2(X+j*s,y+(.9-H)*s);l=length(v);c+=vec3(1,.1,.2)*n*(smoothstep(.15*s,.05*s,l)*2.+.5*exp(-l/(.5*s))+.4*exp(-abs(v.x)/(.2*s))*step(v.y,-.9*s)*exp((v.y+.9*s)/(3.*s)));}}s=f/z;n=exp(-z*.006);for(j=-1.;j<2.;j+=2.){X=(K(z)-1.9+j*10.)*s;h=(K(z)-1.9+j*7.)*s;Y=y-H*s;E=y+(9.-H)*s;C=j>0.?Q:P;d=length(vec2(max(abs(w.x-X)-.12*s,0.),max(max(Y-w.y,w.y-E),0.)));d=min(d,length(vec2(max(abs(w.x-(X+h)*.5)-abs(X-h)*.5,0.),w.y-E))-.06*s);c=mix(c,mix(vec3(.6,.15,.4),C*1.3,n),smoothstep(e,0.,d));c+=C*.25*n*exp(-d/(.6*s));l=length(w-vec2(h,E-.2*s));c+=vec3(1,.85,.95)*n*(smoothstep(.3*s,.1*s,l)+.4*exp(-l/(1.5*s)));}}d=min(min(p.x+A-.05-.115*(p.y+.58),A-.05-.115*(p.y+.58)-p.x),.9-.04*p.x*p.x-p.y);c=mix(c,vec3(.015,.01,.025),smoothstep(e,-e,d));c+=Q*(.5*smoothstep(2.*e,0.,abs(d))+.1*exp(-abs(d)*40.));k=min(1.,A*.6);for(j=-1.;j<2.;j+=2.){q=(p-vec2(j>0.?A-.26*k:.3*k-A,.05))/k;v=abs(q)-(j>0.?vec2(.07,.14):vec2(.1,.19));d=(length(max(v,0.))+min(max(v.x,v.y),0.)-.02)*k;c=mix(c,mix(vec3(.12,.02,.15),vec3(.8,.2,.45),smoothstep(-.1,.2,q.y))*.6+vec3(.8,.9,1)*exp(-length(q-vec2(.02*sin(t*.3),-.03))*30.)*.6,smoothstep(e,-e,d));c+=Q*(smoothstep(2.*e,0.,abs(d))+.2*exp(-abs(d)*40.));}d=p.y+.58+.07*p.x*p.x;c=mix(c,vec3(.025,.015,.04)*(1.+.8*smoothstep(-.3,0.,d)),smoothstep(e,-e,d));c+=Q*(smoothstep(2.*e,0.,abs(d))*.9+.15*exp(-abs(d)*40.));for(i=0.;i<2.;i++){q=p-vec2(-.78+i*.46,-.82);l=length(q);v=q*rotate2D(1.2-2.*(.5+.25*sin(t*(.3+i*.4)+i)));h=length(vec2(v.x,v.y-clamp(v.y,0.,.085)));c+=((i>0.?P:Q)*smoothstep(2.*e,0.,abs(l-.1))*(step(-.05,q.y)+.3)+vec3(1,.55,.2)*smoothstep(2.*e,0.,h))*step(d,0.);}q=p-vec2(.3,-.78);v=abs(q)-vec2(.2,.11);h=max(v.x,v.y);c=mix(c,vec3(.01,.02,.05)+P*smoothstep(2.*e,0.,abs(q.y-.05*sin(q.x*14.+V*.03)))+vec3(1,.9,.6)*smoothstep(.016,.01,length(q-vec2(0,.05*sin(V*.03)))),smoothstep(e,-e,h));c+=Q*.8*smoothstep(2.*e,0.,abs(h));q=(p-vec2(-.55,-1.18))*rotate2D(K(30.)*.12);l=length(q);d=min(min(abs(l-.56)-.045,l-.13),min(max(abs(q.y)-.035,l-.56),max(max(abs(q.x)-.045,q.y),l-.56)));c=mix(c,vec3(.02,.012,.03)*(1.+smoothstep(-.2,.5,q.y)),smoothstep(e,-e,d));c+=P*(smoothstep(2.*e,0.,abs(l-.605))*.9*smoothstep(-.2,.3,q.y)+.08*exp(-abs(l-.605)*30.))+Q*.7*smoothstep(2.*e,0.,abs(l-.07));c*=1.-.3*dot(p*.4,p*.4);c+=(fract(sin(dot(FC.xy,vec2(12.9,78.2))+t)*43758.5)-.5)*.03;o=vec4(tanh(c*1.2),1);`,
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
#define F(U) q=U;for(i=1.;i<7.;i++)q+=vec2(sin(q.y*i*5.+t*1.9+i),cos(q.x*i*3.3-t*2.3+i*i))*.08*a/i*exp(-4.*q.y*q.y);y=s*q.x+.14*a*(.5-abs(sin(q.x*2.2-t*2.6+s*3.)))+.03*sin(q.x*11.+t*6.);d=q.y-y;for(j=0.;j<24.;j++){z=j<12.?-1.:1.;k=t*(.35+.3*H(j*3.3))+H(j*1.7);n=floor(k);k=fract(k);x=(H(n*3.1+j)*2.-1.)*A*.95;c=(H(n*9.1+j)-.5)*.8;v=q-vec2(x+c*k,s*x+z*(.2+.8*H(n*7.3+j))*4.*k*(1.-k));R=(.012+.07*H(n*5.7+j)*H(n*2.3+j))*smoothstep(0.,.08,k)*smoothstep(1.,.85,k);b=R-length(v*vec2(1.+.4*abs(1.-2.*k),1.-.45*abs(1.-2.*k)));e=-z*d;h=max(.05-abs(e-b),0.)/.05;e=max(e,b)+h*h*.0125;d=-z*e;}
vec2 p=(FC.xy*2.-r)/r.y,q,v,g;float A=r.x/r.y,T=fract(t/2.3),P=smoothstep(0.,.03,T)*pow(1.-T,4.),a=.9+.5*sin(t*.61)+1.6*P,s=.4*sin(t*.9)+.25*sin(t*2.1+1.)+.35*P*sign(sin(floor(t/2.3)*9.1+.5)),i,j,k,n,z,x,y,c,R,b,h,e,d,D,S,w;vec3 C,L,W;p+=(vec2(H(floor(t*40.)),H(floor(t*40.)+.5))-.5)*.05*P;F(p)D=d;F((p+vec2(.003,0)))g.x=d-D;F((p+vec2(0,.003)))g.y=d-D;g/=.003;S=D/max(length(g),.1);w=1.5/r.y;g=normalize(g);L=mix(vec3(1.2,.3,.02),vec3(.25,0,.02),smoothstep(0.,.9,S))+vec3(1,.75,.2)*.6*pow(max(sin(p.x*7.+sin(p.y*9.-t*3.)*2.)*sin(p.y*6.+sin(p.x*8.+t*2.5)*2.),0.),3.)*smoothstep(.02,.1,S);W=vec3(.006,.004,.012)+vec3(0,.35,.8)*.2*exp(min(S,0.)*5.)+vec3(1,.25,0)*.5*exp(min(S,0.)*25.);C=mix(W,L,smoothstep(-w,w,S));C+=vec3(1,.95,.8)*pow(max(dot(-sign(S)*g,normalize(vec2(-.4,1))),0.),6.)*smoothstep(0.,.006,abs(S))*smoothstep(.03,.01,abs(S))*(S>0.?.5:.6);C+=vec3(1,.85,.5)*smoothstep(2.*w,0.,abs(S))*(.6+P);C+=vec3(1,.3,.05)*.15*P;C*=1.-.4*dot(p*.5,p*.5);C+=(H(dot(FC.xy,vec2(12.9,78.2))+fract(t))-.5)*.05;o=vec4(tanh(C*1.4),1);`,
  },
];
