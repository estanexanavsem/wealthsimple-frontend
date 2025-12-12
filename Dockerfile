# syntax=docker/dockerfile:1

# ============================================
# Base
# ============================================
FROM oven/bun:1-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# ============================================
# Stage 1: Install dependencies (including dev deps for build)
# ============================================
FROM base AS deps

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js app
# ============================================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# ============================================
# Stage 3: Install production dependencies only
# ============================================
FROM base AS prod-deps

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# ============================================
# Stage 4: Production runner
# ============================================
FROM base AS runner

ENV NODE_ENV=production

RUN apk add --no-cache wget

# Create non-root user for security
RUN addgroup --system --gid 1001 app && \
    adduser --system --uid 1001 --ingroup app app

WORKDIR /app

COPY --from=prod-deps --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/.next ./.next
COPY --from=builder --chown=app:app /app/package.json ./package.json
COPY --from=base --chown=app:app /.env ./.env

USER app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["bun", "run", "start"]
