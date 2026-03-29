import { UseCase } from '@/lib/types/shared-types';
import { parseRichText } from '@/lib/strapi-parser';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { icons, iconColors } from '@/lib/constants';
export function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  return (
    <section className="bg-slate-50/60 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Use Cases
          </Badge>
          <Separator className="flex-1" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Built for every aviation team
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From ops control to executive reporting.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {useCases.map((u, i) => {
            const Icon = icons[i % icons.length];
            const iconColor = iconColors[i % iconColors.length];
            return (
              <Card
                key={u.id}
                className="group rounded-xl border-border shadow-none transition-all hover:shadow-md hover:shadow-slate-200/80"
              >
                <CardHeader className="pb-2 pt-6">
                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border ${iconColor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-[15px] font-semibold text-foreground">
                    {u.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <CardDescription className="text-sm leading-relaxed">
                    {parseRichText(u.description)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
