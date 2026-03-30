import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlogDetailContent } from '@/components/landing/blog-detail-content';
import type { BlogPost } from '@/lib/types/shared-types';

const basePost: BlogPost = {
  id: 1,
  title: 'Deep Dive',
  slug: 'deep-dive',
  description: 'desc',
  content: 'Paragraph one.\n\nParagraph two.',
  publishedAt: '2024-06-15T12:00:00.000Z',
};

describe('BlogDetailContent', () => {
  it('renders title and splits content into paragraphs', () => {
    render(<BlogDetailContent post={basePost} />);

    expect(screen.getByText('Deep Dive')).toBeInTheDocument();
    expect(screen.getByText('Paragraph one.')).toBeInTheDocument();
    expect(screen.getByText('Paragraph two.')).toBeInTheDocument();
  });

  it('shows placeholder when content is empty', () => {
    render(<BlogDetailContent post={{ ...basePost, content: null }} />);

    expect(screen.getByText(/content coming soon/i)).toBeInTheDocument();
  });
});
