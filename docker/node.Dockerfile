FROM node:14-bullseye-slim

ARG CONTAINER_USER=reconmapper
ARG CONTAINER_GROUP=reconmapper
ARG HOST_USER_ID=1000
ARG HOST_GROUP_ID=1000

RUN userdel -r node
RUN groupadd -g ${HOST_GROUP_ID} ${CONTAINER_GROUP}
RUN useradd -u ${HOST_USER_ID} -g ${CONTAINER_GROUP} -s /bin/sh -m ${CONTAINER_USER}

ENV DISABLE_OPENCOLLECTIVE true

USER reconmapper

WORKDIR /home/reconmapper
ENV PATH /home/reconmapper/node_modules/.bin:$PATH
