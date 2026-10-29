# syntax=docker/dockerfile:1

# ---------- build ----------
FROM node:22-bookworm-slim AS build
WORKDIR /app

ENV STRAPI_TELEMETRY_DISABLED=true

# Strapi validates admin/server secrets while loading config during `strapi build`.
# These are throwaway values; real secrets are injected at runtime.
ENV APP_KEYS=build-key-1,build-key-2 \
    API_TOKEN_SALT=build-api-token-salt-000000000000 \
    ADMIN_JWT_SECRET=build-admin-jwt-secret-000000000000 \
    TRANSFER_TOKEN_SALT=build-transfer-token-salt-000000000000 \
    JWT_SECRET=build-jwt-secret-000000000000 \
    ENCRYPTION_KEY=build-encryption-key-000000000000 \
    DATABASE_CLIENT=postgres \
    DATABASE_HOST=127.0.0.1 \
    DATABASE_PORT=5432 \
    DATABASE_NAME=build \
    DATABASE_USERNAME=build \
    DATABASE_PASSWORD=build

# Repo uses bun.lock; install deps (incl. dev/TS) reproducibly.
RUN npm install -g bun@1 && npm cache clean --force
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# Compiles TS to dist/ and builds the admin panel into dist/build/.
RUN NODE_ENV=production bun run build

# ---------- runtime ----------
FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    STRAPI_TELEMETRY_DISABLED=true \
    HOST=0.0.0.0 \
    PORT=1337

RUN apt-get update \
 && apt-get install -y --no-install-recommends gosu \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /app/.tmp /app/public/uploads \
 && chown node:node /app /app/.tmp /app/public/uploads

COPY --from=build --chown=node:node /app/package.json /app/tsconfig.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/src ./src
COPY --from=build --chown=node:node /app/types ./types
COPY --from=build --chown=node:node /app/public ./public
COPY --chown=node:node docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
 && chown -R node:node /app/public

EXPOSE 1337

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
