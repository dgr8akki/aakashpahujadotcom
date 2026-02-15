'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';
import { siteConfig } from '@/lib/config';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, defaultViewport } from '@/lib/animations';

interface AboutProps {
  data: {
    title: string;
    skills: string[];
    content: string;
  };
}

export function About({ data }: AboutProps) {
  const { title, skills, content } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={sectionRef} className="section relative py-32">
      {/* Background decoration */}
      <m.div
        style={{ y: imageY }}
        className="absolute top-1/4 -right-48 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl pointer-events-none"
      />

      <m.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative z-10"
      >
        {/* Section heading */}
        <m.div variants={fadeInUp} className="mb-16">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-accent text-xl font-semibold">01.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-lightest m-0">
              {title}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate/20 to-transparent" />
          </div>
        </m.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Content */}
          <m.div variants={slideInLeft} className="lg:w-3/5">
            <div className="glass-card p-8 md:p-10">
              <div className="text-slate-light leading-relaxed text-lg">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-5">{children}</p>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-yellow transition-colors duration-300"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-slate-lightest">{children}</strong>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

              {skills.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate/10">
                  <h3 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">
                    Technologies I work with
                  </h3>
                  <ul className="grid grid-cols-2 gap-3 p-0 list-none">
                    {skills.map((skill, i) => (
                      <m.li
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 font-mono text-sm text-slate-light"
                      >
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {skill}
                      </m.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </m.div>

          {/* Image */}
          <m.div variants={slideInRight} className="lg:w-2/5 w-full max-w-[400px]">
            <m.a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block group"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent-pink/20 to-accent-yellow/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate/10 shadow-soft-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-pink/20 mix-blend-overlay" />
                <Image
                  src="/images/me.jpeg"
                  alt="Aakash Pahuja"
                  width={400}
                  height={400}
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-accent/30 translate-x-6 translate-y-6 -z-10 transition-all duration-500 ease-apple-spring group-hover:translate-x-4 group-hover:translate-y-4 group-hover:border-accent/50" />
            </m.a>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
