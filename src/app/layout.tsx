import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";
import ContactBar from "@/components/ContactBar";
import { brand } from "@/content/menu";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shi-food.com"),
  title: `${brand.name} · ${brand.tagline}`,
  description: brand.heroSub,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://shi-food.com",
    siteName: brand.name,
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.heroSub,
    images: [
      {
        url: "/images/wontons-hero.jpeg",
        width: 768,
        height: 1376,
        alt: `${brand.name} · ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "s9xujjfymy");`}
        </Script>
        <TrackingProvider>
          {children}
          <ContactBar />
        </TrackingProvider>
      </body>
    </html>
  );
}
