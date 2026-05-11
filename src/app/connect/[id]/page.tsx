import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Plug,
  Activity,
  AlertCircle,
  Power,
  Settings,
  RefreshCw,
} from "lucide-react";
import { INTEGRATIONS, type Integration } from "../page";
import { SectionHeader } from "@/components/SectionHeader";

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ id: i.id }));
}

const STATUS_META: Record<
  Integration["status"],
  { label: string; bg: string; text: string; description: string }
> = {
  connected: {
    label: "Connected",
    bg: "var(--color-source-live)",
    text: "white",
    description: "Live, streaming data into your record right now.",
  },
  available: {
    label: "Available",
    bg: "var(--color-citrus, #E8A82C)",
    text: "var(--color-mountain-shadow, #5C5546)",
    description: "Ready to connect. Sign in once and the data flows.",
  },
  "coming-soon": {
    label: "Coming soon",
    bg: "var(--color-data-cream-2, #E5D7BE)",
    text: "var(--color-mountain-shadow, #5C5546)",
    description: "On the roadmap. Add your vote to bump priority.",
  },
};

// Some fixture data so each detail page feels like a real configuration
// surface rather than the same template repeated. In production these
// would come from the actual vendor API / your saved telemetry.
function mockTelemetry(i: Integration): { label: string; value: string }[] {
  if (i.id === "pentair-intellicenter") {
    return [
      { label: "Pump", value: "1,750 RPM" },
      { label: "Heater", value: "84°F target" },
      { label: "Salt cell", value: "60% output" },
      { label: "Schedule", value: "5 stages active" },
    ];
  }
  if (i.id === "pentair-intellichlor") {
    return [
      { label: "Cell life", value: "78%" },
      { label: "Output", value: "60%" },
      { label: "Salinity", value: "3,200 ppm" },
      { label: "Flow", value: "OK" },
    ];
  }
  if (i.id === "polaris-robotic") {
    return [
      { label: "Last cycle", value: "Yesterday 10AM" },
      { label: "Brush hours", value: "287" },
      { label: "Battery", value: "Wired" },
      { label: "Next clean", value: "Today 11AM" },
    ];
  }
  if (i.category === "monitor") {
    return [
      { label: "Last reading", value: "12 min ago" },
      { label: "Battery", value: "82%" },
      { label: "Frequency", value: "Every 20 min" },
      { label: "Connection", value: "Wi-Fi" },
    ];
  }
  if (i.category === "tester") {
    return [
      { label: "Last test", value: "2 days ago" },
      { label: "Tests this month", value: "8" },
      { label: "Strip / reagent stock", value: "Healthy" },
      { label: "Sync", value: "Bluetooth pair active" },
    ];
  }
  if (i.category === "platform") {
    return [
      { label: "Account linked", value: "Yes" },
      { label: "Last sync", value: "This morning" },
      { label: "Read scope", value: "Test history, visits" },
      { label: "Write scope", value: "None" },
    ];
  }
  return [
    { label: "Status", value: "Awaiting connection" },
    { label: "Account linked", value: "No" },
    { label: "Last sync", value: "Never" },
    { label: "Setup time", value: "~3 minutes" },
  ];
}

function mockCapabilities(i: Integration): { title: string; body: string; supported: boolean }[] {
  const supported = i.status === "connected" || i.status === "available";
  return i.capabilities.map((cap) => ({
    title: cap,
    body: capabilityBody(cap, i),
    supported,
  }));
}

