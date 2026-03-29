import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane } from '@/lib/icons';
import { footerLinks, socials } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Top row — brand + nav columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Button
              asChild
              variant="ghost"
              className="w-fit gap-2 px-0 hover:bg-transparent"
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

            <p className="max-w-50 text-[13px] leading-relaxed text-muted-foreground">
              Real-time flight operations and performance intelligence for
              modern airlines.
            </p>

            <Badge
              variant="outline"
              className="w-fit gap-1.5 rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              System operational
            </Badge>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-foreground">
                {group}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Button
                      asChild
                      variant="link"
                      className="h-auto p-0 text-[13px] text-muted-foreground hover:text-foreground"
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        {/* Bottom row — copyright + socials */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} Fligo, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <Button
                key={label}
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Link href={href} aria-label={label}>
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
