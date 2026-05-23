import type { Tenant } from "@/lib/data/tenants";

export function TenantFooter({ tenant }: { tenant: Tenant }) {
  return (
    <footer
      className="px-6 py-4 text-[11.5px]"
      style={{
        background: "var(--cc-surface)",
        borderTop: "1px solid var(--cc-border)",
        color: "var(--cc-muted)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>{tenant.footer}</div>
        <div className="opacity-80">
          Infrastructure by <span className="font-semibold">PoolGo</span>
        </div>
      </div>
    </footer>
  );
}
