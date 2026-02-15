import { Variants } from 'framer-motion';

/**
 * Smooth Apple-style easing curves
 */
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  spring: [0.34, 1.56, 0.64, 1],
  custom: [0.645, 0.045, 0.355, 1],
} as const;

/**
 * Fade in with slide up animation
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

/**
 * Scale in with spring animation
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.spring,
    },
  },
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    },
  },
};

/**
 * Container with staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Fast stagger container
 */
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Floating animation
 */
export const floatingVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Glow animation
 */
export const glowVariants: Variants = {
  animate: {
    opacity: [1, 0.7, 1],
    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Card hover animation
 */
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.4,
      ease: easings.spring,
    },
  },
};

/**
 * Button hover animation
 */
export const buttonHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: easings.spring,
    },
  },
  tap: {
    scale: 0.95,
  },
};

/**
 * Parallax scroll config
 */
export const parallaxConfig = {
  slow: { y: [0, 50] },
  medium: { y: [0, 100] },
  fast: { y: [0, 150] },
};

/**
 * Default viewport config for scroll animations
 */
export const defaultViewport = {
  once: true,
  margin: '-100px',
  amount: 0.3,
};

/**
 * Smooth scroll spring config
 */
export const scrollSpring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};
