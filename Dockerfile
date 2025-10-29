# -----------------------------
# Stage 1: Build stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files trước để tận dụng cache
COPY package*.json ./

# Cài curl trước vì script postinstall có dùng curl
RUN apk add --no-cache curl

# Cài dependencies
RUN npm i

# Copy toàn bộ source code (trừ các file bị ignore)
COPY . .

# Đổi tên env file (Next.js hoặc Node sẽ dùng khi build)
RUN mv .env.docker.local .env.local

RUN npx prisma generate

# Build project
RUN npm run build


# -----------------------------
# Stage 2: Runtime base
# -----------------------------
FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

# Copy các file build cần thiết từ builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/seed.js ./seed.js
COPY --from=builder /app/generated ./generated

# RUN node seed.js

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && node ./seed.js && npm start"


# -----------------------------
# Stage 3: Runtime with LibreOffice (optional)
# -----------------------------
# FROM base AS libreoffice

# RUN apk add --no-cache curl

# EXPOSE 3000
# CMD sh -c "npx prisma migrate deploy && npm start"

