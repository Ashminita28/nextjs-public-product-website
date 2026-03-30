import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/subscribe/route';

const subscribeNewsletterMock = vi.fn();
const isAllowedOriginMock = vi.fn();
const hasJsonContentTypeMock = vi.fn();

vi.mock('@/lib/strapi', () => ({
  subscribeNewsletter: (...args: unknown[]) => subscribeNewsletterMock(...args),
}));

vi.mock('@/lib/security', () => ({
  isAllowedOrigin: (...args: unknown[]) => isAllowedOriginMock(...args),
  hasJsonContentType: (...args: unknown[]) => hasJsonContentTypeMock(...args),
}));

describe('/api/subscribe POST', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isAllowedOriginMock.mockReturnValue(true);
    hasJsonContentTypeMock.mockReturnValue(true);
  });

  it('returns 403 for forbidden origin', async () => {
    isAllowedOriginMock.mockReturnValue(false);
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'pilot@example.com' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it('returns 400 for invalid payload', async () => {
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'bad-email' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('subscribes and returns success for valid payload', async () => {
    subscribeNewsletterMock.mockResolvedValue({ id: 1 });
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'pilot@example.com' }),
    });

    const res = await POST(req);
    const body = (await res.json()) as { success: boolean };

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(subscribeNewsletterMock).toHaveBeenCalledWith('pilot@example.com');
  });
});
