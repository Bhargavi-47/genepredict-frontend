export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-navy-dark">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-secondary">{hint}</p>}
    </div>
  );
}
