"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ProfileFormValues {
  full_name: string;
  phone?: string;
  institution?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<ProfileFormValues>();

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name,
        phone: user.phone ?? "",
        institution: user.institution ?? "",
      });
    }
  }, [user, reset]);

  async function onSubmit(values: ProfileFormValues) {
    setError(null);
    setSaved(false);
    try {
      await api.put("/api/users/me", values);
      setSaved(true);
    } catch {
      setError("Couldn't save your profile. Please try again.");
    }
  }

  if (!user) return null;

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-navy-dark">
        Profile
      </h1>
      <p className="mt-1 text-sm text-ink-secondary">
        Manage your account details.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-lg space-y-4 rounded-xl border border-surface-border bg-surface p-6"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Email
          </label>
          <input
            disabled
            value={user.email}
            className="w-full cursor-not-allowed rounded-md border border-surface-border bg-surface-muted px-3 py-2.5 text-sm text-ink-faint"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Role
          </label>
          <input
            disabled
            value={user.role}
            className="w-full cursor-not-allowed rounded-md border border-surface-border bg-surface-muted px-3 py-2.5 text-sm capitalize text-ink-faint"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Full name
          </label>
          <input
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("full_name", { required: true })}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Phone
          </label>
          <input
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("phone")}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Institution
          </label>
          <input
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("institution")}
          />
        </div>

        {saved && (
          <p className="rounded-md bg-accent-green/10 px-3 py-2 text-xs text-accent-green">
            Profile updated.
          </p>
        )}
        {error && (
          <p className="rounded-md bg-accent-red/10 px-3 py-2 text-xs text-accent-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
