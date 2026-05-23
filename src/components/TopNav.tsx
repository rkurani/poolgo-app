"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const TABS = [
  { href: "/", label: "My Pool" },
  { href: "/care", label: "Care" },
  { href: "/equipment", label: "Equipment" },
  { href: "/routines", label: "Routines" },
  { href: "/folks", label: "Folks" },
  { href: "/inbox", label: "Inbox" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopNav() {
  const pathname = usePathname();
  // Tenant-skinned consumer routes carry their own chrome via TenantHeader.
  if (pathname.startsWith("/r/")) return null;
  // Marketing page (/), the consumer demo index (/demo), and the public-facing
  // surfaces ship their own nav. TopNav is only for the internal prototype.
  if (pathname === "/" || pathname === "/demo") return null;
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-background px-8 py-4">
      <Link href="/" className="text-[18px] font-bold tracking-[-0.03em]">
        PoolGo<span className="font-extrabold text-primary">.</span>
      </Link>
      <div className="flex gap-1">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={[
                "rounded-md px-[14px] py-2 text-[14px] font-medium tracking-[-0.005em] transition-colors",
                active
                  ? "bg-ink text-white"
                  : "text-ink-mute hover:bg-surface hover:text-ink",
              ].join(" ")}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="notifications"
          className="relative grid h-9 w-9 place-items-center rounded-md bg-surface text-ink"
        >
          <Bell size={16} strokeWidth={1.6} />
          <span className="absolute right-[9px] top-2 h-[7px] w-[7px] rounded-full border-[1.5px] border-surface bg-error" />
        </button>
        <div
          className="grid h-9 w-9 place-items-center rounded-full text-[13px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #2A6098, #0E2F55)" }}
        >
          RK
        </div>
      </div>
    </nav>
  );
}
