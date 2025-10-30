# -----------------------------
# Stage 1: Build stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache curl

RUN npm i

COPY . .

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

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/seed.js ./seed.js
COPY --from=builder /app/generated ./generated

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && node ./seed.js && npm start"

