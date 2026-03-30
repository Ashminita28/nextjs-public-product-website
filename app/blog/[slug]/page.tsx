export const dynamic='force-dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getBlogBySlug } from '@/lib/strapi';
import { getSiteUrl } from '@/lib/site';
import { BlogDetailContent } from '@/components/landing/blog-detail-content';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/lib/icons';




export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug))[0];
  const base = getSiteUrl();

  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | Fligo`;
  const description =
    post.description?.trim() || `Read this article on the Fligo blog.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${base}/blog/${encodeURIComponent(slug)}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug))[0];

  if (!post) {
    notFound();
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