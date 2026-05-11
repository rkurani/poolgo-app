"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Droplet, Settings2, Zap, Users, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "My Pool", Icon: House },
  { href: "/care", label: "Care", Icon: Droplet },
  { href: "/equipment", label: "Equipment", Icon: Settings2 },
  { href: "/routines", label: "Routines", Icon: Zap },
  { href: "/folks", label: "Folks", Icon: Users },
  { href: "/connect", label: "Connect", Icon: Plug },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex items-start justify-around bg-cream px-3 pt-2 pb-4 [border-top:1px_solid_var(--color-line)]">
      {TABS.map((tab) => {
        const active = isActive(pathname, tab.href);
        const { Icon } = tab;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-1 transition-colors",
              active ? "text-ink" : "text-ink-faint"
            )}
          >
            <Icon size={22} strokeWidth={active ? 2 : 1.7} />
            <span
              className={cn(
                "text-[10px] tracking-[-0.005em]",
                active ? "font-bold" : "font-medium"
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
