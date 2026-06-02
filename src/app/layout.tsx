import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";
import ContactBar from "@/components/ContactBar";
import { brand } from "@/content/menu";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} · ${brand.tagline}`,
  description: brand.heroSub,
  openGraph: {
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.heroSub,
    images: ["/images/wontons-hero.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <TrackingProvider>
          {children}
          <ContactBar />
        </TrackingProvider>
      </body>
    </html>
  );
}
