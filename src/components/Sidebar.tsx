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
    <aside className="flex h-screen w-64 flex-col border-r border-navy-dark/40 bg-navy-dark">
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
        <span className="h-2.5 w-2.5 rounded-sm bg-accent-green" />
        <span className="font-display text-base font-semibold text-white">
          GenePredict <span className="text-teal-light">AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-sm border-l-2 px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "border-teal-light bg-white/5 text-white"
                  : "border-transparent text-white/60 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              <item.icon className="text-base" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        {user && (
          <div className="mb-3 px-3">
            <p className="truncate text-sm font-medium text-white">
              {user.full_name}
            </p>
            <p className="truncate font-mono text-xs capitalize text-white/50">
              {user.role}
            </p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white/90"
        >
          <HiOutlineLogout className="text-base" />
          Logout
        </button>
      </div>
    </aside>
  );
}
