import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Projects } from '@/components/sections/Projects';
import { BlogList } from '@/components/sections/BlogList';
import { Contact } from '@/components/sections/Contact';
import {
  getHeroContent,
  getAboutContent,
  getSkillsContent,
  getAllJobs,
  getFeaturedProjects,
  getAllPosts,
  getContactContent,
  getGithubProfile,
} from '@/lib/content';

// Re-fetch GitHub profile hourly at runtime while keeping ISG.
export const revalidate = 3600;

export default async function HomePage() {
  const heroContent = getHeroContent();
  const aboutContent = getAboutContent();
  const skillsContent = getSkillsContent();
  const jobs = getAllJobs();
  const featuredProjects = getFeaturedProjects();
  const posts = getAllPosts();
  const contactContent = getContactContent();
  const githubProfile = await getGithubProfile();

  return (
    <>
      {heroContent && <Hero data={heroContent} />}
      {aboutContent && <About data={aboutContent} />}
      {skillsContent && <Skills data={skillsContent} />}
      <Experience jobs={jobs} />
      <FeaturedProjects projects={featuredProjects} />
      <Projects profile={githubProfile} />
      <BlogList posts={posts} />
      {contactContent && <Contact data={contactContent} />}
    </>
  );
}
