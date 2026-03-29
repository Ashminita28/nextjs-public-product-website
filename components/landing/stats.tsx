import { Stat } from '@/lib/types/shared-types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { iconMap, colorMap } from '@/lib/constants';
import { Users } from '@/lib/icons';

export function StatsSection({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) {
    return (
      <div className="mt-10 text-center text-sm text-muted-foreground">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = iconMap[stat.label] || Users;
        const iconColor =
          colorMap[stat.label] || 'border-gray-100 bg-gray-50 text-gray-600';

        return (
          <Card key={stat.id} className="rounded-xl border-border shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-[13px] font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border ${iconColor}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <p className="font-mono text-2xl font-semibold text-foreground">
                {stat.value}
              </p>
              {stat.description && (
                <CardDescription className="mt-1.5 text-[11px]">
                  {stat.description}
                </CardDescription>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
