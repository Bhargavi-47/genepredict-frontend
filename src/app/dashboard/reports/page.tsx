"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { Patient, Prediction } from "@/lib/types";

interface Report {
  id: string;
  prediction_id: string;
  pdf_path: string | null;
  doctor_notes: string | null;
  created_at: string;
}

interface ReportFormValues {
  patient_id: string;
  prediction_id: string;
  doctor_notes?: string;
}

export default function ReportsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<ReportFormValues>();
  const selectedPatientId = watch("patient_id");

  useEffect(() => {
    api.get<Patient[]>("/api/patients").then((res) => setPatients(res.data));
    loadReports();
  }, []);

  useEffect(() => {
    if (!selectedPatientId) {
      setPredictions([]);
      return;
    }
    api
      .get<Prediction[]>(`/api/predict/patient/${selectedPatientId}`)
      .then((res) => setPredictions(res.data));
  }, [selectedPatientId]);

  function loadReports() {
    api.get<Report[]>("/api/reports").then((res) => setReports(res.data));
  }

  async function onSubmit(values: ReportFormValues) {
    setError(null);
    try {
      await api.post("/api/reports", {
        prediction_id: values.prediction_id,
        doctor_notes: values.doctor_notes,
      });
      reset();
      setShowForm(false);
      loadReports();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Couldn't create that report.");
    }
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-dark">
            Reports
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            Generate and review reports for completed predictions.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark"
        >
          New report
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 max-w-xl space-y-4 rounded-md border border-surface-border bg-surface p-6"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-dark">
              Patient
            </label>
            <select
              className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
              {...register("patient_id", { required: true })}
            >
              <option value="">Select a patient…</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.patient_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-dark">
              Prediction
            </label>
            <select
              className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
              disabled={predictions.length === 0}
              {...register("prediction_id", { required: true })}
            >
              <option value="">
                {predictions.length === 0
                  ? "No predictions for this patient yet"
                  : "Select a prediction…"}
              </option>
              {predictions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.disease} — {new Date(p.created_at).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-dark">
              Doctor notes (optional)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
              placeholder="Additional context for this report…"
              {...register("doctor_notes")}
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark"
          >
            Create report
          </button>
        </form>
      )}

      {error && (
        <div className="mt-6 max-w-xl rounded-md bg-accent-red/10 px-4 py-3 text-sm text-accent-red">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.length === 0 && (
          <p className="text-sm text-ink-secondary">No reports created yet.</p>
        )}
        {reports.map((r) => (
          <div key={r.id} className="rounded-md border border-surface-border bg-surface p-5">
            <p className="font-mono text-xs text-ink-faint">
              Report #{r.id.slice(0, 8)}
            </p>
            <p className="mt-2 text-sm text-ink-secondary">
              {r.doctor_notes || "No notes added."}
            </p>
            <p className="mt-3 text-xs text-ink-faint">
              Created {new Date(r.created_at).toLocaleDateString()}
            </p>
            <p className="mt-2 text-xs text-accent-amber">
              PDF export coming in a later phase.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
