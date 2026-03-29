import { BlogPost } from '@/lib/types/shared-types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/lib/icons';
import { formatDate, splitContent } from '@/lib/utils';

export function BlogDetailContent({ post }: { post: BlogPost }) {
  const paragraphs = post.content ? splitContent(post.content) : [];

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader className="pb-4 pt-8">
        <div className="mb-3 flex items-center gap-2">
          <Badge className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
            Article
          </Badge>

          <CardDescription className="flex items-center gap-1.5 text-[11px]">
            <Calendar className="h-3 w-3" />
            {formatDate(post.publishedAt, 'long')}
          </CardDescription>
        </div>

        <CardTitle className="text-2xl font-semibold md:text-3xl">
          {post.title}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pb-10 pt-6">
        {paragraphs.length > 0 ? (
          <div className="space-y-4">
            {paragraphs.map((para, i) => (
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
  );
}
