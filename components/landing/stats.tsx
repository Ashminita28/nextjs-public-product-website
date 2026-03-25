import { Stat } from "@/lib/types";

export function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section className="px-6 py-16 border-y border-border">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 divide-x-0 md:divide-x divide-border">
          {stats.map((s, i) => (
            <div key={s.id} className={`text-center px-6 ${i > 0 ? "border-l border-border" : ""}`}>
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}