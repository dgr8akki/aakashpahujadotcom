import { Hero } from '@/components/sections/Hero';
import { Extensions } from '@/components/sections/Extensions';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Experience } from '@/components/sections/Experience';
import { Writing } from '@/components/sections/Writing';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import {
  getHeroContent,
  getAboutContent,
  getSkillsContent,
  getAllJobs,
  getAllPosts,
  getExtensions,
  getFeaturedProjects,
  getOtherProjects,
  getContactContent,
} from '@/lib/content';

export default function HomePage() {
  const heroContent = getHeroContent();
  const aboutContent = getAboutContent();
  const skillsContent = getSkillsContent();
  const jobs = getAllJobs();
  const posts = getAllPosts();
  const extensions = getExtensions();
  const featuredProjects = getFeaturedProjects();
  const otherProjects = getOtherProjects();
  const contactContent = getContactContent();

  return (
    <>
      {heroContent && <Hero data={heroContent} />}
      <Extensions extensions={extensions} />
      <FeaturedProjects projects={featuredProjects} older={otherProjects} />
      <Experience jobs={jobs} />
      <Writing posts={posts.slice(0, 5)} total={posts.length} />
      {aboutContent && <About data={aboutContent} />}
      {skillsContent && <Skills data={skillsContent} />}
      {contactContent && <Contact data={contactContent} />}
    </>
  );
}
