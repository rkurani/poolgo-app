import Link from "next/link";
import { ArrowRight, Compass, Droplet, Settings2, Users } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const QUICK_LINKS = [
  { Icon: Droplet, title: "Care", body: "pH 7.4 · ORP 720 · all green", href: "/care", tone: "var(--color-source-ai)" },
  { Icon: Settings2, title: "Equipment", body: "5 systems · all live", href: "/equipment", tone: "var(--color-source-live)" },
  { Icon: Users, title: "Folks", body: "47 within 8 mi · Carlos routes today", href: "/folks", tone: "var(--color-source-human)" },
];

export default function HomePage() {
  return (
    <div
      data-city="redlands"
      className="min-h-[calc(100dvh-96px)] md:min-h-[calc(100dvh-72px)]"
      style={{ backgroundColor: "var(--color-canvas-ground, #D4B896)" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 pt-8 sm:pt-12 pb-32 md:pb-16 flex flex-col gap-10 sm:gap-14">
        <header className="flex flex-col gap-3">
          <span className="font-pixel text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "var(--color-mountain-shadow, #5C5546)" }}>
            Tuesday · May 9 · 7:42 AM · Redlands · 78°F clear
          </span>
          <h1 className="text-[44px] sm:text-[72px] leading-[0.92] font-extrabold tracking-[-0.03em]"
              style={{ color: "var(--color-data-ink, #3B342A)" }}>
            Morning, Lin.
          </h1>
          <p className="text-[16px] sm:text-[19px] font-medium leading-snug max-w-[640px]"
             style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
            Pool&rsquo;s healthy. CYA crept up to 42 ppm. Carlos is on Tuesday&rsquo;s route, he&rsquo;ll
            do the partial drain. Then we&rsquo;re caught up.
          </p>
          <div className="pixel-bar mt-3" aria-hidden />
        </header>

        <Link
          href="/canvas"
          className="group relative rounded-2xl overflow-hidden border-[3px] block hover:translate-y-[-2px] transition-transform shadow-[8px_8px_0_0_rgba(59,52,42,0.18)]"
          style={{
            borderColor: "var(--color-mountain-shadow, #5C5546)",
          }}
        >
          <div
            className="aspect-[16/9] sm:aspect-[16/7] w-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/canvas/redlands-macro.png)",
              imageRendering: "pixelated",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10"
               style={{
                 background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(59,52,42,0.55) 100%)",
               }}>
            <div className="flex items-end justify-between gap-4 flex-wrap w-full">
              <div className="flex flex-col gap-1.5">
                <span className="font-pixel text-[10px] uppercase tracking-[0.2em] text-white/85">
                  Open your backyard
                </span>
                <h2 className="text-[28px] sm:text-[44px] leading-tight font-extrabold tracking-[-0.02em] text-white">
                  Step into Big Blue.
                </h2>
              </div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold backdrop-blur-sm border-2"
                style={{
                  backgroundColor: "var(--color-terracotta, #C75240)",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                <Compass size={16} strokeWidth={2.5} />
                Explore
                <ArrowRight size={14} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </Link>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Today, at a glance." />
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Water", value: "pH 7.4", sub: "ORP 720", tone: "var(--color-source-ai)" },
              { label: "Pad", value: "5/5 live", sub: "1,750 RPM", tone: "var(--color-source-live)" },
              { label: "Next visit", value: "Tue 14", sub: "Carlos · 9 AM", tone: "var(--color-source-human)" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border-2 p-4 sm:p-5 flex flex-col gap-1 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[5px]"
                  style={{ backgroundColor: s.tone }}
                  aria-hidden
                />
                <span className="font-pixel text-[10px] uppercase tracking-[0.18em] mt-2"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {s.label}
                </span>
                <span className="text-[28px] sm:text-[40px] leading-none font-extrabold tracking-[-0.03em]"
                      style={{
                        color: "var(--color-data-ink, #3B342A)",
                        fontFeatureSettings: '"tnum"',
                      }}>
                  {s.value}
                </span>
                <span className="text-[12px] font-semibold mt-1"
                      style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionHeader title="Or jump straight to." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.title}
                href={q.href}
                className="group rounded-2xl border-2 p-6 flex flex-col gap-3 hover:translate-y-[-2px] transition-transform"
                style={{
                  backgroundColor: "var(--color-data-cream, #F1E6D3)",
                  borderColor: "var(--color-card-border, #B89B6A)",
                }}
              >
                <div className="grid place-items-center h-12 w-12 rounded-xl"
                     style={{ backgroundColor: q.tone, color: "white" }}>
                  <q.Icon size={24} strokeWidth={2.4} />
                </div>
                <h3 className="text-[24px] font-extrabold tracking-[-0.01em] mt-1"
                    style={{ color: "var(--color-data-ink, #3B342A)" }}>
                  {q.title}.
                </h3>
                <p className="text-[13px] font-medium leading-snug"
                   style={{ color: "var(--color-data-ink-mute, #6E6555)" }}>
                  {q.body}
                </p>
                <ArrowRight size={16} strokeWidth={2.5} className="mt-1 opacity-60 group-hover:translate-x-0.5 transition-all"
                            style={{ color: q.tone }} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

