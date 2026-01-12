'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faFolder } from '@fortawesome/free-solid-svg-icons';
import type { FeaturedProject } from '@/lib/content';

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="numbered-heading">Some Things I've Built</h2>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative grid md:grid-cols-12 gap-3 items-center ${
                i % 2 === 0 ? '' : 'md:text-right'
              }`}
            >
              {/* Project Image */}
              <div
                className={`md:col-span-7 relative aspect-video rounded overflow-hidden bg-accent/20 ${
                  i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-6'
                }`}
              >
                {project.cover ? (
                  <a
                    href={project.external || project.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full group"
                  >
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-300" />
                  </a>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faFolder} className="text-accent" style={{ width: 48, height: 48 }} />
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div
                className={`md:col-span-6 md:row-start-1 relative z-10 ${
                  i % 2 === 0
                    ? 'md:col-start-6 md:text-right'
                    : 'md:col-start-1 md:text-left'
                }`}
              >
                <p className="font-mono text-sm text-accent mb-2">
                  Featured Project
                </p>

                <h3 className="text-2xl font-semibold text-slate-lightest mb-4">
                  <a
                    href={project.external || project.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>

                <div className="bg-navy-light rounded p-6 shadow-xl mb-4">
                  <p className="text-slate-light text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.tech.length > 0 && (
                  <ul
                    className={`flex flex-wrap gap-3 font-mono text-sm text-slate-light mb-4 ${
                      i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                )}

                <div
                  className={`flex gap-4 ${
                    i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-slate-lightest hover:text-accent transition-colors"
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
                      className="text-slate-lightest hover:text-accent transition-colors"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} style={{ width: 20, height: 20 }} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
