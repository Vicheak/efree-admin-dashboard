# Use a lightweight Node.js image
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for sharp
RUN apk add --no-cache \
    build-base \
    vips-dev 

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build the app
COPY . .
RUN npm run build

# Final stage for production
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Copy only the built output
COPY --from=builder /app/.output /app/.output

# Expose the application port
EXPOSE 3000

# Start the Nuxt application
CMD ["node", ".output/server/index.mjs"]