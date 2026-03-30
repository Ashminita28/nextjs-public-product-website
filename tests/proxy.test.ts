import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

type JwtPayload = {
  sub: string;
};

const checkRateLimitMock =
  vi.fn<
    (
      key: string,
      maxRequests?: number,
      windowMs?: number,
    ) => { allowed: boolean; retryAfterSeconds: number }
  >();
const getClientIpMock = vi.fn<(headers: Headers) => string>();
const getTokenMock =
  vi.fn<(req: NextRequest, options?: object) => Promise<JwtPayload | null>>();

vi.mock('@/lib/security', () => ({
  checkRateLimit: (key: string, maxRequests?: number, windowMs?: number) =>
    checkRateLimitMock(key, maxRequests, windowMs),
  getClientIp: (headers: Headers) => getClientIpMock(headers),
}));

vi.mock('next-auth/jwt', () => ({
  getToken: (req: NextRequest, options?: object) => getTokenMock(req, options),
}));

import { proxy } from '@/proxy';

function req(url: string): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'));
}

describe('proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    checkRateLimitMock.mockReturnValue({
      allowed: true,
      retryAfterSeconds: 60,
    });
    getTokenMock.mockResolvedValue(null);
  });

  it('returns 429 when rate limit exceeded for subscribe', async () => {
    checkRateLimitMock.mockReturnValueOnce({
      allowed: false,
      retryAfterSeconds: 42,
    });

    const res = await proxy(req('http://localhost:3000/api/subscribe'));

    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBe('42');
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/too many requests/i);
  });

  it('redirects unauthenticated dashboard access to login', async () => {
    const res = await proxy(req('http://localhost:3000/dashboard'));

    expect(res.status).toBe(307);
    expect(res.headers.get('location')?.endsWith('/login')).toBe(true);
  });

  it('allows dashboard when token present', async () => {
    getTokenMock.mockResolvedValueOnce({ sub: 'user-1' });

    const res = await proxy(req('http://localhost:3000/dashboard'));

    expect(res.status).toBe(200);
  });

  it('allows subscribe when under rate limit', async () => {
    const res = await proxy(req('http://localhost:3000/api/register'));

    expect(res.status).toBe(200);
  });
});
