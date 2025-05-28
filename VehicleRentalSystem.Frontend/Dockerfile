FROM node:22-alpine AS deps
WORKDIR /app

COPY VehicleRentalSystem.Frontend/package*.json ./

ENV NPM_CONFIG_LEGACY_PEER_DEPS=true
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY VehicleRentalSystem.Frontend .

RUN npm run build
RUN npm prune --production

FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare npm@10.9.2 --activate

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY VehicleRentalSystem.Frontend/package.json .

EXPOSE 3000
CMD ["npm", "start"]