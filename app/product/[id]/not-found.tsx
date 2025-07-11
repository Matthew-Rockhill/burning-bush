import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Section from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'

export default function ProductNotFound() {
  return (
    <>
      <Header />
      
      <Section background="default" spacing="xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Product Not Found
          </h1>
          <p className="mt-6 text-xl text-bb-gray-300">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg">
              Browse All Products
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-bb-gray-100 text-bb-darkest hover:bg-bb-gray-200 rounded-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
      
      <Footer />
    </>
  )
} 