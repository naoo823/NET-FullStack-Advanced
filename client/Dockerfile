# --- Stage 1: Build the React Application ---
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Set the API URL for the production build
# This should point to your live backend domain when deployed
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app for production
RUN npm run build

# --- Stage 2: Serve the Static Files with Nginx ---
FROM nginx:stable-alpine

# Copy the built static files from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
# We will create this file next
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx's default port)
EXPOSE 80

# The default command for the nginx image is to start the server
CMD ["nginx", "-g", "daemon off;"]