import Link from "next/link";
import { ArrowRight, MessageSquare, ScrollText } from "lucide-react";
import { TENANTS } from "@/lib/data/tenants";
import { TOKEN_INDEX, resolveToken } from "@/lib/data/campaigns";
import { getCustomer } from "@/lib/data/customers";

export default function DemoIndexPage() {
  const tenants = Object.values(TENANTS);
  const campaignTokens = TOKEN_INDEX.filter((t) => !t.token.startsWith("record-"));
  const recordTokens = TOKEN_INDEX.filter((t) => t.token.startsWith("record-"));

  return (
    <div className="mx-auto max-w-[920px] px-6 py-12">
      <div className="mb-10">
        <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.1em] text-ink-mute">
          PoolGo · Internal demo
        </p>
        <h1 className="mb-2 text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em]">
          ClearCare + PoolGo end-to-end
        </h1>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          A pool store sends a campaign from the ClearCare Marketing Center.
          Each customer gets a personalized SMS or email with a unique token
          link. The link lands them in a tenant-skinned consumer surface
          powered by PoolGo. Below: every scenario, click-through-ready.
        </p>
      </div>

      <Section
        title="The send side"
        subtitle="Where Laura at Royal Pools builds the campaign. Lives in a separate repo."
      >
        <ExternalRow
          label="ClearCare Marketing Center (iframe-ready)"
          href="http://localhost:8000/iframe-test.html"
          hint="cd ~/Projects/clearcare-marketing-center && python3 -m http.server 8000"
        />
      </Section>

      <Section
        title="Campaign landings — what the customer sees"
        subtitle="Each token is what the SMS or email link resolves to. Tenant skin is set by the URL slug."
        icon={<MessageSquare size={16} strokeWidth={2} />}
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {tenants.flatMap((tenant) =>
            campaignTokens.map((tok) => {
              const campaign = resolveToken(tok.token);
              const customer = campaign ? getCustomer(campaign.customerId) : null;
              if (!campaign || !customer) return null;
              return (
                <CampaignCard
                  key={`${tenant.slug}-${tok.token}`}
                  href={`/r/${tenant.slug}/${tok.token}`}
                  tenant={tenant.name}
                  intent={tok.label}
                  channel={campaign.channel}
                  preview={
                    campaign.smsPreview ||
                    (campaign.subject ? `Subject: ${campaign.subject}` : "")
                  }
                />
              );
            }),
          )}
        </div>
      </Section>

      <Section
        title="Pool records — the aggregator (post-click)"
        subtitle="Where the soft-seed link in every landing takes the homeowner. Full chemistry timeline, equipment, visits, purchases."
        icon={<ScrollText size={16} strokeWidth={2} />}
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {recordTokens.map((tok) => {
            const campaign = resolveToken(tok.token);
            const customer = campaign ? getCustomer(campaign.customerId) : null;
            if (!campaign || !customer) return null;
            return (
              <RecordCard
                key={tok.token}
                href={`/r/royalpools/${tok.token}`}
                customerName={`${customer.firstName} ${customer.lastName}`}
                tags={customer.tags}
              />
            );
          })}
        </div>
      </Section>

      <Section title="Handoff" subtitle="For the developer picking this up.">
        <Link
          href="https://github.com/rkurani/poolgo-app/blob/feature/tenant-theming/HANDOFF.md"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary"
        >
          Read HANDOFF.md
          <ArrowRight size={14} strokeWidth={2.2} />
        </Link>
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-2">
        {icon && <span className="text-ink-mute">{icon}</span>}
        <h2 className="text-[18px] font-bold tracking-[-0.01em]">{title}</h2>
      </div>
      {subtitle && (
        <p className="mb-4 text-[13.5px] text-ink-mute">{subtitle}</p>
      )}
      {children}
    </section>
  );
}

function CampaignCard({
  href,
  tenant,
  intent,
  channel,
  preview,
}: {
  href: string;
  tenant: string;
  intent: string;
  channel: "sms" | "email";
  preview: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[10px] border border-line bg-background p-4 transition-colors hover:border-ink-mute"
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[13.5px] font-bold">{intent}</span>
        <span
          className="rounded-full px-2 py-[2px] text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: channel === "sms" ? "#e0f7f8" : "#e6f1fb",
            color: channel === "sms" ? "#0a8089" : "#1f6feb",
          }}
        >
          {channel}
        </span>
      </div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
        {tenant}
      </div>
      {preview && (
        <p className="line-clamp-2 text-[12.5px] leading-[1.5] text-ink-mute">
          {preview}
        </p>
      )}
      <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open landing
        <ArrowRight size={11} strokeWidth={2.4} />
      </div>
    </Link>
  );
}

function RecordCard({
  href,
  customerName,
  tags,
}: {
  href: string;
  customerName: string;
  tags: string[];
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[10px] border border-line bg-background p-4 transition-colors hover:border-ink-mute"
    >
      <div className="mb-1 text-[13.5px] font-bold">{customerName}</div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-surface px-2 py-[2px] text-[10.5px] font-semibold uppercase tracking-wider text-ink-mute"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open pool record
        <ArrowRight size={11} strokeWidth={2.4} />
      </div>
    </Link>
  );
}

function ExternalRow({
  label,
  href,
  hint,
}: {
  label: string;
  href: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[10px] border border-line bg-background p-4">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[13.5px] font-bold text-primary"
        >
          {label}
        </a>
        <span className="text-[11px] uppercase tracking-wider text-ink-mute">external</span>
      </div>
      {hint && (
        <code className="text-[11.5px] text-ink-mute">{hint}</code>
      )}
    </div>
  );
}
