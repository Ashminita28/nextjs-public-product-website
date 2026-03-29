import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getDashboardStats, getSubscriberCount } from '@/lib/strapi';
import { StatsSection } from '@/components/landing/stats';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const stats = await getDashboardStats();
  const subscribeCount = await getSubscriberCount();
  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/*HEADER*/}
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Dashboard
            </h1>

            <CardDescription className="mt-1 text-sm">
              Welcome back,{' '}
              <span className="font-medium text-foreground">
                {session.user?.email}
              </span>
            </CardDescription>
          </div>

          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </Badge>
        </div>
        <Separator className="my-6" />
        {/*STATS*/}
        <StatsSection stats={stats} />

        {/* SUBSCRIBERS */}
        <div className="mt-6">
          <h2 className="text-lg font-medium">Subscribers</h2>

          <div className="mt-2 rounded-xl border p-4 bg-white">
            <p className="text-2xl font-semibold">{subscribeCount}</p>
            <p className="text-sm text-muted-foreground">
              Total newsletter subscribers
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
