FROM node:20-alpine as base

FROM base as deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./

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
CMD ["yarn", "build"]

FROM base as runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start"]