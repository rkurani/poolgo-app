import { ArrowRight, Crown, Tag, Ticket } from "lucide-react";
import { Card, CardHead, CardBody } from "@/components/cc/Card";
import { Pill } from "@/components/cc/Pill";
import { PrimaryCTA, SecondaryCTA } from "@/components/cc/CTAButton";
import { Intro, RecordSeed, Spacer, SpacerLg } from "./CYAHighLanding";
import type { Tenant } from "@/lib/data/tenants";
import type { Customer } from "@/lib/data/customers";

export function VIPLanding({
  tenant,
  customer,
  recordHref,
}: {
  tenant: Tenant;
  customer: Customer;
  recordHref: string;
}) {
  const lastTest = customer.tests[0];

  return (
    <div className="mx-auto max-w-[680px] px-5 py-6">
      <Intro firstName={customer.firstName} testDate={lastTest.date} />

      <Card>
        <CardHead icon={<Crown size={17} strokeWidth={2.2} />} variant="pink">
          <span>VIP early access — Summer sale</span>
        </CardHead>
        <CardBody>
          <p
            className="mb-3 text-[13.5px] leading-[1.55]"
            style={{ color: "var(--cc-text)" }}
          >
            You&apos;re one of {tenant.name}&apos;s longest-standing customers
            ({customer.totalVisits} visits, ${customer.lifetimeSpend.toLocaleString()} lifetime spend) —
            so you get first crack at the summer sale before it opens to the rest of the neighborhood.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill tone="success">25% off chlorine tabs</Pill>
            <Pill tone="success">20% off pool toys</Pill>
            <Pill tone="success">Free salt cell inspection</Pill>
          </div>
        </CardBody>
      </Card>

      <Spacer />

      <Card>
        <CardHead icon={<Ticket size={17} strokeWidth={2.2} />} variant="tenant">
          <span>Your code</span>
        </CardHead>
        <CardBody>
          <div
            className="rounded-md border-2 border-dashed px-4 py-3 text-center"
            style={{ borderColor: "var(--tenant-accent)" }}
          >
            <div
              className="mb-1 text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: "var(--cc-muted)" }}
            >
              Show at counter or use at checkout
            </div>
            <div
              className="text-[26px] font-extrabold tracking-[0.08em]"
              style={{ color: "var(--tenant-accent)" }}
            >
              VIP-{customer.firstName.toUpperCase()}-25
            </div>
          </div>
        </CardBody>
      </Card>

      <SpacerLg />

      <div className="space-y-2.5">
        <PrimaryCTA>
          <Tag size={16} strokeWidth={2} />
          <span>Shop the early-access sale</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </PrimaryCTA>
        <SecondaryCTA>
          <span>See what&apos;s included</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </SecondaryCTA>
      </div>

      <SpacerLg />

      <RecordSeed tenant={tenant} href={recordHref} />
    </div>
  );
}
