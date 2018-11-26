FROM node:latest

LABEL maintainer="Tobias Bernting"

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080