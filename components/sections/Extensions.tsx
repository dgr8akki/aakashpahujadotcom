import Link from 'next/link';
import type { Extension } from '@/lib/content';

export function Extensions({ extensions }: { extensions: Extension[] }) {
  if (extensions.length === 0) return null;

  return (
    <section id="extensions" className="section section--s" aria-labelledby="extensions-title">
      <div className="container">
        <div className="head">
          <h2 id="extensions-title">Three extensions on the Web Store</h2>
          <p className="lead">Each runs on TypeSafe&rsquo;s Jev model, with your own key and no server of mine.</p>
        </div>

        <ul className="ext">
          {extensions.map((ext, i) => (
            <li key={ext.title} className="ext__item">
              <figure className="shot ticks">
                <div data-slot={`ext-${i + 1}`} data-kind="product" data-alt={ext.coverAlt}>
                  <img src={ext.cover} alt={ext.coverAlt} width={880} height={880} loading="lazy" decoding="async" />
                </div>
              </figure>
              <div className="ext__body">
                <h3>{ext.title}</h3>
                <p>{ext.description}</p>
                <ul className="links">
                  <li>
                    <a className="link" href={ext.store} target="_blank" rel="noopener noreferrer">
                      Chrome Web Store
                    </a>
                  </li>
                  <li>
                    <a className="link" href={ext.github} target="_blank" rel="noopener noreferrer">
                      Source on GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <p className="ext__note">
          A fourth, Jev Voice, installs from{' '}
          <a className="link" href="https://github.com/dgr8akki/jev-voice" target="_blank" rel="noopener noreferrer">
            its GitHub release
          </a>{' '}
          until a store slot opens.{' '}
          <Link className="link" href="/blog/jev-chrome-extensions">
            How I built all four
          </Link>
        </p>
      </div>
    </section>
  );
}
