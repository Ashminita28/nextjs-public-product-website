import { describe, it, expect, vi, beforeEach } from 'vitest';

const getSiteUrlMock = vi.hoisted(() => vi.fn(() => 'https://example.com'));

vi.mock('../lib/site', () => ({
  getSiteUrl: () => getSiteUrlMock(),
}));

import { buildMarketingMetadata } from '@/lib/marketing-metadata';

describe('buildMarketingMetadata', () => {
  beforeEach(() => {
    getSiteUrlMock.mockReturnValue('https://example.com');
  });

  it('includes openGraph url from site base', () => {
    const meta = buildMarketingMetadata({ page: 'home' });

    expect(meta.title).toContain('Fligo');
    expect(meta.openGraph?.url).toBe('https://example.com/');
  });

  it('uses distinct paths per page', () => {
    expect(buildMarketingMetadata({ page: 'features' }).openGraph?.url).toBe(
      'https://example.com/features',
    );
    expect(buildMarketingMetadata({ page: 'blog' }).openGraph?.url).toBe(
      'https://example.com/blog',
    );
  });
});
