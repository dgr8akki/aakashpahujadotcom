'use client';

import Link from 'next/link';
import { analytics } from '@/lib/analytics';

interface TrackedBlogLinkProps {
  href: string;
  slug: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function TrackedBlogLink({
  href,
  slug,
  title,
  className,
  children,
}: TrackedBlogLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => analytics.trackBlogClick(slug, title)}
      className={className}
    >
      {children}
    </Link>
  );
}

interface TrackedTagLinkProps {
  href: string;
  tag: string;
  className?: string;
  children: React.ReactNode;
}

export function TrackedTagLink({
  href,
  tag,
  className,
  children,
}: TrackedTagLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => analytics.trackTagClick(tag)}
      className={className}
    >
      {children}
    </Link>
  );
}
