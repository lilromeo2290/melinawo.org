import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MELINAWO FOUNDATION — Empowering Communities Worldwide",
  description:
    "MELINAWO FOUNDATION is a non-profit organization dedicated to community development, education, healthcare, and humanitarian aid. Join us in making a difference.",
  keywords: [
    "NGO",
    "non-profit",
    "charity",
    "community development",
    "education",
    "healthcare",
    "humanitarian aid",
    "donate",
    "volunteer",
  ],
  authors: [{ name: "MELINAWO FOUNDATION" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "MELINAWO FOUNDATION — Empowering Communities Worldwide",
    description:
      "Join MELINAWO FOUNDATION in our mission to create sustainable change through community development, education, healthcare, and humanitarian support.",
    siteName: "MELINAWO FOUNDATION",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}