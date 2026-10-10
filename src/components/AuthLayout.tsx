import Link from "next/link";
import { ReactNode } from "react";
import MutationTrack from "./MutationTrack";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-navy-dark p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-green" />
          <span className="font-display text-lg font-semibold text-white">
            GenePredict <span className="text-teal-light">AI</span>
          </span>
        </Link>

        <div>
          <p className="mb-6 border-l-2 border-teal-light pl-3 font-mono text-xs text-teal-light">
            chr17:43,044,295 &nbsp;/&nbsp; BRCA1
          </p>
          <MutationTrack highlightIndex={9} className="opacity-90" />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/70">
            Every login is scoped to your role and every patient record is
            visible only to the team that owns it.
          </p>
        </div>

        <p className="text-xs text-white/40">
          © 2026 GenePredict AI. All rights reserved.
        </p>
      </div>

      <div className="flex w-full items-center justify-center px-6 py-16 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-navy-dark">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-secondary">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
