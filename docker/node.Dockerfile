FROM node:14-bullseye-slim

WORKDIR /opt/reconmap

ENV DISABLE_OPENCOLLECTIVE true
ENV PATH /opt/reconmap/node_modules/.bin:$PATH

