'use client';

import { m } from 'framer-motion';

interface SkillsProps {
  data: {
    title: string;
    skills: string[];
    content: string;
  };
}

export function Skills({ data }: SkillsProps) {
  const { title, skills } = data;

  return (
    <section id="skills" className="section">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="numbered-heading">{title}</h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 p-0 list-none">
          {skills.map((skill, i) => (
            <m.li
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="relative pl-5 font-mono text-sm text-slate-light before:content-['▹'] before:absolute before:left-0 before:text-accent"
            >
              {skill}
            </m.li>
          ))}
        </ul>
      </m.div>
    </section>
  );
}
