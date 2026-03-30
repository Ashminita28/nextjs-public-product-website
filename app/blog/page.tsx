export const dynamic='force-dynamic';
import { getBlogs } from '@/lib/strapi';
import { buildMarketingMetadata } from '@/lib/marketing-metadata';
import { BlogListSection } from '@/components/landing/blog-listing-section';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CardDescription } from '@/components/ui/card';



export async function generateMetadata() {
  return buildMarketingMetadata({ page: 'blog' });
}

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center gap-3">
          <Badge className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
            Blog
          </Badge>
          <Separator className="flex-1" />
        </div>

        <h1 className="mb-1 text-3xl font-semibold">Insights & updates</h1>

        <CardDescription className="mb-10 text-sm">
          Aviation operations news, product updates, and industry insights.
        </CardDescription>

        <BlogListSection posts={posts} />
      </div>
    </main>
  );
}
