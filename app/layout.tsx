import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CLF-C02 Exam Prep",
    template: "%s | CLF-C02 Exam Prep",
  },
  description:
    "Free AWS Cloud Practitioner (CLF-C02) exam preparation with 1,050 practice questions and comprehensive study material.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>
          <Suspense>
            <Nav />
          </Suspense>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
