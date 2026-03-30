import { describe, it, expect } from 'vitest';
import { checkRateLimit, sanitizeHref } from '@/lib/security';

describe('security helpers', () => {
  it('blocks javascript URLs in sanitizeHref', () => {
    expect(sanitizeHref('javascript:alert(1)')).toBe('/');
    expect(sanitizeHref('https://example.com')).toBe('https://example.com/');
    expect(sanitizeHref('/pricing')).toBe('/pricing');
  });

  it('rate limits after max requests', () => {
    const key = 'test-key';
    const first = checkRateLimit(key, 2, 60_000);
    const second = checkRateLimit(key, 2, 60_000);
    const third = checkRateLimit(key, 2, 60_000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
  });
});
