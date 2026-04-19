'use client';

import { m } from 'framer-motion';
import { siteConfig } from '@/lib/config';

interface ContactProps {
  data: {
    title: string;
    content: string;
  };
}

export function Contact({ data }: ContactProps) {
  const { content } = data;

  return (
    <section
      id="contact"
      className="relative text-center py-[140px] pb-[200px] overflow-hidden"
    >
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <span
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            top: -100,
            left: '10%',
            background: 'radial-gradient(circle,#F4A552,transparent 60%)',
            filter: 'blur(60px)',
            opacity: 0.4,
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            width: 380,
            height: 380,
            bottom: -100,
            right: '10%',
            background: 'radial-gradient(circle,#B8A8F0,transparent 60%)',
            filter: 'blur(60px)',
            opacity: 0.4,
          }}
        />
      </div>

      <div className="wrap relative z-[1]">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-[640px] mx-auto"
        >
          <div className="eyebrow justify-center">06. What&apos;s next</div>
          <h2
            className="mt-[18px] mb-[22px] font-serif font-normal leading-none tracking-[-0.025em]"
            style={{ fontSize: 'clamp(48px,7vw,96px)' }}
          >
            Let&apos;s build
            <br />
            <em className="not-italic text-gradient italic">something useful.</em>
          </h2>
          <p className="max-w-[48ch] mx-auto text-ink-dim text-[16px] leading-[1.65]">
            {content.trim()}
          </p>
          <div className="mt-10">
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-primary-amber inline-flex items-center gap-2.5 px-9 py-[18px] rounded-[12px] font-mono text-[14px]"
            >
              Say Hello <span aria-hidden>→</span>
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
