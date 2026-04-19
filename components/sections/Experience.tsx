'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import type { Job } from '@/lib/content';

interface ExperienceProps {
  jobs: Job[];
}

function formatBullets(content: string): string[] {
  return content
    .trim()
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.trim().replace(/^[-*]\s*/, ''));
}

export function Experience({ jobs }: ExperienceProps) {
  const [active, setActive] = useState(0);
  if (jobs.length === 0) return null;
  const job = jobs[active];
  const bullets = formatBullets(job.content);

  return (
    <section id="jobs" className="py-[110px]">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-end mb-[60px]"
        >
          <h2 className="section-title">
            <span className="num">03.</span>
            Where I&apos;ve Worked
          </h2>
          <span className="section-rule" />
        </m.div>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] items-start">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Employers"
            className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible md:border-l md:border-line-2 border-b md:border-b-0 border-line-2 pb-2 md:pb-0 md:pl-0"
          >
            {jobs.map((j, i) => (
              <button
                key={j.company + i}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={[
                  'text-left whitespace-nowrap font-mono text-[12.5px] transition-all duration-200',
                  'px-[18px] py-[14px] -ml-[2px] border-l-2 md:border-l-2 md:border-b-0',
                  'border-l-transparent border-b-2 border-b-transparent',
                  active === i
                    ? 'text-amber bg-[rgba(244,165,82,0.06)] md:border-l-amber border-b-amber'
                    : 'text-ink-mute hover:text-ink hover:bg-[rgba(244,165,82,0.04)]',
                ].join(' ')}
              >
                {j.company}
                {j.title?.toLowerCase().includes('p3') || j.title?.toLowerCase().includes('p2')
                  ? ` — ${j.title.match(/P\d/)?.[0] ?? ''}`
                  : ''}
              </button>
            ))}
          </div>

          {/* Role panel */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              <m.div
                key={job.company + active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-serif font-normal text-[32px] leading-tight tracking-[-0.015em]">
                  {job.title}
                  {job.company && (
                    <>
                      {' '}
                      <span className="text-amber">
                        @{' '}
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber hover:text-amber-2 transition-colors"
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </span>
                    </>
                  )}
                </h3>
                <div className="mt-2 mb-[22px] flex items-center gap-2 font-mono text-[12px] text-ink-mute tracking-[0.06em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  {job.range}
                </div>
                <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-[26px] text-[15.5px] leading-[1.6] text-ink-dim"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 text-amber text-[14px]"
                      >
                        ▹
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: b
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>')
                            .replace(/`(.*?)`/g, '<code class="font-mono text-amber">$1</code>'),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
