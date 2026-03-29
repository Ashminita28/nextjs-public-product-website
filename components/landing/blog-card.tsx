import { BlogPost } from '@/lib/types/shared-types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from '@/lib/icons';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group rounded-xl border-border transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
      <CardHeader className="pb-2 pt-5">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <CardDescription className="text-[11px]">
            {formatDate(post.publishedAt)}
          </CardDescription>
        </div>

        <CardTitle className="text-base font-semibold transition-colors group-hover:text-primary">
          {post.title ?? 'Untitled'}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-end justify-between pb-5">
        {post.description ? (
          <CardDescription className="line-clamp-2 max-w-xl text-sm leading-relaxed">
            {post.description}
          </CardDescription>
        ) : (
          <span />
        )}

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-4 gap-1.5 text-[12px] text-muted-foreground group-hover:text-primary"
        >
          <Link href={`/blog/${post.slug}`}>
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
