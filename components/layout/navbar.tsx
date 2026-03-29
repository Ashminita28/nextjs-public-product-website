'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { navLinks } from '@/lib/constants';
import { Plane, Menu } from '@/lib/icons';

export function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* ── Logo ── */}
        <Button
          asChild
          variant="ghost"
          className="gap-2 px-0 hover:bg-transparent"
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white">
              <Plane className="h-3.5 w-3.5 -rotate-45" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Fligo
            </span>
          </Link>
        </Button>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          <Separator orientation="vertical" className="mx-3 h-4" />

          {session ? (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 text-[13px]"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <Button asChild size="sm" className="h-8 text-[13px]">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>

        {/* ── Mobile hamburger ── */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 p-0">
            <div className="flex h-14 items-center border-b border-border px-6">
              <span className="text-sm font-semibold text-foreground">
                Fligo
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-[13px] text-muted-foreground hover:text-foreground"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </SheetClose>
              ))}

              <Separator className="my-3" />

              {session ? (
                <>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start text-[13px]"
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </SheetClose>
                  <LogoutButton />
                </>
              ) : (
                <SheetClose asChild>
                  <Button asChild className="w-full text-[13px]">
                    <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
