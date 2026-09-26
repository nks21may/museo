#define ZOOM 1.
#define CENTRO vec2(0)
#define SENS 5.
#define SUAVE 2.5
#define RELLENO .06
#define TINTA vec3(.86,.03,.02)
#define LLUVIA .6
float S=max(r.y/140.,1.5),T=floor(t*10.),a=0.,w=.7/S;vec2 c=floor(FC.xy/S),g=FC.xy/S-c-.5;vec3 H=fract(sin(vec3(dot(c,vec2(127.1,311.7)),dot(c,vec2(269.5,183.3)),dot(c,vec2(419.2,371.9))))*43758.5453);float K=fract(sin(dot(c,vec2(41.3,289.1))+T*1.37)*43758.5),F[3];for(int k=0;k<3;k++){vec2 p=((c+.5)*S+vec2(k==1,k==2)*S*1.5+2.*sin(t*.7+c.yx*.05))/r;F[k]=dot(foto((p-.5)/ZOOM+.5+CENTRO,SUAVE).rgb,vec3(.3,.59,.11));}vec2 G=vec2(F[1]-F[0],F[2]-F[0])*SENS,d=normalize(G+vec2(cos(H.y*6.3),sin(H.y*6.3))*1e-3);d=rotate2D(H.y-.5)*vec2(-d.y,d.x);float e=smoothstep(.12,.7,length(G)),u=dot(g,d),v=dot(g,vec2(-d.y,d.x)),l=.3+.55*H.z;a=min(step(H.x,e*.95)+step(H.x,smoothstep(.45,.1,F[0])*RELLENO)+step(.995,fract(H.x*17.)),1.)*step(.1,K)*step(abs(u),l)*smoothstep(w+.08,w,abs(v));vec2 Q=mat2(.9,-.44,.44,.9)*FC.xy/S;float h=fract(sin(floor(Q.x/2.)*91.7)*43758.5),y=fract(Q.y/70.+t*(.5+h)+h*9.);a+=LLUVIA*step(.72,h)*step(abs(fract(Q.x/2.)-.5),.35/S)*step(y,.1)*step(.35,fract(Q.y*.7));o=vec4(TINTA*a*(.55+.6*fract(H.z*9.)),1);
