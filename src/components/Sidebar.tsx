"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlineUserGroup,
  HiOutlineUpload,
  HiOutlineBeaker,
  HiOutlineChartSquareBar,
  HiOutlineDocumentReport,
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: HiOutlineViewGrid },
  { href: "/dashboard/patients", label: "Patients", icon: HiOutlineUserGroup },
  { href: "/dashboard/upload", label: "Upload Dataset", icon: HiOutlineUpload },
  { href: "/dashboard/mutations", label: "Mutation Analysis", icon: HiOutlineBeaker },
  { href: "/dashboard/predictions", label: "Prediction", icon: HiOutlineChartSquareBar },
  { href: "/dashboard/reports", label: "Reports", icon: HiOutlineDocumentReport },
  { href: "/dashboard/history", label: "History", icon: HiOutlineClock },
  { href: "/dashboard/profile", label: "Profile", icon: HiOutlineUserCircle },
  { href: "/dashboard/settings", label: "Settings", icon: HiOutlineCog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-surface-border bg-surface">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="h-2.5 w-2.5 rounded-sm bg-accent-green" />
        <span className="font-display text-base font-semibold text-navy-dark">
          GenePredict <span className="text-teal">AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-navy/10 text-navy-dark"
                  : "text-ink-secondary hover:bg-surface-muted"
              }`}
            >
              <item.icon className="text-lg" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-surface-border px-3 py-4">
        {user && (
          <div className="mb-3 px-3">
            <p className="truncate text-sm font-medium text-navy-dark">
              {user.full_name}
            </p>
            <p className="truncate text-xs capitalize text-ink-faint">
              {user.role}
            </p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-ink-secondary transition hover:bg-surface-muted"
        >
          <HiOutlineLogout className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
}
