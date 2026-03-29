import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Newsletter } from '@/components/newsletter';

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('Newsletter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText('you@airline.com')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    render(<Newsletter />);
    fireEvent.click(screen.getByText('Subscribe'));

    expect(
      await screen.findByText(/Something went wrong/i),
    ).toBeInTheDocument();
  });

  it('submits successfully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
    } as Response);

    render(<Newsletter />);

    fireEvent.change(screen.getByPlaceholderText('you@airline.com'), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.click(screen.getByText('Subscribe'));

    await waitFor(() => {
      expect(screen.getByText(/You're subscribed/i)).toBeInTheDocument();
    });
  });
});
