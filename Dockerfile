FROM node:15.8.0-alpine3.10

ENV NODE_VERSION 15.8.0

COPY . /app
WORKDIR /app

ENTRYPOINT node server