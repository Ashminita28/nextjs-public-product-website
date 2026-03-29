import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '@/components/layout/navbar';

vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'authenticated',
  }),
}));

vi.mock('@/components/auth/logout-button', () => ({
  LogoutButton: () => <button>Logout</button>,
}));

vi.mock('@/lib/constants', () => ({
  navLinks: [{ href: '/a', label: 'A' }],
}));

vi.mock('@/lib/icons', () => ({
  Plane: () => <span>P</span>,
  Menu: () => <span>M</span>,
}));

describe('Navbar', () => {
  it('renders logo', () => {
    render(<Navbar />);
    expect(screen.getByText('Fligo')).toBeInTheDocument();
  });

  it('shows login when no session', () => {
    render(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
