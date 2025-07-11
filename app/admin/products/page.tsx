'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  PlusIcon, 
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CubeIcon
} from '@heroicons/react/24/outline'
import SearchBar from '@/components/admin/search-bar'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: {
    id: string
    name: string
  }
  isFeatured: boolean
  inStock: boolean
  stockQuantity: number
  images?: Array<{
    id: string
    url: string
    isPrimary: boolean
  }>
}

interface Category {
  id: string
  name: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [searchTerm, selectedCategory])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
      })

      const response = await fetch(`/api/admin/products?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchProducts()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product')
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Products">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading products...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Products">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search products..."
              className="flex-1 max-w-md"
            />

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <Button 
            color="flame" 
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/products/add')}
          >
            <PlusIcon className="h-5 w-5" />
            Add Product
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-bb-gray-200">
              <thead className="bg-bb-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-bb-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-bb-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          {product.images?.find(img => img.isPrimary) ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={product.images.find(img => img.isPrimary)?.url}
                              alt={product.name}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-bb-gray-200 flex items-center justify-center">
                              <CubeIcon className="h-6 w-6 text-bb-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-bb-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-bb-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-bb-gray-900">
                        {product.category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-bb-gray-900">
                        <span className="font-semibold">${product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-bb-gray-400 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${product.stockQuantity <= 5 ? 'text-red-600' : 'text-bb-gray-900'}`}>
                        {product.stockQuantity} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <Badge color={product.inStock ? 'green' : 'red'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        {product.isFeatured && (
                          <Badge color="purple">Featured</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => router.push(`/admin/products/${product.id}`)}
                          className="text-bb-gray-400 hover:text-bb-flame-blue"
                          title="View Product"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                          className="text-bb-gray-400 hover:text-bb-flame-orange"
                          title="Edit Product"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-bb-gray-400 hover:text-red-600"
                          title="Delete Product"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-bb-gray-400 mb-4">
              <CubeIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No products found</h3>
            <p className="text-bb-gray-500 mb-6">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first product.'
              }
            </p>
            <Button 
              color="flame" 
              className="flex items-center gap-2 mx-auto"
              onClick={() => router.push('/admin/products/add')}
            >
              <PlusIcon className="h-5 w-5" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
