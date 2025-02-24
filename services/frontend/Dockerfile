# Build FE
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder ./app/build /bin/www
COPY --from=builder ./app/.env /bin/www/.env

copy nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
