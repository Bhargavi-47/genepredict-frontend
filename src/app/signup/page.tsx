"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/types";

interface SignupFormValues {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone?: string;
  institution?: string;
  role: UserRole;
}

const roles: { value: UserRole; label: string }[] = [
  { value: "researcher", label: "Researcher" },
  { value: "doctor", label: "Doctor" },
  { value: "student", label: "Student" },
  { value: "administrator", label: "Administrator" },
];

export default function SignupPage() {
  const { signup } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({ defaultValues: { role: "researcher" } });

  async function onSubmit(values: SignupFormValues) {
    setServerError(null);
    setSubmitting(true);
    try {
      await signup(values);
    } catch (err: any) {
      setServerError(
        err?.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up access for your team in under a minute."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Full name
          </label>
          <input
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="Dr. Jane Doe"
            {...register("full_name", { required: "Full name is required" })}
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-accent-red">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="you@hospital.org"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-accent-red">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-dark">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-accent-red">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-dark">
              Confirm
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
              placeholder="••••••••"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (v) => v === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="mt-1 text-xs text-accent-red">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Institution / Hospital
          </label>
          <input
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="Optional"
            {...register("institution")}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Role
          </label>
          <select
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none focus:border-teal"
            {...register("role", { required: true })}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {serverError && (
          <p className="rounded-md bg-accent-red/10 px-3 py-2 text-xs text-accent-red">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Sign up"}
        </button>

        <p className="text-center text-sm text-ink-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-navy hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
