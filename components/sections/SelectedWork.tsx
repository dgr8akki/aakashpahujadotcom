import Link from 'next/link';
import type { FeaturedProject } from '@/lib/content';
import { firstSentence } from '@/lib/utils';
import { ProjectLinks } from '@/components/sections/ProjectLinks';

// ponytail: from real `engram --help` output (v1.0.0): three commands, rewrapped to fit a tile
const ENGRAM_HELP = `$ engram --help
Usage: engram [OPTIONS] COMMAND

Commands:
  add     Save a thought.
  search  Semantic search across
          your thoughts.
  stats   Show knowledge base
          statistics.`;

interface SelectedWorkProps {
  projects: FeaturedProject[];
  total: number;
}

export function SelectedWork({ projects, total }: SelectedWorkProps) {
  const pick = (title: string) => projects.find((p) => p.title === title);
  const auraform = pick('Auraform UI');
  const engram = pick('Engram');
  const papertrail = pick('PaperTrail');

  return (
    <section id="projects" className="section section--l" aria-labelledby="projects-title">
      <div className="container">
        <div className="head">
          <h2 id="projects-title">Selected side projects</h2>
          <p className="lead">Three from the {total} I keep on GitHub.</p>
        </div>

        <ul className="tiles">
          {auraform && (
            <li className="tile">
              <figure className="shot ticks">
                <div data-slot="work-auraform" data-kind="product" data-alt="Auraform UI's dark showcase in Storybook">
                  <img
                    src={auraform.cover}
                    alt="Auraform UI components in the dark gray theme: buttons, a text input, toggle, slider and knob."
                    width={1440}
                    height={700}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
              <h3>{auraform.title}</h3>
              <p>{firstSentence(auraform.description)}</p>
              <ProjectLinks github={auraform.github} external={auraform.external} title={auraform.title} />
            </li>
          )}
          {engram && (
            <li className="tile">
              <figure className="shot">
                <pre className="term tile__term" aria-label="Output of engram --help">
                  {ENGRAM_HELP}
                </pre>
              </figure>
              <h3>{engram.title}</h3>
              <p>{firstSentence(engram.description)}</p>
              <ProjectLinks github={engram.github} external={engram.external} title={engram.title} />
            </li>
          )}
          {papertrail && (
            <li className="tile">
              <figure className="shot">
                <blockquote className="tile__quote">
                  Every citation is checked against the retrieved text before it renders.
                </blockquote>
              </figure>
              <h3>{papertrail.title}</h3>
              <p>{firstSentence(papertrail.description)}</p>
              <ProjectLinks github={papertrail.github} external={papertrail.external} title={papertrail.title} />
            </li>
          )}
        </ul>

        <p className="more">
          <Link className="btn btn--quiet" href="/work">
            All {total} projects
          </Link>
        </p>
      </div>
    </section>
  );
}
