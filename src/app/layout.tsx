import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { TopNav } from "@/components/TopNav";
import { MobileTabBar } from "@/components/MobileTabBar";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PoolGo",
  description:
    "Your pool, all in one place. Water, equipment, service, and the people who help you keep it running.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <TopNav />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <MobileTabBar />
      </body>
    </html>
  );
}
