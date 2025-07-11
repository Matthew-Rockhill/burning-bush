'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ArrowLeftIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Category {
  id: string
  name: string
}

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    sku: '',
    categoryId: '',
    isActive: true,
    isFeatured: false,
    inStock: true,
    stockQuantity: '0',
    minOrderQty: '1'
  })

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          stockQuantity: parseInt(formData.stockQuantity),
          minOrderQty: parseInt(formData.minOrderQty)
        }),
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <AdminLayout title="Add Product">
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
            <h1 className="text-2xl font-bold text-bb-gray-900">Add New Product</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-bb-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Product Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  SKU
                </label>
                <Input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  placeholder="Enter SKU"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Category *
                </label>
                <Select
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-bb-gray-900 mb-6">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-bb-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Original Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-bb-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-bb-gray-900 mb-6">Inventory</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Stock Quantity
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-bb-gray-700 mb-2">
                  Minimum Order Quantity
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.minOrderQty}
                  onChange={(e) => handleInputChange('minOrderQty', e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Checkbox
                  checked={formData.inStock}
                  onChange={(checked) => handleInputChange('inStock', checked)}
                />
                <label className="ml-2 text-sm text-bb-gray-700">
                  In Stock
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  checked={formData.isActive}
                  onChange={(checked) => handleInputChange('isActive', checked)}
                />
                <label className="ml-2 text-sm text-bb-gray-700">
                  Active
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  checked={formData.isFeatured}
                  onChange={(checked) => handleInputChange('isFeatured', checked)}
                />
                <label className="ml-2 text-sm text-bb-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              color="zinc"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="flame"
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <PlusIcon className="h-4 w-4" />
                  Create Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
} 