#define ZOOM 1.
#define CENTRO vec2(0)
#define PIXEL 3.
#define CONTRASTE 1.4
#define BORDE .22
#define TINTA vec3(.93,.9,.85)
#define ACENTO vec3(1,.1,.06)
float px=max(PIXEL,floor(r.y/300.)),T=floor(t*12.);vec2 P=floor(FC.xy/px),u=((P+.5)*px/r-.5)/ZOOM+.5+CENTRO,e=vec2(px*2./r.x,0);float L=dot(foto(u,1.).rgb,vec3(.3,.59,.11));L=clamp((L-.5)*CONTRASTE+.5,0.,1.);float n=fract(52.9829*fract(dot(P+T*vec2(5.3,1.7),vec2(.0671,.0058)))),E=length(foto(u+e,2.).rgb-foto(u-e,2.).rgb)+length(foto(u+e.yx,2.).rgb-foto(u-e.yx,2.).rgb),k=step(.97,fract(sin(P.y*.1+floor(t*3.))*43758.5));o=vec4(mix(TINTA*step(n,L),ACENTO,step(BORDE,E)*step(.45,n))*(1.-.6*k*step(.5,fract(P.x*.05+t))),1);
