import type { Metadata } from "next";
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Section from '@/components/layout/section'
import ContactForm from '@/components/contact/contact-form'
import ContactInfo from '@/components/contact/contact-info'

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Burning Bush Design for your custom apparel, hats, and personalized gifts. We respond within 24 hours with custom quotes and project details.",
  keywords: [
    "contact custom design",
    "custom apparel quote",
    "custom embroidery consultation",
    "team uniform quote",
    "personalized gifts quote",
    "custom design consultation"
  ],
  openGraph: {
    title: "Contact Us - Burning Bush Design",
    description: "Get in touch for custom apparel, hats, and personalized gifts. We respond within 24 hours with custom quotes.",
    url: "https://buringbushdesign.com/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      
      {/* Contact Hero */}
      <Section background="default" spacing="lg">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-6 text-xl text-bb-gray-300 max-w-3xl mx-auto">
            Ready to bring your vision to life? Let's discuss your custom design needs. 
            We're here to serve you with excellence and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </Section>
      
      <Footer />
    </>
  )
} 