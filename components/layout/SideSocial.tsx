'use client';

import { m } from 'framer-motion';
import { socialLinks } from '@/lib/config';
import { Icon, IconName } from '@/components/ui/Icons';

export function SideSocial() {
  return (
    <m.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.2 }}
      className="hidden xl:flex fixed bottom-0 left-[30px] z-30 flex-col items-center gap-[18px] after:content-[''] after:w-px after:h-[110px] after:bg-gradient-to-b after:from-line-2 after:to-transparent"
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="grid place-items-center w-7 h-7 text-ink-mute hover:text-amber hover:-translate-y-0.5 transition-all duration-200"
        >
          <Icon name={social.icon as IconName} size={20} />
        </a>
      ))}
    </m.aside>
  );
}
