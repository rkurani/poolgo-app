import { Activity, Droplets, History, ShoppingBag, Wrench } from "lucide-react";
import { Card, CardHead, CardBody } from "@/components/cc/Card";
import { Pill } from "@/components/cc/Pill";
import { Intro, Spacer } from "./CYAHighLanding";
import type { Tenant } from "@/lib/data/tenants";
import type { Customer, WaterTest } from "@/lib/data/customers";
import { equipmentFor } from "@/lib/data/equipment";
import { visitsFor } from "@/lib/data/visits";
import { CHEMICALS } from "@/lib/data/chemicals";
import { formatDate, daysAgoLabel } from "@/lib/format";

export function PoolRecord({
  tenant,
  customer,
}: {
  tenant: Tenant;
  customer: Customer;
}) {
  const equipment = equipmentFor(customer.id);
  const visits = visitsFor(customer.id);
  const lastTest = customer.tests[0];

  return (
    <div className="mx-auto max-w-[680px] px-5 py-6">
      <Intro firstName={customer.firstName} testDate={lastTest.date} />

      <PoolHeader customer={customer} />
      <Spacer />

      <Card>
        <CardHead icon={<Activity size={17} strokeWidth={2.2} />}>
          <span>Chemistry — last {customer.tests.length} tests</span>
        </CardHead>
        <CardBody>
          <ChemistryTable tests={customer.tests} />
        </CardBody>
      </Card>
      <Spacer />

      <Card>
        <CardHead icon={<Wrench size={17} strokeWidth={2.2} />} variant="tenant">
          <span>Equipment</span>
        </CardHead>
        <CardBody>
          {equipment.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--cc-muted)" }}>
              No equipment on file yet.
            </p>
          ) : (
            <div className="space-y-2.5">
              {equipment.map((e) => (
                <EquipmentRow key={e.id} equipment={e} />
              ))}
            </div>
          )}
        </CardBody>
      </Card>
      <Spacer />

      <Card>
        <CardHead icon={<Droplets size={17} strokeWidth={2.2} />} variant="cyan">
          <span>Latest recommendations from {tenant.name}</span>
        </CardHead>
        <CardBody>
          <ul className="space-y-2 text-[13.5px]" style={{ color: "var(--cc-text)" }}>
            {customer.lastRecommendations.map((r) => {
              const c = CHEMICALS[r.sku];
              if (!c) return null;
              return (
                <li key={r.sku} className="flex items-start gap-2">
                  <span
                    className="mt-[6px] inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ background: c.swatch }}
                  />
                  <span>
                    <strong>{c.name}</strong> × {r.quantity}
                    <span className="block text-[12.5px]" style={{ color: "var(--cc-muted)" }}>
                      {r.note}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
      <Spacer />

      <Card>
        <CardHead icon={<History size={17} strokeWidth={2.2} />} variant="green">
          <span>Visit history</span>
        </CardHead>
        <CardBody>
          {visits.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--cc-muted)" }}>
              No visits on file.
            </p>
          ) : (
            <ul
              className="divide-y text-[13px]"
              style={{ color: "var(--cc-text)" }}
            >
              {visits.map((v) => (
                <li key={v.id} className="flex items-baseline gap-3 py-2">
                  <span
                    className="w-[78px] flex-shrink-0 text-[12px] font-semibold"
                    style={{ color: "var(--cc-muted)" }}
                  >
                    {formatDate(v.date)}
                  </span>
                  <VisitKind kind={v.kind} />
                  <span className="flex-1">{v.summary}</span>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
      <Spacer />

      <Card>
        <CardHead icon={<ShoppingBag size={17} strokeWidth={2.2} />} variant="orange">
          <span>Recent purchases</span>
        </CardHead>
        <CardBody>
          {customer.purchases.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--cc-muted)" }}>
              No purchases on file.
            </p>
          ) : (
            <ul
              className="divide-y text-[13px]"
              style={{ color: "var(--cc-text)" }}
            >
              {customer.purchases.map((p, i) => {
                const c = CHEMICALS[p.sku];
                if (!c) return null;
                return (
                  <li key={i} className="flex items-baseline gap-3 py-2">
                    <span
                      className="w-[78px] flex-shrink-0 text-[12px] font-semibold"
                      style={{ color: "var(--cc-muted)" }}
                    >
                      {formatDate(p.date)}
                    </span>
                    <span className="flex-1">
                      {c.name} <span style={{ color: "var(--cc-muted)" }}>× {p.quantity}</span>
                    </span>
                    <span className="font-semibold">${(c.price * p.quantity).toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function PoolHeader({ customer }: { customer: Customer }) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div
              className="text-[16px] font-bold"
              style={{ color: "var(--cc-text)" }}
            >
              {customer.firstName} {customer.lastName}&apos;s pool
            </div>
            <div className="text-[12.5px]" style={{ color: "var(--cc-muted)" }}>
              {customer.poolGallons.toLocaleString()} gal · {customer.poolType} · {customer.poolSurface}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {customer.tags.map((t) => (
              <Pill key={t} tone={t === "vip" ? "success" : t === "lapsed" ? "warn" : "info"}>
                {t.replace("-", " ")}
              </Pill>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function VisitKind({ kind }: { kind: string }) {
  const labels: Record<string, { label: string; color: string }> = {
    "water-test":    { label: "TEST",     color: "#1ab8d3" },
    "service-visit": { label: "SERVICE",  color: "#26b574" },
    "delivery":      { label: "DELIVERY", color: "#f0883a" },
    "in-store":      { label: "STORE",    color: "#d6178d" },
  };
  const meta = labels[kind] || { label: kind.toUpperCase(), color: "#6b7280" };
  return (
    <span
      className="inline-block w-[68px] flex-shrink-0 rounded text-center text-[10px] font-bold uppercase tracking-wider text-white"
      style={{ background: meta.color, padding: "2px 0" }}
    >
      {meta.label}
    </span>
  );
}

function EquipmentRow({
  equipment,
}: {
  equipment: ReturnType<typeof equipmentFor>[number];
}) {
  const ageBadge =
    equipment.ageYears <= 3
      ? "success"
      : equipment.ageYears <= 6
      ? "info"
      : "warn";
  return (
    <div
      data-brand={equipment.brand}
      className="rounded-md border bg-white p-3"
      style={{
        borderColor: "var(--cc-border)",
        borderLeftWidth: "3px",
        borderLeftColor: "var(--brand-accent)",
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div className="text-[13.5px] font-bold" style={{ color: "var(--cc-text)" }}>
            {equipment.model}
          </div>
          <div className="text-[11.5px] uppercase tracking-wider" style={{ color: "var(--brand-accent)" }}>
            {equipment.brand} · {equipment.kind}
          </div>
        </div>
        <Pill tone={ageBadge}>{equipment.ageYears}y old</Pill>
      </div>
      <div className="mt-1 text-[12.5px]" style={{ color: "var(--cc-muted)" }}>
        {equipment.detail}
      </div>
    </div>
  );
}

function ChemistryTable({ tests }: { tests: WaterTest[] }) {
  const params: { key: keyof WaterTest; label: string; target: string }[] = [
    { key: "ph",        label: "pH",   target: "7.2–7.6" },
    { key: "chlorine",  label: "Cl",   target: "1–3 ppm" },
    { key: "alk",       label: "TA",   target: "80–120" },
    { key: "cya",       label: "CYA",  target: "30–50" },
    { key: "phosphate", label: "PO₄",  target: "<100 ppb" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr style={{ color: "var(--cc-muted)" }}>
            <th className="pb-1.5 text-left font-semibold">Date</th>
            {params.map((p) => (
              <th key={p.key} className="pb-1.5 text-right font-semibold">
                {p.label}
              </th>
            ))}
          </tr>
          <tr style={{ color: "var(--cc-muted)", fontSize: "10.5px" }}>
            <th className="pb-2 text-left font-medium opacity-70">target →</th>
            {params.map((p) => (
              <th key={p.key} className="pb-2 text-right font-medium opacity-70">
                {p.target}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tests.map((t, i) => (
            <tr
              key={t.date}
              style={{
                borderTop: "1px solid var(--cc-border)",
                color: "var(--cc-text)",
              }}
            >
              <td className="py-2 text-left">
                <div className="text-[12.5px] font-semibold">{formatDate(t.date)}</div>
                <div className="text-[10.5px]" style={{ color: "var(--cc-muted)" }}>
                  {daysAgoLabel(t.date)}
                </div>
              </td>
              {params.map((p) => (
                <td key={p.key} className="py-2 text-right">
                  <Reading value={t[p.key]} param={p.key} latest={i === 0} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Reading({
  value,
  param,
  latest,
}: {
  value: number;
  param: keyof WaterTest;
  latest: boolean;
}) {
  const status = statusFor(param, value);
  const color =
    status === "ok"
      ? "var(--cc-text)"
      : status === "warn"
      ? "var(--cc-kpi-orange)"
      : "var(--cc-kpi-pink)";
  return (
    <span
      className="font-mono"
      style={{
        color,
        fontWeight: latest ? 700 : 500,
      }}
    >
      {value}
    </span>
  );
}

function statusFor(param: keyof WaterTest, value: number): "ok" | "warn" | "alert" {
  if (param === "ph")        return value >= 7.2 && value <= 7.6 ? "ok" : value < 7.0 || value > 7.8 ? "alert" : "warn";
  if (param === "chlorine")  return value >= 1 && value <= 3 ? "ok" : value < 0.5 ? "alert" : "warn";
  if (param === "alk")       return value >= 80 && value <= 120 ? "ok" : value < 60 || value > 140 ? "alert" : "warn";
  if (param === "cya")       return value >= 30 && value <= 50 ? "ok" : value > 100 || value < 20 ? "alert" : "warn";
  if (param === "phosphate") return value < 100 ? "ok" : value > 300 ? "alert" : "warn";
  if (param === "ch")        return value >= 200 && value <= 400 ? "ok" : value > 500 || value < 150 ? "alert" : "warn";
  return "ok";
}
