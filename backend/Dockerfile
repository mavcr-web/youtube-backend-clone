FROM node:20-alpine3.18

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

RUN mkdir -p /api
WORKDIR /api

COPY package*.json ./
RUN pnpm i

COPY . .

EXPOSE 3000

WORKDIR /api

CMD ["pnpm", "run", "start"]


# docker build -t backend . && docker image prune --filter label=stage=builder -f
