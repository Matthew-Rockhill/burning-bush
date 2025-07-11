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
  title: {
    default: "Burning Bush Design",
    template: "%s | Burning Bush Design",
  },
  description: "Custom apparel, hats, and personalized gifts crafted with God-given creativity. We specialize in custom embroidery, engraving, and team uniforms. A portion of our sales supports ministry in the Dominican Republic.",
  keywords: [
    "custom apparel",
    "custom hats",
    "custom embroidery",
    "team uniforms",
    "personalized gifts",
    "engraved gifts",
    "custom t-shirts",
    "business merchandise",
    "awards and plaques",
    "faith-based business",
    "custom design"
  ],
  authors: [{ name: "Burning Bush Design" }],
  creator: "Burning Bush Design",
  publisher: "Burning Bush Design",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://buringbushdesign.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Burning Bush Design",
    description: "Custom apparel, hats, and personalized gifts crafted with God-given creativity. Supporting ministry in the Dominican Republic.",
    url: "https://buringbushdesign.com",
    siteName: "Burning Bush Design",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Burning Bush Design - Custom Apparel & Gifts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burning Bush Design",
    description: "Custom apparel, hats, and personalized gifts crafted with God-given creativity.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
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
        {children}
      </body>
    </html>
  );
}
