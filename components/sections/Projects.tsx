'use client';

import { m } from 'framer-motion';
import type { Project } from '@/lib/content';
import { siteConfig } from '@/lib/config';

interface ProjectsProps {
  projects: Project[];
}

const LANG_SWATCH: Record<string, string> = {
  javascript: '#f1e05a',
  typescript: '#2b7489',
  shell: '#89e051',
  css: '#563d7c',
  html: '#e34c26',
  python: '#3572A5',
  go: '#00ADD8',
  ruby: '#701516',
  java: '#b07219',
  rust: '#dea584',
};

function pickLang(tech: string[]): { label: string; swatch: string } {
  for (const t of tech) {
    const key = t.toLowerCase();
    if (LANG_SWATCH[key]) return { label: t, swatch: LANG_SWATCH[key] };
  }
  return { label: tech[0] || 'Code', swatch: '#f4a552' };
}

export function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;
  // Top 4 mirror the Portfolio.html OSS strip; the rest become the archive.
  const strip = projects.slice(0, 4);

  return (
    <section className="py-[60px]">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="oss-strip relative overflow-hidden rounded-[24px] p-8 md:p-10 border border-line-2"
          style={{
            background:
              'linear-gradient(180deg,rgba(244,165,82,0.06),rgba(184,168,240,0.04))',
          }}
        >
          <span className="oss-halo" aria-hidden />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_2fr] items-center">
            <div>
              <div className="eyebrow">The OSS workshop</div>
              <h3 className="mt-3 font-serif font-normal text-[40px] leading-[1.05] tracking-[-0.02em]">
                119+ repos,
                <br />
                <span className="text-gradient">one engineer.</span>
              </h3>
              <p className="mt-3.5 max-w-[42ch] text-[16px] leading-[1.65] text-ink-dim">
                From tiny zsh plugins to full component libraries. A sampling of
                what&apos;s cooking in{' '}
                <span className="text-amber">
                  {siteConfig.github.replace('https://', '')}
                </span>{' '}
                — updated weekly.
              </p>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] text-amber hover:text-amber-2 transition-colors"
              >
                Browse all 119 repos →
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {strip.map((repo) => {
                const { label, swatch } = pickLang(repo.tech);
                const href = repo.github || repo.external || '#';
                return (
                  <a
                    key={repo.title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-card block rounded-[16px] border border-line-2 p-[18px] transition-all duration-200 hover:-translate-y-[3px] hover:border-amber"
                    style={{
                      background:
                        'linear-gradient(180deg,rgba(20,14,28,0.85),rgba(15,10,22,0.9))',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-[13px] font-medium text-ink">
                        {repo.title}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.55] text-ink-dim m-0 mb-3.5">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-mute">
                      <span
                        aria-hidden
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ background: swatch }}
                      />
                      {label}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </m.div>

        <div className="mt-[70px] text-center">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-mono text-[13px] text-amber border border-amber rounded-[10px] px-[22px] py-[14px] transition-all hover:bg-[rgba(244,165,82,0.1)] hover:shadow-[0_0_0_4px_rgba(244,165,82,0.08)]"
          >
            View the Full Archive →
          </a>
        </div>
      </div>

      <style jsx>{`
        .oss-strip :global(.oss-halo) {
          content: '';
          position: absolute;
          inset: -40%;
          background: conic-gradient(
            from 180deg at 50% 50%,
            transparent 0deg,
            rgba(244, 165, 82, 0.15) 60deg,
            transparent 120deg
          );
          animation: halo-spin 22s linear infinite;
          opacity: 0.6;
          pointer-events: none;
        }
        @keyframes halo-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
