interface SkillsProps {
  data: {
    skills: string[];
  };
}

export function Skills({ data }: SkillsProps) {
  if (data.skills.length === 0) return null;

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="head">
          <h2 id="skills-title">The stack, front to back</h2>
          <p className="lead">What the work above runs on, from React to Postgres and the CI around it.</p>
        </div>
        <ul className="skills">
          {data.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
