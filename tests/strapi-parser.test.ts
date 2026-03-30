import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/strapi-parser', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/lib/strapi-parser')>();
  return { parseRichText: mod.parseRichText };
});

import { parseRichText } from '@/lib/strapi-parser';

describe('parseRichText', () => {
  it('returns empty string for nullish input', () => {
    expect(parseRichText()).toBe('');
    expect(parseRichText(null)).toBe('');
  });

  it('joins node child text with newlines between nodes', () => {
    const result = parseRichText([
      {
        type: 'p',
        children: [
          { type: 'text', text: 'Hello' },
          { type: 'text', text: ' world' },
        ],
      },
      { type: 'p', children: [{ type: 'text', text: 'Second' }] },
    ]);

    expect(result).toBe('Hello world\nSecond');
  });
});
