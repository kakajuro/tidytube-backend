FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Allows hot reload to work on windows
ENV WATCHPACK_POLLING=TRUE

CMD ["yarn", "dev"]

FROM base AS builder

# Env var defaults so the build doesn't error
ARG PORT="1234"
ARG INSTALLKEY="PLACEHOLDER"
ARG INSTALLKEYSECRET="PLACEHOLDER"
ARG CLIENTIDSECRET="EXAMPLE_CLIENT_SECRET_KEY"
ARG UNINSTALLKEYSECRET="EXAMPLE_UNINSTALL_KEY_SECRET"
ARG CLIENTIPSECRET="EXAMPLE_CLIENT_IP_SECRET"
ARG REDIS_HOST="EXAMPLE_REDIS_HOST"
ARG REDIS_PORT="5678"
ARG REDIS_PASSWORD="EXAMPLE_REDIS_PASSWORD"

ENV PORT=${PORT}
ENV INSTALLKEY=${INSTALLKEY}
ENV INSTALLKEYSECRET=${INSTALLKEYSECRET}
ENV CLIENTIDSECRET=${CLIENTIDSECRET}
ENV UNINSTALLKEYSECRET=${UNINSTALLKEYSECRET}
ENV CLIENTIPSECRET=${CLIENTIPSECRET}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app
COPY package.json .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]