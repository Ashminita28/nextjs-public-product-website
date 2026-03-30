import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/register/route';

const registerUserMock = vi.fn();
const isAllowedOriginMock = vi.fn();
const hasJsonContentTypeMock = vi.fn();

vi.mock('@/lib/strapi', () => ({
  registerUser: (...args: unknown[]) => registerUserMock(...args),
}));

vi.mock('@/lib/security', () => ({
  isAllowedOrigin: (...args: unknown[]) => isAllowedOriginMock(...args),
  hasJsonContentType: (...args: unknown[]) => hasJsonContentTypeMock(...args),
}));

describe('/api/register POST', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isAllowedOriginMock.mockReturnValue(true);
    hasJsonContentTypeMock.mockReturnValue(true);
  });

  it('returns 415 for non-json content-type', async () => {
    hasJsonContentTypeMock.mockReturnValue(false);
    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
  });

  it('returns 400 for invalid input schema', async () => {
    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'pilot@example.com' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns mapped user on success', async () => {
    registerUserMock.mockResolvedValue({
      user: { id: 4, email: 'pilot@example.com', username: 'pilot' },
    });
    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Pilot',
        email: 'pilot@example.com',
        password: 'pass12345',
      }),
    });

    const res = await POST(req);
    const body = (await res.json()) as { user: { id: number; email: string } };

    expect(res.status).toBe(200);
    expect(body.user.id).toBe(4);
    expect(registerUserMock).toHaveBeenCalledOnce();
  });
});
