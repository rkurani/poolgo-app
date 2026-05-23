import { ArrowRight, Calendar, FlaskConical, HandHeart } from "lucide-react";
import { Card, CardHead, CardBody } from "@/components/cc/Card";
import { PrimaryCTA, SecondaryCTA } from "@/components/cc/CTAButton";
import { Intro, RecordSeed, Spacer, SpacerLg } from "./CYAHighLanding";
import type { Tenant } from "@/lib/data/tenants";
import type { Customer } from "@/lib/data/customers";
import { daysAgoLabel } from "@/lib/format";

export function LapsedLanding({
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
        <CardHead icon={<HandHeart size={17} strokeWidth={2.2} />} variant="cyan">
          <span>We miss you at {tenant.name}</span>
        </CardHead>
        <CardBody>
          <p
            className="mb-3 text-[13.5px] leading-[1.55]"
            style={{ color: "var(--cc-text)" }}
          >
            It&apos;s been <strong>{daysAgoLabel(lastTest.date)}</strong> since
            we last tested your water. With temperatures climbing, even a
            balanced pool drifts fast — and {customer.firstName}, your last test
            showed chlorine running low. Let&apos;s get ahead of it.
          </p>
          <p className="text-[13px]" style={{ color: "var(--cc-muted)" }}>
            Bring a sample in this Saturday and the test is on us.
          </p>
        </CardBody>
      </Card>

      <Spacer />

      <Card>
        <CardHead icon={<FlaskConical size={17} strokeWidth={2.2} />} variant="tenant">
          <span>What we&apos;ll check</span>
        </CardHead>
        <CardBody>
          <ul className="space-y-1.5 text-[13.5px]" style={{ color: "var(--cc-text)" }}>
            <li>· Free + total chlorine, pH, alkalinity</li>
            <li>· Calcium hardness and cyanuric acid</li>
            <li>· Phosphate (the algae fuel)</li>
            <li>· Full plain-English read-out before you leave</li>
          </ul>
        </CardBody>
      </Card>

      <SpacerLg />

      <div className="space-y-2.5">
        <PrimaryCTA>
          <Calendar size={16} strokeWidth={2} />
          <span>Book my free test — Sat 9a / 11a / 2p</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </PrimaryCTA>
        <SecondaryCTA>
          <span>Just walk in — we&apos;re open 9–5 Saturday</span>
          <ArrowRight size={15} strokeWidth={2.2} className="ml-auto" />
        </SecondaryCTA>
      </div>

      <SpacerLg />

      <RecordSeed tenant={tenant} href={recordHref} />
    </div>
  );
}
