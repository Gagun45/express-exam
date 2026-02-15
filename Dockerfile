
FROM node:24.13.0-alpine

LABEL maintainer="Gagun45"

WORKDIR /app

COPY package.json .

RUN npm i
