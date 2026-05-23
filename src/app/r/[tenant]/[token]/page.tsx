import { notFound } from "next/navigation";
import { getTenant } from "@/lib/data/tenants";
import { getCustomer } from "@/lib/data/customers";
import { resolveToken } from "@/lib/data/campaigns";
import { CYAHighLanding } from "@/components/landings/CYAHighLanding";
import { LapsedLanding } from "@/components/landings/LapsedLanding";
import { VIPLanding } from "@/components/landings/VIPLanding";
import { PhosphateLanding } from "@/components/landings/PhosphateLanding";
import { PoolRecord } from "@/components/landings/PoolRecord";

export default async function TenantLandingPage({
  params,
}: {
  params: Promise<{ tenant: string; token: string }>;
}) {
  const { tenant: tenantSlug, token } = await params;
  const tenant = getTenant(tenantSlug);
  const campaign = resolveToken(token);
  if (!tenant || !campaign) notFound();

  const customer = getCustomer(campaign.customerId);
  if (!customer) notFound();

  // Every campaign landing offers a deep-link into the homeowner's full record.
  const recordHref = `/r/${tenant.slug}/record-${customer.firstName.toLowerCase()}`;

  switch (campaign.intent) {
    case "cya-high":
      return <CYAHighLanding tenant={tenant} customer={customer} recordHref={recordHref} />;
    case "lapsed":
      return <LapsedLanding tenant={tenant} customer={customer} recordHref={recordHref} />;
    case "vip-early-access":
      return <VIPLanding tenant={tenant} customer={customer} recordHref={recordHref} />;
    case "phosphate-spike":
      return <PhosphateLanding tenant={tenant} customer={customer} recordHref={recordHref} />;
    case "pool-record":
      return <PoolRecord tenant={tenant} customer={customer} />;
  }
}
