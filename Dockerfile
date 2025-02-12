# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.2.2
FROM oven/bun:${BUN_VERSION} AS base

LABEL fly_launch_runtime="Vite"

WORKDIR /usr/src/app

FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && \
    bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && \
    bun install --frozen-lockfile --production

FROM base AS prerelease

COPY --from=install /temp/dev/node_modules node_modules

COPY . .

ENV NODE_ENV="production"

RUN bun run build


FROM nginx AS release

COPY --from=prerelease /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
