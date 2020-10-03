FROM reconmap/web-frontend:base AS builder

ARG RECONMAP_APP_STAGE=dev

WORKDIR /opt/reconmap

ENV PATH /opt/reconmap/node_modules/.bin:$PATH
ENV REACT_APP_STAGE=${RECONMAP_APP_STAGE}

COPY package.json package-lock.json ./
COPY public ./public
COPY src ./src

RUN npm install && npm run build

FROM nginx:1.18.0

COPY --from=builder /opt/reconmap/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

