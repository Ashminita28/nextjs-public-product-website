import { fetchAPI } from '@/lib/api';
import { BlogResponse } from '@/lib/types';
import { parseRichText } from '@/lib/strapi-parser';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar } from '@/lib/icons';
import Link from 'next/link';

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetchAPI<BlogResponse>(
    `/blogs?filters[slug][$eq]=${params.slug}`,
  );
  const post = res.data?.[0]?.attributes;

  if (!post) {
    return <div className="p-10">Post not found</div>;
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-8 gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          <Link href="/blog">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>
        </Button>

        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-4 pt-8">
            <div className="mb-3 flex items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-primary"
              >
                Article
              </Badge>
              <CardDescription className="flex items-center gap-1.5 text-[11px]">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </CardDescription>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {post.title}
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="pb-10 pt-6">
            {post.content ? (
              <div className="space-y-4">
                {parseRichText(post.content)
                  .split('\n')
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-muted-foreground"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            ) : (
              <CardDescription className="italic">
                Content coming soon.
              </CardDescription>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
