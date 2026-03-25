import { Feature } from "@/lib/types";
import { parseRichText } from "@/lib/strapi-parser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection({ features }: { features: Feature[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Features
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need, nothing you 
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.id}
              className="rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-foreground">
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {parseRichText(f.description)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}