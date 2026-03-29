import { Problem } from '@/lib/types/shared-types';
import { parseRichText } from '@/lib/strapi-parser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle } from '@/lib/icons';

export function ProblemSection({ problem }: { problem: Problem }) {
  const paragraphs = parseRichText(problem.description)
    .split('\n')
    .filter(Boolean);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center gap-3">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-orange-600"
          >
            <AlertTriangle className="h-3 w-3" />
            The Problem
          </Badge>
          <Separator className="flex-1" />
        </div>

        <Card className="rounded-2xl border-border shadow-none">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {problem.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-7">
            <div className="space-y-3">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {para}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
