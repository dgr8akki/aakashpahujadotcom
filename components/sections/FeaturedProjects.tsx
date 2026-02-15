'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import type { FeaturedProject } from '@/lib/content';
import { fadeInUp, scaleIn, staggerContainer, defaultViewport, cardHover } from '@/lib/animations';

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="projects" ref={containerRef} className="section relative py-32 overflow-hidden">
      {/* Background decoration */}
      <m.div
        style={{ x }}
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
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
            <span className="font-mono text-accent text-xl font-semibold">04.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-lightest m-0">
              Some Things I've Built
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate/20 to-transparent" />
          </div>
        </m.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <m.div
            variants={fadeInUp}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, i) => (
              <m.div
                key={project.title}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="group relative min-w-[90vw] sm:min-w-[600px] lg:min-w-[700px] snap-center"
              >
                <div className="glass-card p-0 overflow-hidden h-full">
                  <div className="grid lg:grid-cols-5 gap-0 lg:gap-6 h-full">
                    {/* Project Image */}
                    <div className="lg:col-span-3 relative aspect-video lg:aspect-auto lg:h-full min-h-[300px]">
                      <div className="relative w-full h-full overflow-hidden">
                        {project.cover ? (
                          <a
                            href={project.external || project.github || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full"
                          >
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-accent-pink/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                            
                            <div className="relative w-full h-full">
                              <Image
                                src={project.cover}
                                alt={project.title}
                                fill
                                className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                              />
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-accent-pink/20 opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                            </div>
                          </a>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-light to-navy">
                            <FontAwesomeIcon
                              icon={faFolder}
                              className="text-accent"
                              style={{ width: 64, height: 64 }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="lg:col-span-2 p-8 lg:p-6 flex flex-col justify-center">
                      {/* Featured badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <p className="font-mono text-xs text-accent uppercase tracking-widest">
                          Featured Project
                        </p>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-lightest mb-3 group-hover:text-gradient transition-all duration-300">
                        <a
                          href={project.external || project.github || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.title}
                        </a>
                      </h3>

                      {/* Description */}
                      <p className="text-slate-light text-sm lg:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      {project.tech.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full border border-accent/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex gap-4 mt-auto">
                        {project.github && (
                          <m.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-slate-light hover:text-accent transition-colors"
                          >
                            <FontAwesomeIcon icon={faGithub} style={{ width: 24, height: 24 }} />
                          </m.a>
                        )}
                        {project.external && (
                          <m.a
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="External Link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-slate-light hover:text-accent transition-colors"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} style={{ width: 24, height: 24 }} />
                          </m.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Scroll hint */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-8 text-slate font-mono text-xs"
          >
            <span>Scroll horizontally</span>
            <svg className="w-4 h-4 animate-bounce" style={{ transform: 'rotate(-90deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
