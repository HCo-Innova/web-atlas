# Multi-stage build para SPA React + Vite
FROM node:22.19.0-alpine AS builder

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install --frozen-lockfile --prod

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN pnpm run build

# Etapa de producción con Caddy
FROM caddy:2-alpine AS production

# Copiar configuración de Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Copiar archivos build de la etapa anterior
COPY --from=builder /app/dist /srv

# Exponer puertos 80 y 443
EXPOSE 80 443

# Caddy se ejecuta automáticamente
