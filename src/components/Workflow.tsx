"use client";

const stages = [
  { label: "Upload", detail: "CSV / VCF / FASTA ingestion" },
  { label: "Preprocess", detail: "Normalize & validate variants" },
  { label: "Classify", detail: "Mutation type & pathogenicity" },
  { label: "Predict", detail: "Disease risk & confidence" },
  { label: "Recommend", detail: "Drug response ranking" },
  { label: "Report", detail: "Signed, exportable PDF" },
];

export default function Workflow() {
  return (
    <section id="workflow" className="bg-navy-dark py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-xl border-l-2 border-teal pl-4">
          <p className="mb-1 font-mono text-xs text-teal-light">Pipeline</p>
          <h2 className="font-display text-3xl font-semibold text-white">
            One sample, six stages, one report
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block" />
          <div className="grid gap-10 md:grid-cols-6">
            {stages.map((s, i) => (
              <div key={s.label} className="relative">
                <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-teal font-mono text-xs font-semibold text-navy-dark">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-sm font-semibold text-white">
                  {s.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
