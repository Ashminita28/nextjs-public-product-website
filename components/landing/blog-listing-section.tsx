import { BlogPost } from '@/lib/types/shared-types';
import { BlogCard } from './blog-card';

export function BlogListSection({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
