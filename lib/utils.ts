import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PricingPlan } from './types/shared-types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortPlans(plans: PricingPlan[]): PricingPlan[] {
  return [...plans].sort((a, b) => {
    const pa = isNaN(Number(a.price)) ? Infinity : Number(a.price);
    const pb = isNaN(Number(b.price)) ? Infinity : Number(b.price);
    return pa - pb;
  });
}

export function formatDate(date: string, type: 'short' | 'long' = 'short') {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: type === 'short' ? 'short' : 'long',
    year: 'numeric',
  });
}

export function splitContent(content: string): string[] {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
