"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus, HiOutlineSearch, HiOutlineTrash } from "react-icons/hi";
import api from "@/lib/api";
import { Patient } from "@/lib/types";

interface PatientFormValues {
  patient_name: string;
  age?: number;
  gender?: string;
  blood_group?: string;
  disease_history?: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<PatientFormValues>();

  async function loadPatients(query?: string) {
    setLoading(true);
    try {
      const res = await api.get<Patient[]>("/api/patients", {
        params: query ? { search: query } : undefined,
      });
      setPatients(res.data);
      setError(null);
    } catch {
      setError("Couldn't load patients. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => loadPatients(search || undefined), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  async function onSubmit(values: PatientFormValues) {
    await api.post("/api/patients", values);
    reset();
    setShowForm(false);
    loadPatients(search || undefined);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this patient record? This cannot be undone.")) return;
    await api.delete(`/api/patients/${id}`);
    loadPatients(search || undefined);
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-dark">
            Patients
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            Manage patient records tied to your workspace.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark"
        >
          <HiOutlinePlus />
          Add patient
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-md border border-surface-border bg-surface px-3 py-2.5 sm:w-80">
        <HiOutlineSearch className="text-ink-faint" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name"
          className="w-full text-sm outline-none"
        />
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid gap-4 rounded-xl border border-surface-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <input
            placeholder="Patient name"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("patient_name", { required: true })}
          />
          <input
            type="number"
            placeholder="Age"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("age", { valueAsNumber: true })}
          />
          <select
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("gender")}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            placeholder="Blood group"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("blood_group")}
          />
          <input
            placeholder="Disease history (optional)"
            className="rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal sm:col-span-2 lg:col-span-3"
            {...register("disease_history")}
          />
          <button
            type="submit"
            className="rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark"
          >
            Save patient
          </button>
        </form>
      )}

      {error && (
        <div className="mt-6 rounded-md bg-accent-amber/10 px-4 py-3 text-sm text-accent-amber">
          {error}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-surface-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-surface-border bg-surface-muted text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Age</th>
              <th className="px-5 py-3">Gender</th>
              <th className="px-5 py-3">Blood group</th>
              <th className="px-5 py-3">Added</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-secondary">
                  Loading patients…
                </td>
              </tr>
            )}
            {!loading && patients.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-secondary">
                  No patients yet. Add your first one above.
                </td>
              </tr>
            )}
            {patients.map((p) => (
              <tr key={p.id} className="border-b border-surface-border last:border-0">
                <td className="px-5 py-3 font-medium text-navy-dark">
                  {p.patient_name}
                </td>
                <td className="px-5 py-3 text-ink-secondary">{p.age ?? "—"}</td>
                <td className="px-5 py-3 text-ink-secondary">{p.gender ?? "—"}</td>
                <td className="px-5 py-3 font-mono text-xs text-ink-secondary">
                  {p.blood_group ?? "—"}
                </td>
                <td className="px-5 py-3 text-ink-secondary">
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-ink-faint transition hover:text-accent-red"
                    aria-label={`Delete ${p.patient_name}`}
                  >
                    <HiOutlineTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
