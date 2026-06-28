import { Geist, Geist_Mono } from "next/font/google";

/* ── Geist powers the entire type system ─────────────────────────────
   Display, UI and body all share one refined neo-grotesque (the Vercel /
   Linear / Stripe approach). Hierarchy comes from weight, size and
   tracking — not from a second, louder display face. Geist Mono carries
   the technical labels and metadata. */

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
