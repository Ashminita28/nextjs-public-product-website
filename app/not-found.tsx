import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound(): React.ReactElement {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
