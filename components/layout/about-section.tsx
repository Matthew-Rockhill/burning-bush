import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import Section from './section'

export default function AboutSection() {
  return (
    <Section background="subtle" spacing="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-base/7 font-semibold text-bb-flame-magenta">Who We Are</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Putting our love for God and service to others first
          </p>
          <p className="mt-6 text-lg text-bb-gray-300">
            We are a company who puts our love for God and service to others in the forefront of all we do. 
            We have a passion for using the creativity God gave us to bring you the finest wood, paper, acrylic, 
            leather, engraved items, and custom apparel for your home and business.
          </p>
          <p className="mt-4 text-lg text-bb-gray-300">
            A portion of our sales go to support ministry in the Dominican Republic, allowing us to serve 
            communities while creating beautiful, meaningful products for you.
          </p>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border-l-4 border-bb-flame-magenta pl-6">
              <h3 className="text-2xl font-bold text-white">Faith-Driven</h3>
              <p className="text-bb-gray-300">God-centered approach</p>
            </div>
            <div className="border-l-4 border-bb-flame-orange pl-6">
              <h3 className="text-2xl font-bold text-white">Quality Crafted</h3>
              <p className="text-bb-gray-300">Premium materials & designs</p>
            </div>
            <div className="border-l-4 border-bb-flame-purple pl-6">
              <h3 className="text-2xl font-bold text-white">Community Impact</h3>
              <p className="text-bb-gray-300">Supporting Dominican Republic ministry</p>
            </div>
            <div className="border-l-4 border-bb-flame-cyan pl-6">
              <h3 className="text-2xl font-bold text-white">Creative Excellence</h3>
              <p className="text-bb-gray-300">Using God-given creativity</p>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg">
              Learn More
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-bb-gray-100 text-bb-darkest hover:bg-bb-gray-200 rounded-lg">
              Get Started
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-bb-darker">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Community ministry work"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-bb-darker">
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Helping hands in community"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-bb-darker">
              <img
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Community service and outreach"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-bb-darker">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Ministry and faith community"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
} 