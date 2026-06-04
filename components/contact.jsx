function ContactForm() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = React.useState("");

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (r.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        const d = await r.json().catch(() => ({}));
        setErrMsg(d.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Could not send — check your connection.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact__form cf-sent">
        <span className="cf-status cf-status--ok">✓ Message sent — I'll get back to you soon.</span>
      </div>
    );
  }

  return (
    <form className="contact__form reveal" data-d="2" onSubmit={submit} noValidate>
      <div className="cf-row">
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-name">Name</label>
          <input id="cf-name" className="cf-input" type="text" placeholder="Your name"
            value={form.name} onChange={set("name")} required />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-email">Email</label>
          <input id="cf-email" className="cf-input" type="email" placeholder="your@email.com"
            value={form.email} onChange={set("email")} required />
        </div>
      </div>
      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" className="cf-input" placeholder="Tell me about your project…"
          value={form.message} onChange={set("message")} required rows={5} />
      </div>
      <div className="cf-actions">
        <button type="submit" className="pill pill--solid" data-magnetic
          disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.6 : 1 }}>
          {status === "sending" ? "Sending…" : "Send message"} {Icon.arrow({ className: "arrow" })}
        </button>
        {status === "error" && <span className="cf-status cf-status--err">{errMsg}</span>}
      </div>
    </form>
  );
}

function Contact() {
  const D = window.DATA;
  return (
    <section className="contact section" id="contact">
      <span className="watermark" style={{ bottom: "8%", top: "auto" }}>CONTACT</span>
      <div className="wrap">
        <span className="pill reveal"><span className="dot" /> {D.available}</span>
        <h2 className="contact__title reveal" data-d="1">{D.contact.title}</h2>
        <p className="contact__sub reveal" data-d="2">{D.contact.sub}</p>
        <ContactForm />
        <div className="contact__cta reveal" data-d="3">
          <a className="pill" data-magnetic href={D.contact.links[0].url} target="_blank" rel="noopener">
            Or connect on LinkedIn {Icon.arrow({ className: "arrow" })}
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="wrap">
          <div className="footer__id">
            <span className="footer__av">
              <image-slot id="portrait-foot" shape="circle" src="public/favicon.ico" placeholder="●"></image-slot>
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>Rohan Katkam</span>
          </div>
          <div className="footer__links">
            {D.contact.links.map((l) => (
              <a key={l.label} className="pill" data-magnetic href={l.url} target="_blank" rel="noopener">
                {social(l.label)} {l.label}
              </a>
            ))}
          </div>
          <p className="footer__legal">
            A typography-driven portfolio built to communicate who I am, what I do, and how I
            think — focused on selected work, intentional in structure. © {new Date().getFullYear()} Rohan Katkam.
          </p>
        </div>
      </footer>
    </section>
  );
}

Object.assign(window, { ContactForm, Contact });
