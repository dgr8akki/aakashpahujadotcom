'use client';

import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { navLinks, siteConfig } from '@/lib/config';
import { analytics } from '@/lib/analytics';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] md:hidden flex flex-col px-8 py-20 backdrop-blur-[16px]"
          style={{ background: 'rgba(10,6,14,.85)' }}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-xl border border-line-2 text-ink text-2xl grid place-items-center"
          >
            ×
          </button>

          <nav className="flex flex-col">
            {navLinks.map((link, i) => {
              const inner = (
                <>
                  <span className="font-mono text-[14px] text-amber mr-3">
                    0{i + 1}.
                  </span>
                  {link.name}
                </>
              );
              const baseClass =
                'font-serif text-[40px] text-ink py-3.5 border-b border-line';
              return (
                <m.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  {link.url.startsWith('/#') ? (
                    <a
                      href={link.url}
                      onClick={() => {
                        analytics.trackMenuClick(link.name);
                        onClose();
                      }}
                      className={baseClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      onClick={() => {
                        analytics.trackMenuClick(link.name);
                        onClose();
                      }}
                      className={baseClass}
                    >
                      {inner}
                    </Link>
                  )}
                </m.div>
              );
            })}
            <m.a
              href={siteConfig.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackResumeDownload()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
              className="font-serif text-[40px] text-ink py-3.5"
            >
              <span className="font-mono text-[14px] text-amber mr-3">↗</span>
              Resume
            </m.a>
          </nav>
        </m.aside>
      )}
    </AnimatePresence>
  );
}
