'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navLinks, siteConfig } from '@/lib/config';
import { analytics } from '@/lib/analytics';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <nav className="container nav__bar" aria-label="Main">
        <Link href="/" className="nav__mark" aria-label="Aakash Pahuja, home">
          Aakash Pahuja
        </Link>

        <ul className="nav__links">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.url.startsWith('/#') ? (
                <a href={link.url} onClick={() => analytics.trackMenuClick(link.name)}>
                  {link.name}
                </a>
              ) : (
                <Link href={link.url} onClick={() => analytics.trackMenuClick(link.name)}>
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <a
          className="nav__resume"
          href={siteConfig.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.trackResumeDownload()}
        >
          Resume
        </a>

        <button
          type="button"
          className="btn btn--quiet nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
