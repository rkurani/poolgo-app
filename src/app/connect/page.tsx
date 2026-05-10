import Link from "next/link";
import { ChevronLeft, Plus, ShieldCheck } from "lucide-react";
import { ConnectorButton } from "@/components/connect/ConnectorButton";
import { connectors } from "@/lib/data/scenes";

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-[640px] px-5 sm:px-8 pt-6 sm:pt-10 pb-10 flex flex-col gap-7">
      {/* nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute hover:text-ink"
        >
          <ChevronLeft size={18} strokeWidth={1.8} />
          Back · My Pool
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-mute">
          Step 2 of 4
        </span>
      </div>

      {/* header */}
      <header className="flex flex-col gap-3">
        <h1 className="text-[34px] sm:text-[40px] font-extrabold tracking-[-0.04em] leading-[1.02] text-ink">
          Connect your pad.
        </h1>
        <p className="text-[14px] sm:text-[15px] font-medium text-ink-mute leading-relaxed">
          Sign in to your OEM accounts. We pull live status — RPM, PSI, water temp — and let you
          control everything from one place. No more six apps.
        </p>
      </header>

      {/* connector list */}
      <div className="flex flex-col gap-2.5">
        {connectors.map((c) => (
          <ConnectorButton key={c.id} connector={c} />
        ))}
      </div>

      {/* OR */}
      <div className="flex items-center gap-3.5">
        <span className="flex-1 h-px bg-line" />
        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-ink-faint">OR</span>
        <span className="flex-1 h-px bg-line" />
      </div>

      {/* manual */}
      <button className="flex items-center gap-3.5 rounded-2xl bg-cream px-5 py-4 text-left">
        <Plus size={20} strokeWidth={1.8} className="text-ink shrink-0" />
        <div className="flex flex-col gap-0.5 flex-1">
          <span className="text-[15px] font-bold tracking-[-0.005em] text-ink">
            Add manually
          </span>
          <span className="text-[11px] font-medium text-ink-mute">
            For Jandy, Raypak, no-cloud equipment — enter model + serial
          </span>
        </div>
      </button>

      {/* trust footer */}
      <div className="flex items-start gap-2 pt-2">
        <ShieldCheck size={14} strokeWidth={1.8} className="text-source-live shrink-0 mt-0.5" />
        <p className="text-[11px] font-medium text-ink-mute leading-relaxed">
          PoolGo only reads device telemetry. We can&apos;t see your billing or change your account
          password.
        </p>
      </div>
    </div>
  );
}
