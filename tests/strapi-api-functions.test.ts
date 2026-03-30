import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBlogBySlug,
  getBlogs,
  getDashboardStats,
  getFeatures,
  getLandingPage,
  getPricingPlans,
  getSubscriberCount,
  loginUser,
  registerUser,
  subscribeNewsletter,
} from '@/lib/strapi';

const requestMock = vi.fn();
const requestRawMock = vi.fn();
const requestWithMetaMock = vi.fn();

vi.mock('@/lib/api', () => ({
  request: (...args: unknown[]) => requestMock(...args),
  requestRaw: (...args: unknown[]) => requestRawMock(...args),
  requestWithMeta: (...args: unknown[]) => requestWithMetaMock(...args),
}));

describe('lib/strapi API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registerUser maps name to username', async () => {
    requestMock.mockResolvedValue({ user: { id: 1 } });

    await registerUser({
      name: 'Pilot',
      email: 'pilot@example.com',
      password: 'secret123',
    });

    expect(requestMock).toHaveBeenCalledWith('/api/auth/local/register', {
      method: 'POST',
      body: {
        username: 'Pilot',
        email: 'pilot@example.com',
        password: 'secret123',
      },
    });
  });

  it('applies ISR cache options for public content fetches', async () => {
    requestMock.mockResolvedValue([]);
    await getBlogs();
    await getLandingPage();

    expect(requestMock).toHaveBeenCalledWith('/api/blogs', {
      cache: 'force-cache',
      next: { revalidate: 300, tags: ['blogs'] },
    });
    expect(requestMock).toHaveBeenCalledWith('/api/landing-page?populate=*', {
      cache: 'force-cache',
      next: { revalidate: 300, tags: ['landing-page'] },
    });
  });

  it('subscribeNewsletter sends strapi envelope body', async () => {
    requestMock.mockResolvedValue({ id: 1 });

    await subscribeNewsletter('pilot@example.com');

    expect(requestMock).toHaveBeenCalledWith('/api/newsletter-subscribers', {
      method: 'POST',
      body: {
        data: {
          email: 'pilot@example.com',
          subscribedAt: expect.any(String),
        },
      },
    });
  });

  it('loginUser uses requestRaw to auth endpoint', async () => {
    requestRawMock.mockResolvedValue({
      jwt: 't',
      user: { id: 1, email: 'a@b.com', username: 'a' },
    });

    await loginUser({ identifier: 'a@b.com', password: 'x' });

    expect(requestRawMock).toHaveBeenCalledWith('/api/auth/local', {
      method: 'POST',
      body: { identifier: 'a@b.com', password: 'x' },
    });
  });

  it('getFeatures and getPricingPlans pass ISR options', async () => {
    requestMock.mockResolvedValue([]);
    await getFeatures();
    await getPricingPlans();

    expect(requestMock).toHaveBeenCalledWith('/api/features', {
      cache: 'force-cache',
      next: { revalidate: 300, tags: ['features'] },
    });
    expect(requestMock).toHaveBeenCalledWith('/api/pricing-plans', {
      cache: 'force-cache',
      next: { revalidate: 300, tags: ['pricing'] },
    });
  });

  it('getBlogBySlug requests encoded slug filter', async () => {
    requestMock.mockResolvedValue([]);
    await getBlogBySlug('hello world');

    expect(requestMock).toHaveBeenCalledWith(
      '/api/blogs?filters[slug][$eq]=hello%20world',
      {
        cache: 'force-cache',
        next: { revalidate: 300, tags: ['blog:hello world'] },
      },
    );
  });

  it('getDashboardStats returns stats array from landing response', async () => {
    requestMock.mockResolvedValue({
      stats: [{ id: 1, label: 'A', value: '1', description: 'd' }],
    });

    const stats = await getDashboardStats();

    expect(stats).toHaveLength(1);
    expect(stats[0]?.label).toBe('A');
    expect(requestMock).toHaveBeenCalledWith(
      '/api/landing-page?populate=stats',
      { auth: true },
    );
  });

  it('getSubscriberCount reads meta.pagination.total', async () => {
    requestWithMetaMock.mockResolvedValue({
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 1, pageCount: 1, total: 99 },
      },
    });

    const total = await getSubscriberCount();

    expect(total).toBe(99);
    expect(requestWithMetaMock).toHaveBeenCalledWith(
      '/api/newsletter-subscribers?pagination[pageSize]=1',
      { auth: true },
    );
  });
});
