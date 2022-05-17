# syntax=docker/dockerfile:1.3-labs
FROM node:16-alpine AS deps
RUN apk add --no-cache curl
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
ARG DATABASE_URL
ENV NODE_OPTIONS="--max-old-space-size=1024"
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/yarn.lock ./
RUN cat > ".env" <<EOF
DATABASE_URL=${DATABASE_URL}
EOF
RUN yarn build && yarn install --prod

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.env /app/next.config.js /app/deployment/start.sh /app/deployment/CHECKS /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80

CMD ["/app/start.sh"]
