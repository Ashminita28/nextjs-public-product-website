import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/providers';
import { dmSans, dmMono } from '@/lib/constants';
import { getSiteUrl } from '@/lib/site';
import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(dmSans.variable, dmMono.variable)}>
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
