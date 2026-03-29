'use client';

import { useEffect, type RefObject } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import { scrollAndFocusElement } from '@/lib/aria';

// After submit, scrolls to the first field with a validation error.
export function useScrollToFirstFieldError<T extends FieldValues>(
  errors: FieldErrors<T>,
  fieldRefs: RefObject<Partial<Record<keyof T, HTMLElement | null>>>,
  submitCount: number,
): void {
  useEffect(() => {
    if (submitCount === 0) {
      return;
    }
    const keys = Object.keys(errors) as (keyof T)[];
    const first = keys[0];
    if (first === undefined) {
      return;
    }
    scrollAndFocusElement(fieldRefs.current?.[first] ?? null);
  }, [errors, submitCount, fieldRefs]);
}
