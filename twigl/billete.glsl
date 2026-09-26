#define H(p) (fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453)*.99+.005)
float px=max(3.,floor(r.y/150.)),T=floor(t*12.);
vec2 P=floor(FC.xy/px),u=(P*px-.5*r)/r.y;
float h=H(P+T*.37),
e=.62*cos(t*.3)+.06*sin(u.y*23.+t*2.)+.05*H(floor(P/3.)),
d=max(u.x-e,0.),I=step(d,0.);
vec2 q=d>0.?u-vec2(.5,.9)*d*(.4+H(P)):u;
float B=max(abs(q.x)-.5,abs(q.y)-.22),
O=length((q-vec2(-.12,0))*vec2(1,1.35))-.14,
M=min(length(q-vec2(-.12,.03))-.05,max(abs(q.x+.12)-.07+q.y*.4,abs(q.y+.09)-.05)),
N=step(B,0.)*(.05+.1*step(.85,sin((q.x+q.y)*90.))
+.9*exp(-abs(B)*300.)+.6*exp(-abs(B+.035)*400.)
+.8*exp(-abs(O)*250.)+.75*step(M,0.)*step(O,0.)
+.7*exp(-abs(length(abs(q)-vec2(.38,.13))-.04)*300.));
N*=I+(1.-I)*.5*exp(-d*3.);
float E=exp(-abs(u.x-e)*60.)*step(abs(u.y),.24);
vec3 c=mix(vec3(.93,.9,.85)*step(h,N),vec3(1,.1,.06),step(h,E*.8));
c+=step(.991,H(P))*.35;
o=vec4(c,1);
