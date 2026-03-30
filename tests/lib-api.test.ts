import { describe, it, expect, vi, beforeEach } from 'vitest';

const getServerSession = vi.hoisted(() => vi.fn());

vi.mock('next-auth', () => ({
  getServerSession: (...args: unknown[]) => getServerSession(...args),
}));

vi.mock('@/lib/auth', () => ({
  authOptions: {},
}));

import { getErrorMessage, parseJsonSafely, request } from '@/lib/api';

const fetchMock = vi.fn();

describe('getErrorMessage', () => {
  it('returns message for Error instances', () => {
    expect(getErrorMessage(new Error('oops'))).toBe('oops');
  });

  it('returns fallback for unknown values', () => {
    expect(getErrorMessage(null)).toBe(
      'Something went wrong. Please try again.',
    );
    expect(getErrorMessage('x', 'fallback')).toBe('fallback');
  });
});

describe('parseJsonSafely', () => {
  it('returns parsed JSON on success', async () => {
    const res = new Response(JSON.stringify({ ok: true }));
    await expect(parseJsonSafely<{ ok: boolean }>(res)).resolves.toEqual({
      ok: true,
    });
  });

  it('returns null on invalid JSON', async () => {
    const res = new Response('not json');
    await expect(parseJsonSafely(res)).resolves.toBeNull();
  });
});

describe('request()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = fetchMock;
    getServerSession.mockResolvedValue(null);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ data: { value: 42 } }),
    });
  });

  it('returns unwrapped data for successful Strapi envelope', async () => {
    const data = await request<{ value: number }>('/api/items');

    expect(data).toEqual({ value: 42 });
    expect(fetchMock.mock.calls[0]?.[0]?.toString()).toContain('/api/items');
  });

  it('throws when envelope is an error response', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: null,
        error: {
          message: 'Bad request',
          name: 'ValidationError',
          status: 400,
        },
      }),
    });

    await expect(request('/api/x')).rejects.toThrow('Bad request');
  });
});
