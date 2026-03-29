import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FeaturesSection } from '@/components/landing/features';
import type { Feature, RichTextNode } from '@/lib/types';

vi.mock('@/lib/constants', () => ({
  icons: [() => <span>icon</span>],
  iconColors: ['bg'],
}));

vi.mock('@/lib/strapi-parser', () => ({
  parseRichText: (input: unknown) => {
    if (Array.isArray(input)) {
      return input
        .flatMap(
          (node: RichTextNode) => node.children?.map((c) => c.text) ?? [],
        )
        .join('');
    }
    return '';
  },
}));

const mockFeatures: Feature[] = [
  {
    id: 1,
    title: 'Feature A',
    description: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Desc A',
          },
        ],
      },
    ],
  },
];

describe('FeaturesSection', () => {
  it('renders rich text description correctly', () => {
    render(<FeaturesSection features={mockFeatures} />);

    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Desc A')).toBeInTheDocument();
  });
});