function capabilityBody(cap: string, _i: Integration): string {
  const m: Record<string, string> = {
    "Live telemetry": "Polled every 60 seconds. Flows into the My Pool dashboard.",
    Control: "Send commands from PoolGo (stage changes, output adjustments, schedule edits).",
    Schedule: "Read and write the daily run plan. PoolGo's schedule view becomes the source of truth.",
    Diagnostics: "Pull fault codes, run hours, firmware versions. Shows up under Equipment health.",
    "Cell life": "Daily polled cell percentage with degradation trendline.",
    "Output control": "Dial salt-chlorine generator output 0-100%.",
    "Cycle log": "Every cleaning cycle logged with duration, coverage, and status.",
    "Remote start": "Trigger a clean from anywhere. Confirmation back when it's running.",
    "Surface skim": "Cordless cleaner reports surface-pass coverage separately from floor.",
    Battery: "Battery percentage and estimated runtime remaining.",
    "Free Cl": "Free chlorine reading in ppm.",
    pH: "pH reading with drift trendline.",
    ORP: "Oxidation-reduction potential in mV.",
    Temp: "Water temperature.",
    FC: "Free chlorine.",
    TC: "Total chlorine.",
    TA: "Total alkalinity.",
    CYA: "Cyanuric acid.",
    CH: "Calcium hardness.",
    Flow: "Plumbing-line flow rate.",
    "Service log": "Every visit recorded by your service business, with photos.",
    Photos: "Visit photos pulled into your Care timeline.",
    Routes: "Route schedule pulled in so you know when your pro is coming.",
    "Test history": "Every store water test flows into your Care timeline.",
    Purchases: "Account purchase history linked to your pool's equipment list.",
    Plan: "Store-recommended treatment plan, visible alongside your other sources.",
    "Lamp life": "UV/AOP lamp percentage with replacement reminders.",
    "Run hours": "Total run hours for life-tracking and warranty.",
    Concierge: "AI-assisted plan, with a human takeover when something is off.",
    Recommendations: "Suggested actions based on your record.",
  };
  return m[cap] || "Capability detail.";
}

