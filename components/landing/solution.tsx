import { Solution } from '@/lib/types/shared-types';
import { parseRichText } from '@/lib/strapi-parser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from '@/lib/icons';

export function SolutionSection({ solutions }: { solutions: Solution[] }) {
  const main = solutions.find((s) => s.title && s.description);
  if (!main) return null;

  const lines = parseRichText(main.description).split('\n').filter(Boolean);
  const introLines = lines.filter((l) => !l.startsWith('-') && l !== 'points:');
  const bulletLines = lines
    .filter((l) => l.startsWith('-'))
    .map((l) => l.slice(1).trim());

  return (
    <section className="bg-slate-50/60 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center gap-3">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-600"
          >
            <CheckCircle className="h-3 w-3" />
            The Solution
          </Badge>
          <Separator className="flex-1" />
        </div>

        <Card className="rounded-2xl border-border shadow-none">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {main.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-7">
            {introLines.map((para, i) => (
              <p
                key={i}
                className="mb-3 text-base leading-relaxed text-muted-foreground"
              >
                {para}
              </p>
            ))}

            {bulletLines.length > 0 && (
              <>
                <Separator className="my-5" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {bulletLines.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
