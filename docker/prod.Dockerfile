FROM reconmap-web-frontend:base AS builder

WORKDIR /opt/reconmap

ENV PATH /opt/reconmap/node_modules/.bin:$PATH
ENV REACT_APP_STAGE prod

COPY package.json package-lock.json ./
COPY public ./public
COPY src ./src

RUN npm install && npm run build

FROM nginx:1.18.0

COPY --from=builder /opt/reconmap/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

