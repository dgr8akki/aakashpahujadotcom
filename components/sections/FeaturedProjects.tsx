import type { FeaturedProject, Project } from '@/lib/content';
import { firstSentence } from '@/lib/utils';
import { ProjectLinks } from '@/components/sections/ProjectLinks';

function Rows({ projects, label }: { projects: (FeaturedProject | Project)[]; label: string }) {
  return (
    <ul className="index" aria-label={label}>
      {projects.map((project) => (
        <li key={project.title} className="index__row">
          <h3>{project.title}</h3>
          <p>{firstSentence(project.description)}</p>
          <span className="stack">{project.tech.join(', ')}</span>
          <ProjectLinks github={project.github} external={project.external} title={project.title} />
        </li>
      ))}
    </ul>
  );
}

export function FeaturedProjects({ projects, older }: { projects: FeaturedProject[]; older: Project[] }) {
  return (
    <>
      <section className="section section--flush" aria-label="Projects">
        <Rows projects={projects} label="Projects, newest first" />
      </section>
      {older.length > 0 && (
        <section className="section" aria-labelledby="older-title">
          <div className="head">
            <h2 id="older-title">Older experiments</h2>
            <p className="lead">Learning repos and small tools, kept as they were.</p>
          </div>
          <Rows projects={older} label="Older experiments" />
        </section>
      )}
    </>
  );
}
