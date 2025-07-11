import { Button } from '../ui/button'
import { Link } from '../ui/link'
import { Product } from '@/lib/products'
import { useRouter } from 'next/navigation'

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
}

export default function ProductGrid({ products, title, description }: ProductGridProps) {
  const router = useRouter()

  return (
    <div>
      {title && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-bb-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group h-full flex flex-col">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-bb-darker">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div className="mt-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-white">
                <a href={`/product/${product.id}`} className="hover:text-bb-flame-magenta transition-colors">
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-bb-gray-400 flex-1">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xl font-bold text-bb-flame-orange">
                  {product.price}
                </p>
                <Button
                  className="text-sm px-3 py-1"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-bb-gray-400 text-lg">No products found in this category.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  )
} 