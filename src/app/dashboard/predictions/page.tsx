"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { Patient, Prediction } from "@/lib/types";
import MutationTrack from "@/components/MutationTrack";

interface PredictFormValues {
  patient_id: string;
  gene_name: string;
  mutation_type?: string;
  chromosome?: string;
}

const riskColor: Record<string, string> = {
  low: "text-accent-green bg-accent-green/10",
  moderate: "text-accent-amber bg-accent-amber/10",
  high: "text-accent-red bg-accent-red/10",
};

export default function PredictionPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PredictFormValues>();

  useEffect(() => {
    api.get<Patient[]>("/api/patients").then((res) => setPatients(res.data));
  }, []);

  async function onSubmit(values: PredictFormValues) {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post<Prediction>("/api/predict", values);
      setResult(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-navy-dark">
        Prediction
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">
        Run disease-risk and drug-response prediction on a gene/mutation.
      </p>
      <p className="mt-2 max-w-2xl rounded-md bg-accent-amber/10 px-3 py-2 text-xs text-accent-amber">
        This deployment uses a placeholder demo model for illustration — it is
        not a validated clinical prediction tool.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid max-w-2xl gap-4 rounded-xl border border-surface-border bg-surface p-6 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Patient
          </label>
          <select
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("patient_id", { required: "Select a patient" })}
          >
            <option value="">Select a patient…</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.patient_name}
              </option>
            ))}
          </select>
          {errors.patient_id && (
            <p className="mt-1 text-xs text-accent-red">{errors.patient_id.message}</p>
          )}
        </div>

        <input
          placeholder="Gene name (e.g. BRCA1)"
          className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal"
          {...register("gene_name", { required: true })}
        />
        <input
          placeholder="Mutation type (e.g. frameshift)"
          className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
          {...register("mutation_type")}
        />
        <input
          placeholder="Chromosome (optional)"
          className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal sm:col-span-2"
          {...register("chromosome")}
        />

        <button
          type="submit"
          disabled={loading || patients.length === 0}
          className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-50 sm:col-span-2"
        >
          {loading ? "Running prediction…" : "Run prediction"}
        </button>
        {patients.length === 0 && (
          <p className="text-xs text-ink-secondary sm:col-span-2">
            Add a patient first from the Patients page.
          </p>
        )}
      </form>

      {error && (
        <div className="mt-6 max-w-2xl rounded-md bg-accent-red/10 px-4 py-3 text-sm text-accent-red">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 max-w-2xl rounded-xl border border-surface-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy-dark">
              {result.disease}
            </h2>
            <span
              className={`rounded px-2 py-1 text-xs font-medium capitalize ${
                riskColor[result.risk_level || "low"]
              }`}
            >
              {result.risk_level ?? "unknown"} risk
            </span>
          </div>

          <MutationTrack segments={32} highlightIndex={18} animated={false} />

          <div className="mt-5 grid grid-cols-3 gap-4 font-mono text-xs text-ink-secondary">
            <div>
              <p className="text-ink-faint">Confidence</p>
              <p className="text-navy-dark">{(result.confidence * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-ink-faint">Probability</p>
              <p className="text-navy-dark">{(result.probability * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-ink-faint">Inference time</p>
              <p className="text-navy-dark">
                {result.inference_time_ms?.toFixed(2) ?? "—"} ms
              </p>
            </div>
          </div>

          {result.drug_recommendations.length > 0 && (
            <div className="mt-6 border-t border-surface-border pt-5">
              <h3 className="mb-3 text-sm font-semibold text-navy-dark">
                Recommended drugs
              </h3>
              <div className="space-y-2">
                {result.drug_recommendations.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md bg-surface-muted px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-navy-dark">{d.drug_name}</span>
                    {d.effectiveness != null && (
                      <span className="font-mono text-xs text-teal-dark">
                        {(d.effectiveness * 100).toFixed(0)}% effective
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-5 text-xs text-ink-faint">
            Model version: {result.model_version}
          </p>
        </div>
      )}
    </div>
  );
}
