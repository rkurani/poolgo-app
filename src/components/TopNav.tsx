"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "My Pool" },
  { href: "/care", label: "Care" },
  { href: "/equipment", label: "Equipment" },
  { href: "/folks", label: "Folks" },
  { href: "/connect", label: "Connect" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex sticky top-0 z-10 items-center justify-between bg-surface px-10 py-4">
      <Link href="/" className="text-[22px] font-extrabold tracking-[-0.03em] text-ink">
        PoolGo<span className="text-primary">.</span>
      </Link>
      <div className="flex items-center gap-8">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "text-[14px] tracking-[-0.005em] transition-colors",
                active
                  ? "font-bold text-ink"
                  : "font-medium text-ink-mute hover:text-ink"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-[7px] rounded-full bg-surface-2 px-3 py-[6px]">
          <span className="h-[7px] w-[7px] rounded-full bg-source-live" />
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink">
            Big Blue · all healthy
          </span>
        </div>
        <button
          aria-label="notifications"
          className="grid h-9 w-9 place-items-center text-ink"
        >
          <Bell size={18} strokeWidth={1.6} />
        </button>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[13px] font-bold text-white">
          RK
        </div>
      </div>
    </nav>
  );
}
