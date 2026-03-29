import '@testing-library/jest-dom';
import { vi } from 'vitest';

type LinkProps = {
  children: unknown;
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('next/link', () => {
  return {
    default: (props: LinkProps) => props.children,
  };
});

vi.mock('@/lib/strapi-parser', () => ({
  parseRichText: (text: string) => text,
}));

vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));
