function Experience() {
  const D = window.DATA;
  const [open, setOpen] = React.useState(0);

  return (
    <section className="experience section" id="experience">
      <span className="watermark" style={{ top: "4%" }}>CAREER</span>
      <div className="wrap">
        <div className="exp__head">
          <h2 className="shead reveal"><span className="slash">/</span>EXPERIENCE</h2>
          <span className="eyebrow reveal" data-d="1">Selected roles · 2017 → Now</span>
        </div>
        <div className="exp__list">
          {D.experience.map((e, i) => (
            <div
              className="exprow reveal"
              data-d={i + 1}
              data-open={open === i ? "" : undefined}
              key={e.co}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="exprow__main">
                <span className="exprow__idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="exprow__co">{e.co}</span>
                <span className="exprow__role">{e.role}</span>
                <span className="exprow__date">{e.date}</span>
                <span className="exprow__plus">+</span>
              </div>
              <div className="exprow__detail">
                <div>
                  <ul className="exprow__bullets">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Experience = Experience;
