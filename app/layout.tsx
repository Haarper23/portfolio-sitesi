import type { Metadata } from "next";
import { geistSans, geistMono, syne } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Berke Emre Deveci — Computer Engineer",
  description:
    "Portfolio of Berke Emre Deveci — Computer Engineer building games, full-stack platforms, and AI systems. Open to international opportunities.",
  openGraph: {
    title: "Berke Emre Deveci — Computer Engineer",
    description:
      "Game development, full-stack web, and AI — built by a computer engineer open to the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark text-parchment">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
