import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/content';
import { kebabCase } from '@/lib/utils';
import { PostList } from '@/components/blog/PostList';
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
    <div className="container">
      <header className="page-head">
        <Link className="back" href="/blog">
          All posts
        </Link>
        <h1>{originalTag}</h1>
        <p className="links">
          <Link className="link" href="/blog/tags">
            View all tags
          </Link>
        </p>
      </header>

      <section aria-label="Posts">
        <PostList posts={posts} />
      </section>

      {posts.length === 0 && <p className="empty">No posts with this tag yet.</p>}
      <div className="page-foot" />
    </div>
  );
}
