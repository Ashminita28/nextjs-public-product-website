import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProblemSection } from '@/components/landing/problem';
import type { Problem, RichTextNode } from '@/lib/types/shared-types';

vi.mock('@/lib/strapi-parser', () => ({
  parseRichText: (nodes: RichTextNode[]) =>
    nodes.map((n) => n.children?.map((c) => c.text).join('')).join('\n'),
}));

const problem: Problem = {
  title: 'Problem Title',
  description: [{ type: 'p', children: [{ type: 'text', text: 'Line 1' }] }],
};

describe('ProblemSection', () => {
  it('renders problem', () => {
    render(<ProblemSection problem={problem} />);

    expect(screen.getByText('Problem Title')).toBeInTheDocument();
    expect(screen.getByText('Line 1')).toBeInTheDocument();
  });
});
