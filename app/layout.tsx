import type { Metadata } from "next";
import { geistSans, geistMono } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Berke Emre Deveci — Software Engineer",
  description:
    "Software engineer building Unity & Unreal gameplay systems, AI desktop assistants, Spring Boot backends, and interactive WebGL. Open to international roles.",
  openGraph: {
    title: "Berke Emre Deveci — Software Engineer",
    description:
      "Games, backends, AI, and the web — engineered end to end. Open to international software roles.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark text-parchment">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
