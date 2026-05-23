export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// Demo "today" is 2026-05-22. Hard-coded so the mocks feel live regardless of
// when this is opened — replace with `new Date()` once data is real.
const DEMO_TODAY = new Date("2026-05-22");

export function daysAgo(iso: string): number {
  const d = new Date(iso);
  return Math.round((DEMO_TODAY.getTime() - d.getTime()) / 86_400_000);
}

export function daysAgoLabel(iso: string): string {
  const n = daysAgo(iso);
  if (n === 0) return "today";
  if (n === 1) return "yesterday";
  if (n < 14) return `${n} days ago`;
  if (n < 60) return `${Math.round(n / 7)} weeks ago`;
  return `${Math.round(n / 30)} months ago`;
}
