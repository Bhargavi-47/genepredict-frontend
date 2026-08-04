"use client";

import Link from "next/link";
import MutationTrack from "./MutationTrack";

export default function ContactCTA() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <div className="overflow-hidden rounded-2xl bg-teal px-8 py-12 text-center md:px-16">
        <h2 className="font-display text-3xl font-semibold text-white">
          Bring your own mutation data
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/85">
          Create an account and upload your first dataset in minutes. No
          credit card required to explore the platform.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-md bg-navy-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
        >
          Create your account
        </Link>
        <div className="mx-auto mt-10 max-w-md opacity-90">
          <MutationTrack segments={40} highlightIndex={-1} animated={false} />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-accent-green" />
              <span className="font-display text-base font-semibold text-navy-dark">
                GenePredict AI
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-secondary">
              Deep learning classification of genetic mutations for research
              and clinical decision support.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={["Features", "Workflow", "Technology"]}
          />
          <FooterColumn
            title="Resources"
            links={["Documentation", "Research Publications", "API Reference"]}
          />
          <FooterColumn
            title="Company"
            links={["Privacy Policy", "Terms of Service", "Help Center"]}
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-6 text-xs text-ink-faint md:flex-row">
          <p>© 2026 GenePredict AI. All rights reserved.</p>
          <p>
            Predictions are decision-support estimates, not a clinical
            diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-navy-dark">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-ink-secondary hover:text-navy-dark">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
