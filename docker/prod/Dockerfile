FROM node:16 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16-stretch-slim AS runner
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start:prod"]