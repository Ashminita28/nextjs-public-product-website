import { Hero } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section className="relative flex flex-col items-center text-center py-28 px-6 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-100 w-150 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <span className="mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground tracking-wide uppercase">
        Now in public beta
      </span>

      <h1 className="relative max-w-3xl text-5xl font-semibold tracking-tight text-foreground leading-tight">
        {hero.title}
      </h1>

      <p className="relative mt-5 max-w-xl text-base text-muted-foreground leading-relaxed">
        {hero.subtitle}
      </p>

      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={hero.primary_cta_link}>{hero.primary_cta_text}</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={hero.secondary_cta_link}>{hero.secondary_cta_text}</a>
        </Button>
      </div>
    </section>
  );
}