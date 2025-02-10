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

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Run the application in a production-ready environment
FROM base as production
ENV PORT=$PORT
ENV NODE_ENV=production
COPY --from=base /src/.output /src/.output
EXPOSE $PORT
CMD ["node", ".output/server/index.mjs"]