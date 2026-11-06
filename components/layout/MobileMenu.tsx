'use client';

import Link from 'next/link';
import { navLinks, siteConfig } from '@/lib/config';
import { analytics } from '@/lib/analytics';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div id="mobile-menu" className="menu" hidden={!isOpen}>
      <ul className="container menu__list">
        {navLinks.map((link) => (
          <li key={link.name}>
            {link.url.startsWith('/#') ? (
              <a
                href={link.url}
                onClick={() => {
                  analytics.trackMenuClick(link.name);
                  onClose();
                }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                href={link.url}
                onClick={() => {
                  analytics.trackMenuClick(link.name);
                  onClose();
                }}
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
        <li>
          <a
            href={siteConfig.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackResumeDownload()}
          >
            Resume
          </a>
        </li>
      </ul>
    </div>
  );
}
