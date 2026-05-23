import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MarketingHome() {
  return (
    <div className="bg-background">
      <Nav />
      <Hero />
      <LogoBar />
      <ProductBlocks />
      <Stance />
      <SplitCTAs />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-8 pt-7">
      <div className="text-[18px] font-extrabold tracking-[-0.03em]">
        PoolGo<span className="text-primary">.</span>
      </div>
      <div className="flex items-center gap-7 text-[13.5px] font-medium text-ink-soft">
        <a href="#what-we-do" className="hover:text-ink">Platform</a>
        <a href="#partners"  className="hover:text-ink">Partners</a>
        <a href="#deflect"   className="hover:text-ink">Help</a>
        <Link
          href="#partners"
          className="rounded-full border border-ink bg-ink px-3.5 py-1.5 text-[13px] font-semibold"
          style={{ color: "#fff" }}
        >
          Talk to us
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-8 pt-24 pb-20">
      <div className="max-w-[760px]">
        <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
          Infrastructure
        </p>
        <h1 className="font-extrabold leading-[1.04] tracking-[-0.04em] text-[clamp(40px,6.6vw,80px)]">
          Pool industry,
          <br />
          connected<span className="text-primary">.</span>
        </h1>
        <p className="mt-8 max-w-[620px] text-[18px] leading-[1.55] text-ink-soft">
          PoolGo runs the customer messaging, records, and integrations for the
          pool businesses and brands your customers already trust.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="#partners"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-[14px] font-semibold"
            style={{ color: "#fff" }}
          >
            Talk to us
            <ArrowRight size={15} strokeWidth={2.2} />
          </Link>
          <a
            href="#deflect"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-3 text-[14px] font-semibold text-ink hover:border-ink"
          >
            Got a message from this domain?
          </a>
        </div>
      </div>
    </section>
  );
}

function LogoBar() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1080px] px-8 py-12">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-mute">
          Trusted by
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          <LogoChip name="ClearCare+" tone="active" />
          <LogoChip name="Skimmer" tone="placeholder" />
          <LogoChip name="Pool Brain" tone="placeholder" />
          <LogoChip name="Pool Route Ops" tone="placeholder" />
          <LogoChip name="Counter POS" tone="placeholder" />
          <LogoChip name="Pentair" tone="placeholder" />
        </div>
      </div>
    </section>
  );
}

function LogoChip({ name, tone }: { name: string; tone: "active" | "placeholder" }) {
  return (
    <div
      className={
        "text-[17px] font-extrabold tracking-[-0.02em] " +
        (tone === "active" ? "text-ink" : "text-ink-mute opacity-40")
      }
    >
      {name}
    </div>
  );
}

function ProductBlocks() {
  return (
    <section id="what-we-do" className="mx-auto max-w-[1080px] px-8 py-24">
      <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-mute">
        Platform
      </p>
      <h2 className="mb-14 max-w-[680px] font-extrabold leading-[1.08] tracking-[-0.035em] text-[clamp(28px,3.8vw,44px)]">
        Three layers. One bill. Built for the pool industry, not retrofitted.
      </h2>
      <div className="grid gap-12 md:grid-cols-3">
        <Block
          eyebrow="01"
          title="Customer communication"
          body="Branded SMS and email for every pool business. Stores send through their own number and domain. We handle delivery, replies, opt-outs, and compliance — they handle their customers."
        />
        <Block
          eyebrow="02"
          title="Connected records"
          body="One persistent record per pool. Tests, equipment, visits, purchases — kept current by every partner the homeowner has connected. The record stays with the homeowner across providers and seasons."
        />
        <Block
          eyebrow="03"
          title="Industry integrations"
          body="Photometers, service tech apps, OEM equipment, retail POS. One integration, available to every partner. Your customers get a unified experience without you having to build one."
        />
      </div>
    </section>
  );
}

function Block({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
        {eyebrow}
      </p>
      <h3 className="mb-3 text-[20px] font-bold leading-[1.2] tracking-[-0.02em]">
        {title}
      </h3>
      <p className="text-[14.5px] leading-[1.6] text-ink-soft">{body}</p>
    </div>
  );
}

function Stance() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1080px] px-8 py-20">
        <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-mute">
          Why us
        </p>
        <h2 className="max-w-[820px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[clamp(22px,3vw,32px)] text-ink">
          We&apos;re obsessed with one industry. Every part of the platform is
          built around how pool businesses actually work — water testing intake,
          chemistry recommendations, service routes, equipment lifecycles,
          seasonal cadences. No retrofitted CRM. No generic field-service tool.
          No &ldquo;loyalty marketing platform&rdquo; pretending to know your business.
        </h2>
      </div>
    </section>
  );
}

function SplitCTAs() {
  return (
    <section className="mx-auto max-w-[1080px] px-8 py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <CTACard
          id="deflect"
          eyebrow="For homeowners"
          title="Got a message from poolgo.co?"
          body={
            <>
              The pool store you visited uses PoolGo to send their updates. The
              store&apos;s contact info is in the message you received — give them a
              call or write back directly. We&apos;re the rails, not the store.
            </>
          }
          variant="muted"
        />
        <CTACard
          id="partners"
          eyebrow="For pool businesses"
          title="Are you a pool business or industry brand?"
          body={
            <>
              We work with pool stores, service routes, equipment manufacturers,
              and chemistry partners. If your customers leave traces in your
              business — receipts, test results, service visits, equipment data
              — we can probably help them stay connected to you between visits.
            </>
          }
          action={{ label: "Talk to us", href: "#" }}
          variant="primary"
        />
      </div>
    </section>
  );
}

function CTACard({
  id,
  eyebrow,
  title,
  body,
  action,
  variant,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  action?: { label: string; href: string };
  variant: "primary" | "muted";
}) {
  const isPrimary = variant === "primary";
  return (
    <div
      id={id}
      className={
        "rounded-2xl p-9 " +
        (isPrimary ? "bg-ink" : "border border-line bg-surface")
      }
      style={isPrimary ? { color: "#fff" } : undefined}
    >
      <p
        className={
          "mb-3 text-[12px] font-bold uppercase tracking-[0.16em] " +
          (isPrimary ? "text-primary" : "text-ink-mute")
        }
      >
        {eyebrow}
      </p>
      <h3 className="mb-4 text-[22px] font-bold leading-[1.25] tracking-[-0.02em]">
        {title}
      </h3>
      <p
        className="text-[14.5px] leading-[1.6]"
        style={isPrimary ? { color: "rgba(255,255,255,0.88)" } : undefined}
      >
        {!isPrimary ? <span className="text-ink-soft">{body}</span> : body}
      </p>
      {action && (
        <a
          href={action.href}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-ink"
          style={isPrimary ? { background: "#fff" } : { border: "1px solid var(--color-ink)" }}
        >
          {action.label}
          <ArrowRight size={14} strokeWidth={2.2} />
        </a>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-baseline justify-between gap-3 px-8 py-10 text-[12.5px] text-ink-mute">
        <div>
          <span className="font-bold text-ink">PoolGo, Inc.</span> · Infrastructure for the pool industry
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
          <a href="#" className="hover:text-ink">Status</a>
          <a href="#" className="hover:text-ink">Contact</a>
        </div>
      </div>
    </footer>
  );
}
