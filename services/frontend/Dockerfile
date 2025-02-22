FROM node:latest

WORKDIR /app

COPY ../. ./
COPY ../.env.default .env

RUN npm install

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 3000

CMD ["npm", "start"]