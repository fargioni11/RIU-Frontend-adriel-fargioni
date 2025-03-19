# Etapa de construcción
FROM node:20 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine

COPY --from=builder /app/dist/riu-frontend-adriel-fargioni /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
