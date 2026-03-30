import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignupForm } from '@/components/auth/register-form';

const signIn = vi.fn();
const fetchMock = vi.fn();

global.fetch = fetchMock as unknown as typeof fetch;

vi.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => signIn(...args),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'ok' }),
    });
    signIn.mockResolvedValue({ ok: true, error: null });
  });

  it('POSTs register then signs in with same credentials', async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByPlaceholderText('Full name'), {
      target: { value: 'Pat Example' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'pat@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/register',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Pat Example',
            email: 'pat@example.com',
            password: 'password123',
          }),
        }),
      );
    });

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({
          email: 'pat@example.com',
          password: 'password123',
          redirect: false,
        }),
      );
    });
  });
});
