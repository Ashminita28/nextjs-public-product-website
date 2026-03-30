import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NewsletterForm } from '@/components/newsletter';

const fetchMock = vi.fn();
global.fetch = fetchMock as unknown as typeof fetch;

describe('NewsletterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation error for invalid email', async () => {
    render(<NewsletterForm />);

    fireEvent.change(screen.getByLabelText('Work email'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /join waitlist/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /invalid email/i,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits valid email to subscribe API', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Joined' }),
    } as Response);

    render(<NewsletterForm />);

    fireEvent.change(screen.getByLabelText('Work email'), {
      target: { value: 'pilot@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /join waitlist/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'pilot@example.com' }),
      });
    });
  });
});
