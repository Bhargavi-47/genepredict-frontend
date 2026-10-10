"use client";

type MutationTrackProps = {
  /** Index (0-based) of the position to mark as "the variant". -1 for none. */
  highlightIndex?: number;
  segments?: number;
  animated?: boolean;
  className?: string;
};

/**
 * The site's signature motif: a genomic coordinate ruler, the way a variant
 * position is rendered in real genome-browser software (IGV, UCSC Browser) —
 * a baseline with major/minor tick marks and a single marked position, not a
 * decorative bar chart. Deliberately instrument-like rather than playful.
 */
export default function MutationTrack({
  highlightIndex = 14,
  segments = 40,
  animated = true,
  className = "",
}: MutationTrackProps) {
  const ticks = Array.from({ length: segments });

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="relative h-12">
        <div className="absolute bottom-4 left-0 right-0 h-px bg-navy/25" />

        <div className="absolute bottom-4 left-0 right-0 flex items-end justify-between">
          {ticks.map((_, i) => {
            const isHighlight = i === highlightIndex;
            const isMajor = i % 5 === 0;
            return (
              <div
                key={i}
                className={`w-px ${
                  isHighlight
                    ? "h-5 bg-accent-red"
                    : isMajor
                    ? "h-3 bg-navy/50"
                    : "h-1.5 bg-navy/25"
                }`}
              />
            );
          })}
        </div>

        {highlightIndex >= 0 && (
          <div
            className="absolute bottom-9 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${(highlightIndex / (segments - 1)) * 100}%` }}
          >
            <span className="rounded-sm bg-accent-red px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none text-white">
              variant
            </span>
            <span className="mt-1 h-2 w-px bg-accent-red" />
          </div>
        )}

        {animated && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="h-full w-10 bg-gradient-to-r from-transparent via-navy/[0.06] to-transparent animate-track-scan" />
          </div>
        )}
      </div>
    </div>
  );
}
