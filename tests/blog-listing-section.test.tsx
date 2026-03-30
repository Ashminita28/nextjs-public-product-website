import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlogListSection } from '@/components/landing/blog-listing-section';
import type { BlogPost } from '@/lib/types/shared-types';

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'First Post',
    slug: 'first-post',
    description: 'Summary line',
    content: null,
    publishedAt: '2024-06-01T00:00:00.000Z',
  },
];

describe('BlogListSection', () => {
  it('renders a card per post', () => {
    render(<BlogListSection posts={posts} />);

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Summary line')).toBeInTheDocument();
  });
});
