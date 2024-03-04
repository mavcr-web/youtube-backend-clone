# Create image based on the official Node 6 image from dockerhub
FROM node:20-alpine3.18

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN pnpm add @nestjs/cli -g

RUN mkdir -p /api

WORKDIR /api