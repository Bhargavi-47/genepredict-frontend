"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/context/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    setSubmitting(true);
    try {
      await login(values.email, values.password);
    } catch (err: any) {
      setServerError(
        err?.response?.data?.detail || "Incorrect email or password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Log in to your account"
      subtitle="Access your dashboard, patients, and predictions."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none transition focus:border-teal"
            placeholder="you@hospital.org"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-accent-red">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-dark">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-surface-border px-3 py-2.5 text-sm outline-none transition focus:border-teal"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-accent-red">
              {errors.password.message}
            </p>
          )}
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
          {submitting ? "Logging in…" : "Log in"}
        </button>

        <div className="flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-teal-dark hover:underline">
            Forgot password?
          </Link>
          <span className="text-ink-secondary">
            New here?{" "}
            <Link href="/signup" className="font-medium text-navy hover:underline">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
