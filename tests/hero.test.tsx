import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from '@/components/landing/hero';
import type { Hero } from '@/lib/types';

vi.mock('@/lib/icons', () => ({
  ArrowRight: () => <span>→</span>,
  ChevronRight: () => <span>›</span>,
}));

const mockHero: Hero = {
  title: 'Flight Ops',
  subtitle: 'Optimize everything',
  primary_cta_text: 'Start',
  primary_cta_link: '/start',
  secondary_cta_text: 'Docs',
  secondary_cta_link: '/docs',
};

describe('HeroSection', () => {
  it('renders hero content', () => {
    render(<HeroSection hero={mockHero} />);
    expect(screen.getByText('Flight Ops')).toBeInTheDocument();
    expect(screen.getByText('Optimize everything')).toBeInTheDocument();
  });
});
