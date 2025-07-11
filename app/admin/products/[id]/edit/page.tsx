'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  sku: string
  categoryId: string
  isActive: boolean
  isFeatured: boolean
  inStock: boolean
  stockQuantity: number
  minOrderQty: number
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [product, setProduct] = useState<Product | null>(null)
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
    if (productId) {
      fetchProduct()
      fetchCategories()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        setFormData({
          name: data.name || '',
          description: data.description || '',
          price: data.price?.toString() || '',
          originalPrice: data.originalPrice?.toString() || '',
          sku: data.sku || '',
          categoryId: data.categoryId || '',
          isActive: data.isActive ?? true,
          isFeatured: data.isFeatured ?? false,
          inStock: data.inStock ?? true,
          stockQuantity: data.stockQuantity?.toString() || '0',
          minOrderQty: data.minOrderQty?.toString() || '1'
        })
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
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
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
        router.push(`/admin/products/${productId}`)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error updating product')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <AdminLayout title="Edit Product">
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
          <h3 className="text-lg font-medium text-bb-gray-900 mb-2">Product not found</h3>
          <p className="text-bb-gray-500 mb-6">The product you're trying to edit doesn't exist.</p>
          <Button color="flame" onClick={() => router.push('/admin/products')}>
            Back to Products
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Edit ${product.name}`}>
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
            <h1 className="text-2xl font-bold text-bb-gray-900">Edit Product</h1>
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
              color="zinc"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="flame"
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
} 