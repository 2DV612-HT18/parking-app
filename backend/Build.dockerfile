FROM node:latest

LABEL maintainer="Tobias Bernting"

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .

RUN npm install

RUN npm run build

RUN chmod +x copy_graphql.sh

RUN ./copy_graphql.sh

RUN ls -ahl dist/modules

RUN ls -ahl dist/modules/addRole

EXPOSE 4000