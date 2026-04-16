# 1. Stage: build
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 2. Stage: nginx
FROM nginx:alpine

# Копируем dist в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Кастомная конфигурация Nginx для SPA
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]