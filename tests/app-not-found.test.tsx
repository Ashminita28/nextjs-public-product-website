import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '@/app/not-found';

describe('NotFound', () => {
  it('renders not found copy', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not exist or has been moved/i),
    ).toBeInTheDocument();
  });
});
