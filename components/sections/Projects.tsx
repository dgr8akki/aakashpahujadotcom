'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import type { Project } from '@/lib/content';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [showMore, setShowMore] = useState(false);
  const INITIAL_COUNT = 6;

  if (projects.length === 0) return null;

  const visibleProjects = showMore ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section className="section">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="text-3xl font-semibold text-slate-lightest text-center mb-10">
          Other Noteworthy Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleProjects.map((project, i) => (
            <m.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-navy-light rounded p-7 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-8">
                <FontAwesomeIcon icon={faFolder} className="text-accent" style={{ width: 40, height: 40 }} />
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-slate-light hover:text-accent transition-colors"
                    >
                      <FontAwesomeIcon icon={faGithub} style={{ width: 20, height: 20 }} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="External Link"
                      className="text-slate-light hover:text-accent transition-colors"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} style={{ width: 20, height: 20 }} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-lightest mb-2 group-hover:text-accent transition-colors">
                <a
                  href={project.external || project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="before:absolute before:inset-0"
                >
                  {project.title}
                </a>
              </h3>

              <p className="text-slate text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {project.tech.length > 0 && (
                <ul className="flex flex-wrap gap-2 font-mono text-xs text-slate-light mt-auto">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
            </m.div>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="text-center mt-12">
            <button onClick={() => setShowMore(!showMore)} className="btn">
              Show {showMore ? 'Less' : 'More'}
            </button>
          </div>
        )}
      </m.div>
    </section>
  );
}
