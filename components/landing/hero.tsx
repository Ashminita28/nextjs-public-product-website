import { Hero } from '@/lib/types/shared-types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ChevronRight } from '@/lib/icons';
import { sanitizeHref } from '@/lib/security';

export function HeroSection({ hero }: { hero: Hero }) {
  const primaryHref = sanitizeHref(hero.primary_cta_link);
  const secondaryHref = sanitizeHref(hero.secondary_cta_link);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Sky glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-150 -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Now in public beta
        </Badge>

        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {hero.title}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {hero.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-11 gap-2 px-6 text-[13px] shadow-sm shadow-primary/20"
          >
            <a href={primaryHref}>
              {hero.primary_cta_text}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 gap-1.5 px-6 text-[13px] text-muted-foreground hover:text-foreground"
          >
            <a href={secondaryHref}>
              {hero.secondary_cta_text}
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <Separator className="mx-auto mt-12 max-w-xs" />

        <p className="mt-6 text-xs text-muted-foreground">
          Trusted by operations teams at{' '}
          <span className="font-semibold text-foreground">50+ airlines</span>{' '}
          worldwide
        </p>
      </div>
    </section>
  );
}