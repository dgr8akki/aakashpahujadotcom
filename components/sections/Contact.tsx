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
  const { title, content } = data;

  return (
    <section id="contact" className="section text-center">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <p className="mb-4 block font-mono text-accent">06. What's Next?</p>

        <h2 className="text-4xl sm:text-5xl font-semibold text-slate-lightest mb-4">
          {title}
        </h2>

        <p className="text-slate leading-relaxed mb-12">{content}</p>

        <a href={`mailto:${siteConfig.email}`} className="btn btn-lg">
          Say Hello
        </a>
      </m.div>
    </section>
  );
}
