'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { staggerContainer, fadeInUp, scaleIn, floatingVariants, buttonHover } from '@/lib/animations';

interface HeroProps {
  data: {
    title: string;
    name: string;
    subtitle: string;
    content: string;
  };
}

export function Hero({ data }: HeroProps) {
  const { title, name, subtitle, content } = data;
  const { scrollY } = useScroll();

  // Scroll-based animations
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative flex items-center justify-start min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Floating orbs */}
      <m.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      />
      <m.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl"
        style={{
          y: useTransform(scrollY, [0, 500], [0, -150]),
        }}
      />

      {/* Content */}
      <m.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 py-32"
      >
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[1000px]"
        >
          {/* Overline */}
          <m.div
            variants={fadeInUp}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
            <h1 className="font-mono text-sm md:text-base text-accent uppercase tracking-widest">
              {title}
            </h1>
          </m.div>

          {/* Main heading with gradient */}
          <m.h2
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold m-0 leading-[1.1] mb-4"
          >
            <span className="text-gradient animate-glow">
              {name}
            </span>
          </m.h2>

          {/* Subtitle */}
          <m.h3
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate m-0 leading-[1.2] mb-8"
          >
            {subtitle}
          </m.h3>

          {/* Description */}
          <m.div
            variants={fadeInUp}
            className="mt-8 max-w-[600px] text-lg md:text-xl text-slate-light leading-relaxed"
          >
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
          </m.div>

          {/* CTA Button */}
          <m.div
            variants={scaleIn}
            className="mt-12 flex items-center gap-6"
          >
            <m.a
              href={`mailto:${siteConfig.email}`}
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-navy font-semibold rounded-2xl overflow-hidden shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
            >
              <span className="relative z-10">Get In Touch</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-yellow to-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </m.a>
          </m.div>
        </m.div>
      </m.div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </m.div>
    </section>
  );
}
