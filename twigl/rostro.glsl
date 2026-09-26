#define H(p) (fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453)*.99+.005)
float px=max(3.,floor(r.y/160.)),T=floor(t*10.);
vec2 P=floor(FC.xy/px),u=(P*px-.5*r)/r.y;
float h=H(P+T*.37),C=H(vec2(P.x,floor(t*3.))),G=H(vec2(floor(P.y/2.),T));
vec2 q=u+vec2(G>.985?.08:0.,step(.85,C)*(C-.92)*1.5);
float k=smoothstep(-.05,.35,q.x+.08*sin(q.y*9.+t));
q.x-=k*fract(H(P)+t*.2)*.35;
vec2 n=q*vec2(1.2,.95)/.3,A=vec2(abs(q.x),q.y);
float e=length(n)-1.,z=sqrt(max(0.,-e*(2.+e))),
L=clamp(dot(normalize(vec3(n,z)),normalize(vec3(-.6,.5,.7))),0.,1.);
L*=smoothstep(.02,.08,length(A-vec2(.1,.04)))*smoothstep(.01,.05,length((q-vec2(0,-.15))*vec2(1,3)));
float F=step(e,0.)*(L*.9+.03)+exp(-abs(e)*25.)*.45
+step(abs(q.x),.09)*step(q.y,-.2)*.25+step(q.y,-.38-q.x*q.x)*.2;
F*=1.-k*.75;
float R=step(.93,C)*step(fract(P.y*.03+t*2.+C*9.),.12)+step(.985,G)*.4;
vec3 c=mix(vec3(.93,.9,.85)*step(h,F),vec3(1,.1,.06),step(h,R*.9));
o=vec4(c,1);
