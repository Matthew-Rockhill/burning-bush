import Header from '@/components/layout/header'
import Hero from '@/components/layout/hero'
import Newsletter from '@/components/layout/newsletter'
import FeaturedProducts from '@/components/layout/featured-products'
import AboutSection from '@/components/layout/about-section'
import BrowseCategories from '@/components/layout/browse-categories'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Newsletter />
      <FeaturedProducts />
      <AboutSection />
      <BrowseCategories />
      <Footer />
    </>
  )
}
