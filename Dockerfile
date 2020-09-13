FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y vim wget unzip
RUN apt-get install -y nodejs npm
RUN npm i -g yarn

