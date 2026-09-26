#define ZOOM 1.
#define CENTRO vec2(0)
#define CELDA 90.
#define TINTA vec3(.86,.03,.02)
#define GIRO .02
float S=max(r.y/CELDA,3.),A=.5+t*GIRO;vec2 q=rotate2D(A)*FC.xy/S,c=floor(q)+.5,g=q-c;vec2 p=rotate2D(-A)*c*S/r;float L=dot(foto((p-.5)/ZOOM+.5+CENTRO,1.5).rgb,vec3(.3,.59,.11)),R=.72*sqrt(L)*(.9+.1*sin(t*1.3+c.x*.3+c.y*.2)),b=smoothstep(R,R-1.2/S,length(g));o=vec4(TINTA*b,1);
