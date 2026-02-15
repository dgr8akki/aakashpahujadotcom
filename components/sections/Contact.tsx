'use client';

import { m } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { fadeInUp, scaleIn, staggerContainer, defaultViewport, buttonHover } from '@/lib/animations';

interface ContactProps {
  data: {
    title: string;
    content: string;
  };
}

export function Contact({ data }: ContactProps) {
  const { title, content } = data;

  return (
    <section id="contact" className="section relative py-48 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <m.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative z-10 max-w-[800px] mx-auto text-center"
      >
        {/* Overline */}
        <m.div variants={fadeInUp} className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
          <p className="font-mono text-sm text-accent uppercase tracking-widest">
            05. What's Next?
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
        </m.div>

        {/* Title */}
        <m.h2
          variants={fadeInUp}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8"
        >
          <span className="text-gradient">{title}</span>
        </m.h2>

        {/* Description */}
        <m.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-slate-light leading-relaxed mb-12 max-w-[600px] mx-auto"
        >
          {content}
        </m.p>

        {/* CTA Button */}
        <m.div variants={scaleIn} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <m.a
            href={`mailto:${siteConfig.email}`}
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-accent text-navy font-bold rounded-2xl overflow-hidden shadow-glow transition-shadow duration-300 hover:shadow-glow-lg text-lg"
          >
            <span className="relative z-10">Say Hello</span>
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-yellow to-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </m.a>
        </m.div>

        {/* Social links */}
        <m.div
          variants={fadeInUp}
          className="mt-16 pt-16 border-t border-slate/10"
        >
          <p className="font-mono text-sm text-slate mb-6">Or find me on</p>
          <div className="flex items-center justify-center gap-8">
            <m.a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-light hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </m.a>
            <m.a
              href="https://www.linkedin.com/in/dgr8akki"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-light hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </m.a>
            <m.a
              href="https://twitter.com/ImAakashPahuja"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-light hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </m.a>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
