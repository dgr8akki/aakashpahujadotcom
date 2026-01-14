import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { formatDate, kebabCase } from '@/lib/utils';
import { MDXContent } from '@/components/blog/MDXContent';
import { TrackedTagLink } from '@/components/blog/TrackedLinks';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="section pt-[150px]">
      <span className="breadcrumb">
        <span className="arrow">←</span>
        <Link href="/blog">All posts</Link>
      </span>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-lightest mb-4">
          {post.title}
        </h1>
        <p className="subtitle flex flex-wrap items-center gap-2">
          <time>{formatDate(post.date)}</time>
          <span>—</span>
          <span>{post.readingTime}</span>
          <span>—</span>
          {post.tags.map((tag) => (
            <TrackedTagLink
              key={tag}
              href={`/blog/tags/${kebabCase(tag)}`}
              tag={tag}
              className="tag"
            >
              #{tag}
            </TrackedTagLink>
          ))}
        </p>
      </header>

      <article className="prose prose-invert prose-xl max-w-none">
        <MDXContent content={post.content} />
      </article>
    </main>
  );
}
