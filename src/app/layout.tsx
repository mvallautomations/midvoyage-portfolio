import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  DM_Sans,
  DM_Serif_Display,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

/* ============================================================
   mid·voyage — Root Layout
   Fonts self-hosted via next/font; only the weights/styles the
   design system actually uses are loaded (LCP: fewer preloads)
   ============================================================ */

// Display + headings: Plus Jakarta Sans 800 (the only weight used anywhere)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Body: DM Sans (no italic usage in the codebase)
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Ghost italic word: DM Serif Display (editorial accent — ONE word per headline)
const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

// Utility / Code / Labels: JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mvallarautomations.cc"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "Mishael Vallar — mid·voyage",
    template: "%s — mid·voyage",
  },
  description:
    "Solo founder. AI systems builder. Dispatches from the middle of figuring it out.",
  keywords: ["systems builder", "Philippines", "solo founder", "mid-voyage", "automation", "AI workflows"],
  authors: [{ name: "Mishael Vallar", url: "https://mvallarautomations.cc" }],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://mvallarautomations.cc",
    siteName: "mid·voyage",
    title: "Mishael Vallar — mid·voyage",
    description:
      "Solo founder. AI systems builder. Dispatches from the middle of figuring it out.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mishael Vallar — mid·voyage",
    description: "Solo founder. AI systems builder. Philippines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Default: light (parchment) — user can toggle to dark
      data-theme="light"
      className={`
        ${plusJakartaSans.variable}
        ${dmSans.variable}
        ${dmSerifDisplay.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body className="parchment-grain">
        {children}
      </body>
    </html>
  );
}
