import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/content';
import { formatDate, kebabCase } from '@/lib/utils';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: kebabCase(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `All blog posts tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  // Find the original tag name (with proper casing)
  const tags = getAllTags();
  const originalTag = tags.find((t) => kebabCase(t.tag) === tag)?.tag || tag;

  return (
    <main className="section pt-[150px]">
      <span className="breadcrumb">
        <span className="arrow">←</span>
        <Link href="/blog">All posts</Link>
      </span>

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-lightest">
          #{originalTag}
        </h1>
        <Link href="/blog/tags" className="inline-link font-mono text-sm">
          View all tags
        </Link>
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
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tags/${kebabCase(t)}`}
                    className="tag"
                  >
                    #{t}
                  </Link>
                ))}
              </p>
            </article>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-slate text-center py-12">
          No posts with this tag yet.
        </p>
      )}
    </main>
  );
}
