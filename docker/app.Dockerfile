FROM reconmap/web-client:dev AS builder

ARG RECONMAP_APP_GIT_COMMIT_HASH
ENV REACT_APP_GIT_COMMIT_HASH=${RECONMAP_APP_GIT_COMMIT_HASH}

COPY jsconfig.json package.json package-lock.json ./
COPY public ./public
COPY src ./src

RUN npm install && npm run build

FROM nginx:stable

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/

COPY --from=builder --chown=nginx:nginx /home/node/reconmap/build /usr/share/nginx/html

EXPOSE 80

USER nginx
CMD ["nginx", "-g", "daemon off;"]
