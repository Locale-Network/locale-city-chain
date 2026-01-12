import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Locale Console | Data Feed Platform",
    template: "%s | Locale Console",
  },
  description:
    "Create, manage, and discover verified data feeds powered by Locale attestation infrastructure.",
  keywords: [
    "Locale",
    "DataDAO",
    "Data Feeds",
    "Attestation",
    "zkFetch",
    "Web3",
    "API",
    "Zero Knowledge",
    "Proof",
  ],
  authors: [{ name: "Locale Network" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Locale Console",
    title: "Locale Console | Data Feed Platform",
    description:
      "Create, manage, and discover verified data feeds powered by Locale attestation infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locale Console",
    description:
      "Create, manage, and discover verified data feeds with verifiable proofs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
