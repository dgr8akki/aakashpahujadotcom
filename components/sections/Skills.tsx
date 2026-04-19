'use client';

import { useCallback } from 'react';
import { m } from 'framer-motion';

interface SkillsProps {
  data: {
    title: string;
    skills: string[];
    content: string;
  };
}

// Paired meta for the 22 skills in the design. Keys match content/skills
// entries (normalised, lowercase, punctuation stripped).
const SKILL_META: Record<string, { category: string; level: number }> = {
  javascript: { category: 'Languages', level: 5 },
  typescript: { category: 'Languages', level: 5 },
  react: { category: 'Framework', level: 5 },
  redux: { category: 'State', level: 4 },
  next: { category: 'Framework', level: 4 },
  node: { category: 'Runtime', level: 4 },
  html5: { category: 'Web', level: 5 },
  styled: { category: 'Styling', level: 4 },
  graphql: { category: 'API', level: 4 },
  restful: { category: 'API', level: 5 },
  git: { category: 'Tooling', level: 5 },
  'ci/cd': { category: 'DevOps', level: 4 },
  aws: { category: 'Cloud', level: 4 },
  docker: { category: 'DevOps', level: 3 },
  webpack: { category: 'Build', level: 4 },
  jest: { category: 'Quality', level: 4 },
  drupal: { category: 'CMS', level: 3 },
  postgresql: { category: 'DB', level: 3 },
  mongodb: { category: 'DB', level: 3 },
  agile: { category: 'Process', level: 5 },
  system: { category: 'Design', level: 4 },
  performance: { category: 'Craft', level: 5 },
};

function metaFor(name: string) {
  const lower = name.toLowerCase();
  for (const key of Object.keys(SKILL_META)) {
    if (lower.includes(key)) return SKILL_META[key];
  }
  return { category: 'Tech', level: 4 };
}

export function Skills({ data }: SkillsProps) {
  const { title, skills } = data;

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  return (
    <section id="skills" className="py-[110px]">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-end mb-[60px]"
        >
          <h2 className="section-title">
            <span className="num">02.</span>
            {title}
          </h2>
          <span className="section-rule" />
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {skills.map((name, i) => {
            const { category, level } = metaFor(name);
            return (
              <m.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.025 }}
                onMouseMove={onMove}
                className="skill-card group relative overflow-hidden rounded-[16px] border border-line px-[18px] py-[22px] min-h-[110px] flex flex-col gap-2.5 cursor-default transition-all duration-200 hover:-translate-y-[3px] hover:border-line-2"
                style={{
                  background:
                    'linear-gradient(180deg,rgba(40,28,54,0.55),rgba(20,14,28,0.55))',
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(280px 140px at var(--mx,50%) var(--my,50%), rgba(244,165,82,0.12), transparent 60%)',
                  }}
                />
                <span className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  {category}
                </span>
                <span className="relative mt-auto font-sans text-[14px] font-medium tracking-[-0.01em] text-ink">
                  {name}
                </span>
                <span className="relative mt-1.5 flex gap-[3px]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <i
                      key={k}
                      aria-hidden
                      className={`block w-3.5 h-[3px] rounded ${k < level ? 'bg-amber' : 'bg-line-2'}`}
                    />
                  ))}
                </span>
              </m.div>
            );
          })}
        </div>

        <p className="mt-10 text-center font-mono text-[12px] tracking-[0.14em] text-ink-mute">
          — AND MORE TECHNOLOGIES I&apos;M ALWAYS LEARNING —
        </p>
      </div>
    </section>
  );
}
