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
      <div className="mb-12 max-w-xl border-l-2 border-teal pl-4">
        <p className="mb-1 font-mono text-xs text-teal-dark">Under the hood</p>
        <h2 className="font-display text-3xl font-semibold text-navy-dark">
          Built on infrastructure genomics teams already trust
        </h2>
      </div>
      <div className="grid overflow-hidden rounded-md border border-surface-border sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((s, i) => (
          <div
            key={s.group}
            className={`p-5 ${i > 0 ? "border-t border-surface-border sm:border-t-0 sm:border-l" : ""}`}
          >
            <h3 className="mb-3 font-mono text-xs text-ink-faint">{s.group}</h3>
            <ul className="space-y-1.5">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-ink-secondary">
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
