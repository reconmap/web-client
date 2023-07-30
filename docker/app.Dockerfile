FROM reconmap/web-client:dev AS builder

ARG RECONMAP_APP_GIT_COMMIT_HASH
ENV VITE_GIT_COMMIT_HASH=${RECONMAP_APP_GIT_COMMIT_HASH}

COPY --chown=reconmapper:reconmapper index.html vite.config.js tsconfig.json package.json yarn.lock .yarnrc.yml ./
COPY --chown=reconmapper:reconmapper public ./public
COPY --chown=reconmapper:reconmapper src ./src

RUN yarn install && yarn run build

FROM nginx:stable

RUN chown -R nginx:nginx /usr/share/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/

COPY --from=builder --chown=nginx:nginx /home/reconmapper/build /usr/share/nginx/html

EXPOSE 5500

USER nginx
CMD ["nginx", "-g", "daemon off;"]
