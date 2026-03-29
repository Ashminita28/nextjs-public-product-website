import { PricingPlan } from '@/lib/types/shared-types';
import { sortPlans } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check } from '@/lib/icons';
import { planPerks } from '@/lib/constants';

type Props = {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
  isPage?: boolean;
};

export function PricingSection({
  plans,
  title = 'Simple, transparent pricing',
  subtitle = 'No hidden fees. Cancel anytime.',
  isPage = false,
}: Props) {
  const sorted = sortPlans(plans);

  return (
    <section
      className={isPage ? 'bg-slate-50/60 px-6 py-16' : 'bg-white px-6 py-24'}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <Badge className="rounded-full border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            Pricing
          </Badge>
          <Separator className="flex-1" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {sorted.map((p, i) => {
            const isFeatured = i === 1;
            const perks = planPerks[i] ?? planPerks[0];

            return (
              <Card
                key={p.id}
                className={`relative flex flex-col rounded-xl transition-all ${
                  isFeatured
                    ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20'
                    : 'border-border hover:shadow-md'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className={`pb-4 ${isFeatured ? 'pt-8' : 'pt-6'}`}>
                  <CardDescription className="text-[11px] font-semibold uppercase tracking-widest">
                    {p.plan_name}
                  </CardDescription>

                  <CardTitle className="mt-2 flex items-baseline gap-1">
                    {isNaN(Number(p.price)) ? (
                      <span className="text-3xl font-semibold">Custom</span>
                    ) : (
                      <>
                        <span className="text-base text-muted-foreground">
                          ₹
                        </span>
                        <span className="text-3xl font-semibold">
                          {p.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /mo
                        </span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <Separator className="mb-5" />
                  <ul className="space-y-3">
                    {perks.map((perk, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm">
                        <Check
                          className={`h-3.5 w-3.5 ${isFeatured ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pb-6">
                  <Button
                    className="w-full text-[13px]"
                    variant={isFeatured ? 'default' : 'outline'}
                  >
                    {isNaN(Number(p.price)) ? 'Contact Sales' : 'Get started'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {isPage && (
          <p className="mt-10 text-center text-[12px] text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        )}
      </div>
    </section>
  );
}
