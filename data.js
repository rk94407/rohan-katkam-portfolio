/* Content for Rohan Katkam portfolio. Attaches to window.DATA */
window.DATA = {
  name: ["ROHAN", "KATKAM"],
  roles: ["AI Engineer", "Full Stack Developer", "Software Engineer"],
  heroBlurb:
    "Building production-grade applications across EdTech, AI/ML and MedSpa — clear, scalable, and shipped.",
  available: "ROHAN KATKAM",

  about: {
    statement: [
      { t: "Results-driven full stack developer", b: true },
      { t: " building production-grade apps across ", b: false },
      { t: "EdTech, AI/ML & MedSpa", b: true },
      { t: ". I own the full lifecycle — from architecture to deployment.", b: false, muted: true },
    ],
    body: [
      "Proficient in React.js, Next.js, Node.js, Python and AWS, with proven expertise across the MERN/MEAN stacks, RESTful APIs, microservices and CI/CD.",
      "Strong academic foundation backed by shipped work in AI-powered systems, performance optimization and scalable architecture — and a habit of driving projects from idea to zero-downtime release.",
    ],
    facts: [
      ["Focus", "Full Stack · AI Integration"],
      ["Stacks", "MERN / MEAN"],
      ["Cloud", "AWS · Docker · CI/CD"],
      ["Domains", "EdTech · AI/ML · MedSpa"],
      ["Based", "Open to remote & hybrid"],
    ],
  },

  skills: [
    { h: "Languages", tags: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++", "HTML5", "CSS3"] },
    { h: "Frontend", tags: ["React.js", "Next.js", "Angular", "Tailwind CSS"] },
    { h: "Backend", tags: ["Node.js", "Express.js", "Django", "Flask", "REST APIs", "MERN / MEAN"] },
    { h: "AI & Data", tags: ["RAG", "LangChain", "OpenAI", "Machine Learning", "PostgreSQL", "MongoDB", "MySQL", "Firestore", "HBase", "DSA"] },
    { h: "Cloud / DevOps", tags: ["AWS (EC2, S3)", "Docker", "CI/CD", "Microservices", "Git", "Agile / Scrum"] },
    { h: "Tools & Testing", tags: ["GitHub", "Postman", "Jest", "React Testing Library", "Unit Testing", "Code Reviews"] },
  ],

  experience: [
    {
      co: "Bright Mind Enrichment",
      role: "Full Stack Developer",
      date: "Jun 2025 — Present",
      bullets: [
        "Architected, implemented and delivered a highly scalable full-stack application using React.js and Firestore, owning the complete development lifecycle from design through deployment.",
        "Developed test strategies and automation frameworks with Jest and React Testing Library, driving code coverage to 85% and improving automation metrics across the codebase.",
        "Operated in a hybrid engineering model — ensuring quality in my own code, reviewing others', and mentoring teammates on tools and best practices.",
      ],
    },
    {
      co: "Nuboe.com",
      role: "Full Stack Developer",
      date: "Jan 2025 — May 2025",
      bullets: [
        "Architected and delivered a highly scalable MERN stack product for enterprise workflows, owning object-oriented backend systems, RESTful APIs and Node/Express microservice integrations end-to-end.",
        "Designed and shipped a production AI system (DeepSeek 1B + RAG) with custom retrieval logic, automating repetitive tasks and reducing manual processing time by 40%.",
        "Presented system designs to cross-functional stakeholders and drove projects from architecture through deployment — consistently delivering 100% on-time.",
      ],
    },
    {
      co: "Allure MedSpa",
      role: "Full Stack Developer",
      date: "Dec 2017 — Apr 2018",
      bullets: [
        "Architected and delivered highly scalable Angular web applications with responsive HTML5/CSS3 and JSON integrations, improving load times by 50% and engagement by 30%.",
        "Led a full legacy refactor that reduced technical debt and strengthened relational database schema design, raising engineering standards across the platform.",
        "Built interactive dashboards with real-time data visualization, backed by unit and functional tests for reliable, highly-available production services.",
      ],
    },
  ],

  projects: [
    {
      title: "AI RAG Chatbot",
      badge: "AI / RAG",
      desc: "End-to-end RAG pipeline ingesting PDFs into vector embeddings (Neon pgvector) for semantic retrieval — context-aware answers grounded in custom docs, with sharply reduced LLM hallucination.",
      tags: ["Next.js", "LangChain", "OpenAI", "Neon · pgvector", "Clerk"],
      url: "https://github.com/rk94407/ai_rag_chatbot",
      img: "public/ai-rag-chatbot.png",
      live: false,
    },
    {
      title: "Bio187",
      badge: "Full Stack",
      desc: "Full-stack job search platform letting employers post openings and candidates apply — secure auth, role-based access control and RESTful APIs managing listings and applications end-to-end.",
      tags: ["Next.js", "Node.js", "TypeScript", "SQL", "REST APIs"],
      url: "https://github.com/rk94407/Bio187.com",
      img: "public/bio187.png",
      live: false,
    },
    {
      title: "Portfolio Website",
      badge: "Full Stack",
      desc: "Full-stack portfolio with REST integrations (Resend API), server-side rendering and automated CI/CD pipelines delivering zero-downtime deployments on Vercel.",
      tags: ["Next.js", "Node.js", "REST APIs", "Vercel", "CI/CD"],
      url: "https://rohan-katkam-portfolio.vercel.app/",
      img: "",
      live: true,
    },
    {
      title: "Movie Hub App",
      badge: "Frontend",
      desc: "Scalable movie browsing app built on React component-composition patterns, shipped via GitHub Actions CI/CD with automated testing and zero-downtime deploys — increasing session time by 30%.",
      tags: ["React.js", "GitHub Actions", "CI/CD"],
      url: "https://react-movie-hub-app-github.netlify.app",
      img: "public/movie-app.png",
      live: true,
    },
    {
      title: "Weather App",
      badge: "API",
      desc: "Production-ready weather app integrating third-party REST APIs with error handling, retry logic and intelligent client-side caching — 99.9% uptime while reducing API calls by 60%.",
      tags: ["REST APIs", "Client Caching", "Error Handling"],
      url: "",
      img: "",
      live: false,
    },
    {
      title: "Keep Note App",
      badge: "Full Stack",
      desc: "Secure authentication and CRUD features built with Express and React, using indexed key queries to cut response latency to under 100ms.",
      tags: ["React.js", "Express.js", "MongoDB", "Auth"],
      url: "",
      img: "",
      live: false,
    },
  ],

  contact: {
    title: "Have a project in mind?",
    sub: "Together we can build something clear, scalable and impactful. I'm currently open to new roles and collaborations.",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/rohan-katkam-b3b1851b8/" },
      { label: "GitHub", url: "https://github.com/rk94407" },
      { label: "Portfolio", url: "https://rohan-katkam-portfolio.vercel.app/" },
    ],
  },
};
