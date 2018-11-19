FROM node:latest

LABEL maintainer="Tobias Bernting"

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package*.json ./

RUN npm install

EXPOSE 8080