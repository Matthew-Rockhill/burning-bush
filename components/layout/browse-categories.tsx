import { Button } from '../ui/button'
import { Link } from '../ui/link'
import Section from './section'

const categories = [
  {
    name: 'Custom Hats',
    description: 'Personalized hats and caps with your unique designs',
    href: '/shop/hats',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gradient: 'from-bb-flame-purple to-bb-flame-magenta'
  },
  {
    name: 'Custom Shirts',
    description: 'High-quality custom apparel for any occasion',
    href: '/shop/shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gradient: 'from-bb-flame-magenta to-bb-flame-orange'
  },
  {
    name: 'Gifts',
    description: 'Custom wood, paper, acrylic, and leather engraved items',
    href: '/shop/gifts',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gradient: 'from-bb-flame-orange to-bb-flame-yellow'
  }
]

export default function BrowseCategories() {
  return (
    <Section background="default" spacing="xl">
      <div className="text-center">
        <h2 className="text-base/7 font-semibold text-bb-flame-magenta">Browse Categories</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Find exactly what you're looking for
        </p>
        <p className="mt-4 text-xl text-bb-gray-300">
          Explore our wide range of custom apparel and accessories
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {categories.map((category) => (
          <div key={category.name} className="group relative h-full">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-bb-darker">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white group-hover:text-bb-flame-magenta transition-colors">
                <a href={category.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {category.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-bb-gray-400">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="px-8 inline-flex items-center justify-center text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg"
        >
          Browse All Categories
        </Link>
      </div>
    </Section>
  )
} 