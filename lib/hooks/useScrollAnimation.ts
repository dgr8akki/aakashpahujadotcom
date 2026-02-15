'use client';

import { useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * Hook to track scroll progress
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { scrollYProgress, scaleX };
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/**
 * Hook to detect if element is in viewport
 */
export function useInViewport(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-100px',
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isInView;
}

/**
 * Hook for smooth scroll-based transforms
 */
export function useScrollTransform(
  inputRange: number[],
  outputRange: number[]
) {
  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, inputRange, outputRange);
  const smoothTransform = useSpring(transform, {
    stiffness: 100,
    damping: 30,
  });

  return smoothTransform;
}

/**
 * Hook to track scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  );
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return scrollDirection;
}
