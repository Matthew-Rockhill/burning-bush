import { notFound } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Section from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/components/ui/link'
import { getProductById, getProductsByCategory } from '@/lib/products'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = parseInt(id)
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3)

  return (
    <>
      <Header />
      
      <Section background="default" spacing="xl">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-bb-gray-400">
              <li><a href="/shop" className="hover:text-white transition-colors">Shop</a></li>
              <li className="text-bb-gray-600">/</li>
              <li><a href={`/shop/${product.category}`} className="hover:text-white transition-colors capitalize">{product.category}</a></li>
              <li className="text-bb-gray-600">/</li>
              <li className="text-white">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-bb-darker">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {product.name}
                </h1>
                {!product.inStock && (
                  <Badge color="red">Out of Stock</Badge>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-bold text-bb-flame-orange">
                  {product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-bb-gray-400 line-through">
                    {product.originalPrice}
                  </p>
                )}
              </div>

              <p className="text-lg text-bb-gray-300 mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-bb-gray-300">
                      <span className="w-2 h-2 bg-bb-flame-magenta rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <Badge key={index} color="zinc">{material}</Badge>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <Badge key={index} color="flame">{color}</Badge>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              {product.sizes && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <Badge key={index} color="zinc">{size}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  color="flame" 
                  className="flex-1 py-3 text-lg"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Get Custom Quote' : 'Out of Stock'}
                </Button>
                <Link
                  href="/contact"
                  className="flex-1 py-3 text-lg inline-flex items-center justify-center bg-bb-gray-100 text-bb-darkest hover:bg-bb-gray-200 rounded-lg font-semibold"
                >
                  Contact Us About This Product
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="group h-full flex flex-col">
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-bb-darker">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                      />
                    </div>
                    <div className="mt-4 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        <a href={`/product/${relatedProduct.id}`} className="hover:text-bb-flame-magenta transition-colors">
                          {relatedProduct.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-bb-gray-400 flex-1">
                        {relatedProduct.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xl font-bold text-bb-flame-orange">
                          {relatedProduct.price}
                        </p>
                        <Button 
                          className="text-sm px-3 py-1"
                          onClick={() => {
                            // Add to cart functionality
                            alert('Add to cart functionality coming soon!')
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
      
      <Footer />
    </>
  )
} 