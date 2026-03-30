import { getSiteUrl } from '@/lib/site';

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 15;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  return headers.get('x-real-ip') ?? 'unknown';
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) {
    return true;
  }

  try {
    const expected = new URL(getSiteUrl()).origin;
    return origin === expected;
  } catch {
    return false;
  }
}

export function hasJsonContentType(request: Request): boolean {
  const type = request.headers.get('content-type') ?? '';
  return type.toLowerCase().startsWith('application/json');
}

export function sanitizeHref(rawHref: string, fallback = '/'): string {
  const trimmed = rawHref.trim();
  if (!trimmed) {
    return fallback;
  }

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.toString();
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export function checkRateLimit(
  key: string,
  maxRequests = DEFAULT_MAX_REQUESTS,
  windowMs = DEFAULT_WINDOW_MS,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return {
    allowed: true,
    retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
  };
}