FROM node:20-alpine as base

FROM base as deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
COPY .env ./

RUN yarn --frozen-lockfile

FROM base as dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Allows hot reload to work on windows
ENV WATCHPACK_POLLING=TRUE

CMD ["yarn", "dev"]

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app
COPY package.json .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=deps .env /app
CMD ["node", "dist/index.js"]