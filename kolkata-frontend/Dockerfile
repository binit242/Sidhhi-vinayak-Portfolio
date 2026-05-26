# Build stage
FROM node:20-alpine AS builder

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build with production environment
ENV VITE_API_URL=https://kolkata-backend.onrender.com/api
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /build/dist ./dist

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
