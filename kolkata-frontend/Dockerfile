# Build stage
FROM node:20-alpine AS builder

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=https://kolkata-backend.onrender.com/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /build/dist ./dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT:-3000} || exit 1

CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
