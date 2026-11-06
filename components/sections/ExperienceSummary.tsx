import Link from 'next/link';
import type { Job } from '@/lib/content';
import { endYear, startYear } from '@/lib/utils';

interface Row {
  company: string;
  role: string;
  location: string;
  from: string;
  to: string;
}

// Jobs arrive newest first; roles at the same company fold into one row.
function byCompany(jobs: Job[]): Row[] {
  const rows: Row[] = [];
  for (const job of jobs) {
    const last = rows[rows.length - 1];
    if (last && last.company === job.company) {
      last.from = startYear(job.range);
      continue;
    }
    rows.push({ company: job.company, role: job.title, location: job.location, from: startYear(job.range), to: endYear(job.range) });
  }
  return rows;
}

export function ExperienceSummary({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <section id="jobs" className="section section--l" aria-labelledby="jobs-title">
      <div className="container">
        <div className="head">
          <h2 id="jobs-title">From Kony to Squarespace</h2>
          <p className="lead">Hyderabad, Bengaluru, Gurugram, then Dublin.</p>
        </div>

        <ul className="roles">
          {byCompany(jobs).map((row) => (
            <li key={row.company}>
              <span className="measure">
                {row.from === row.to ? row.from : `${row.from} to ${row.to}`}
              </span>
              <span className="roles__company">{row.company}</span>
              <span className="roles__role">{row.role}</span>
              <span className="roles__where">{row.location}</span>
            </li>
          ))}
        </ul>

        <p className="more">
          <Link className="btn btn--quiet" href="/about#history">
            What I shipped at each
          </Link>
        </p>
      </div>
    </section>
  );
}
