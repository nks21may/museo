#define ZOOM 1.
#define CENTRO vec2(0)
#define HORIZONTE 1.
#define UMBRAL .25
#define SAT 1.2
#define BRILLO .5
#define VIENTO .003
#define POLEN .8
vec2 u=(FC.xy/r-.5)/ZOOM+.5+CENTRO,v,P,I;vec3 Z,C,B,Y=vec3(.3,.59,.11);float s=0.,m,w,g,L,h;for(int k=0;k<6;k++){h=float(k)*1.047;Z=foto(u+.012/ZOOM*vec2(cos(h),sin(h)),1.).rgb;s+=max(Z.r,max(Z.g,Z.b))-min(Z.r,min(Z.g,Z.b));}m=smoothstep(UMBRAL,UMBRAL+.2,s/6.)*smoothstep(HORIZONTE+.02,HORIZONTE-.04,u.y);v=u+VIENTO/ZOOM*m*vec2(sin(u.y*50.+u.x*20.+t*1.7)+.5*sin(u.x*90.-t*2.3),.5*cos(u.x*40.+t*1.3));C=foto(v).rgb;B=foto(v,4.).rgb+foto(v,5.5).rgb;B=max(mix(vec3(dot(B,Y)),B,2.),0.)*.5;w=.5+.5*sin(u.x*7.+u.y*3.-t*.8+2.*sin(u.y*11.+t*.3));g=m*(.35*(.5+.5*sin(t*1.5+dot(C,vec3(4,-3,6))))+.9*w*w*w);L=dot(C,Y);C=mix(vec3(L),C,1.+SAT*g)*(1.+.35*g)+BRILLO*(.25+g)*m*B*B;P=FC.xy/r.y*18.+vec2(sin(t*.3)*2.,-t*.6);I=floor(P);h=fract(sin(dot(I,vec2(127.1,311.7)))*43758.5);P=fract(P)-.5-(vec2(h,fract(h*17.))-.5)*.6;C+=POLEN*vec3(1,.9,.6)*step(.85,h)*smoothstep(.06,0.,length(P))*(.5+.5*sin(t*4.+h*60.))*smoothstep(HORIZONTE+.1,HORIZONTE-.2,u.y);o=vec4(clamp(C,0.,1.),1);
