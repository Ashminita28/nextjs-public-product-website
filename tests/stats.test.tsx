import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StatsSection } from '@/components/landing/stats';
import type { Stat } from '@/lib/types/shared-types';

vi.mock('@/lib/constants', () => ({
  iconMap: {},
  colorMap: {},
}));

const stats: Stat[] = [
  { id: 1, label: 'Users', value: '100', description: 'Active' },
];

describe('StatsSection', () => {
  it('renders stats', () => {
    render(<StatsSection stats={stats} />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles empty state', () => {
    render(<StatsSection stats={[]} />);
    expect(screen.getByText(/No dashboard data/i)).toBeInTheDocument();
  });
});
