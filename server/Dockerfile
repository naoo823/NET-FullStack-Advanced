# Server Dockerfile
# --- Stage 1: Base Image & Dependencies ---
# Use an official Node.js runtime as a parent image.
# 'alpine' is a lightweight version of Linux, making our image smaller.
FROM node:18-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# --- Stage 2: Development Dependencies (for local dev) ---
FROM base AS deps
# Install all dependencies including devDependencies
RUN npm install

# --- Stage 3: Production Dependencies ---
FROM base AS production-deps
# Install only production dependencies for a smaller final image
RUN npm install --only=production

# --- Stage 4: Build ---
# This stage isn't strictly necessary for a pure JS backend,
# but it's good practice for when you add a build step (like TypeScript).
FROM deps AS build
COPY . .
# If you had a build command, it would go here: RUN npm run build

# --- Stage 5: Production Image ---
# This is the final, optimized image that will be deployed.
FROM production-deps AS production

# Copy the application source code
COPY . .

# The port that your app will run on inside the container
EXPOSE 5001

# The command to run your application
CMD ["node", "src/server.js"]