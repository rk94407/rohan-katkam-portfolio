function Nav({ theme, onToggleTheme }) {
  const D = window.DATA;
  const [open, setOpen] = React.useState(false);
  const links = [
    ["About",      "#about"],
    ["Skills",     "#skills"],
    ["Experience", "#experience"],
    ["Projects",   "#projects"],
  ];

  const navigate = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <div className="nav">
      <div className={"nav__inner" + (open ? " nav__inner--open" : "")}>
        <span className="pill" style={{ borderColor: "transparent", background: "transparent", paddingLeft: 4 }}>
          <span className="dot" /> {D.available}
        </span>
        <nav className="nav__links">
          {links.map(([t, h], i) => (
            <a key={t} href={h}>
              {t}<span className="num">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <button className="iconbtn" data-magnetic onClick={onToggleTheme} aria-label="Toggle theme">
            <span className="theme-moon">{Icon.moon()}</span>
            <span className="theme-sun">{Icon.sun()}</span>
          </button>
          <button className="iconbtn nav__burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
            {open ? Icon.close() : Icon.burger()}
          </button>
          <a className="pill pill--solid nav__cta" data-magnetic href="#contact">
            Let's Talk {Icon.arrow({ className: "arrow" })}
          </a>
        </div>
      </div>

      {open && (
        <div className="nav__mobile-menu">
          {links.map(([t, h], i) => (
            <a key={t} href={h} onClick={(e) => { e.preventDefault(); navigate(h); }}>
              <span className="nav__mobile-num">0{i + 1}</span>{t}
            </a>
          ))}
          <a href="#contact" className="nav__mobile-contact" onClick={(e) => { e.preventDefault(); navigate("#contact"); }}>
            Let's Talk {Icon.arrow({ className: "arrow" })}
          </a>
        </div>
      )}
    </div>
  );
}

window.Nav = Nav;
