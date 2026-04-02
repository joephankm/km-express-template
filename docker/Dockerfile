# Base Image
FROM node:24.15-alpine

# App Directory in Docker
WORKDIR /app

# ══════════════════ Install Dependencies ══════════════════
# Copy only package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install pnpm (recommended)
RUN corepack enable && corepack use

# Install dependencies (production only)
RUN pnpm install --frozen-lockfile --prod

# ════════════════════ Run Application ═════════════════════
# Copy the rest
COPY . .

# Build (if using TypeScript)
RUN pnpm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Start app
CMD ["node", "dist/server.js"]
