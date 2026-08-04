"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MutationTrack from "./MutationTrack";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-teal-dark">
            chr17:43,044,295 &middot; BRCA1 &middot; classification in progress
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-navy-dark md:text-5xl">
            Read the mutation.
            <br />
            Predict the risk.
            <br />
            <span className="text-teal">Recommend the drug.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-secondary">
            GenePredict AI classifies genetic mutations from raw sequencing
            data and turns them into disease-risk scores and personalized
            drug-response predictions — in one auditable pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-dark"
            >
              Get started
            </Link>
            <a
              href="#workflow"
              className="rounded-md border border-surface-border px-6 py-3 text-sm font-semibold text-navy-dark transition hover:border-navy/40"
            >
              Learn how it works
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border border-surface-border bg-surface-muted p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between font-mono text-xs text-ink-faint">
            <span>SAMPLE_ID: GP-2026-0043</span>
            <span className="rounded bg-accent-green/10 px-2 py-0.5 text-accent-green">
              variant found
            </span>
          </div>
          <MutationTrack highlightIndex={16} />
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-surface-border pt-6 font-mono text-xs text-ink-secondary">
            <div>
              <p className="text-ink-faint">Gene</p>
              <p className="text-navy-dark">BRCA1</p>
            </div>
            <div>
              <p className="text-ink-faint">Risk level</p>
              <p className="text-accent-green">Moderate</p>
            </div>
            <div>
              <p className="text-ink-faint">Confidence</p>
              <p className="text-navy-dark">87.3%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
