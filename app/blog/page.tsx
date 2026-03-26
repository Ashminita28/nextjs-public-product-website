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
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from '@/lib/icons';
import Link from 'next/link';

export default async function BlogPage() {
  const res = await fetchAPI<BlogResponse>('/blogs');

  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Blog
          </Badge>
          <Separator className="flex-1" />
        </div>
        <h1 className="mb-1 text-3xl font-semibold tracking-tight text-foreground">
          Insights & updates
        </h1>
        <CardDescription className="mb-10 text-sm">
          Aviation operations news, product updates, and industry insights.
        </CardDescription>

        {/* Posts */}
        <div className="space-y-4">
          {res.data.map((post) => (
            <Card
              key={post.id}
              className="group rounded-xl border-border shadow-none transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            >
              <CardHeader className="pb-2 pt-5">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <CardDescription className="text-[11px]">
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </CardDescription>
                </div>
                <CardTitle className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title ?? 'Untitled'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-end justify-between pb-5">
                {post.description ? (
                  <CardDescription className="line-clamp-2 max-w-xl text-sm leading-relaxed">
                    {parseRichText(post.description)}
                  </CardDescription>
                ) : (
                  <span />
                )}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="ml-4 shrink-0 gap-1.5 text-[12px] text-muted-foreground group-hover:text-primary"
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
