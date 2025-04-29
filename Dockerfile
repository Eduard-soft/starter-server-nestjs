# FROM node:22-alpine AS builder

# WORKDIR /usr/srs/app

# COPY package*.json ./

# RUN npm install --legacy-peer-deps

# COPY . .

# EXPOSE 4000

# CMD ["node","main.js"]

# Базовый образ Node.js
FROM node:20-alpine AS builder

# Установка зависимостей
RUN apk add --no-cache openssl

# Создание рабочей директории
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем остальные файлы
COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Устанавливаем порт приложения
EXPOSE 4000

# Запуск приложения
CMD ["npm", "run", "start:prod"]