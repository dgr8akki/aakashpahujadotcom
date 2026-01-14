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
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy/80 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <m.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 z-40 w-[min(75vw,400px)] bg-navy-light shadow-[-10px_0_30px_-15px_rgba(2,12,27,0.7)] md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full p-12">
              <ol className="list-none m-0 p-0 w-full text-center">
                {navLinks.map((link, i) => (
                  <m.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="mb-5"
                  >
                    <span className="block text-accent font-mono text-sm mb-1">
                      0{i + 1}.
                    </span>
                    {link.url.startsWith('/#') ? (
                      <a
                        href={link.url}
                        onClick={() => {
                          analytics.trackMenuClick(link.name);
                          onClose();
                        }}
                        className="text-slate-lightest text-lg font-medium hover:text-accent transition-colors"
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
                        className="text-slate-lightest text-lg font-medium hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </m.li>
                ))}
              </ol>

              <m.a
                href={siteConfig.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackResumeDownload()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="btn btn-lg mt-10"
              >
                Resume
              </m.a>
            </nav>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}
