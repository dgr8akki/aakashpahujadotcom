'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils';

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  if (!posts.length) return null;
  const visible = posts.slice(0, 7);

  return (
    <section id="blog" className="py-[110px]">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-end mb-[60px]"
        >
          <h2 className="section-title">
            <span className="num">05.</span>
            Writing &amp; Notes
          </h2>
          <span className="section-rule" />
        </m.div>

        <ul className="list-none p-0 m-0 border-t border-line">
          {visible.map((post, i) => (
            <m.li
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="border-b border-line"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="post-row group relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-center py-7 px-2 transition-[padding] duration-200 hover:pl-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg,rgba(244,165,82,0.06),transparent 40%)',
                  }}
                />
                <span className="relative font-mono text-[12px] text-ink-mute whitespace-nowrap md:min-w-[180px]">
                  {formatDate(post.date)} · {post.readingTime}
                </span>
                <span className="relative">
                  <span className="block font-serif text-[24px] text-ink leading-tight tracking-[-0.01em]">
                    {post.title}
                  </span>
                  {post.tags.length > 0 && (
                    <span className="mt-1.5 flex flex-wrap gap-2 font-mono text-[10.5px] tracking-[0.04em] text-amber">
                      {post.tags.slice(0, 5).map((t) => (
                        <span key={t} className="opacity-80">
                          #{t}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <span className="relative font-mono text-xl text-ink-mute group-hover:text-amber group-hover:translate-x-1.5 transition-all duration-200">
                  →
                </span>
              </Link>
            </m.li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2.5 font-mono text-[13px] text-amber border border-amber rounded-[10px] px-[22px] py-[14px] transition-all hover:bg-[rgba(244,165,82,0.1)] hover:shadow-[0_0_0_4px_rgba(244,165,82,0.08)]"
          >
            Read all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
