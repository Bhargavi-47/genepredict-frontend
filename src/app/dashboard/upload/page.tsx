"use client";

import { useCallback, useEffect, useState } from "react";
import { HiOutlineUpload, HiOutlineDocumentText } from "react-icons/hi";
import api from "@/lib/api";
import { Patient } from "@/lib/types";

interface UploadRecord {
  id: string;
  original_filename: string;
  file_type: string;
  size_bytes: number;
  status: string;
  patient_id: string | null;
  created_at: string;
}

const ACCEPTED = ".csv,.xlsx,.xls,.vcf,.fasta,.fa,.txt";

export default function UploadDatasetPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string[]>([]);
  const [history, setHistory] = useState<UploadRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Patient[]>("/api/patients").then((res) => setPatients(res.data));
    loadHistory();
  }, []);

  function loadHistory() {
    api.get<UploadRecord[]>("/api/uploads").then((res) => setHistory(res.data));
  }

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      setProgress(0);
      setPreview([]);

      const formData = new FormData();
      formData.append("file", file);
      if (selectedPatient) formData.append("patient_id", selectedPatient);

      try {
        const res = await api.post("/api/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
          },
        });
        setPreview(res.data.preview || []);
        loadHistory();
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [selectedPatient]
  );

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-navy-dark">
        Upload Dataset
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">
        Upload CSV, Excel, VCF, FASTA, or TXT sequencing data for analysis.
      </p>

      <div className="mt-6 max-w-xl">
        <label className="mb-1.5 block text-sm font-medium text-navy-dark">
          Associate with patient (optional)
        </label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full rounded-md border border-surface-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-teal"
        >
          <option value="">No specific patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.patient_name}
            </option>
          ))}
        </select>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
        }}
        className={`mt-6 flex max-w-xl flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition ${
          dragging ? "border-teal bg-teal/5" : "border-surface-border bg-surface"
        }`}
      >
        <HiOutlineUpload className="mb-3 text-3xl text-teal-dark" />
        <p className="text-sm font-medium text-navy-dark">
          Drag and drop a file here
        </p>
        <p className="mt-1 text-xs text-ink-faint">
          CSV, Excel, VCF, FASTA, or TXT — up to 25MB
        </p>
        <label className="mt-4 cursor-pointer rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-dark">
          Browse files
          <input
            type="file"
            accept={ACCEPTED}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      </div>

      {uploading && (
        <div className="mt-4 max-w-xl">
          <div className="h-2 overflow-hidden rounded-full bg-surface-border">
            <div
              className="h-full bg-teal transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-ink-secondary">Uploading… {progress}%</p>
        </div>
      )}

      {error && (
        <div className="mt-4 max-w-xl rounded-md bg-accent-red/10 px-4 py-3 text-sm text-accent-red">
          {error}
        </div>
      )}

      {preview.length > 0 && (
        <div className="mt-6 max-w-xl rounded-xl border border-surface-border bg-surface p-5">
          <h2 className="mb-3 font-display text-sm font-semibold text-navy-dark">
            Preview (first 10 lines)
          </h2>
          <pre className="max-h-48 overflow-y-auto rounded-md bg-surface-muted p-3 font-mono text-xs text-ink-secondary">
            {preview.join("\n")}
          </pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 font-display text-base font-semibold text-navy-dark">
          Upload history
        </h2>
        <div className="overflow-hidden rounded-xl border border-surface-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-surface-border bg-surface-muted text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-5 py-3">File</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Size</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-ink-secondary">
                    No files uploaded yet.
                  </td>
                </tr>
              )}
              {history.map((u) => (
                <tr key={u.id} className="border-b border-surface-border last:border-0">
                  <td className="flex items-center gap-2 px-5 py-3 font-medium text-navy-dark">
                    <HiOutlineDocumentText className="text-ink-faint" />
                    {u.original_filename}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs uppercase text-ink-secondary">
                    {u.file_type}
                  </td>
                  <td className="px-5 py-3 text-ink-secondary">
                    {(u.size_bytes / 1024).toFixed(1)} KB
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded bg-accent-green/10 px-2 py-0.5 text-xs text-accent-green">
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-secondary">
                    {new Date(u.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
