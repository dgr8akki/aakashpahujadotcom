'use client';

import { m } from 'framer-motion';
import { socialLinks } from '@/lib/config';
import { Icon, IconName } from '@/components/ui/Icons';

export function SideSocial() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.5 }}
      className="hidden md:flex fixed bottom-0 left-6 lg:left-10 flex-col items-center gap-2 z-10"
    >
      <ul className="flex flex-col items-center gap-2 list-none m-0 p-0 after:content-[''] after:block after:w-px after:h-24 after:bg-slate-light after:mt-2">
        {socialLinks.map((social) => (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="p-2.5 inline-block text-slate-light hover:text-accent hover:-translate-y-1 transition-all duration-300"
            >
              <Icon name={social.icon as IconName} size={20} />
            </a>
          </li>
        ))}
      </ul>
    </m.div>
  );
}
