import { Problem } from "@/lib/types";
import { parseRichText } from "@/lib/strapi-parser";

export function ProblemSection({ problem }: { problem: Problem }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl border-l-2 border-border pl-6">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          The problem
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          {problem.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {parseRichText(problem.description)}
        </p>
      </div>
    </section>
  );
}