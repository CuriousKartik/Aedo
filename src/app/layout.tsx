import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "Aedo | Reach the people who have already done it",
  description:
    "A college-verified network where students find and talk to people who have already achieved what they want, through goal-based search, direct requests, and short 1:1 meets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream-100 text-charcoal min-h-screen flex flex-col font-sans selection:bg-terracotta selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-8">{children}</main>
          <MobileBottomNav />
        </AppProvider>
      </body>
    </html>
  );
}

