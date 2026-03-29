
# Stage 1: Dependencies
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# Install PNPM globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# Stage 2: Builder
FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install PNPM in builder stage
RUN npm install -g pnpm

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN pnpm build


# Stage 3: Runner
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only what is needed for running
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Run the Next.js server
CMD ["node", "server.js"]