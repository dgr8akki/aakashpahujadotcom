'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import type { Job } from '@/lib/content';
import { cn } from '@/lib/utils';

interface ExperienceProps {
  jobs: Job[];
}

export function Experience({ jobs }: ExperienceProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (jobs.length === 0) return null;

  return (
    <section id="jobs" className="section">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="numbered-heading">Where I've Worked</h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Tab List */}
          <div
            className="flex md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-hide"
            role="tablist"
            aria-label="Job tabs"
          >
            {jobs.map((job, i) => (
              <button
                key={job.company}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'flex items-center whitespace-nowrap px-5 py-3 font-mono text-sm border-b-2 md:border-b-0 md:border-l-2 text-left transition-all duration-300',
                  activeTab === i
                    ? 'text-accent border-accent bg-navy-light/50'
                    : 'text-slate border-grey-dark hover:text-accent hover:bg-navy-light/30'
                )}
              >
                {job.company}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className="md:ml-5 w-full min-h-[300px]">
            <AnimatePresence mode="wait">
              {jobs.map(
                (job, i) =>
                  activeTab === i && (
                    <m.div
                      key={job.company}
                      role="tabpanel"
                      id={`panel-${i}`}
                      aria-labelledby={`tab-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-medium text-slate-lightest mb-1">
                        {job.title}
                        <span className="text-accent">
                          {' '}
                          @{' '}
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-link"
                          >
                            {job.company}
                          </a>
                        </span>
                      </h3>

                      <p className="font-mono text-sm text-slate mb-6">
                        {job.range}
                      </p>

                      <div
                        className="[&>ul]:fancy-list [&>ul]:mt-0 text-slate"
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
