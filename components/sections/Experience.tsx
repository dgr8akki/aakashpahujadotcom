'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import type { Job } from '@/lib/content';
import { cn } from '@/lib/utils';
import { fadeInUp, slideInRight, staggerContainer, defaultViewport } from '@/lib/animations';

interface ExperienceProps {
  jobs: Job[];
}

export function Experience({ jobs }: ExperienceProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (jobs.length === 0) return null;

  return (
    <section id="jobs" className="section relative py-32">
      {/* Background decoration */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

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
            <span className="font-mono text-accent text-xl font-semibold">03.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-lightest m-0">
              Where I've Worked
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate/20 to-transparent" />
          </div>
        </m.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab List - Glassmorphic pills */}
          <m.div
            variants={fadeInUp}
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide lg:min-w-[200px]"
            role="tablist"
            aria-label="Job tabs"
          >
            {jobs.map((job, i) => (
              <m.button
                key={job.company}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'relative flex items-center whitespace-nowrap px-6 py-4 font-mono text-sm rounded-2xl text-left transition-all duration-500 ease-apple-spring overflow-hidden group',
                  activeTab === i
                    ? 'text-slate-lightest bg-accent/10 border border-accent/30 shadow-glow'
                    : 'text-slate border border-slate/10 hover:text-slate-lightest hover:border-accent/20 backdrop-blur-sm bg-navy-light/20'
                )}
              >
                {/* Active indicator */}
                {activeTab === i && (
                  <m.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-pink/10 rounded-2xl"
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {activeTab === i && (
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  )}
                  {job.company}
                </span>
              </m.button>
            ))}
          </m.div>

          {/* Tab Panels - Glassmorphic card */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              {jobs.map(
                (job, i) =>
                  activeTab === i && (
                    <m.div
                      key={job.company}
                      role="tabpanel"
                      id={`panel-${i}`}
                      aria-labelledby={`tab-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="glass-card p-8 md:p-10"
                    >
                      {/* Job title */}
                      <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-lightest mb-2">
                          {job.title}
                        </h3>
                        <p className="text-lg">
                          <span className="text-accent font-semibold">@ </span>
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-yellow transition-colors duration-300 font-semibold"
                          >
                            {job.company}
                          </a>
                        </p>
                      </div>

                      {/* Date range */}
                      <div className="flex items-center gap-2 mb-8 pb-6 border-b border-slate/10">
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="font-mono text-sm text-slate-light">
                          {job.range}
                        </p>
                      </div>

                      {/* Responsibilities */}
                      <div
                        className="text-slate-light leading-relaxed [&>ul]:space-y-4 [&>ul]:list-none [&>ul]:p-0 [&>ul>li]:flex [&>ul>li]:gap-3 [&>ul>li]:items-start [&>ul>li:before]:content-['▹'] [&>ul>li:before]:text-accent [&>ul>li:before]:text-xl [&>ul>li:before]:leading-6 [&>ul>li:before]:flex-shrink-0"
                        dangerouslySetInnerHTML={{ __html: formatContent(job.content) }}
                      />
                    </m.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.div>
    </section>
  );
}

function formatContent(content: string): string {
  // Convert markdown list items to HTML
  const lines = content.trim().split('\n');
  const listItems = lines
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => `<li>${line.trim().substring(1).trim()}</li>`)
    .join('');

  return listItems ? `<ul>${listItems}</ul>` : content;
}
