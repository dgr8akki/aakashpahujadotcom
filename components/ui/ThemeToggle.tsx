'use client';

import { m } from 'framer-motion';
import { useTheme } from '@/lib/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <m.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-slate/20 border border-slate/30 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Toggle slider */}
      <m.div
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-yellow shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 0 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon */}
        <m.div
          initial={false}
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0.8,
          }}
          transition={{
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {theme === 'dark' ? (
            // Moon icon
            <svg
              className="w-4 h-4 text-navy"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon
            <svg
              className="w-4 h-4 text-navy"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </m.div>
      </m.div>

      {/* Background glow effect */}
      <m.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: theme === 'dark' ? [0, 0.3, 0] : [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255, 158, 100, 0.3) 0%, transparent 70%)',
        }}
      />
    </m.button>
  );
}
