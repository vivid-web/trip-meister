# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.2.2
FROM oven/bun:${BUN_VERSION} AS base

LABEL fly_launch_runtime="Bun"

WORKDIR /app


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


FROM base AS release

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/bun.lock .
COPY --from=prerelease /app/package.json .
COPY --from=prerelease /app/tsconfig.json .
COPY --from=prerelease /app/.vinxi .vinxi
COPY --from=prerelease /app/.output .output
COPY --from=prerelease /app/scripts scripts
COPY --from=prerelease /app/app app

USER bun
EXPOSE 3000
CMD [ "bun", "run", "start" ]
