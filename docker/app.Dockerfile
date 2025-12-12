FROM reconmap/web-client:dev AS builder

ARG RECONMAP_APP_GIT_COMMIT_HASH
ENV VITE_GIT_COMMIT_HASH=${RECONMAP_APP_GIT_COMMIT_HASH}

COPY --chown=reconmapper:reconmapper package.json package-lock.json ./
COPY --chown=reconmapper:reconmapper packages ./packages

RUN npm install && \
    npm run build -w @reconmap/app

FROM nginx:stable

LABEL org.opencontainers.image.source=https://github.com/reconmap/reconmap
LABEL org.opencontainers.image.description="reconmap/web-client"
LABEL org.opencontainers.image.licenses="Apache-2.0"

RUN chown -R nginx:nginx /usr/share/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/

COPY --from=builder --chown=nginx:nginx /home/reconmapper/packages/app/build /usr/share/nginx/html

EXPOSE 5500

USER nginx
CMD ["nginx", "-g", "daemon off;"]
