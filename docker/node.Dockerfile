FROM node:24-bookworm-slim

ARG DEBIAN_FRONTEND=noninteractive

ARG HOST_UID=1000
ARG HOST_GID=1000

RUN groupmod -g ${HOST_GID} node && \
    usermod -u ${HOST_UID} -g ${HOST_GID} node

RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/node
USER node

ENV NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    DISABLE_OPENCOLLECTIVE=true

ENV PATH=/home/node/app/node_modules/.bin:$PATH
