import { Solution } from "@/lib/types";
import { parseRichText } from "@/lib/strapi-parser";

export function SolutionSection({ solutions }: { solutions: Solution[] }) {
  return (
    <section className="px-6 py-20 bg-muted/20">
      <div className="mx-auto max-w-3xl space-y-12">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          The solution
        </span>
        {solutions.map((s) => (
          <div key={s.id}>
            {s.title && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h2>
            )}
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {parseRichText(s.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}