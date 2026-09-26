# El museo es estático: la imagen es un nginx con los archivos adentro y nada más.
#
# nginx-unprivileged y no el nginx oficial: corre como usuario sin privilegios
# y escucha en 8080, así que el contenedor no necesita root ni capabilities
# para bindear un puerto bajo. El compose lo monta read-only encima de eso.
FROM nginxinc/nginx-unprivileged:1.29-alpine

# Lista blanca y no un COPY . con .dockerignore: lo que no está nombrado acá no
# se publica. .git/, .claude/, .impeccable/, herramientas/, twigl/ (el banco de
# pruebas) y los .md de diseño quedan afuera aunque alguien se olvide de
# ignorarlos. Los PNG ni siquiera llegan al contexto: ver .dockerignore.
COPY --chown=root:root index.html museo.css museo.js shaders.js /usr/share/nginx/html/
COPY --chown=root:root fuentes /usr/share/nginx/html/fuentes
COPY --chown=root:root obras /usr/share/nginx/html/obras

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
