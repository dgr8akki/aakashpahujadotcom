'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { m } from 'framer-motion';

interface AboutProps {
  data: {
    title: string;
    skills: string[];
    content: string;
  };
}

const stats = [
  { n: '119', suffix: '+', label: 'OSS repos' },
  { n: '1M', suffix: '/day', label: 'Tokens at scale' },
  { n: '300', suffix: '+', label: 'Engineers mentored' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function About({ data }: AboutProps) {
  const { title, content } = data;
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      el.style.transform = `rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="about" className="py-[110px]">
      <div className="wrap">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="flex items-end mb-[60px]"
        >
          <h2 className="section-title">
            <span className="num">01.</span>
            {title}
          </h2>
          <span className="section-rule" />
        </m.div>

        <div className="grid gap-12 md:gap-14 md:grid-cols-[1.2fr_0.8fr]">
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-ink-dim text-[16px] leading-[1.7] space-y-5"
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="m-0 text-[16px]">{children}</p>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber border-b border-dotted border-amber-2 hover:text-amber-2 transition-colors"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="text-ink font-medium">{children}</strong>
                ),
              }}
            >
              {content}
            </ReactMarkdown>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-[22px] rounded-[16px] border border-line"
                  style={{
                    background:
                      'linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))',
                  }}
                >
                  <div className="font-serif text-[42px] leading-none tracking-[-0.02em] text-amber">
                    {s.n}
                    <span className="text-ink-mute text-[0.5em]">{s.suffix}</span>
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div
              ref={portraitRef}
              className="relative aspect-[4/5] rounded-[24px] overflow-hidden border border-line-2 transition-transform duration-300"
              style={{
                background: 'linear-gradient(180deg,#1a1326,#100a18)',
                boxShadow: '0 30px 60px -28px rgba(0,0,0,0.8)',
                transformStyle: 'preserve-3d',
              }}
            >
              <Image
                src="/images/me.jpeg"
                alt="Aakash Pahuja"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(170deg,rgba(244,165,82,0.12),transparent 55%)',
                }}
              />
              <div className="absolute inset-x-4 top-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                <span>PORTRAIT · 04/26</span>
                <span className="flex items-center gap-1.5 text-sage">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sage"
                    style={{ boxShadow: '0 0 8px var(--color-sage)' }}
                  />
                  LIVE
                </span>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
