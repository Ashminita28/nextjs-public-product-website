import { Feature } from '@/lib/types/shared-types';
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
import { ReactElement } from 'react';

type FeaturesSectionProps = {
  features: Feature[];
};

export function FeaturesSection({
  features,
}: FeaturesSectionProps): ReactElement {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary"
          >
            Features
          </Badge>
          <Separator className="flex-1" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Everything your ops team needs
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Purpose-built tools for modern aviation operations.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[i % icons.length];
            const iconColor = iconColors[i % iconColors.length];
            return (
              <Card
                key={f.id}
                className="group relative overflow-hidden rounded-xl border-border shadow-none transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="pb-2 pt-6">
                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border ${iconColor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-[15px] font-semibold text-foreground">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <CardDescription className="text-sm leading-relaxed">
                    {parseRichText(f.description)}
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
