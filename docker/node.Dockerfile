FROM node:14.15.1-stretch

WORKDIR /opt/reconmap

ENV DISABLE_OPENCOLLECTIVE true
ENV PATH /opt/reconmap/node_modules/.bin:$PATH

