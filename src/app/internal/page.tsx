import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InternalIndex() {
  return (
    <div className="mx-auto max-w-[1280px] px-8 py-20">
      <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.1em] text-ink-mute">
        PoolGo · Internal prototype index
      </p>
      <h1 className="font-extrabold leading-[1.02] tracking-[-0.04em] text-[clamp(32px,5vw,56px)]">
        PoolGo<span className="text-primary">.</span>
      </h1>
      <p className="mt-3 max-w-[60ch] text-[17px] text-ink-soft">
        Your pool, all in one place. Water, equipment, service, and the
        people who help you keep it running.
      </p>

      <div className="mt-10 grid max-w-[800px] gap-3">
        <SurfaceLink href="/folks" label="Folks" sub="Find stores, techs, and builders near you" status="ready" />
        <SurfaceLink href="/care" label="Care" sub="Every test, visit, photo, and message" status="soon" />
        <SurfaceLink href="/equipment" label="Equipment" sub="Every device on, around, and inside the pool" status="soon" />
        <SurfaceLink href="/routines" label="Routines" sub="Build automations in plain English" status="soon" />
        <SurfaceLink href="/inbox" label="Inbox" sub="Conversations from techs, stores, and equipment" status="soon" />
        <SurfaceLink href="/demo" label="Consumer demo" sub="ClearCare + PoolGo end-to-end click-through" status="ready" />
      </div>
    </div>
  );
}

function SurfaceLink({
  href,
  label,
  sub,
  status,
}: {
  href: string;
  label: string;
  sub: string;
  status: "ready" | "soon";
}) {
  if (status === "soon") {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-line bg-surface px-6 py-5 opacity-60">
        <div>
          <div className="text-[18px] font-bold tracking-[-0.025em]">
            {label}
          </div>
          <div className="text-[13px] text-ink-mute">{sub}</div>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-ink-mute">
          Coming soon
        </span>
      </div>
    );
  }
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-line bg-background px-6 py-5 transition-colors hover:border-primary"
    >
      <div>
        <div className="text-[18px] font-bold tracking-[-0.025em]">
          {label}
        </div>
        <div className="text-[13px] text-ink-soft">{sub}</div>
      </div>
      <ArrowRight
        size={20}
        className="text-ink-mute transition-colors group-hover:text-primary"
      />
    </Link>
  );
}
