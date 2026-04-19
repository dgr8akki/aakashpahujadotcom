'use client';

import { m } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function SideEmail() {
  return (
    <m.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.2 }}
      className="hidden xl:flex fixed bottom-0 right-[30px] z-30 flex-col items-center gap-8"
    >
      <a
        href={`mailto:${siteConfig.email}`}
        className="font-mono text-xs tracking-[0.18em] text-ink-mute hover:text-amber transition-colors"
        style={{ writingMode: 'vertical-rl' }}
      >
        {siteConfig.email}
      </a>
      <span className="w-px h-[110px] bg-gradient-to-b from-line-2 to-transparent" />
    </m.aside>
  );
}
