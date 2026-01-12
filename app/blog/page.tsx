import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { formatDate, kebabCase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts, learnings, and perspectives on software engineering, AI, and technology.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="section pt-[150px]">
      <header className="mb-12">
        <h1 className="text-6xl md:text-7xl font-semibold text-slate-lightest mb-4">
          Blog
        </h1>
        <p className="subtitle">
          <Link href="/blog/tags" className="inline-link">
            View all tags
          </Link>
        </p>
      </header>

      <ul className="fancy-list space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="!pl-0 !before:hidden">
            <article>
              <h2 className="text-2xl font-medium mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-slate-light hover:text-accent transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="subtitle flex flex-wrap items-center gap-2">
                <time>{formatDate(post.date)}</time>
                <span>—</span>
                <span>{post.readingTime}</span>
                <span>—</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${kebabCase(tag)}`}
                    className="tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </p>
            </article>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-slate text-center py-12">No posts yet.</p>
      )}
    </main>
  );
}
