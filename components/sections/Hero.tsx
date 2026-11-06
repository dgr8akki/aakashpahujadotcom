import { siteConfig } from '@/lib/config';

interface HeroProps {
  data: {
    name: string;
    subtitle: string;
  };
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <p className="lead hero__line">{data.subtitle}</p>
        <h1 id="hero-title" className="hero__name">
          {data.name}
        </h1>
        <div className="hero__actions">
          <a className="btn btn--primary" href={`mailto:${siteConfig.email}`}>
            Get in touch
          </a>
          <a
            className="btn btn--quiet"
            href={siteConfig.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <p className="hero__where">Senior Software Engineer 2 at Squarespace, Dublin</p>
        </div>
      </div>
    </section>
  );
}
