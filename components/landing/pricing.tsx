import { PricingPlan } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PricingSection({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Pricing
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Simple, transparent pricing.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {plans.map((p, i) => {
            const isHighlighted = i === 1; // middle plan is featured
            return (
              <Card
                key={p.id}
                className={`rounded-xl border transition-shadow hover:shadow-md ${
                  isHighlighted
                    ? "border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/40"
                    : "border-border bg-card"
                }`}
              >
                <CardHeader>
                  {isHighlighted && (
                    <span className="mb-2 inline-block rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                      Most popular
                    </span>
                  )}
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {p.plan_name}
                  </CardTitle>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                    ₹{p.price}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full"
                    variant={isHighlighted ? "default" : "outline"}
                  >
                    Get started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}