import { getBlogBySlug } from '@/lib/strapi';
import { BlogDetailContent } from '@/components/landing/blog-detail-content';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/lib/icons';
import Link from 'next/link';

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug))[0];

  if (!post) {
    return <div className="p-10">Post not found</div>;
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>
        </Button>

        <BlogDetailContent post={post} />
      </div>
    </main>
  );
}
