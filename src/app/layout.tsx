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
  title: "GreenHope Foundation — Empowering Communities Worldwide",
  description:
    "GreenHope Foundation is a non-profit organization dedicated to environmental conservation, education, and community empowerment. Join us in making a difference.",
  keywords: [
    "NGO",
    "non-profit",
    "charity",
    "environmental conservation",
    "education",
    "community empowerment",
    "donate",
    "volunteer",
  ],
  authors: [{ name: "GreenHope Foundation" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "GreenHope Foundation — Empowering Communities Worldwide",
    description:
      "Join GreenHope Foundation in our mission to create sustainable change through environmental conservation, education, and community development.",
    siteName: "GreenHope Foundation",
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