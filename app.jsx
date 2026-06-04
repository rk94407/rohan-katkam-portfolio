/* App: theme toggle, tweaks (directions), animations, mount */
const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "editorial",
  "nameStyle": "split",
  "motion": "on"
}/*EDITMODE-END*/;

/* reveal-on-scroll + magnetic buttons */
function useInteractions(deps) {
  useE(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));

    // failsafe: if the IO callback is throttled (background frame), reveal all
    const failsafe = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 2600);

    // magnetic
    const mags = [...document.querySelectorAll("[data-magnetic]")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const handlers = [];
    if (!reduce && document.documentElement.getAttribute("data-motion") !== "off") {
      mags.forEach((el) => {
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
        };
        const leave = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        handlers.push([el, move, leave]);
      });
    }
    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      handlers.forEach(([el, m, l]) => {
        el.removeEventListener("mousemove", m);
        el.removeEventListener("mouseleave", l);
      });
    };
  }, deps || []);
}

/* parallax watermarks */
function useParallax() {
  useE(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const marks = [...document.querySelectorAll(".watermark")];
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = innerHeight;
        marks.forEach((m) => {
          const r = m.getBoundingClientRect();
          const prog = (r.top + r.height / 2 - vh / 2) / vh;
          m.style.transform = `translateX(calc(-50% + ${prog * -50}px))`;
        });
        raf = 0;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useS(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  // theme -> root + persist
  useE(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("rk-theme", theme); } catch (e) {}
  }, [theme]);

  // gate entrance animations only when the clock is live & motion enabled
  useE(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (t.motion === "on" && !reduce) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => root.classList.add("anim-ready"))
      );
      return () => { cancelAnimationFrame(id); root.classList.remove("anim-ready"); };
    }
    root.classList.remove("anim-ready");
  }, [t.motion]);

  // tweaks -> root attrs
  useE(() => { document.documentElement.setAttribute("data-direction", t.direction); }, [t.direction]);
  useE(() => { document.documentElement.setAttribute("data-namestyle", t.nameStyle); }, [t.nameStyle]);
  useE(() => { document.documentElement.setAttribute("data-motion", t.motion); }, [t.motion]);

  useInteractions([t.direction]);
  useParallax();

  return (
    <React.Fragment>
      <Nav theme={theme} onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <TweaksPanel>
        <TweakSection label="Direction" />
        <TweakRadio
          label="Layout"
          value={t.direction}
          options={["editorial", "brutalist", "swiss"]}
          onChange={(v) => setTweak("direction", v)}
        />
        <TweakSection label="Hero name" />
        <TweakRadio
          label="Style"
          value={t.nameStyle}
          options={["split", "outline", "fill"]}
          onChange={(v) => setTweak("nameStyle", v)}
        />
        <TweakSection label="Motion" />
        <TweakToggle
          label="Animations"
          value={t.motion === "on"}
          onChange={(v) => setTweak("motion", v ? "on" : "off")}
        />
        <TweakSection label="Theme" />
        <TweakToggle
          label="Dark mode"
          value={theme === "dark"}
          onChange={(v) => setTheme(v ? "dark" : "light")}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
