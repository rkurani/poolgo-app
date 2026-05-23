export type Tenant = {
  slug: string;
  name: string;
  brandColor: string;
  brandSoft: string;
  logoMark: string;
  city: string;
  phone: string;
  contact: string;
  footer: string;
};

export const TENANTS: Record<string, Tenant> = {
  royalpools: {
    slug: "royalpools",
    name: "Royal Pools",
    brandColor: "#0F7FAA",
    brandSoft: "#DBEEF7",
    logoMark: "R",
    city: "Cocoa Beach, FL",
    phone: "321-555-0100",
    contact: "laura@royalpools.poolgo.co",
    footer: "Royal Pools · 321-555-0100 · Cocoa Beach, FL · Reply STOP to opt out.",
  },
  coastalpoolco: {
    slug: "coastalpoolco",
    name: "Coastal Pool Co",
    brandColor: "#1F5C8B",
    brandSoft: "#DDE8F4",
    logoMark: "C",
    city: "Carlsbad, CA",
    phone: "760-555-0188",
    contact: "ops@coastalpoolco.poolgo.co",
    footer: "Coastal Pool Co · 760-555-0188 · Carlsbad, CA · Reply STOP to opt out.",
  },
};

export function getTenant(slug: string): Tenant | null {
  return TENANTS[slug] ?? null;
}
