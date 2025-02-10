# Use ARG for Node version and set base image
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-slim as base
ARG PORT=3000
WORKDIR /src

# Install system dependencies required for sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies and build
FROM base as build
COPY --link package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi
COPY --link . .  
RUN npm run build

# Run the application in a production-ready environment
FROM base
ENV PORT=$PORT
ENV NODE_ENV=production
COPY --from=build /src/.output /src/.output 
EXPOSE $PORT
CMD ["node", ".output/server/index.mjs"]