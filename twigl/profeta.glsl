#define H(p) (fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453)*.99+.005)
float px=max(3.,floor(r.y/150.)),T=floor(t*12.),k=1.;
vec2 P=floor(FC.xy/px),u=(P*px-.5*r)/r.y;
float h=H(P+T*.37),g=H(P*1.7-T*.11),y=u.y;
if(y<-.32){u.y=-.64-u.y;u.x+=.012*sin(P.y*.9+t*4.);k=.3;}
u+=(vec2(h,g)-.5)*(.006+.05*smoothstep(.1,.45,u.y));
float w=.035+.11*pow(clamp(-u.y/.32,0.,1.),1.6),
D=min(max(abs(u.x)-w,abs(u.y+.12)-.2),length(u-vec2(0,.12))-.045),
F=exp(-abs(D)*70.)+step(D,0.)*.1;
vec2 v=u-vec2(0,.4);
float l=length(v),a=atan(v.y,v.x),
S=pow(.5+.5*sin(a*3.-log(l)*9.+t*1.5),12.)*smoothstep(.42,.06,l)*smoothstep(.02,.08,l);
vec3 c=mix(vec3(.93,.9,.85)*step(h,F*.95),vec3(1,.1,.06),step(g,S*.6));
c+=step(.99,H(P))*(.4+.4*sin(t*3.+P.x));
c+=.3*step(abs(y+.32),px/r.y)*step(h,.4);
o=vec4(c*k,1);
