'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillsProps {
  data: {
    title: string;
    skills: Skill[];
    content: string;
  };
}

export function Skills({ data }: SkillsProps) {
  const { title, skills } = data;

  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="numbered-heading">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm text-slate-lightest">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-accent">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-navy-light rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-accent to-accent-yellow rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