export default async function ConnectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const integration = INTEGRATIONS.find((i) => i.id === id);
  if (!integration) notFound();

  const status = STATUS_META[integration.status];
  const telemetry = mockTelemetry(integration);
  const capabilities = mockCapabilities(integration);

  return (
    <div
      data-city="redlands"
      data-brand={integration.id.split("-")[0]}
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <Link
          href="/connect"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          back to connect
        </Link>

        <section className="flex items-start gap-4 sm:gap-6 flex-wrap">
          <div
            className="relative h-[88px] w-[88px] sm:h-[112px] sm:w-[112px] rounded-2xl border-2 overflow-hidden shrink-0 shadow-[4px_4px_0_0_rgba(59,52,42,0.18)]"
            style={{
              backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
              borderColor: "var(--color-mountain-shadow, #5C5546)",
            }}
          >
            <span
              className="absolute top-0 left-0 right-0 z-10 h-[6px]"
              style={{ backgroundColor: integration.brandTone }}
              aria-hidden
            />
            {integration.logo ? (
              <div className="absolute inset-0 p-3 pt-5">
                <div
                  className="relative h-full w-full rounded-md border grid place-items-center"
                  style={{
                    borderColor: "var(--color-mountain-shadow, #5C5546)",
                    backgroundColor: integration.brandSoft,
                    isolation: "isolate",
                  }}
                >
                  <div className="relative h-3/5 w-4/5">
                    <Image
                      src={integration.logo}
                      alt={integration.vendor}
                      fill
                      sizes="112px"
                      className="object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="absolute inset-0 grid place-items-center font-pixel text-[18px] uppercase"
                style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
              >
                {integration.vendor
                  .split(/\s+/)
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-[260px]">
            <span
              className="font-pixel text-[10px] uppercase tracking-[0.2em]"
              style={{ color: integration.brandTone }}
            >
              {integration.vendor}
            </span>
            <h1
              className="text-[40px] sm:text-[52px] leading-[0.95] font-extrabold tracking-[-0.02em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}
            >
              {integration.name}
            </h1>
            <p
              className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[640px]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              {integration.blurb}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ backgroundColor: status.bg, color: status.text }}
              >
                {integration.status === "connected" && <CheckCircle size={12} strokeWidth={2.5} />}
                {integration.status === "available" && <Plug size={12} strokeWidth={2.5} />}
                {integration.status === "coming-soon" && <AlertCircle size={12} strokeWidth={2.5} />}
                {status.label}
              </span>
              <span
                className="font-pixel text-[10px] tracking-[0.08em]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                {integration.connection}
              </span>
            </div>
          </div>
        </section>

        {/* Primary action: connect / configure / vote */}
        <section
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0_0_rgba(59,52,42,0.18)]"
          style={{
            backgroundColor: integration.brandTone,
            color: "white",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] opacity-90">
              {status.label} status
            </span>
            <h3 className="text-[24px] sm:text-[28px] leading-tight font-extrabold tracking-[-0.02em]">
              {status.description}
            </h3>
          </div>
          {integration.status === "connected" && (
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)]"
                style={{ color: integration.brandTone }}
              >
                <Settings size={16} strokeWidth={2.5} />
                Configure
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-[13px] font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
              >
                <Power size={14} strokeWidth={2.5} />
                Disconnect
              </button>
            </div>
          )}
          {integration.status === "available" && (
            <button
              className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
              style={{ color: integration.brandTone }}
            >
              <Plug size={16} strokeWidth={2.5} />
              Connect {integration.vendor}
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          )}
          {integration.status === "coming-soon" && (
            <button
              className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
              style={{ color: integration.brandTone }}
            >
              Vote to prioritize
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          )}
        </section>

        {/* Telemetry / preview */}
        <section className="flex flex-col gap-5">
          <SectionHeader
            title={integration.status === "connected" ? "Live, right now." : "What you'll see when connected."}
            caption={integration.status === "connected" ? "polled this minute" : "preview"}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {telemetry.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border-2 p-4 sm:p-5 flex flex-col gap-1 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                  opacity: integration.status === "connected" ? 1 : 0.7,
                }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[4px]"
                  style={{ backgroundColor: integration.brandTone }}
                  aria-hidden
                />
                <span
                  className="font-pixel text-[10px] uppercase tracking-[0.18em] mt-1"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {t.label}
                </span>
                <span
                  className="text-[22px] sm:text-[28px] leading-none font-extrabold tracking-[-0.02em] mt-1"
                  style={{
                    color: "var(--color-data-ink, #3B342A)",
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {t.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="flex flex-col gap-5">
          <SectionHeader
            title="What it brings."
            caption={`${integration.capabilities.length} capabilities`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border-2 p-5 flex items-start gap-4"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <div
                  className="grid place-items-center h-10 w-10 rounded-lg shrink-0"
                  style={{
                    backgroundColor: c.supported
                      ? "var(--color-source-live)"
                      : "var(--color-data-cream-2, #E5D7BE)",
                    color: c.supported ? "white" : "var(--color-mountain-shadow, #5C5546)",
                  }}
                >
                  {c.supported ? (
                    <CheckCircle size={20} strokeWidth={2.4} />
                  ) : (
                    <RefreshCw size={20} strokeWidth={2.4} />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3
                    className="text-[14px] font-bold tracking-[-0.005em]"
                    style={{ color: "var(--color-data-ink, #3B342A)" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-[12px] leading-snug"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                  >
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related integrations in the same category */}
        <section className="flex flex-col gap-5">
          <SectionHeader
            title="Other things in this category."
            caption={`${integration.category} integrations`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {INTEGRATIONS.filter((i) => i.category === integration.category && i.id !== integration.id)
              .slice(0, 6)
              .map((i) => (
                <Link
                  key={i.id}
                  href={`/connect/${i.id}`}
                  className="group rounded-xl border-2 p-4 flex items-center gap-3 hover:translate-y-[-2px] transition-transform"
                  style={{
                    backgroundColor: "var(--color-data-cream, #F1E6D3)",
                    borderColor: "var(--color-card-border, #B89B6A)",
                  }}
                >
                  <div
                    className="h-8 w-8 rounded-md shrink-0"
                    style={{ backgroundColor: i.brandTone }}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span
                      className="font-pixel text-[8px] uppercase tracking-[0.16em] truncate"
                      style={{ color: i.brandTone }}
                    >
                      {i.vendor}
                    </span>
                    <span
                      className="text-[13px] font-bold tracking-[-0.005em] truncate"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}
                    >
                      {i.name}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ color: i.brandTone }}
                  />
                </Link>
              ))}
          </div>
        </section>

        {integration.status === "available" && (
          <section
            className="rounded-2xl border-2 p-5 flex items-start gap-3"
            style={{
              backgroundColor: "var(--color-pentair-soft, #E5ECF4)",
              borderColor: "var(--color-pentair, #1A4F8B)",
            }}
          >
            <Activity
              size={18}
              strokeWidth={2.4}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--color-pentair, #1A4F8B)" }}
            />
            <div className="flex flex-col gap-1 text-[13px]">
              <span
                className="font-bold tracking-[-0.005em]"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                Setup is one OAuth flow.
              </span>
              <span style={{ color: "var(--color-data-ink, #3B342A)" }}>
                Click connect, sign in to {integration.vendor}, grant read access (and write if listed
                above), and the data is in your record within a minute. You can revoke from {integration.vendor}'s
                site at any time.
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
