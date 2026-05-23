import { notFound } from "next/navigation";
import { getTenant } from "@/lib/data/tenants";
import { TenantHeader } from "@/components/TenantHeader";
import { TenantFooter } from "@/components/TenantFooter";
import { getCustomer } from "@/lib/data/customers";
import { resolveToken } from "@/lib/data/campaigns";

export default async function TenantRouteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string; token: string }>;
}) {
  const { tenant: slug, token } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  const campaign = resolveToken(token);
  const customer = campaign ? getCustomer(campaign.customerId) : null;

  return (
    <div
      data-tenant={tenant.slug}
      style={
        {
          "--tenant-accent": tenant.brandColor,
          "--tenant-soft": tenant.brandSoft,
        } as React.CSSProperties
      }
      className="flex min-h-screen flex-col"
    >
      <TenantHeader tenant={tenant} customerFirstName={customer?.firstName} />
      <main className="flex-1">{children}</main>
      <TenantFooter tenant={tenant} />
    </div>
  );
}
