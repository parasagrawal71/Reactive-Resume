FROM node:lts-alpine AS base

WORKDIR /app

RUN apk add --no-cache g++ git make curl python3 libc6-compat \
  && corepack enable && corepack prepare pnpm@latest --activate

FROM base as dependencies

COPY package.json pnpm-*.yaml ./
COPY ./schema/package.json ./schema/package.json
COPY ./client/package.json ./client/package.json

RUN pnpm install --frozen-lockfile

FROM base as builder

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/schema/node_modules ./schema/node_modules
COPY --from=dependencies /app/client/node_modules ./client/node_modules

RUN pnpm run --filter schema build \
  && pnpm run --filter client build

FROM base as production

COPY --from=builder /app/package.json /app/pnpm-*.yaml ./
COPY --from=builder /app/client/package.json ./client/package.json

RUN pnpm install --filter client --prod --frozen-lockfile --workspace-root

COPY --from=builder /app/client/.next ./client/.next
COPY --from=builder /app/client/public ./client/public
COPY --from=builder /app/client/next.config.js ./client/next.config.js
COPY --from=builder /app/client/next-i18next.config.js ./client/next-i18next.config.js

EXPOSE 3000

ENV PORT 3000

HEALTHCHECK --interval=30s --timeout=20s --retries=3 --start-period=15s \
    CMD curl -fSs localhost:3000 || exit 1

CMD [ "pnpm", "run", "start" ]