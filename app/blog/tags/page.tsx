import Link from 'next/link';
import { getAllTags } from '@/lib/content';
import { kebabCase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Tags',
  description: 'Browse blog posts by topic and category.',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="section pt-[150px]">
      <span className="breadcrumb">
        <span className="arrow">←</span>
        <Link href="/blog">All posts</Link>
      </span>

      <h1 className="text-6xl md:text-7xl font-semibold text-slate-lightest mb-12">
        Tags
      </h1>

      <ul className="fancy-list space-y-4">
        {tags.map(({ tag, count }) => (
          <li key={tag} className="!pl-0 !before:hidden text-2xl">
            <Link
              href={`/blog/tags/${kebabCase(tag)}`}
              className="text-slate-light hover:text-accent transition-colors"
            >
              {tag}{' '}
              <span className="font-mono text-base text-slate">({count})</span>
            </Link>
          </li>
        ))}
      </ul>

      {tags.length === 0 && (
        <p className="text-slate text-center py-12">No tags yet.</p>
      )}
    </main>
  );
}
