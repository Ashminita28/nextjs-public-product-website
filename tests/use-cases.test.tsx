import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UseCasesSection } from '@/components/landing/use-cases';
import type { UseCase, RichTextNode } from '@/lib/types/shared-types';

vi.mock('@/lib/constants', () => ({
  icons: [() => <span>icon</span>],
  iconColors: ['bg'],
}));

vi.mock('@/lib/strapi-parser', () => ({
  parseRichText: (nodes: RichTextNode[]) =>
    nodes.map((n) => n.children?.map((c) => c.text).join('')).join(' '),
}));

const mockUseCases: UseCase[] = [
  {
    id: 1,
    text: 'Case A',
    description: [{ type: 'p', children: [{ type: 'text', text: 'Desc A' }] }],
  },
];

describe('UseCasesSection', () => {
  it('renders use cases', () => {
    render(<UseCasesSection useCases={mockUseCases} />);

    expect(screen.getByText('Case A')).toBeInTheDocument();
    expect(screen.getByText('Desc A')).toBeInTheDocument();
  });
});
