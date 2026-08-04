"use client";

const stack = [
  { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["FastAPI", "JWT Auth", "REST API"] },
  { group: "Modeling", items: ["TensorFlow / Keras", "Scikit-learn", "Pandas"] },
  { group: "Data", items: ["PostgreSQL", "SQLAlchemy", "Encrypted storage"] },
];

export default function TechStack() {
  return (
    <section id="technology" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-teal-dark">
          Under the hood
        </p>
        <h2 className="font-display text-3xl font-semibold text-navy-dark">
          Built on infrastructure genomics teams already trust
        </h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((s) => (
          <div key={s.group}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-faint">
              {s.group}
            </h3>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-surface-border px-3 py-2 text-sm text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
