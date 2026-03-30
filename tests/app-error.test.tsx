import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorView from '@/app/error';

describe('Error (app/error)', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    consoleError.mockClear();
  });

  it('renders message and calls reset when Try again is clicked', () => {
    const reset = vi.fn();
    const err = new Error('boom');

    render(<ErrorView error={err} reset={reset} />);

    expect(
      screen.getByRole('heading', { name: /something went wrong/i }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(reset).toHaveBeenCalledOnce();
    expect(consoleError).toHaveBeenCalledWith(err);
  });
});
