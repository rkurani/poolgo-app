import type { Tenant } from "@/lib/data/tenants";

export function TenantHeader({
  tenant,
  customerFirstName,
}: {
  tenant: Tenant;
  customerFirstName?: string;
}) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3"
      style={{ borderBottom: "1px solid var(--cc-border)" }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="grid h-8 w-8 place-items-center rounded-md text-[14px] font-bold text-white"
          style={{ background: "var(--tenant-accent)" }}
        >
          {tenant.logoMark}
        </div>
        <div>
          <div
            className="text-[14.5px] font-bold leading-tight"
            style={{ color: "var(--cc-text)" }}
          >
            {tenant.name}
          </div>
          <div
            className="text-[11px] font-medium"
            style={{ color: "var(--cc-muted)" }}
          >
            powered by ClearCare+
          </div>
        </div>
      </div>
      {customerFirstName && (
        <div
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-semibold"
          style={{
            background: "var(--cc-pill-bg)",
            borderColor: "var(--cc-pill-border)",
            color: "var(--cc-pill-text)",
          }}
        >
          <span
            className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold text-white"
            style={{ background: "var(--cc-pill-text)" }}
          >
            {customerFirstName.charAt(0)}
          </span>
          {customerFirstName}
        </div>
      )}
    </header>
  );
}
