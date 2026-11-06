import ReactMarkdown, { type Components } from 'react-markdown';

interface AboutProps {
  data: {
    content: string;
  };
}

const aboutMarkdownComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
};

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="section section--flush" aria-label="Background">
      <div className="container about">
        <figure className="about__pic shot ticks">
          <div data-slot="portrait" data-alt="A portrait of Aakash">
            <img
              src="/images/me-rim.webp"
              alt="Aakash Pahuja, in glasses and a dark t-shirt, by a window."
              width={750}
              height={938}
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>
        <div className="about__text">
          <ReactMarkdown components={aboutMarkdownComponents}>{data.content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
