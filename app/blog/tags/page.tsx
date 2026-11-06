import Link from 'next/link';
import { getAllTags } from '@/lib/content';
import { kebabCase } from '@/lib/utils';
import { TrackedTagLink } from '@/components/blog/TrackedLinks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Tags',
  description: 'Browse blog posts by topic and category.',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container">
      <header className="page-head">
        <Link className="back" href="/blog">
          All posts
        </Link>
        <h1>Tags</h1>
      </header>

      <ul className="tag-list">
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <TrackedTagLink href={`/blog/tags/${kebabCase(tag)}`} tag={tag}>
              {tag}
              <span className="measure">
                {count} {count === 1 ? 'post' : 'posts'}
              </span>
            </TrackedTagLink>
          </li>
        ))}
      </ul>

      {tags.length === 0 && <p className="empty">No tags yet.</p>}
    </div>
  );
}
