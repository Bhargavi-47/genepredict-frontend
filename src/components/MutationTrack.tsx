"use client";

type MutationTrackProps = {
  /** Index (0-based) of the segment to highlight as "the mutation". -1 for none. */
  highlightIndex?: number;
  segments?: number;
  animated?: boolean;
  className?: string;
};

/**
 * The site's signature motif: a horizontal strip of ticks styled after a genome
 * browser / chromosome ideogram track, with one segment picked out as the
 * mutation of interest and an optional scanning sweep representing analysis.
 */
export default function MutationTrack({
  highlightIndex = 14,
  segments = 28,
  animated = true,
  className = "",
}: MutationTrackProps) {
  const bars = Array.from({ length: segments });

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="flex items-end gap-[3px] h-16">
        {bars.map((_, i) => {
          const isHighlight = i === highlightIndex;
          const heightPct = isHighlight ? 100 : 40 + ((i * 37) % 45);
          return (
            <div
              key={i}
              className={`w-[5px] rounded-sm transition-all duration-300 ${
                isHighlight
                  ? "bg-accent-green shadow-[0_0_12px_rgba(22,163,74,0.5)]"
                  : i % 5 === 0
                  ? "bg-navy/70"
                  : "bg-teal/40"
              }`}
              style={{ height: `${heightPct}%` }}
            />
          );
        })}
      </div>
      {animated && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-track-scan" />
        </div>
      )}
    </div>
  );
}
