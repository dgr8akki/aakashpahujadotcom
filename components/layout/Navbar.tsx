'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { navLinks, siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setScrolled(false);
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 px-6 md:px-10 lg:px-12',
          'transition-all duration-300 ease-custom',
          scrolled
            ? 'h-[70px] bg-navy/90 backdrop-blur-md shadow-nav'
            : 'h-[100px] bg-transparent'
        )}
      >
        <nav className="flex items-center justify-between h-full max-w-[1600px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" aria-label="Home" className="block">
              <Logo className="hover:opacity-80 transition-opacity" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <ol className="flex items-center gap-1 list-none m-0 p-0">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
                  transition={{ duration: 0.3, delay: mounted ? i * 0.1 : 0 }}
                  className="font-mono text-sm"
                >
                  {link.url.startsWith('/#') ? (
                    <a
                      href={link.url}
                      className="px-4 py-3 inline-block text-slate-lightest hover:text-accent transition-colors"
                    >
                      <span className="text-accent mr-1">0{i + 1}.</span>
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.url}
                      className="px-4 py-3 inline-block text-slate-lightest hover:text-accent transition-colors"
                    >
                      <span className="text-accent mr-1">0{i + 1}.</span>
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ol>
            
            <motion.a
              href={siteConfig.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
              transition={{ duration: 0.3, delay: mounted ? navLinks.length * 0.1 : 0 }}
              className="btn ml-4"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            className="md:hidden relative z-50 w-9 h-6 flex flex-col justify-between"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'block w-full h-0.5 bg-accent rounded transition-all duration-300 origin-left',
                menuOpen && 'rotate-45 translate-x-px'
              )}
            />
            <span
              className={cn(
                'block w-full h-0.5 bg-accent rounded transition-all duration-300',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block w-full h-0.5 bg-accent rounded transition-all duration-300 origin-left',
                menuOpen && '-rotate-45 translate-x-px'
              )}
            />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => toggleMenu()} />
    </>
  );
}
