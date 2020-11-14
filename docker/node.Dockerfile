FROM node:12.18.4-stretch

WORKDIR /opt/reconmap

ENV DISABLE_OPENCOLLECTIVE true
ENV PATH /opt/reconmap/node_modules/.bin:$PATH

