import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Wrench, Droplet, Zap, MapPin, Star } from "lucide-react";

const SERVICES = [
  {
    icon: Droplet,
    title: "Weekly maintenance",
    body: "Brush, vacuum, skim, test, dose. Tue/Wed/Thu routes.",
    price: "$165/mo",
  },
  {
    icon: Wrench,
    title: "Equipment install & repair",
    body: "Pentair-certified, Polaris dealer. Pump swaps, salt cell rebuilds.",
    price: "from $240",
  },
  {
    icon: Zap,
    title: "Drain & acid wash",
    body: "Spring refresh for plaster pools. Includes filter teardown.",
    price: "from $480",
  },
  {
    icon: MapPin,
    title: "Leak detection",
    body: "Pressure-test plumbing, find the leak before you lose another foot.",
    price: "from $185",
  },
];

const ROUTES = [
  "Cypress · Olive · Cajon · East Highland",
  "Sunset Dr · Garden St · S Buena Vista",
  "Yucaipa Blvd · Oak Glen · Calimesa",
  "San Bernardino Ave · Texas St · 5th",
];

const ACTIVITY = [
  {
    homeowner: "M. on Cypress Ave",
    when: "2 days ago",
    detail: "Weekly · pH balanced from 7.8 → 7.5, refilled tabs",
  },
  {
    homeowner: "B. on Garden St",
    when: "4 days ago",
    detail: "Weekly · sand filter backwash, ORP back to 720",
  },
  {
    homeowner: "T. on Olive Ave",
    when: "5 days ago",
    detail: "IntelliFlo3 swap (capacitor died) · 3.5 hrs",
  },
];

const PARTNERSHIPS = ["Pentair certified", "Polaris dealer", "Hayward authorized", "Leslie's preferred"];

