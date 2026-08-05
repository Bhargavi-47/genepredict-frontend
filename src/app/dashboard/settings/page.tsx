"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { logout } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [predictionAlerts, setPredictionAlerts] = useState(true);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-navy-dark">
        Settings
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">
        Manage notification preferences and account actions.
      </p>

      <div className="mt-6 max-w-lg space-y-4">
        <div className="rounded-xl border border-surface-border bg-surface p-5">
          <h2 className="mb-4 font-display text-sm font-semibold text-navy-dark">
            Notifications
          </h2>
          <ToggleRow
            label="Email notifications"
            description="Get emailed when a prediction finishes."
            checked={emailNotifs}
            onChange={setEmailNotifs}
          />
          <ToggleRow
            label="High-risk prediction alerts"
            description="Immediate alert when a prediction returns high risk."
            checked={predictionAlerts}
            onChange={setPredictionAlerts}
          />
          <p className="mt-3 text-xs text-ink-faint">
            Preferences are stored locally in this demo and aren't yet synced
            to your account.
          </p>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface p-5">
          <h2 className="mb-2 font-display text-sm font-semibold text-navy-dark">
            Account
          </h2>
          <p className="mb-4 text-sm text-ink-secondary">
            Sign out of GenePredict AI on this device.
          </p>
          <button
            onClick={logout}
            className="rounded-md border border-accent-red/30 px-4 py-2 text-sm font-semibold text-accent-red transition hover:bg-accent-red/5"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-surface-border py-3 last:border-0">
      <div className="pr-4">
        <p className="text-sm font-medium text-navy-dark">{label}</p>
        <p className="text-xs text-ink-secondary">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-teal" : "bg-surface-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
