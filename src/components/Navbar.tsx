"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const links = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#technology", label: "Technology" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-green" />
          <span className="font-display text-lg font-semibold text-navy-dark">
            GenePredict <span className="text-teal">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-secondary transition hover:text-navy-dark"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-ink-secondary transition hover:text-navy-dark"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-dark"
          >
            Get started
          </Link>
        </div>

        <button
          className="text-2xl text-navy-dark md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-surface-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-secondary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Link href="/login" className="text-sm font-medium text-ink-secondary">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-navy px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
