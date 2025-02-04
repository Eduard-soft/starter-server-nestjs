FROM node:22-alpine AS builder

WORKDIR /usr/srs/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD ["node","main.js"]