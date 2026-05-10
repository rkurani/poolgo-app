"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, X, Eye, Check } from "lucide-react";

export default function PentairLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ravi@bigblue.example");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate successful auth → land on connected command center
    router.push("/");
  }

  return (
    <div
      className="min-h-[calc(100vh-72px)] md:min-h-[80vh] mx-auto max-w-[600px] my-0 md:my-8 rounded-none md:rounded-3xl overflow-hidden relative"
      style={{ background: "var(--color-pentair)" }}
    >
      {/* Ghost wordmark */}
      <span
        className="pointer-events-none select-none absolute -left-8 bottom-12 text-[180px] sm:text-[220px] font-extrabold leading-none tracking-[-0.04em] text-white opacity-[0.07]"
      >
        PENTAIR
      </span>

      {/* Top nav */}
      <div className="relative flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6">
        <Link
          href="/connect"
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.04em] text-white/70 hover:text-white"
        >
          <ChevronLeft size={18} strokeWidth={1.8} />
          Back · Connectors
        </Link>
        <Link href="/connect" className="text-white/70 hover:text-white">
          <X size={20} strokeWidth={1.8} />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-7 px-6 sm:px-10 pt-6 pb-12"
      >
        {/* logo */}
        <div className="grid h-14 w-22 place-items-center rounded-xl bg-white p-2.5">
          <Image
            src="/assets/pentair.jpg"
            alt="Pentair"
            width={72}
            height={40}
            className="object-contain max-h-9"
          />
        </div>

        {/* header */}
        <div className="flex flex-col gap-2.5">
          <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-[-0.04em] leading-[1.02] text-white">
            Sign in to Pentair Home.
          </h1>
          <p className="text-[13px] sm:text-[14px] font-medium text-white/80 leading-relaxed">
            Use your existing Pentair Home email and password. PoolGo never stores either —
            Pentair authenticates you, then hands us a read-and-control token.
          </p>
        </div>

        {/* fields */}
        <div className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/70">
              Pentair Home email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl bg-white/10 px-4 py-3.5 text-[15px] font-medium text-white placeholder:text-white/40 outline-none ring-1 ring-white/15 focus:ring-white/40"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/70">
                Password
              </span>
              <button
                type="button"
                className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/70 hover:text-white"
              >
                Forgot?
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3.5 ring-1 ring-white/15 focus-within:ring-white/40">
              <input
                type="password"
                value={password || "••••••••••••"}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-[15px] font-bold tracking-[1px] text-white placeholder:text-white/40 outline-none"
              />
              <Eye size={18} strokeWidth={1.7} className="text-white/70" />
            </div>
          </label>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="rounded-full bg-white py-4 text-[15px] font-bold tracking-[-0.005em] hover:bg-white/95 transition-colors"
          style={{ color: "var(--color-pentair)" }}
        >
          Sign in to Pentair · authorize PoolGo
        </button>

        {/* permissions */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-white/70">
            What PoolGo will do
          </span>
          <PermItem ok>Read live status from your IntelliFlo3, IntelliChlor, MasterTemp</PermItem>
          <PermItem ok>Adjust pump speed, schedule, and stage settings</PermItem>
          <PermItem ok={false}>
            Won&apos;t access billing, account password, or change your Pentair email
          </PermItem>
        </div>
      </form>
    </div>
  );
}

function PermItem({ children, ok }: { children: React.ReactNode; ok: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      {ok ? (
        <Check size={16} strokeWidth={2.2} className="text-white shrink-0 mt-0.5" />
      ) : (
        <X size={16} strokeWidth={2.2} className="text-amber-200 shrink-0 mt-0.5" />
      )}
      <span className="text-[13px] font-medium text-white/90 leading-snug">{children}</span>
    </div>
  );
}
