FROM quay.io/reconmap/web-client AS builder

ARG RECONMAP_APP_GIT_COMMIT_HASH
ENV REACT_APP_GIT_COMMIT_HASH=${RECONMAP_APP_GIT_COMMIT_HASH}

COPY jsconfig.json package.json package-lock.json ./
COPY public ./public
COPY src ./src

RUN npm install && npm run build

FROM nginx:stable

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/

COPY --from=builder /opt/reconmap/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

