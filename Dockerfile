# syntax=docker/dockerfile:1.7

# ==============================
# Stage 1: Build the React app
# ==============================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Build-time env knobs for faster CRA builds
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn \
    GENERATE_SOURCEMAP=false

# Copy package.json and yarn.lock first to maximize cache reuse
COPY package.json yarn.lock ./

# Install dependencies (cache Yarn downloads between builds)
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Build the app
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn build

# ==============================
# Stage 2: Serve with Nginx
# ==============================
FROM nginx:1.27-alpine

# Copy React build from builder stage
COPY --from=builder /app/build /usr/share/nginx/html/

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
