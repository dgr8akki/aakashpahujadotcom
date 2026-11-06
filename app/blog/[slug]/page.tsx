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

  // ponytail: posts open with their own "## Title"; the page header already shows it
  const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
  const body = post.content.replace(/^\s*#{1,2}\s+(.+)\n/, (line, heading: string) =>
    norm(heading) === norm(post.title) ? '' : line
  );

  return (
    <div className="container">
      <header className="page-head">
        <Link className="back" href="/blog">
          All posts
        </Link>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <time className="measure" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="measure">{post.readingTime}</span>
          {post.tags.map((tag) => (
            <TrackedTagLink key={tag} href={`/blog/tags/${kebabCase(tag)}`} tag={tag}>
              {tag}
            </TrackedTagLink>
          ))}
        </div>
      </header>

      <article className="prose">
        <MDXContent content={body} />
      </article>
    </div>
  );
}
