export function ProjectLinks({ github, external, title }: { github?: string; external?: string; title: string }) {
  return (
    <ul className="links">
      {external && (
        <li>
          <a className="link" href={external} target="_blank" rel="noopener noreferrer" aria-label={`${title}, live`}>
            Live
          </a>
        </li>
      )}
      {github && (
        <li>
          <a className="link" href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`}>
            GitHub
          </a>
        </li>
      )}
    </ul>
  );
}
