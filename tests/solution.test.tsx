import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SolutionSection } from '@/components/landing/solution';
import type { Solution, RichTextNode } from '@/lib/types';

vi.mock('@/lib/strapi-parser', () => ({
  parseRichText: (nodes: RichTextNode[]) =>
    nodes.map((n) => n.children?.map((c) => c.text).join('')).join('\n'),
}));

const solutions: Solution[] = [
  {
    id: 1,
    title: 'Solution Title',
    description: [
      { type: 'p', children: [{ type: 'text', text: 'Intro' }] },
      { type: 'p', children: [{ type: 'text', text: '- Point 1' }] },
    ],
  },
];

describe('SolutionSection', () => {
  it('renders solution', () => {
    render(<SolutionSection solutions={solutions} />);

    expect(screen.getByText('Solution Title')).toBeInTheDocument();
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Point 1')).toBeInTheDocument();
  });
});
