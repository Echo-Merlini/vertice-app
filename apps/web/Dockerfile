# Vértice marketing front — build with Vite, serve static with nginx.
# VITE_API_URL is baked at build time (the browser calls it directly), so it must
# be an origin the visitor's browser can reach (the GoBoiler API's public URL).
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# npm install (not ci) so platform-specific esbuild/rollup binaries resolve on linux
RUN npm install --no-audit --no-fund
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
