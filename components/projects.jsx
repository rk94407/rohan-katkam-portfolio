function Projects() {
  const D = window.DATA;
  return (
    <section className="section" id="projects">
      <span className="watermark" style={{ top: "1%" }}>WORK</span>
      <div className="wrap">
        <div className="proj__head">
          <h2 className="shead reveal"><span className="slash">/</span>SELECTED WORK</h2>
          <a className="pill reveal" data-d="1" data-magnetic href="https://github.com/rk94407" target="_blank" rel="noopener">
            View all on GitHub {Icon.arrow({ className: "arrow" })}
          </a>
        </div>
        <div className="proj__grid">
          {D.projects.map((p, i) => {
            const Card = p.url ? "a" : "div";
            const cardProps = p.url ? { href: p.url, target: "_blank", rel: "noopener" } : {};
            return (
              <Card className="projcard reveal" data-d={(i % 2) + 1} key={p.title} {...cardProps}>
                <div className="projcard__media">
                  <span className="projcard__badge">{p.badge}</span>

                  {p.img
                    ? <image-slot id={"proj-" + i} shape="rounded" radius="14" src={p.img} placeholder={"Drop screenshot · " + p.title}></image-slot>
                    : (
                      <div className="projcard__placeholder">
                        <span className="projcard__placeholder-title">{p.title}</span>
                      </div>
                    )
                  }

                  {p.url && <span className="projcard__open">{Icon.arrow()}</span>}
                </div>
                <div className="projcard__body">
                  <h3 className="projcard__title">
                    {p.title}
                    {p.live && <span className="tag" style={{ fontSize: 9, padding: "3px 8px" }}>LIVE</span>}
                  </h3>
                  <p className="projcard__desc">{p.desc}</p>
                  <div className="projcard__tags">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Projects = Projects;
