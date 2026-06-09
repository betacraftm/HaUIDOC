# -----------------------------
# Stage 1: Base
# -----------------------------
FROM node:20-alpine AS base
WORKDIR /app

# -----------------------------
# Stage 2: Install dependencies
# -----------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl curl
COPY package.json package-lock.json ./
RUN npm ci

# -----------------------------
# Stage 3: Build project
# -----------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Sinh Prisma client
RUN npx prisma generate

# Build Next.js (sử dụng .env để lấy NEXT_PUBLIC_ variables)
RUN npm run build

# -----------------------------
# Stage 4: Runtime
# -----------------------------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cài đặt openssl cho Prisma runtime
RUN apk add --no-cache openssl

# Copy các file public và config cần thiết
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/seed.js ./seed.js
COPY --from=builder /app/generated ./generated

# Copy thư mục standalone được build ra (bao gồm node_modules thu gọn)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cài đặt prisma CLI ở runtime để chạy migrate
RUN npm install prisma@^6.11.1

EXPOSE 3000

# Khởi động app: chạy migrate, seed data và start server
CMD sh -c "npx prisma migrate deploy && node ./seed.js && node server.js"
