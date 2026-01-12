'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function SideEmail() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.5 }}
      className="hidden md:flex fixed bottom-0 right-6 lg:right-10 flex-col items-center gap-5 z-10"
    >
      <a
        href={`mailto:${siteConfig.email}`}
        className="font-mono text-xs tracking-widest text-slate-light hover:text-accent hover:-translate-y-1 transition-all duration-300"
        style={{ writingMode: 'vertical-rl' }}
      >
        {siteConfig.email}
      </a>
      <div className="w-px h-24 bg-slate-light" />
    </motion.div>
  );
}
