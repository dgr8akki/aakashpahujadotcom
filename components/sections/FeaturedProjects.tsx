'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import type { FeaturedProject } from '@/lib/content';

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-[110px]">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-end mb-[60px]"
        >
          <h2 className="section-title">
            <span className="num">04.</span>
            Things I&apos;ve Built
          </h2>
          <span className="section-rule" />
        </m.div>

        <div className="flex flex-col gap-20">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <m.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
                className={`grid items-center gap-5 lg:gap-5 ${
                  reversed
                    ? 'lg:grid-cols-[5fr_7fr]'
                    : 'lg:grid-cols-[7fr_5fr]'
                }`}
              >
                {/* Visual */}
                <div
                  className={`project-visual relative overflow-hidden rounded-[24px] border border-line-2 aspect-[16/10] ${
                    reversed ? 'order-1 lg:order-2' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(160deg,#1e1430,#0f0a18)',
                    boxShadow: '0 30px 60px -28px rgba(0,0,0,0.8)',
                  }}
                >
                  {project.cover ? (
                    <a
                      href={project.external || project.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block absolute inset-0"
                    >
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(160deg,rgba(244,165,82,0.18),transparent 60%),linear-gradient(0deg,rgba(15,10,24,0.45),transparent 60%)',
                        }}
                      />
                    </a>
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center font-serif text-5xl"
                      style={{
                        background:
                          'linear-gradient(135deg,#F4A552,#E87B7B 50%,#B8A8F0)',
                      }}
                    >
                      <span
                        className="px-6 py-2 rounded-md text-white font-mono text-sm"
                        style={{ background: 'rgba(0,0,0,0.35)' }}
                      >
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`relative z-[2] ${
                    reversed
                      ? 'order-2 lg:order-1 lg:text-right'
                      : ''
                  }`}
                >
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-amber inline-flex items-center gap-2">
                    <span aria-hidden>✦</span>
                    Featured Project
                  </span>
                  <h3 className="mt-2.5 mb-[18px] font-serif font-normal text-[36px] leading-tight tracking-[-0.015em]">
                    <a
                      href={project.external || project.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber transition-colors"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <div
                    className="glass-card px-[22px] py-[22px] text-ink-dim text-[15px] leading-[1.6]"
                  >
                    {project.description}
                  </div>
                  {project.tech.length > 0 && (
                    <div
                      className={`mt-4 flex flex-wrap gap-2 font-mono text-[11.5px] text-ink-mute ${
                        reversed ? 'lg:justify-end' : ''
                      }`}
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md border border-line-2 bg-white/[0.02]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div
                    className={`mt-4 flex gap-3.5 ${
                      reversed ? 'lg:justify-end' : ''
                    }`}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-ink hover:text-amber hover:-translate-y-0.5 transition-all"
                      >
                        <FontAwesomeIcon icon={faGithub} style={{ width: 22, height: 22 }} />
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="External"
                        className="text-ink hover:text-amber hover:-translate-y-0.5 transition-all"
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          style={{ width: 20, height: 20 }}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
