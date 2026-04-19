'use client';

import { socialLinks } from '@/lib/config';
import { Icon, IconName } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="relative z-10 py-8 text-center border-t border-line">
      <div className="flex xl:hidden items-center justify-center gap-6 mb-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="text-ink-mute hover:text-amber transition-colors"
          >
            <Icon name={social.icon as IconName} size={18} />
          </a>
        ))}
      </div>
      <p className="font-mono text-[11.5px] text-ink-mute m-0">
        Designed &amp; built with care by Aakash Pahuja · Dublin · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
