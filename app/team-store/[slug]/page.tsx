import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import Section from '@/components/layout/section'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetch team store data
  const teamStore = await db.teamStore.findUnique({
    where: { slug, isActive: true },
    include: {
      products: {
        include: {
          product: {
            include: {
              images: true,
              category: true
            }
          }
        }
      }
    }
  })

  if (!teamStore) {
    notFound()
  }

  const products = teamStore.products
    .filter(tsp => tsp.isActive && tsp.product.isActive)
    .map(tsp => tsp.product)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <Section className="py-8">
          <div className="flex items-center space-x-4">
            {teamStore.logo && (
              <img
                src={teamStore.logo}
                alt={teamStore.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
            )}
            <div>
              <Heading level={1} className="text-3xl font-bold text-gray-900">
                {teamStore.name}
              </Heading>
              {teamStore.description && (
                <Text className="text-gray-600 mt-2">
                  {teamStore.description}
                </Text>
              )}
            </div>
          </div>
        </Section>
      </div>

      {/* Banner */}
      {teamStore.banner && (
        <div className="relative h-64 bg-gray-200">
          <img
            src={teamStore.banner}
            alt={`${teamStore.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Products */}
      <Section className="py-12">
        <div className="max-w-7xl mx-auto">
          <Heading level={2} className="text-2xl font-bold text-gray-900 mb-8">
            Available Products
          </Heading>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {product.images.length > 0 && (
                    <div className="aspect-w-1 aspect-h-1 w-full">
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <Heading level={3} className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </Heading>
                    <Text className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </Text>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toString()}
                      </span>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1"
                        onClick={() => {
                          // In a real implementation, this would add to cart or redirect to product page
                          alert('Product functionality coming soon!')
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <Heading level={3} className="mt-2 text-sm font-medium text-gray-900">
                No products available
              </Heading>
              <Text className="mt-1 text-sm text-gray-500">
                Check back soon for new merchandise!
              </Text>
            </div>
          )}
        </div>
      </Section>

      {/* Footer */}
      <div className="bg-gray-800 text-white">
        <Section className="py-8">
          <div className="text-center">
            <Text className="text-gray-300">
              © 2024 {teamStore.name}. Powered by Burning Bush Design.
            </Text>
            {teamStore.website && (
              <Text className="text-gray-300 mt-2">
                Visit us at{' '}
                <a
                  href={teamStore.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  {teamStore.website}
                </a>
              </Text>
            )}
          </div>
        </Section>
      </div>
    </div>
  )
}