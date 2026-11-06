import type { Metadata } from 'next';
import { getAboutContent, getAllJobs, getSkillsContent } from '@/lib/content';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';

export const metadata: Metadata = {
  title: 'About',
  description: 'Aakash Pahuja: background, every job from Kony to Squarespace, and the stack he works in.',
};

export default function AboutPage() {
  const about = getAboutContent();
  const skills = getSkillsContent();
  const jobs = getAllJobs();

  return (
    <>
      <div className="container">
        <header className="page-head">
          <h1>Coder by heart</h1>
          <p className="lead">Senior Software Engineer 2 at Squarespace. In Dublin since 2022, after Hyderabad, Bengaluru and Gurugram.</p>
        </header>
      </div>
      {about && <About data={about} />}
      <Experience jobs={jobs} />
      {skills && <Skills data={skills} />}
    </>
  );
}
