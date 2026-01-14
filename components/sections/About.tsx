'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { siteConfig } from '@/lib/config';

interface AboutProps {
  data: {
    title: string;
    skills: string[];
    content: string;
  };
}

export function About({ data }: AboutProps) {
  const { title, skills, content } = data;

  return (
    <section id="about" className="section">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="numbered-heading">{title}</h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Content */}
          <div className="md:w-3/5">
            <div className="text-slate leading-relaxed">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-4">{children}</p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
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
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 p-0 list-none">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="relative pl-5 font-mono text-sm text-slate before:content-['▹'] before:absolute before:left-0 before:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image */}
          <div className="md:w-2/5 max-w-[300px] mx-auto md:mx-0">
            <m.a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-10 rounded overflow-hidden bg-accent">
                <Image
                  src="/images/me.jpeg"
                  alt="Aakash Pahuja"
                  width={300}
                  height={300}
                  className="grayscale contrast-100 mix-blend-multiply transition-all duration-300 group-hover:grayscale-0 group-hover:mix-blend-normal"
                />
              </div>
              <div className="absolute inset-0 rounded border-2 border-accent translate-x-5 translate-y-5 -z-10 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
            </m.a>
          </div>
        </div>
      </m.div>
    </section>
  );
}
