import type { ReactElement } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export function RouteLoading(): ReactElement {
  return (
    <section
      className="flex min-h-[calc(100vh-56px)] items-center justify-center px-6 py-16"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="w-full max-w-sm space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <span className="sr-only">Loading...</span>
      </div>
    </section>
  );
}
