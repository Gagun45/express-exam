
FROM node:24.13.0-alpine

LABEL maintainer="Gagun45"

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm i
