import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '@/components/auth/login-form';

const signIn = vi.fn();

vi.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => signIn(...args),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signIn.mockResolvedValue({ ok: true, error: null });
  });

  it('submits credentials via signIn', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secretpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({
          email: 'user@example.com',
          password: 'secretpass',
          redirect: false,
        }),
      );
    });
  });
});
