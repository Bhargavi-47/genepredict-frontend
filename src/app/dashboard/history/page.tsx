"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Patient, Prediction } from "@/lib/types";

interface HistoryRow extends Prediction {
  patient_name: string;
}

export default function HistoryPage() {
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [patientFilter, setPatientFilter] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const patientsRes = await api.get<Patient[]>("/api/patients");
      setPatients(patientsRes.data);

      const all: HistoryRow[] = [];
      for (const patient of patientsRes.data) {
        const res = await api.get<Prediction[]>(`/api/predict/patient/${patient.id}`);
        res.data.forEach((p) =>
          all.push({ ...p, patient_name: patient.patient_name })
        );
      }
      all.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setRows(all);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = patientFilter
    ? rows.filter((r) => r.patient_id === patientFilter)
    : rows;

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-navy-dark">
        History
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">
        All past predictions across your patients.
      </p>

      <div className="mt-6 max-w-xs">
        <select
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
          className="w-full rounded-md border border-surface-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-teal"
        >
          <option value="">All patients</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.patient_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-surface-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-surface-border bg-surface-muted text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-5 py-3">Patient</th>
              <th className="px-5 py-3">Disease</th>
              <th className="px-5 py-3">Risk</th>
              <th className="px-5 py-3">Confidence</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-secondary">
                  Loading history…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-secondary">
                  No predictions yet. Run one from the Prediction page.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-surface-border last:border-0">
                <td className="px-5 py-3 font-medium text-navy-dark">
                  {r.patient_name}
                </td>
                <td className="px-5 py-3 text-ink-secondary">{r.disease}</td>
                <td className="px-5 py-3 text-ink-secondary capitalize">
                  {r.risk_level ?? "—"}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-ink-secondary">
                  {(r.confidence * 100).toFixed(1)}%
                </td>
                <td className="px-5 py-3 text-ink-secondary">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
