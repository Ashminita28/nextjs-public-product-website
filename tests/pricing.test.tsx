import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PricingSection } from '@/components/landing/pricing';
import type { PricingPlan } from '@/lib/types';

vi.mock('@/lib/constants', () => ({
  planPerks: [['perk1', 'perk2']],
}));

const plans: PricingPlan[] = [{ id: 1, plan_name: 'Basic', price: '10' }];

describe('PricingSection', () => {
  it('renders pricing', () => {
    render(<PricingSection plans={plans} />);

    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
