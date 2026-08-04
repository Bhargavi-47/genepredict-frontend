"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MutationTrack from "@/components/MutationTrack";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface-muted">
        <div className="w-64 text-center">
          <MutationTrack segments={20} highlightIndex={-1} />
          <p className="mt-4 text-sm text-ink-secondary">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface-muted">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
