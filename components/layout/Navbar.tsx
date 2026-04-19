'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { navLinks, siteConfig } from '@/lib/config';
import { analytics } from '@/lib/analytics';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100) {
        setScrolled(true);
        setHidden(y > lastY && y > 100);
      } else {
        setScrolled(false);
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((open) => {
      document.body.style.overflow = !open ? 'hidden' : 'unset';
      return !open;
    });
  };

  return (
    <>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[14px] backdrop-saturate-[140%]"
        style={{
          background: 'color-mix(in srgb, var(--color-bg) 55%, transparent)',
          borderBottom:
            '1px solid color-mix(in srgb, var(--color-line) 60%, transparent)',
        }}
      >
        <nav
          className="flex items-center justify-between mx-auto transition-all duration-500"
          style={{
            maxWidth: 1400,
            padding: scrolled ? '10px 40px' : '14px 40px',
          }}
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
          </m.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            <ol className="flex items-center gap-7 list-none m-0 p-0">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.name}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -12 }}
                  transition={{ duration: 0.3, delay: mounted ? i * 0.08 : 0 }}
                  className="font-mono text-[12.5px] text-ink-dim hover:text-amber transition-colors"
                >
                  {link.url.startsWith('/#') ? (
                    <a
                      href={link.url}
                      onClick={() => analytics.trackMenuClick(link.name)}
                    >
                      <span className="text-amber mr-1">0{i + 1}.</span>
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      onClick={() => analytics.trackMenuClick(link.name)}
                    >
                      <span className="text-amber mr-1">0{i + 1}.</span>
                      {link.name}
                    </Link>
                  )}
                </m.li>
              ))}
            </ol>

            <ThemeToggle />

            <m.a
              href={siteConfig.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackResumeDownload()}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -12 }}
              transition={{ duration: 0.3, delay: mounted ? 0.7 : 0 }}
              whileHover={{
                boxShadow: '0 0 0 4px rgba(244,165,82,.08)',
                backgroundColor: 'rgba(244,165,82,.14)',
              }}
              className="font-mono text-[12.5px] px-4 py-[9px] border border-amber rounded-lg text-amber"
              style={{ background: 'rgba(244,165,82,0.04)' }}
            >
              Resume ↗
            </m.a>
          </div>

          {/* Mobile burger */}
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            className="md:hidden w-10 h-10 rounded-[10px] border border-line-2 grid place-items-center text-ink"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path
                d="M0 1h20M0 7h20M0 13h12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </m.button>
        </nav>
      </m.header>

      <MobileMenu isOpen={menuOpen} onClose={toggleMenu} />
    </>
  );
}
