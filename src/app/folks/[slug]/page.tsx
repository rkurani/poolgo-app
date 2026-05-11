import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Wrench, MapPin, Truck, Star, Users } from "lucide-react";
import { PROS, getPro } from "@/lib/data/pros";
import { SectionHeader } from "@/components/SectionHeader";

const STATUS_TONE: Record<string, string> = {
  live: "var(--color-source-live)",
  imported: "var(--color-source-imported)",
  human: "var(--color-source-human)",
};

export function generateStaticParams() {
  return PROS.map((p) => ({ slug: p.slug }));
}

export default async function ProDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pro = getPro(slug);
  if (!pro) notFound();

  const statusBg = STATUS_TONE[pro.status.tone] || "var(--color-source-live)";

  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10 pt-6 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <Link
          href="/folks"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] w-fit hover:translate-x-[-2px] transition-transform"
          style={{ color: "var(--color-mountain-shadow, #5C5546)" }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          back to folks
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
                backgroundColor: pro.brandTone,
              }}
            >
              {pro.portrait ? (
                <Image
                  src={pro.portrait}
                  alt={`Portrait of ${pro.lead}`}
                  fill
                  sizes="280px"
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              ) : (
                <div className="h-full w-full grid place-items-center">
                  <Truck size={72} strokeWidth={2} color="white" />
                </div>
              )}
              <span
                className="absolute top-0 left-0 right-0 h-[6px]"
                style={{ backgroundColor: pro.brandTone }}
                aria-hidden
              />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <span
                  className="font-pixel text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: pro.brandTone }}
                >
                  Business · Redlands & nearby
                </span>
                <h1
                  className="text-[40px] sm:text-[56px] leading-[0.95] font-extrabold tracking-[-0.02em]"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  {pro.business}
                </h1>
                <span
                  className="text-[14px] font-semibold mt-1"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {pro.lead} · {pro.leadRole} · {pro.fleet}
                </span>
              </div>

              <p
                className="text-[15px] sm:text-[17px] font-medium leading-snug max-w-[440px]"
                style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
              >
                {pro.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{
                    backgroundColor: statusBg,
                    color: "white",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                  {pro.status.text}
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
                  {pro.ctaTitle}
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
            {pro.stats.map((s) => (
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
          <SectionHeader title="About." />
          <p
            className="text-[15px] leading-relaxed max-w-[760px]"
            style={{ color: "var(--color-data-ink, #3B342A)" }}
          >
            {pro.blurb}
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="What they do." caption="priced before the visit" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {pro.services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-xl border-2 p-5 flex flex-col gap-2"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
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
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Where they go." caption="coverage zones and cadence" />
          <div
            className="rounded-xl border-2 overflow-hidden"
            style={{
              backgroundColor: "var(--color-data-cream, #F1E6D3)",
              borderColor: "var(--color-card-border, #B89B6A)",
            }}
          >
            {pro.routes.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <MapPin
                  size={16}
                  strokeWidth={2.4}
                  className="shrink-0"
                  style={{ color: pro.brandTone }}
                />
                <span
                  className="text-[14px] font-bold tracking-[-0.005em] flex-1"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  {r.area}
                </span>
                <span
                  className="font-pixel text-[10px] tracking-[0.08em]"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {r.cadence}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Certified on." caption="warranty work covered" />
          <div className="flex flex-wrap gap-2">
            {pro.partnerships.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full px-4 py-2 text-[12px] font-bold tracking-[-0.005em] border-2"
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
          <SectionHeader title="What they've been up to." caption="recent jobs, neighbors anonymized" />
          <div className="flex flex-col">
            {pro.activity.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b-2 last:border-b-0"
                style={{ borderColor: "var(--color-card-border, #B89B6A)" }}
              >
                <div
                  className="grid place-items-center h-9 w-9 rounded-full shrink-0"
                  style={{
                    backgroundColor: pro.brandTone,
                    color: "white",
                  }}
                >
                  <Wrench size={16} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="text-[14px] font-bold tracking-[-0.005em]"
                      style={{ color: "var(--color-data-ink, #3B342A)" }}
                    >
                      {entry.customer}
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
          <SectionHeader title="What people say." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pro.reviews.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border-2 p-6 flex flex-col gap-3"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      strokeWidth={0}
                      fill={idx < r.rating ? "var(--color-citrus, #E8A82C)" : "var(--color-card-border, #B89B6A)"}
                    />
                  ))}
                </div>
                <p
                  className="text-[14px] leading-relaxed italic"
                  style={{ color: "var(--color-data-ink, #3B342A)" }}
                >
                  &ldquo;{r.body}&rdquo;
                </p>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.06em]"
                  style={{ color: "var(--color-data-ink-mute, #6E6555)" }}
                >
                  {r.author}
                </span>
              </div>
            ))}
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
              {pro.ctaTitle}
            </span>
            <h3 className="text-[26px] sm:text-[32px] leading-tight font-extrabold tracking-[-0.02em]">
              {pro.ctaDate}
            </h3>
            <span className="text-[13px] opacity-90">{pro.ctaTime}</span>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all"
            style={{ color: "var(--color-terracotta, #C75240)" }}
          >
            Book it
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </section>
      </div>
    </div>
  );
}
