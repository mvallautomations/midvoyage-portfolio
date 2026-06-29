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
   Fonts loaded via next/font for zero-FOUT, self-hosted
   ============================================================ */

// Display + headings: Plus Jakarta Sans 800
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

// Body: DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Ghost italic word: DM Serif Display (editorial accent — ONE word per headline)
const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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
