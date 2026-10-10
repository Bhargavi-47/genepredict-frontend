"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import api from "@/lib/api";
import { Patient } from "@/lib/types";

interface Mutation {
  id: string;
  patient_id: string;
  gene_name: string;
  chromosome?: string | null;
  mutation_type?: string | null;
  position?: string | null;
  created_at: string;
}

interface MutationFormValues {
  gene_name: string;
  chromosome?: string;
  mutation_type?: string;
  position?: string;
  reference_allele?: string;
  alternate_allele?: string;
}

export default function MutationAnalysisPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [mutations, setMutations] = useState<Mutation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<MutationFormValues>();

  useEffect(() => {
    api.get<Patient[]>("/api/patients").then((res) => {
      setPatients(res.data);
      if (res.data.length > 0) setSelectedPatient(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedPatient) return;
    api
      .get<Mutation[]>(`/api/mutations/patient/${selectedPatient}`)
      .then((res) => setMutations(res.data))
      .catch(() => setError("Couldn't load mutations for this patient."));
  }, [selectedPatient]);

  async function onSubmit(values: MutationFormValues) {
    if (!selectedPatient) return;
    try {
      await api.post("/api/mutations", { ...values, patient_id: selectedPatient });
      reset();
      setShowForm(false);
      const res = await api.get<Mutation[]>(`/api/mutations/patient/${selectedPatient}`);
      setMutations(res.data);
    } catch {
      setError("Couldn't save that mutation record.");
    }
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-dark">
            Mutation Analysis
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            Record and review mutation entries per patient.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          disabled={!selectedPatient}
          className="flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-50"
        >
          <HiOutlinePlus />
          Add mutation
        </button>
      </div>

      <div className="mt-6 max-w-sm">
        <label className="mb-1.5 block text-sm font-medium text-navy-dark">
          Patient
        </label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full rounded-md border border-surface-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-teal"
        >
          {patients.length === 0 && <option value="">No patients yet</option>}
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.patient_name}
            </option>
          ))}
        </select>
        {patients.length === 0 && (
          <p className="mt-2 text-xs text-ink-secondary">
            Add a patient first from the Patients page.
          </p>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid max-w-3xl gap-4 rounded-md border border-surface-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <input
            placeholder="Gene name (e.g. BRCA1)"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal"
            {...register("gene_name", { required: true })}
          />
          <input
            placeholder="Chromosome (e.g. chr17)"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal"
            {...register("chromosome")}
          />
          <input
            placeholder="Mutation type (e.g. frameshift)"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("mutation_type")}
          />
          <input
            placeholder="Position (e.g. 43,044,295)"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal"
            {...register("position")}
          />
          <input
            placeholder="Reference allele"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal"
            {...register("reference_allele")}
          />
          <input
            placeholder="Alternate allele"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm font-mono outline-none focus:border-teal"
            {...register("alternate_allele")}
          />
          <button
            type="submit"
            className="rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark sm:col-span-2 lg:col-span-1"
          >
            Save mutation
          </button>
        </form>
      )}

      {error && (
        <div className="mt-6 max-w-3xl rounded-md bg-accent-amber/10 px-4 py-3 text-sm text-accent-amber">
          {error}
        </div>
      )}

      <div className="mt-6 max-w-3xl overflow-hidden rounded-md border border-surface-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-surface-border bg-surface-muted text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-5 py-3">Gene</th>
              <th className="px-5 py-3">Chromosome</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Position</th>
              <th className="px-5 py-3">Recorded</th>
            </tr>
          </thead>
          <tbody>
            {mutations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-secondary">
                  No mutations recorded for this patient yet.
                </td>
              </tr>
            )}
            {mutations.map((m) => (
              <tr key={m.id} className="border-b border-surface-border last:border-0">
                <td className="px-5 py-3 font-mono text-sm font-medium text-navy-dark">
                  {m.gene_name}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-ink-secondary">
                  {m.chromosome ?? "—"}
                </td>
                <td className="px-5 py-3 text-ink-secondary">
                  {m.mutation_type ?? "—"}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-ink-secondary">
                  {m.position ?? "—"}
                </td>
                <td className="px-5 py-3 text-ink-secondary">
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
