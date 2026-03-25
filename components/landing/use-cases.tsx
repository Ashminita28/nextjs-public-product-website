import { UseCase } from "@/lib/types";
import { parseRichText } from "@/lib/strapi-parser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Use Cases
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Built for teams across industries.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {useCases.map((u) => (
            <Card
              key={u.id}
              className="group rounded-xl border border-border bg-card transition-all hover:border-blue-500/40 hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground">
                  {u.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {parseRichText(u.description)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}