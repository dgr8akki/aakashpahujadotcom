'use client';

import { m } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer, fastStaggerContainer, defaultViewport, cardHover } from '@/lib/animations';

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
    <section id="skills" className="section relative py-32">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

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
            <span className="font-mono text-accent text-xl font-semibold">02.</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-lightest m-0">
              {title}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate/20 to-transparent" />
          </div>
        </m.div>

        {/* Skills grid */}
        <m.div
          variants={fastStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, i) => (
            <m.div
              key={skill}
              variants={scaleIn}
              initial="rest"
              whileHover="hover"
              className="group relative"
            >
              <m.div
                variants={cardHover}
                className="glass-card p-6 h-full flex items-center justify-center text-center cursor-default relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
                
                {/* Content */}
                <div className="relative z-10">
                  <p className="font-mono text-sm md:text-base text-slate-light group-hover:text-slate-lightest transition-colors duration-300">
                    {skill}
                  </p>
                </div>

                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </m.div>
            </m.div>
          ))}
        </m.div>

        {/* Bottom tagline */}
        <m.div
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <p className="text-slate font-mono text-sm">
            And more technologies I'm always learning...
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
