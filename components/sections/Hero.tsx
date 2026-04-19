'use client';

import { useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { siteConfig } from '@/lib/config';

interface HeroProps {
  data: {
    title: string;
    name: string;
    subtitle: string;
    content: string;
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const tiles = [
  {
    label: 'JavaScript (ES6+)',
    swatch: 'JS',
    pos: 'top-[6%] -left-[4%]',
    z: 80,
    delay: '-1s',
    swatchBg: 'linear-gradient(135deg,#F8C9A0,#F4A552)',
    swatchColor: '#1a0d05',
  },
  {
    label: 'React · Next.js',
    swatch: 'R',
    pos: 'top-[35%] -right-[10%]',
    z: 110,
    delay: '-3s',
    swatchBg: 'linear-gradient(135deg,#B8A8F0,#8C78D9)',
    swatchColor: '#fff',
  },
  {
    label: 'Node · GraphQL',
    swatch: 'N',
    pos: 'bottom-[8%] left-[6%]',
    z: 50,
    delay: '-5s',
    swatchBg: 'linear-gradient(135deg,#9EC6A6,#6FA879)',
    swatchColor: '#0f1c12',
  },
  {
    label: '119+ repos shipped',
    swatch: '✦',
    pos: 'bottom-[22%] right-0',
    z: 140,
    delay: '-2s',
    swatchBg: 'linear-gradient(135deg,#E87B7B,#C85858)',
    swatchColor: '#fff',
  },
];

export function Hero({ data }: HeroProps) {
  const { title, name, content } = data;
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const f = 0.7;
      stage.style.transform = `rotateY(${dx * 10 * f}deg) rotateX(${-dy * 10 * f}deg)`;
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen pt-[180px] pb-[120px] md:pt-[200px]"
    >
      <div className="wrap">
        <m.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 md:gap-16 md:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <m.div variants={fadeUp} className="eyebrow">
              {title}
            </m.div>

            <m.h1
              variants={fadeUp}
              className="mt-5 font-serif font-normal leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(56px,9vw,132px)' }}
            >
              <span className="gradient-name">{firstName}</span>
              {lastName && (
                <>
                  <br />
                  {lastName}
                  <em className="not-italic text-peach">.</em>
                </>
              )}
            </m.h1>

            <m.div
              variants={fadeUp}
              className="mt-[18px] font-serif font-normal leading-[1.15] tracking-[-0.015em] max-w-[18ch] text-ink"
              style={{ fontSize: 'clamp(28px,3.6vw,46px)' }}
            >
              I build scalable solutions{' '}
              <em className="gradient-name italic">for the web</em>, one line at a time.
            </m.div>

            <m.p
              variants={fadeUp}
              className="mt-7 text-[18px] leading-[1.65] text-ink-dim max-w-[54ch]"
            >
              {content.trim()}
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-wrap gap-[14px] items-center">
              <a
                href="#contact"
                className="btn-primary-amber inline-flex items-center gap-2.5 px-[22px] py-[14px] rounded-[12px] font-mono text-[13px] transition-transform duration-150 active:translate-y-[1px]"
              >
                Get In Touch <span aria-hidden>→</span>
              </a>
              <a
                href="#projects"
                className="btn-ghost-amber inline-flex items-center gap-2.5 px-[22px] py-[14px] rounded-[12px] font-mono text-[13px] transition-transform duration-150 active:translate-y-[1px]"
              >
                View Selected Work
              </a>
            </m.div>

            <m.div variants={fadeUp} className="mt-[34px] flex flex-wrap gap-2.5">
              <span className="chip">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-sage"
                  style={{ boxShadow: '0 0 8px var(--color-sage)' }}
                />
                Available for collabs
              </span>
              <span className="chip">📍 {siteConfig.location}</span>
              <span className="chip">Currently @ Squarespace</span>
            </m.div>
          </div>

          {/* 3D stage */}
          <m.div variants={fadeUp} className="hidden md:block">
            <div
              ref={stageRef}
              className="relative mx-auto max-w-[520px] aspect-square transition-transform duration-200 ease-out"
              style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
            >
              <span className="aura-ring aura-ring--r3" />
              <span className="aura-ring aura-ring--r2" />
              <span className="aura-ring aura-ring--r1" />

              <div
                className="absolute inset-0"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: 'orbit 10s ease-in-out infinite alternate',
                }}
              >
                <div
                  className="absolute inset-0 grid place-items-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="hex-card" aria-hidden>
                    <span className="hex-letter">A</span>
                  </div>
                </div>

                {tiles.map((t) => (
                  <div
                    key={t.label}
                    className={`tile ${t.pos}`}
                    style={{
                      ['--z' as never]: `${t.z}px`,
                      transform: `translateZ(${t.z}px)`,
                      animationDelay: t.delay,
                    }}
                  >
                    <span
                      className="swatch"
                      style={{ background: t.swatchBg, color: t.swatchColor }}
                    >
                      {t.swatch}
                    </span>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </m.div>
      </div>

      {/* scroll hint */}
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-ink-mute">
        <span>SCROLL</span>
        <span className="w-px h-[42px] bg-gradient-to-b from-amber to-transparent animate-[scrolldown_2s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        .chip {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--color-ink-dim);
          padding: 6px 12px;
          border: 1px solid var(--color-line-2);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.02);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .aura-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
        }
        .aura-ring--r1 {
          width: 90%;
          height: 90%;
          border: 1px dashed rgba(244, 165, 82, 0.22);
          animation: spin 40s linear infinite;
        }
        .aura-ring--r2 {
          width: 110%;
          height: 110%;
          border: 1px solid rgba(184, 168, 240, 0.1);
          animation: spin 60s linear reverse infinite;
        }
        .aura-ring--r3 {
          width: 130%;
          height: 130%;
          border: 1px dotted rgba(244, 165, 82, 0.08);
        }
        @keyframes spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .hex-card {
          width: 70%;
          aspect-ratio: 1;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          background: linear-gradient(160deg, #2b1e3a 0%, #1a1126 60%, #120b1c 100%);
          border: 1px solid var(--color-line-2);
          position: relative;
          transform-style: preserve-3d;
          display: grid;
          place-items: center;
          box-shadow: 0 30px 60px -28px rgba(0, 0, 0, 0.8);
        }
        .hex-card::before {
          content: '';
          position: absolute;
          inset: 8%;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          background:
            radial-gradient(circle at 30% 30%, rgba(248, 201, 160, 0.25), transparent 55%),
            linear-gradient(140deg, rgba(244, 165, 82, 0.18), transparent 60%),
            linear-gradient(180deg, #1f1530, #0f0a18);
          border: 1px solid rgba(244, 165, 82, 0.25);
        }
        .hex-letter {
          position: relative;
          z-index: 1;
          font-family: var(--font-serif);
          font-size: min(26vw, 160px);
          background: linear-gradient(100deg, #f8c9a0 0%, #f4a552 40%, #e87b7b 70%, #b8a8f0 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 4px 24px rgba(244, 165, 82, 0.35));
          transform: translateZ(40px);
        }

        .tile {
          position: absolute;
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--color-ink);
          background: linear-gradient(180deg, rgba(40, 28, 54, 0.92), rgba(24, 16, 34, 0.95));
          border: 1px solid var(--color-line-2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          box-shadow:
            0 30px 60px -28px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          gap: 10px;
          animation: float 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .tile .swatch {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          display: grid;
          place-items: center;
          font-size: 10px;
        }
      `}</style>
    </section>
  );
}
