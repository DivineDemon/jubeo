import type { Metadata } from "next";
import { Fira_Code, Merriweather, Oxanium } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/config/theme-provider";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { cn } from "@/lib/utils";

const fontSans = Oxanium({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Jubeo — AI-Powered Startup Validation",
  icons: {
    icon: "/favicon.svg",
  },
  description:
    "Validate your app idea with AI-driven market research, competitor analysis, and a comprehensive reality-check report. Get a validation score, actionable insights, and alternative ideas.",
  openGraph: {
    title: "Jubeo",
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
        className={cn(
          fontSans.variable,
          fontSerif.variable,
          fontMono.variable,
          "antialiased",
        )}
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