export default function CarlosRedlandsPage() {
  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <Link
          href="/canvas"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          back to your backyard
        </Link>

        <section
          className="rounded-2xl border-[3px] p-6 sm:p-8 shadow-[6px_6px_0_0_rgba(59,52,42,0.18)]"
          style={{
            backgroundColor: "var(--color-data-cream, #F1E6D3)",
            borderColor: "var(--color-mountain-shadow, #5C5546)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div
              className="relative shrink-0 mx-auto md:mx-0 w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-xl overflow-hidden border-2"
              style={{
                borderColor: "var(--color-mountain-shadow, #5C5546)",
                backgroundImage: "url(/assets/folks/carlos-portrait.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
              }}
              aria-label="Pixel portrait of Carlos"
            />

            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  Pool service · Redlands & Yucaipa
                </span>
                <h1
                  className="text-[40px] sm:text-[52px] leading-[0.95] font-extrabold tracking-[-0.02em]"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  Carlos Mendoza
                </h1>
              </div>

              <p
                className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[440px]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                Twelve years routing the Inland Empire. Independent. Certified on every brand on your pad.
                Tuesday, Wednesday, Thursday in your block.
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{
                    backgroundColor: "var(--color-source-live)",
                    color: "white",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                  Routes Tue · Wed · Thu in your area
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-bold tracking-[-0.005em] shadow-[3px_3px_0_0_rgba(59,52,42,0.6)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(59,52,42,0.6)] transition-all"
                  style={{
                    backgroundColor: "var(--color-terracotta, #C75240)",
                    color: "white",
                  }}
                >
                  <Calendar size={16} strokeWidth={2.5} />
                  Book Carlos · Tue Apr 14
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-[14px] font-semibold border-2 hover:bg-black/5 transition-colors"
                  style={{
                    borderColor: "var(--color-mountain-shadow, #5C5546)",
                    color: "var(--color-data-ink, #3B342A)",
                  }}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Years routing", value: "12" },
              { label: "Pools served", value: "287" },
              { label: "On-time rate", value: "98%" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border-2 p-4 sm:p-5 flex flex-col gap-1"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {s.label}
                </span>
                <span
                  className="text-[36px] sm:text-[44px] leading-none font-extrabold tracking-[-0.03em]"
                  style={{
                    color: "var(--color-data-ink, #3B342A)",
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div className="pixel-bar" aria-hidden />
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="What Carlos does." caption="four services · all priced before the visit" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="rounded-xl border-2 p-5 flex gap-4 items-start"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <div
                  className="grid place-items-center h-10 w-10 rounded-lg shrink-0"
                  style={{
                    backgroundColor: "var(--color-citrus, #E8A82C)",
                    color: "var(--color-mountain-shadow, #5C5546)",
                  }}
                >
                  <svc.icon size={20} strokeWidth={2.4} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className="text-[16px] font-bold tracking-[-0.01em]"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}
                    >
                      {svc.title}
                    </h3>
                    <span
                      className="text-[12px] font-bold tracking-[-0.005em] shrink-0"
                      style={{
                        color: "var(--color-terracotta, #C75240)",
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {svc.price}
                    </span>
                  </div>
                  <p
                    className="text-[13px] leading-snug"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                  >
                    {svc.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Where Carlos goes." caption="routes within 18 minutes of your pool" />
          <div
            className="rounded-xl border-2 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-8"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            {ROUTES.map((line) => (
              <div key={line} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: "var(--color-citrus, #E8A82C)" }}
                  aria-hidden
                />
                <span
                  className="text-[14px] font-medium"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Certified on." caption="OEM brands on your pad — Carlos can warranty service all of them" />
          <div className="flex flex-wrap gap-2">
            {PARTNERSHIPS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold tracking-[-0.005em] border-2"
                style={{
                  backgroundColor: "var(--color-data-cream-2, #E5D7BE)",
                  borderColor: "var(--color-mountain-shadow, #5C5546)",
                  color: "var(--color-data-ink, #3B342A)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="What Carlos has been up to." caption="last three visits · neighbors anonymized" />
          <div className="flex flex-col">
            {ACTIVITY.map((entry, i) => (
              <div
                key={entry.homeowner}
                className="flex items-start gap-4 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <div
                  className="grid place-items-center h-9 w-9 rounded-full shrink-0 text-[11px] font-extrabold"
                  style={{
                    backgroundColor: "var(--color-source-human)",
                    color: "white",
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="text-[14px] font-bold tracking-[-0.005em]"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}
                    >
                      {entry.homeowner}
                    </span>
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.08em] shrink-0"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                    >
                      {entry.when}
                    </span>
                  </div>
                  <span
                    className="text-[13px] leading-snug"
                    style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                  >
                    {entry.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="What people are saying." caption="recent reviews from your block" />
          <div
            className="rounded-xl border-2 p-6 flex flex-col gap-4"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  strokeWidth={0}
                  fill="var(--color-citrus, #E8A82C)"
                />
              ))}
              <span
                className="text-[13px] font-bold ml-2"
                style={{ color: "var(--color-data-ink, #3B342A)" }}
              >
                4.9 · 142 reviews
              </span>
            </div>
            <p
              className="text-[15px] leading-relaxed italic"
              style={{ color: "var(--color-data-ink, #3B342A)" }}
            >
              &ldquo;Carlos has kept our pool running for six years. Caught a slow leak in our IntelliFlo&rsquo;s
              shaft seal before it took out the motor. He explains what he&rsquo;s doing every visit. We trust him
              with the whole pad.&rdquo;
            </p>
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
            >
              — David & Lin K. · Cypress Ave · 4 days ago
            </span>
          </div>
        </section>

        <section
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0_0_rgba(59,52,42,0.25)]"
          style={{
            backgroundColor: "var(--color-terracotta, #C75240)",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] opacity-90">
              Next route in your area
            </span>
            <h3 className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]">
              Tuesday, April 14 · 9:00 AM
            </h3>
            <span className="text-[13px] opacity-90">
              Slot held for 24 hours · cancel any time before Mon evening
            </span>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
            style={{ color: "var(--color-terracotta, #C75240)" }}
          >
            Book this slot
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className="text-[26px] sm:text-[30px] leading-tight font-extrabold tracking-[-0.02em]"
        style={{ color: "var(--color-data-ink, #3B342A)" }}
      >
        {title}
      </h2>
      <span
        className="text-[12px] font-semibold uppercase tracking-[0.1em]"
        style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
      >
        {caption}
      </span>
      <div className="pixel-bar-thin mt-2" aria-hidden />
    </div>
  );
}
