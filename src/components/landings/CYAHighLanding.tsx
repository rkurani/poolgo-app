import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Droplets,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Card, CardHead, CardBody, CardActionPill } from "@/components/cc/Card";
import { KPITile } from "@/components/cc/KPITile";
import { Pill } from "@/components/cc/Pill";
import { PrimaryCTA, SecondaryCTA, InfoBanner } from "@/components/cc/CTAButton";
import type { Tenant } from "@/lib/data/tenants";
import type { Customer } from "@/lib/data/customers";
import { CHEMICALS } from "@/lib/data/chemicals";
import { formatDate } from "@/lib/format";

export function CYAHighLanding({
  tenant,
  customer,
  recordHref,
}: {
  tenant: Tenant;
  customer: Customer;
  recordHref: string;
}) {
  const lastTest = customer.tests[0];
  const priorTest = customer.tests[1];
  const cyaDelta = priorTest ? lastTest.cya - priorTest.cya : 0;
  const cyaRec = customer.lastRecommendations.find((r) => r.sku === "CYA-RED");
  const chemical = cyaRec ? CHEMICALS[cyaRec.sku] : null;

  return (
    <div className="mx-auto max-w-[680px] px-5 py-6">
      <Intro firstName={customer.firstName} testDate={lastTest.date} />

      <Card>
        <CardHead icon={<AlertTriangle size={17} strokeWidth={2.2} />}>
          <span>Your CYA needs attention</span>
          <CardActionPill>Action needed</CardActionPill>
        </CardHead>
        <CardBody>
          <div className="mb-4 flex items-center gap-4">
            <KPITile value={lastTest.cya} unit="ppm" color="orange" label="Current CYA" />
            <div className="flex-1">
              <div
                className="mb-1 text-[12px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--cc-muted)" }}
              >
                Target range
              </div>
              <div
                className="mb-2 text-[18px] font-bold"
                style={{ color: "var(--cc-text)" }}
              >
                30 – 50 ppm
              </div>
              {cyaDelta > 0 && (
                <Pill>
                  ↑ {cyaDelta} from {priorTest.cya} two weeks ago
                </Pill>
              )}
            </div>
          </div>
          <p
            className="text-[13.5px] leading-[1.55]"
            style={{ color: "var(--cc-text)" }}
          >
            The cyanuric acid in your water is high enough to start blocking
            chlorine from doing its job. Left alone, you&apos;ll see cloudy
            water and algae start to form.
          </p>
        </CardBody>
      </Card>

      <Spacer />

      <Card>
        <CardHead icon={<Droplets size={17} strokeWidth={2.2} />} variant="tenant">
          <span>{tenant.name}&apos;s recommendation</span>
        </CardHead>
        <CardBody>
          <p
            className="mb-2 text-[13.5px] leading-[1.55]"
            style={{ color: "var(--cc-text)" }}
          >
            <strong>Partial drain and refill.</strong> Lower your pool ~30% and
            top back up with fresh water. Re-test in 7 days.
          </p>
          {chemical && cyaRec && (
            <p className="text-[13px]" style={{ color: "var(--cc-muted)" }}>
              You&apos;ll need: <strong>{chemical.name}</strong> ×{" "}
              {cyaRec.quantity} — ${(chemical.price * cyaRec.quantity).toFixed(2)}
            </p>
          )}
        </CardBody>
      </Card>

      <SpacerLg />

      <div className="space-y-2.5">
        <PrimaryCTA>
          <Calendar size={16} strokeWidth={2} />
          <span>Book a free re-test — Sat 9a / 11a / 2p</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </PrimaryCTA>
        <SecondaryCTA>
          <ShoppingBag size={16} strokeWidth={2} />
          <span>
            Get 15% off CYA Reducer — code <strong>CYA15</strong>
          </span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </SecondaryCTA>
      </div>

      <SpacerLg />

      <RecordSeed tenant={tenant} href={recordHref} />
    </div>
  );
}

// Shared sub-components reused across templates.

export function Intro({ firstName, testDate }: { firstName: string; testDate: string }) {
  return (
    <div className="mb-4">
      <div className="mb-1 text-[13px] font-semibold" style={{ color: "var(--cc-muted)" }}>
        Hi {firstName},
      </div>
      <h1
        className="text-[20px] font-bold leading-[1.2]"
        style={{ color: "var(--cc-text)" }}
      >
        Your water test from {formatDate(testDate)}
      </h1>
    </div>
  );
}

export function RecordSeed({ tenant, href }: { tenant: Tenant; href: string }) {
  return (
    <InfoBanner>
      <div className="mb-1 flex items-center gap-1.5">
        <Sparkles size={14} strokeWidth={2} style={{ color: "var(--cc-pill-text)" }} />
        <span
          className="text-[12px] font-bold uppercase tracking-wider"
          style={{ color: "var(--cc-pill-text)" }}
        >
          See your pool&apos;s full record
        </span>
      </div>
      <p
        className="mb-2 text-[13px] leading-[1.5]"
        style={{ color: "var(--cc-text)" }}
      >
        Last 30 days of tests, your equipment, and every visit from {tenant.name} — all in one place.
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-[12.5px] font-bold"
        style={{ color: "var(--cc-pill-text)" }}
      >
        Open my pool record
        <ArrowRight size={13} strokeWidth={2.4} />
      </a>
    </InfoBanner>
  );
}

export function Spacer() {
  return <div className="h-4" />;
}
export function SpacerLg() {
  return <div className="h-5" />;
}
