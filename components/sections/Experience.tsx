import ReactMarkdown, { type Components } from 'react-markdown';
import type { Job } from '@/lib/content';

interface ExperienceProps {
  jobs: Job[];
}

const jobMarkdownComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
};

export function Experience({ jobs }: ExperienceProps) {
  if (jobs.length === 0) return null;

  return (
    <section id="history" className="section section--l" aria-labelledby="history-title">
      <div className="container">
        <div className="head">
          <h2 id="history-title">What I shipped, job by job</h2>
          <p className="lead">Open a row for the detail.</p>
        </div>

        <ul className="ledger">
          {jobs.map((job, i) => (
            <li key={job.id}>
              <details open={i === 0}>
                <summary>
                  <span className="range measure">{job.range}</span>
                  <span className="company">{job.company}</span>
                  <span className="role">{job.title}</span>
                  <span className="where">{job.location}</span>
                </summary>
                <div className="ledger__body">
                  <div>
                    <ReactMarkdown components={jobMarkdownComponents}>{job.content}</ReactMarkdown>
                    {job.url && (
                      <p>
                        <a className="link" href={job.url} target="_blank" rel="noopener noreferrer">
                          {job.company} website
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
