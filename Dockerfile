# syntax=docker/dockerfile:1.4


FROM node:20-alpine3.18 AS builder

WORKDIR /app


COPY --link package*.json ./


RUN --mount=type=cache,target=/root/.npm npm ci

COPY --link . .

RUN npm run build -- --configuration production


FROM nginx:1.25.2-alpine3.18

COPY --from=builder /app/dist/riu-frontend-adriel-fargioni/browser /usr/share/nginx/html

COPY --link nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
