import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { PostList } from '@/components/blog/PostList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts, learnings, and perspectives on software engineering, AI, and technology.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <header className="page-head">
        <h1>Blog</h1>
        <p className="lead">Build logs and notes on software engineering, AI and the web.</p>
        <p className="links">
          <Link className="link" href="/blog/tags">
            View all tags
          </Link>
        </p>
      </header>

      <section aria-label="Posts">
        <PostList posts={posts} />
      </section>

      {posts.length === 0 && <p className="empty">No posts yet.</p>}
    </div>
  );
}
