import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Section from '@/components/layout/section'
import ShopLayout from '@/components/shop/shop-layout'

export default function GiftsPage() {
  return (
    <>
      <Header />
      
      <Section background="default" spacing="lg">
        <ShopLayout />
      </Section>
      
      <Footer />
    </>
  )
} 