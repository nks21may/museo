#define ZOOM 1.
#define CENTRO vec2(0)
#define SAT .22
#define HORIZONTE 1.
#define SUAVE 2.
#define SENS 6.
#define CAMPO .3
#define TINTA vec3(.93,.9,.85)
#define ACENTO vec3(.86,.03,.02)
#define LLUVIA .5
float S=max(r.y/140.,1.5),T=floor(t*10.),w=.7/S,s=0.,F[3];vec2 c=floor(FC.xy/S),g=FC.xy/S-c-.5,U=((c+.5)*S/r-.5)/ZOOM+.5+CENTRO;vec3 H=fract(sin(vec3(dot(c,vec2(127.1,311.7)),dot(c,vec2(269.5,183.3)),dot(c,vec2(419.2,371.9))))*43758.5453),Z;float K=fract(sin(dot(c,vec2(41.3,289.1))+T*1.37)*43758.5);for(int k=0;k<3;k++){vec2 p=((c+.5)*S+vec2(k==1,k==2)*S*1.5+2.*sin(t*.7+c.yx*.05))/r;F[k]=dot(foto((p-.5)/ZOOM+.5+CENTRO,SUAVE).rgb,vec3(.3,.59,.11));}for(int k=0;k<8;k++){float q=float(k)*.785+H.y*6.3;Z=foto(U+S*2.5/r/ZOOM*vec2(cos(q),sin(q))*fract(float(k)*.618+.3),1.5).rgb;s+=max(Z.r,max(Z.g,Z.b))-min(Z.r,min(Z.g,Z.b));}s/=8.;float M=smoothstep(SAT,SAT*.6,s)*step(U.y,HORIZONTE)*step(0.,margen(U));vec2 G=vec2(F[1]-F[0],F[2]-F[0])*SENS,d=normalize(G+vec2(cos(H.y*6.3),sin(H.y*6.3))*1e-3);float e=smoothstep(.12,.7,length(G));d=e>.3?rotate2D(H.y-.5)*vec2(-d.y,d.x):rotate2D(.7+(H.y-.5)*.4)*vec2(1,0);float u=dot(g,d),v=dot(g,vec2(-d.y,d.x)),l=.3+.55*H.z,A=step(.1,K)*step(abs(u),l)*smoothstep(w+.08,w,abs(v)),B=A*(1.-M)*step(H.x,e*CAMPO);A*=M*step(H.x,max(e,.45+.5*F[0]));float R=exp(-pow(dot(U,vec2(1,.5))-fract(t*.08)*3.+.5,2.)*40.);vec2 Q=mat2(.9,-.44,.44,.9)*FC.xy/S;float h=fract(sin(floor(Q.x/2.)*91.7)*43758.5),y=fract(Q.y/70.+t*(.5+h)+h*9.);B+=LLUVIA*step(.72,h)*step(abs(fract(Q.x/2.)-.5),.35/S)*step(y,.1)*step(.35,fract(Q.y*.7));o=vec4(TINTA*A*(.5+.8*F[0]+.8*R)*(.7+.4*fract(H.z*9.))+ACENTO*B*(.55+.6*fract(H.z*9.)),1);
