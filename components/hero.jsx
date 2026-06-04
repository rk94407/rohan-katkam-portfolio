function Hero() {
  const D = window.DATA;
  return (
    <header className="hero section" id="top" style={{ paddingBottom: 30 }}>
      <div className="wrap">
        <div className="eyebrow reveal" style={{ textAlign: "center", marginBottom: 6 }}>
          {D.roles.join("  /  ")}
        </div>
        <h1 className="hero__name">
          <span className="w outline">{D.name[0]}</span>{" "}
          <span className="w fill">{D.name[1]}</span>
        </h1>

        <div className="hero__stage">
          <div className="hero__portrait reveal">
            <image-slot id="portrait" shape="rect" placeholder="Drop your portrait (JPG/PNG)"></image-slot>
          </div>
        </div>

        <div className="hero__row">
          <div className="hero__lead reveal">
            <h2>{D.roles[0]} <span style={{ color: "var(--ink-faint)" }}>&amp;</span> {D.roles[1]}</h2>
            <p>{D.heroBlurb}</p>
            <a className="pill pill--solid" data-magnetic href="#contact">
              Let's collaborate {Icon.arrow({ className: "arrow" })}
            </a>
          </div>
          <div className="hero__socials reveal" data-d="2">
            {D.contact.links.map((l) => (
              <a key={l.label} className="pill" data-magnetic href={l.url} target="_blank" rel="noopener">
                {social(l.label)} {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

window.Hero = Hero;
