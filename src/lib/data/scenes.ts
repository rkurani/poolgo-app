import type { Scene } from "@/lib/types";

export const scenes: Scene[] = [
  {
    id: "evening",
    name: "Evening Swim",
    scheduleHint: "EVENING · 6:00 PM",
    gradientFrom: "#E97524",
    gradientTo: "#C72093",
    settings: [
      "Pump · Stage B · Filter on",
      "Heater · pool · 84°F",
      "Lights · warm · 60% · Blower off",
    ],
  },
  {
    id: "party",
    name: "Party",
    scheduleHint: "WEEKEND · ON DEMAND",
    gradientFrom: "#1FA0BF",
    gradientMid: "#C72093",
    gradientTo: "#E97524",
    settings: [
      "Pump · Stage C · Filter on",
      "Heater · spa · 102°F · Blower 80%",
      "Lights · cycle · 100%",
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance",
    scheduleHint: "WEEKLY · TUE 10 AM",
    gradientFrom: "#2A8540",
    gradientTo: "#1FA0BF",
    settings: [
      "Pump · Stage D · backwash filter",
      "Salt cell · 80% output · 2 hr",
      "Lights, heater, blower · off",
    ],
  },
  {
    id: "vacation",
    name: "Vacation",
    scheduleHint: "AWAY · UNTIL JUN 14",
    gradientFrom: "#9C9489",
    gradientTo: "#1B1814",
    settings: [
      "Pump · Stage A · minimum runtime",
      "All accessories · off",
      "Carlos checks Tue Jun 5",
    ],
    isActive: true,
  },
];

// connector buttons for /connect
import type { Connector } from "@/lib/types";

export const connectors: Connector[] = [
  {
    id: "pentair",
    brand: "pentair",
    label: "Sign in with Pentair Home",
    description: "IntelliFlo3 pump · IntelliChlor salt cell · MasterTemp heater",
    logoSrc: "/assets/pentair.jpg",
    href: "/connect/pentair",
    variant: "bold",
  },
  {
    id: "hayward",
    brand: "hayward",
    label: "Sign in with OmniLogic",
    description: "Pro Series filter · H-Series heater · AquaRite salt · AirBlower",
    logoSrc: "/assets/hayward.png",
    href: "/connect/hayward",
    variant: "bold",
  },
  {
    id: "polaris",
    brand: "polaris",
    label: "Sign in with iAquaLink",
    description: "Polaris Freedom robotic cleaner · Jandy controllers",
    logoSrc: "/assets/polaris.png",
    href: "/connect/polaris",
    variant: "bold",
  },
  {
    id: "leslies",
    brand: "leslies",
    label: "Connect Leslie's account",
    description: "Order history · stocked parts · loyalty rewards",
    logoSrc: "/assets/leslies.png",
    href: "/connect/leslies",
    variant: "soft",
  },
];
