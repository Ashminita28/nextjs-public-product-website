import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkRateLimit, getClientIp } from '@/lib/security';

export async function proxy(req: NextRequest) {
  if (
    req.nextUrl.pathname === '/api/subscribe' ||
    req.nextUrl.pathname === '/api/register'
  ) {
    const ip = getClientIp(req.headers);
    const rateKey = `${req.nextUrl.pathname}:${ip}`;
    const limit = checkRateLimit(rateKey, 10, 60_000);

    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please retry shortly.' },
        {
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfterSeconds) },
        },
      );
    }
  }

  const token = await getToken({ req });

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/subscribe', '/api/register'],
};