'use client';

import { socialLinks } from '@/lib/config';
import { Icon, IconName } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-6 px-6 text-center">
      {/* Mobile Social Icons */}
      <div className="flex items-center justify-center gap-4 mb-4 md:hidden">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="p-2 text-slate-light hover:text-accent hover:-translate-y-1 transition-all duration-300"
          >
            <Icon name={social.icon as IconName} size={20} />
          </a>
        ))}
      </div>

      <a
        href="https://github.com/dgr8akki/portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs text-slate hover:text-accent transition-colors"
      >
        <div>Designed & Built by Aakash Pahuja</div>
      </a>
    </footer>
  );
}
