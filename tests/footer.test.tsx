import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '@/components/layout/footer';

vi.mock('@/lib/icons', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/icons')>();
  return {
    ...actual,
    Plane: () => <span data-testid="plane-icon">✈</span>,
  };
});

vi.mock('@/lib/constants', () => ({
  footerLinks: {
    Product: [{ label: 'Features', href: '/features' }],
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/test',
      icon: () => <span data-testid="social">S</span>,
    },
  ],
}));

describe('Footer', () => {
  it('renders brand and link group', () => {
    render(<Footer />);

    expect(screen.getByText('Fligo')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByTestId('social')).toBeInTheDocument();
  });
});
