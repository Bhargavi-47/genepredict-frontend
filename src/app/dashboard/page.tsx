"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "@/lib/chartSetup";
import api from "@/lib/api";
import { DashboardStats, Patient } from "@/lib/types";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.get<DashboardStats>("/api/dashboard"),
      api.get<Patient[]>("/api/patients"),
    ])
      .then(([statsRes, patientsRes]) => {
        setStats(statsRes.data);
        setPatients(patientsRes.data);
      })
      .catch(() => setError("Couldn't reach the API. Is the backend running?"));
  }, []);

  const genderCounts = patients.reduce<Record<string, number>>((acc, p) => {
    const key = p.gender || "Unspecified";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-navy-dark">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">
        A snapshot of your patients, uploads, and predictions.
      </p>

      {error && (
        <div className="mt-6 rounded-md bg-accent-amber/10 px-4 py-3 text-sm text-accent-amber">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Patients" value={stats?.total_patients ?? "—"} />
        <StatCard label="Uploaded Files" value={stats?.total_uploads ?? "—"} />
        <StatCard label="Predictions" value={stats?.total_predictions ?? "—"} />
        <StatCard
          label="Disease Categories"
          value={stats?.disease_categories ?? "—"}
        />
        <StatCard
          label="Drug Recommendations"
          value={stats?.drug_recommendations ?? "—"}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-surface-border bg-surface p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-navy-dark">
            Pipeline totals
          </h2>
          <Bar
            data={{
              labels: [
                "Patients",
                "Uploads",
                "Predictions",
                "Diseases",
                "Drug recs",
              ],
              datasets: [
                {
                  label: "Count",
                  data: stats
                    ? [
                        stats.total_patients,
                        stats.total_uploads,
                        stats.total_predictions,
                        stats.disease_categories,
                        stats.drug_recommendations,
                      ]
                    : [0, 0, 0, 0, 0],
                  backgroundColor: "#00A8A8",
                  borderRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
            }}
          />
        </div>

        <div className="rounded-md border border-surface-border bg-surface p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-navy-dark">
            Patients by gender
          </h2>
          {patients.length === 0 ? (
            <p className="text-sm text-ink-secondary">
              No patients yet — add one to see this chart populate.
            </p>
          ) : (
            <Doughnut
              data={{
                labels: Object.keys(genderCounts),
                datasets: [
                  {
                    data: Object.values(genderCounts),
                    backgroundColor: ["#0F4C81", "#00A8A8", "#16A34A", "#D97706"],
                  },
                ],
              }}
              options={{ plugins: { legend: { position: "bottom" } } }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
