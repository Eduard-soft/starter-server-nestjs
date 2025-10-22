
FROM node:20 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Генерируем Prisma клиент
RUN npx prisma generate

EXPOSE 3000

# Запускаем напрямую, без npm run
CMD ["sh", "-c", "sleep 10 && npx prisma db push --skip-generate && node dist/src/main.js"]