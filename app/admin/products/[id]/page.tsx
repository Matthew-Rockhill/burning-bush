'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeftIcon,
  PencilIcon,
  CubeIcon,
  CurrencyDollarIcon,
  TagIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  sku: string
  category: {
    id: string
    name: string
  }
  isActive: boolean
  isFeatured: boolean
  inStock: boolean
  stockQuantity: number
  minOrderQty: number
  images?: Array<{
    id: string
    url: string
    alt: string
    isPrimary: boolean
  }>
  variants?: Array<{
    id: string
    name: string
    value: string
    type: string
    price?: number
    isAvailable: boolean
  }>
  features?: Array<{
    id: string
    feature: string
  }>
  materials?: Array<{
    id: string
    material: string
  }>
  createdAt: string
  updatedAt: string
}

export default function ViewProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        console.error('Product not found')
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Product Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading product...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout title="Product Not Found">
        <div className="text-center py-12">
          <CubeIcon className="h-16 w-16 text-bb-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-bb-gray-900 mb-2">Product not found</h3>
          <p className="text-bb-gray-500 mb-6">The product you're looking for doesn't exist.</p>
          <Button color="flame" onClick={() => router.push('/admin/products')}>
            Back to Products
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={product.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              color="zinc"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-bb-gray-900">{product.name}</h1>
          </div>

          <Button
            color="flame"
            onClick={() => router.push(`/admin/products/${productId}/edit`)}
            className="flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            Edit Product
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Product Images</h2>
              {product.images && product.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt={image.alt || product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {image.isPrimary && (
                        <div className="absolute top-2 right-2">
                          <Badge color="green">Primary</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CubeIcon className="h-12 w-12 text-bb-gray-400 mx-auto mb-2" />
                  <p className="text-bb-gray-500">No images uploaded</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Description</h2>
              <p className="text-bb-gray-700 whitespace-pre-wrap">
                {product.description || 'No description available'}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Product Variants</h2>
                <div className="space-y-3">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between p-3 bg-bb-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-bb-gray-900">{variant.name}</div>
                        <div className="text-sm text-bb-gray-500">{variant.value}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {variant.price && (
                          <span className="text-sm font-medium text-bb-gray-900">
                            {formatCurrency(variant.price)}
                          </span>
                        )}
                        <Badge color={variant.isAvailable ? 'green' : 'red'}>
                          {variant.isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature.id} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-bb-gray-700">{feature.feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Materials</h2>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                                    <Badge key={material.id} color="zinc">
                  {material.material}
                </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bb-gray-500">SKU</label>
                  <p className="text-sm text-bb-gray-900">{product.sku || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-bb-gray-500">Category</label>
                  <div className="flex items-center gap-2 mt-1">
                    <TagIcon className="h-4 w-4 text-bb-gray-400" />
                    <span className="text-sm text-bb-gray-900">{product.category?.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bb-gray-500">Status</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge color={product.isActive ? 'green' : 'red'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {product.isFeatured && (
                      <Badge color="purple">Featured</Badge>
                    )}
                    <Badge color={product.inStock ? 'green' : 'red'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Pricing</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-bb-gray-500">Current Price</span>
                  <span className="text-lg font-bold text-bb-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-bb-gray-500">Original Price</span>
                    <span className="text-sm text-bb-gray-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Inventory</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-bb-gray-500">Stock Quantity</span>
                  <span className={`text-sm font-medium ${product.stockQuantity <= 5 ? 'text-red-600' : 'text-bb-gray-900'}`}>
                    {product.stockQuantity} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-bb-gray-500">Min Order Qty</span>
                  <span className="text-sm text-bb-gray-900">{product.minOrderQty}</span>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-bb-gray-900 mb-4">Timestamps</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-bb-gray-500">Created</label>
                  <p className="text-sm text-bb-gray-900">{formatDate(product.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-bb-gray-500">Last Updated</label>
                  <p className="text-sm text-bb-gray-900">{formatDate(product.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 