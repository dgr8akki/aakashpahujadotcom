import { siteConfig, socialLinks } from '@/lib/config';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__sign">Aakash, in Dublin</p>
        <ul className="links" aria-label="Elsewhere">
          <li>
            <a href={`mailto:${siteConfig.email}`}>Email</a>
          </li>
          {socialLinks.map((social) => (
            <li key={social.name}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="footer__credit"
          href="https://github.com/dgr8akki/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed and built by Aakash Pahuja
        </a>
      </div>
    </footer>
  );
}
