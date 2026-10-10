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
    <div className="rounded-md border border-surface-border bg-surface p-5">
      <p className="field-label border-l-2 border-surface-border pl-2">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-navy-dark">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-secondary">{hint}</p>}
    </div>
  );
}
