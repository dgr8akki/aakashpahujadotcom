'use client';

import { m } from 'framer-motion';
import { siteConfig } from '@/lib/config';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  return (
    <section className="flex items-center justify-start min-h-screen section pt-[150px] md:pt-[100px]">
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1000px]"
      >
        <m.h1 variants={itemVariants} className="mb-5 ml-1 font-mono text-accent">
          {title}
        </m.h1>

        <m.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-slate-lightest m-0 leading-tight"
        >
          {name}.
        </m.h2>

        <m.h3
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-slate m-0 mt-2 leading-tight"
        >
          {subtitle}
        </m.h3>

        <m.div
          variants={itemVariants}
          className="mt-6 max-w-[540px] text-slate leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        />

        <m.div variants={itemVariants} className="mt-12">
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn btn-lg"
          >
            Get In Touch
          </a>
        </m.div>
      </m.div>
    </section>
  );
}
