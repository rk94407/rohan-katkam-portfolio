function About() {
  const D = window.DATA;
  return (
    <section className="section" id="about">
      <span className="watermark" style={{ top: "2%" }}>ABOUT</span>
      <div className="wrap">
        <h2 className="shead reveal"><span className="slash">/</span>ABOUT ME</h2>
        <div className="about__grid">
          <p className="about__statement reveal">
            {D.about.statement.map((s, i) =>
              s.b
                ? <b key={i}>{s.t}</b>
                : <span key={i} className={s.muted ? "muted" : ""}>{s.t}</span>
            )}
          </p>
          <div className="about__body reveal" data-d="1">
            {D.about.body.map((p, i) => <p key={i}>{p}</p>)}
            <dl className="about__facts">
              {D.about.facts.map(([k, v]) => (
                <div className="about__fact" key={k}>
                  <dt>{k}</dt><dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
