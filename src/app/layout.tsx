import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SystemShell from "@/components/layout/SystemShell";
import { SystemProvider } from "@/context/SystemContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYSTEM_HVY.OS // Backend Engineer",
  description: "Advanced System Interface Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SystemProvider>
          <SystemShell>
            {children}
          </SystemShell>
        </SystemProvider>
      </body>
    </html>
  );
}
