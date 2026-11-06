import { Hero } from '@/components/sections/Hero';
import { Extensions } from '@/components/sections/Extensions';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ExperienceSummary } from '@/components/sections/ExperienceSummary';
import { Writing } from '@/components/sections/Writing';
import { Contact } from '@/components/sections/Contact';
import {
  getHeroContent,
  getAllJobs,
  getAllPosts,
  getExtensions,
  getFeaturedProjects,
  getOtherProjects,
  getContactContent,
} from '@/lib/content';

export default function HomePage() {
  const heroContent = getHeroContent();
  const jobs = getAllJobs();
  const posts = getAllPosts();
  const extensions = getExtensions();
  const featuredProjects = getFeaturedProjects();
  const projectCount = featuredProjects.length + getOtherProjects().length;
  const contactContent = getContactContent();

  return (
    <>
      {heroContent && <Hero data={heroContent} />}
      <Extensions extensions={extensions} />
      <SelectedWork projects={featuredProjects} total={projectCount} />
      <ExperienceSummary jobs={jobs} />
      <Writing posts={posts.slice(0, 3)} total={posts.length} />
      {contactContent && <Contact data={contactContent} />}
    </>
  );
}
