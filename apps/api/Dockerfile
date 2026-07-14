# GoBoiler API — mirrors the proven ens-boiler gateway pattern:
# bun install happens at IMAGE-BUILD time (bun's installer works in docker build
# on this host, and respects bun.lock → correct pinned deps incl better-auth 1.2.x).
FROM oven/bun:1 AS base
WORKDIR /app

# install deps from the lockfile first (cached layer)
COPY package.json bun.lock ./
RUN bun install

# app source (node_modules / .env excluded via .dockerignore)
COPY . .

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]
