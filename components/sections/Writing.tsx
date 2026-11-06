import Link from 'next/link';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { TrackedBlogLink } from '@/components/blog/TrackedLinks';

export function Writing({ posts, total }: { posts: Post[]; total: number }) {
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="section section--s" aria-labelledby="writing-title">
      <div className="container">
        <div className="head">
          <h2 id="writing-title">Build logs and notes</h2>
          <p className="lead">What I built, what broke, and what I&rsquo;d do differently.</p>
        </div>

        <ul className="posts">
          {posts.map((post) => (
            <li key={post.slug}>
              <time className="measure" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <h3>
                <TrackedBlogLink href={`/blog/${post.slug}`} slug={post.slug} title={post.title}>
                  {post.title}
                </TrackedBlogLink>
              </h3>
              <span className="mins measure">{post.readingTime}</span>
            </li>
          ))}
        </ul>

        <p className="posts__more">
          <Link className="btn btn--quiet" href="/blog">
            All {total} posts
          </Link>
        </p>
      </div>
    </section>
  );
}
