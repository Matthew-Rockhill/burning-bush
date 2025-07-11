import type { Metadata } from "next";
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Section from '@/components/layout/section'
import ShopLayout from '@/components/shop/shop-layout'

export const metadata: Metadata = {
  title: "Shop Custom Designs",
  description: "Browse our collection of custom apparel, hats, and personalized gifts. Premium quality custom embroidery, engraving, and team uniforms crafted with God-given creativity.",
  keywords: [
    "shop custom apparel",
    "buy custom hats",
    "custom embroidery products",
    "team uniforms for sale",
    "personalized gifts shop",
    "custom t-shirts",
    "engraved gifts",
    "business merchandise"
  ],
  openGraph: {
    title: "Shop Custom Designs - Burning Bush Design",
    description: "Browse our collection of custom apparel, hats, and personalized gifts. Premium quality custom designs.",
    url: "https://buringbushdesign.com/shop",
  },
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopPage() {
  return (
    <>
      <Header />
      
      {/* Shop Hero */}
      <Section background="default" spacing="lg">
        <ShopLayout />
      </Section>
      
      <Footer />
    </>
  )
} 