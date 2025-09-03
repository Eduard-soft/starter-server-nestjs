FROM node:20-alpine

WORKDIR /app
# Копируем package.json первым для кэширования зависимостей
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install --legacy-peer-deps
# Копируем исходный код
COPY . .
# Собираем приложение
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]