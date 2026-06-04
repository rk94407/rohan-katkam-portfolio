function Marquee() {
  const items = ["AI Engineering", "Full Stack", "React · Next.js", "Node · Python", "RAG · LangChain", "AWS · CI/CD", "MERN / MEAN", "Microservices"];
  const row = items.concat(items);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

window.Marquee = Marquee;
