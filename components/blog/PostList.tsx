import type { Post } from '@/lib/content';
import { formatDate, kebabCase } from '@/lib/utils';
import { TrackedBlogLink, TrackedTagLink } from '@/components/blog/TrackedLinks';

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.slug}>
          <time className="measure" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <h2>
            <TrackedBlogLink href={`/blog/${post.slug}`} slug={post.slug} title={post.title}>
              {post.title}
            </TrackedBlogLink>
          </h2>
          <span className="mins measure">{post.readingTime}</span>
          {post.tags.length > 0 && (
            <ul className="tags links" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <TrackedTagLink href={`/blog/tags/${kebabCase(tag)}`} tag={tag}>
                    {tag}
                  </TrackedTagLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
