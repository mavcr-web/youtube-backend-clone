# Create image based on the official Node 6 image from dockerhub
FROM node:16.17-alpine3.16

RUN mkdir -p /api

RUN apk add git
RUN git config --global --add safe.directory /api

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN pnpm add @nestjs/cli -g

WORKDIR /api