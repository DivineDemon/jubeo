import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/config/theme-provider";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { cn } from "@/lib/utils";

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
  icons: {
    icon: "/favicon.svg",
  },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
