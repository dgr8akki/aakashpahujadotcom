import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import {
  getHeroContent,
  getAboutContent,
  getSkillsContent,
  getAllJobs,
  getFeaturedProjects,
  getOtherProjects,
  getContactContent,
} from '@/lib/content';

export default function HomePage() {
  const heroContent = getHeroContent();
  const aboutContent = getAboutContent();
  const skillsContent = getSkillsContent();
  const jobs = getAllJobs();
  const featuredProjects = getFeaturedProjects();
  const otherProjects = getOtherProjects();
  const contactContent = getContactContent();

  return (
    <>
      {heroContent && <Hero data={heroContent} />}
      {aboutContent && <About data={aboutContent} />}
      {skillsContent && <Skills data={skillsContent} />}
      <Experience jobs={jobs} />
      <FeaturedProjects projects={featuredProjects} />
      <Projects projects={otherProjects} />
      {contactContent && <Contact data={contactContent} />}
    </>
  );
}
