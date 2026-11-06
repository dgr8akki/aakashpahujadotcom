import type { Metadata } from 'next';
import { getFeaturedProjects, getOtherProjects } from '@/lib/content';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Side projects by Aakash Pahuja: agents, RAG, browser extensions, terminal tools and component libraries, each with its source.',
};

export default function WorkPage() {
  const projects = getFeaturedProjects();
  const older = getOtherProjects();

  return (
    <div className="container">
      <header className="page-head">
        <h1>Work</h1>
        <p className="lead">
          {projects.length + older.length} side projects, newest first, each with its source or a live link.
        </p>
      </header>
      <FeaturedProjects projects={projects} older={older} />
    </div>
  );
}
