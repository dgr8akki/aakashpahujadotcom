'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoLoader } from './Logo';

interface LoaderProps {
  onFinish: () => void;
}

export function Loader({ onFinish }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <LogoLoader />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
