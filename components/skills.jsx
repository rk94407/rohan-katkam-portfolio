const SKILL_URLS = {
  "JavaScript (ES6+)":    "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "TypeScript":           "https://www.typescriptlang.org/",
  "Python":               "https://www.python.org/",
  "Java":                 "https://www.java.com/",
  "C++":                  "https://isocpp.org/",
  "HTML5":                "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "CSS3":                 "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "React.js":             "https://react.dev/",
  "Next.js":              "https://nextjs.org/",
  "Angular":              "https://angular.dev/",
  "Tailwind CSS":         "https://tailwindcss.com/",
  "Node.js":              "https://nodejs.org/",
  "Express.js":           "https://expressjs.com/",
  "Django":               "https://www.djangoproject.com/",
  "Flask":                "https://flask.palletsprojects.com/",
  "LangChain":            "https://www.langchain.com/",
  "OpenAI":               "https://openai.com/",
  "PostgreSQL":           "https://www.postgresql.org/",
  "MongoDB":              "https://www.mongodb.com/",
  "MySQL":                "https://www.mysql.com/",
  "Firestore":            "https://firebase.google.com/docs/firestore",
  "HBase":                "https://hbase.apache.org/",
  "AWS (EC2, S3)":        "https://aws.amazon.com/",
  "Docker":               "https://www.docker.com/",
  "Git":                  "https://git-scm.com/",
  "GitHub":               "https://github.com/",
  "Postman":              "https://www.postman.com/",
  "Jest":                 "https://jestjs.io/",
  "React Testing Library":"https://testing-library.com/",
};

function Skills() {
  const D = window.DATA;
  return (
    <section className="section" id="skills" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="skills__head">
          <h2 className="shead reveal"><span className="slash">/</span>SKILLS</h2>
          <span className="eyebrow reveal" data-d="1">06 — Disciplines</span>
        </div>
        <div className="skills__grid">
          {D.skills.map((s, i) => (
            <div className="skillcard reveal" data-d={(i % 3) + 1} key={s.h}>
              <div className="skillcard__top">
                <span className="skillcard__idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.h}</h3>
              </div>
              <div className="skillcard__tags">
                {s.tags.map((t) => {
                  const url = SKILL_URLS[t];
                  return url
                    ? <a key={t} className="tag" href={url} target="_blank" rel="noopener noreferrer">{t}</a>
                    : <span key={t} className="tag">{t}</span>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Skills = Skills;
