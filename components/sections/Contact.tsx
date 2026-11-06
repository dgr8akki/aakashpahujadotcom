import { siteConfig } from '@/lib/config';

interface ContactProps {
  data: {
    content: string;
  };
}

export function Contact({ data }: ContactProps) {
  const [first, ...rest] = data.content.trim().split(/(?<=\.)\s+/);

  return (
    <section id="contact" className="close" aria-labelledby="contact-title">
      <div className="container close__inner">
        <h2 id="contact-title">{first}</h2>
        {rest.length > 0 && <p className="lead">{rest.join(' ')}</p>}
        <p className="close__mail">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </div>
    </section>
  );
}
