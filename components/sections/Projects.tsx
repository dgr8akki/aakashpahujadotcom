'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import type { Project } from '@/lib/content';
import { fadeInUp, scaleIn, fastStaggerContainer, defaultViewport, cardHover, buttonHover } from '@/lib/animations';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [showMore, setShowMore] = useState(false);
  const INITIAL_COUNT = 6;

  if (projects.length === 0) return null;

  const visibleProjects = showMore ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section className="section relative py-32">
      {/* Background decoration */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <m.div
        variants={fastStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative z-10"
      >
        {/* Section heading */}
        <m.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-lightest mb-2">
            Other Noteworthy Projects
          </h2>
          <p className="text-slate font-mono text-sm">
            View the archive
          </p>
        </m.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <m.div
              key={project.title}
              variants={scaleIn}
              initial="rest"
              whileHover="hover"
              className="group"
            >
              <m.div
                variants={cardHover}
                className="glass-card p-8 h-full flex flex-col relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                    <FontAwesomeIcon
                      icon={faFolder}
                      className="text-accent"
                      style={{ width: 28, height: 28 }}
                    />
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <m.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-slate-light hover:text-accent transition-colors"
                      >
                        <FontAwesomeIcon icon={faGithub} style={{ width: 20, height: 20 }} />
                      </m.a>
                    )}
                    {project.external && (
                      <m.a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="External Link"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-slate-light hover:text-accent transition-colors"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} style={{ width: 20, height: 20 }} />
                      </m.a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-lightest mb-3 group-hover:text-accent transition-colors relative z-10">
                  <a
                    href={project.external || project.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="before:absolute before:inset-0"
                  >
                    {project.title}
                  </a>
                </h3>

                {/* Description */}
                <p className="text-slate-light text-sm leading-relaxed mb-6 flex-grow relative z-10">
                  {project.description}
                </p>

                {/* Tech stack */}
                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 font-mono text-xs text-slate-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </m.div>
            </m.div>
          ))}
        </div>

        {/* Show More Button */}
        {projects.length > INITIAL_COUNT && (
          <m.div variants={fadeInUp} className="text-center mt-16">
            <m.button
              onClick={() => setShowMore(!showMore)}
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-accent/10 hover:bg-accent hover:text-navy border border-accent rounded-2xl font-mono text-sm font-semibold transition-all duration-300 ease-apple-spring"
            >
              {showMore ? '← Show Less' : 'Show More →'}
            </m.button>
          </m.div>
        )}
      </m.div>
    </section>
  );
}
