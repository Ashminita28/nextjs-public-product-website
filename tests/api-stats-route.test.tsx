import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/stats/route';

const getDashboardStatsMock = vi.fn();
const getSubscriberCountMock = vi.fn();

vi.mock('@/lib/strapi', () => ({
  getDashboardStats: (...args: unknown[]) => getDashboardStatsMock(...args),
  getSubscriberCount: (...args: unknown[]) => getSubscriberCountMock(...args),
}));

describe('/api/stats GET', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns data when upstream succeeds', async () => {
    getDashboardStatsMock.mockResolvedValue([{ id: 1, label: 'Flights' }]);
    getSubscriberCountMock.mockResolvedValue(42);

    const res = await GET();
    const body = (await res.json()) as {
      stats: Array<{ id: number; label: string }>;
      subscribers: number;
    };

    expect(res.status).toBe(200);
    expect(body.subscribers).toBe(42);
    expect(body.stats[0]?.label).toBe('Flights');
  });

  it('returns 401 for unauthorized upstream error', async () => {
    getDashboardStatsMock.mockRejectedValue(new Error('Unauthorized'));

    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('returns 500 for non-auth failures', async () => {
    getDashboardStatsMock.mockRejectedValue(new Error('Connection reset'));

    const res = await GET();
    expect(res.status).toBe(500);
  });
});
