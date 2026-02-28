import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "App Idea Validator — AI-Powered Startup Validation",
  description:
    "Validate your app idea with AI-driven market research, competitor analysis, and a comprehensive reality-check report. Get a validation score, actionable insights, and alternative ideas.",
  openGraph: {
    title: "App Idea Validator",
    description:
      "AI-powered startup idea validation with market research and competitor analysis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
