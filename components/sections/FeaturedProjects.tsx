import type { FeaturedProject, Project } from '@/lib/content';

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
  older: Project[];
}

function ProjectLinks({ github, external, title }: { github?: string; external?: string; title: string }) {
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

// ponytail: real `engram --help` output (v1.0.0), pasted as text so it stays crisp and searchable
const ENGRAM_HELP = `Usage: engram [OPTIONS] COMMAND [ARGS]...

  Engram — your local semantic knowledge base.

Commands:
  add        Save a thought to your knowledge base.
  hooks      Manage Engram memory hooks for AI coding tools.
  install    Configure Engram for all detected AI coding tools.
  search     Semantic search across your thoughts.
  serve      Start the HTTP REST server (for tools without MCP support).
  stats      Show knowledge base statistics.`;

export function FeaturedProjects({ projects, older }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  const auraform = projects.find((p) => p.title === 'Auraform UI');
  const engram = projects.find((p) => p.title === 'Engram');
  const rest = projects.filter((p) => p !== auraform && p !== engram);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="head">
          <h2 id="projects-title">Fifteen side projects, newest first</h2>
          <p className="lead">Agents, RAG, terminal tools and a few old experiments, each with its source or a live link.</p>
        </div>

        {auraform && (
          <article className="feature">
            <figure className="feature__pic shot ticks">
              <div
                data-slot="work-auraform"
                data-kind="product"
                data-alt="Auraform UI's dark showcase in Storybook: buttons, input, toggle, slider, knob, stepper and rating"
              >
                <img
                  src={auraform.cover}
                  alt="Auraform UI components in the dark gray theme: buttons, a text input, toggle, slider, knob, stepper and star rating."
                  width={1440}
                  height={700}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
            <div className="feature__text">
              <h3>{auraform.title}</h3>
              <p>{auraform.description}</p>
              <p className="stack">{auraform.tech.join(', ')}</p>
              <ProjectLinks github={auraform.github} external={auraform.external} title={auraform.title} />
            </div>
          </article>
        )}

        {engram && (
          <article className="feature feature--flip">
            <figure className="feature__pic">
              <pre className="term" aria-label="Output of engram --help">
                <span className="prompt">$</span> <b>engram --help</b>
                {'\n'}
                {ENGRAM_HELP}
              </pre>
            </figure>
            <div className="feature__text">
              <h3>{engram.title}</h3>
              <p>{engram.description}</p>
              <p className="stack">{engram.tech.join(', ')}</p>
              <ProjectLinks github={engram.github} external={engram.external} title={engram.title} />
            </div>
          </article>
        )}

        <ul className="index" aria-label="More projects">
          {rest.map((project) => (
            <li key={project.title} className="index__row">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="stack">{project.tech.join(', ')}</span>
              <ProjectLinks github={project.github} external={project.external} title={project.title} />
            </li>
          ))}
        </ul>

        {older.length > 0 && (
          <details className="older">
            <summary className="btn btn--quiet">Older experiments ({older.length})</summary>
            <ul className="index" aria-label="Older experiments">
              {older.map((project) => (
                <li key={project.title} className="index__row">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="stack">{project.tech.join(', ')}</span>
                  <ProjectLinks github={project.github} external={project.external} title={project.title} />
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
