/**
 * Campaign intents define what landing template renders for a given token,
 * and what the originating SMS/email body would say. In production each
 * outbound message carries a signed token that resolves to
 * `{ customerId, campaignId, intent }`. The intent picks the template.
 *
 * For the demo, we use slug tokens (e.g. "cya-glenn") instead of signed tokens.
 */
export type Intent =
  | "cya-high"
  | "lapsed"
  | "vip-early-access"
  | "phosphate-spike"
  | "pool-record";

export type Campaign = {
  id: string;
  intent: Intent;
  customerId: string;
  channel: "sms" | "email";
  subject?: string;
  smsPreview?: string;
};

export const CAMPAIGNS: Record<string, Campaign> = {
  "cya-glenn": {
    id: "CMP-2025",
    intent: "cya-high",
    customerId: "C-1001",
    channel: "sms",
    smsPreview:
      "Royal Pools: Hi Glenn — your CYA is climbing. Tap to see the fix and book a free re-test. royalpools.poolgo.co/r/cya-glenn",
  },
  "lapsed-maria": {
    id: "CMP-2026",
    intent: "lapsed",
    customerId: "C-1002",
    channel: "sms",
    smsPreview:
      "Royal Pools: We miss you, Maria. Free water test this Saturday. royalpools.poolgo.co/r/lapsed-maria",
  },
  "vip-jordan": {
    id: "CMP-2027",
    intent: "vip-early-access",
    customerId: "C-1003",
    channel: "email",
    subject: "Jordan — early access to summer sale",
  },
  "phosphate-sue": {
    id: "CMP-2028",
    intent: "phosphate-spike",
    customerId: "C-1004",
    channel: "sms",
    smsPreview:
      "Royal Pools: Sue — phosphate is at algae-feeding levels. Here's how to get ahead of it. royalpools.poolgo.co/r/phosphate-sue",
  },
  // Direct deep-link into the homeowner's full pool record (the aggregator view).
  "record-glenn":   { id: "REC-1001", intent: "pool-record", customerId: "C-1001", channel: "sms" },
  "record-maria":   { id: "REC-1002", intent: "pool-record", customerId: "C-1002", channel: "sms" },
  "record-jordan":  { id: "REC-1003", intent: "pool-record", customerId: "C-1003", channel: "sms" },
  "record-sue":     { id: "REC-1004", intent: "pool-record", customerId: "C-1004", channel: "sms" },
};

export function resolveToken(token: string): Campaign | null {
  return CAMPAIGNS[token] ?? null;
}

export const TOKEN_INDEX: { token: string; label: string }[] = [
  { token: "cya-glenn",       label: "CYA climbing — Glenn" },
  { token: "lapsed-maria",    label: "Lapsed re-engagement — Maria" },
  { token: "vip-jordan",      label: "VIP early access — Jordan" },
  { token: "phosphate-sue",   label: "Phosphate spike — Sue" },
  { token: "record-glenn",    label: "Pool record — Glenn" },
  { token: "record-maria",    label: "Pool record — Maria" },
  { token: "record-jordan",   label: "Pool record — Jordan" },
  { token: "record-sue",      label: "Pool record — Sue" },
];
