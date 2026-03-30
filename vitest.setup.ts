import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { ReactNode } from 'react';

type LinkProps = {
  children: ReactNode;
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

if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = vi.fn();
}