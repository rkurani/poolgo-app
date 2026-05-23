import { AlertOctagon, ArrowRight, Calendar, ShoppingBag } from "lucide-react";
import { Card, CardHead, CardBody, CardActionPill } from "@/components/cc/Card";
import { KPITile } from "@/components/cc/KPITile";
import { Pill } from "@/components/cc/Pill";
import { PrimaryCTA, SecondaryCTA } from "@/components/cc/CTAButton";
import { Intro, RecordSeed, Spacer, SpacerLg } from "./CYAHighLanding";
import type { Tenant } from "@/lib/data/tenants";
import type { Customer } from "@/lib/data/customers";
import { CHEMICALS } from "@/lib/data/chemicals";

export function PhosphateLanding({
  tenant,
  customer,
  recordHref,
}: {
  tenant: Tenant;
  customer: Customer;
  recordHref: string;
}) {
  const lastTest = customer.tests[0];
  const cartTotal = customer.lastRecommendations.reduce((s, r) => {
    const c = CHEMICALS[r.sku];
    return c ? s + c.price * r.quantity : s;
  }, 0);

  return (
    <div className="mx-auto max-w-[680px] px-5 py-6">
      <Intro firstName={customer.firstName} testDate={lastTest.date} />

      <Card>
        <CardHead icon={<AlertOctagon size={17} strokeWidth={2.2} />} variant="pink">
          <span>Phosphate is feeding algae</span>
          <CardActionPill>Get ahead</CardActionPill>
        </CardHead>
        <CardBody>
          <div className="mb-4 flex items-center gap-4">
            <KPITile value={lastTest.phosphate} unit="ppb" color="pink" label="Phosphate" />
            <div className="flex-1">
              <div
                className="mb-1 text-[12px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--cc-muted)" }}
              >
                Safe range
              </div>
              <div
                className="mb-2 text-[18px] font-bold"
                style={{ color: "var(--cc-text)" }}
              >
                &lt; 100 ppb
              </div>
              <Pill tone="warn">Algae fuel at this level</Pill>
            </div>
          </div>
          <p
            className="text-[13.5px] leading-[1.55]"
            style={{ color: "var(--cc-text)" }}
          >
            Phosphate is what algae eats. At {lastTest.phosphate} ppb, you have
            enough food in the water for a bloom — especially with summer
            warming the pool. The fix is straightforward, and we&apos;ve got
            everything you need.
          </p>
        </CardBody>
      </Card>

      <Spacer />

      <Card>
        <CardHead variant="tenant">
          <span>{tenant.name}&apos;s 3-step fix</span>
        </CardHead>
        <CardBody>
          <ol className="space-y-2 text-[13.5px]" style={{ color: "var(--cc-text)" }}>
            {customer.lastRecommendations.map((r, i) => {
              const c = CHEMICALS[r.sku];
              if (!c) return null;
              return (
                <li key={r.sku} className="flex gap-2">
                  <span
                    className="inline-grid h-5 w-5 flex-shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: "var(--tenant-accent)" }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <strong>{c.name}</strong> × {r.quantity} — {r.note}
                  </span>
                </li>
              );
            })}
          </ol>
          <div
            className="mt-3 flex items-center justify-between border-t pt-3 text-[13px]"
            style={{ borderColor: "var(--cc-border)", color: "var(--cc-muted)" }}
          >
            <span>Cart total</span>
            <strong style={{ color: "var(--cc-text)" }}>${cartTotal.toFixed(2)}</strong>
          </div>
        </CardBody>
      </Card>

      <SpacerLg />

      <div className="space-y-2.5">
        <PrimaryCTA>
          <ShoppingBag size={16} strokeWidth={2} />
          <span>Reserve these for pickup — ${cartTotal.toFixed(2)}</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </PrimaryCTA>
        <SecondaryCTA>
          <Calendar size={16} strokeWidth={2} />
          <span>Or — bring a sample in for a re-test</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </SecondaryCTA>
      </div>

      <SpacerLg />

      <RecordSeed tenant={tenant} href={recordHref} />
    </div>
  );
}
