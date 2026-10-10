"use client";

import {
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineDocumentReport,
  HiOutlineUserGroup,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineBeaker,
    title: "Multi-format ingestion",
    body: "Upload CSV, Excel, VCF, FASTA, or plain text sequencing exports directly, validated and previewed before analysis.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Deep learning classification",
    body: "A trained model classifies mutation type and severity, then scores disease susceptibility with a confidence interval.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Personalized drug response",
    body: "Get ranked drug recommendations with effectiveness estimates, dosage guidance, and known interactions per patient.",
  },
  {
    icon: HiOutlineDocumentReport,
    title: "Audit-ready reports",
    body: "Export a signed PDF report with patient details, prediction confidence, and doctor notes, QR-verified.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Role-based access",
    body: "Researchers, doctors, students, and administrators each see the workspace and permissions built for their role.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Built for clinical rigor",
    body: "JWT auth, encrypted fields, and full audit logging, architected toward HIPAA-aligned deployment.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-xl border-l-2 border-teal pl-4">
        <p className="mb-1 font-mono text-xs text-teal-dark">Platform</p>
        <h2 className="font-display text-3xl font-semibold text-navy-dark">
          Everything a genomics team needs, one pipeline
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-md border border-surface-border bg-surface-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="bg-surface p-6">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm border border-surface-border text-teal-dark">
              <f.icon className="text-lg" />
            </div>
            <h3 className="mb-2 font-display text-base font-semibold text-navy-dark">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-secondary">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
