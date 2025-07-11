'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'

interface CategorySidebarProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  productCounts: {
    all: number
    hats: number
    shirts: number
    gifts: number
  }
}

const categories = [
  { id: null, name: 'All Products', icon: '🛍️' },
  { id: 'hats', name: 'Custom Hats', icon: '🧢' },
  { id: 'shirts', name: 'Custom Shirts', icon: '👕' },
  { id: 'gifts', name: 'Custom Gifts', icon: '🎁' }
]

export default function CategorySidebar({ selectedCategory, onCategoryChange, productCounts }: CategorySidebarProps) {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string | null) => {
    onCategoryChange(categoryId)
    
    // Navigate to the appropriate URL
    if (categoryId === null) {
      router.push('/shop')
    } else {
      router.push(`/shop/${categoryId}`)
    }
  }

  return (
    <div className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-bb-subtle-gradient rounded-xl p-6 sticky top-6">
        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        
        <nav className="space-y-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            const count = category.id === null ? productCounts.all : 
                         category.id === 'hats' ? productCounts.hats :
                         category.id === 'shirts' ? productCounts.shirts :
                         productCounts.gifts
            
            return (
              <button
                key={category.id || 'all'}
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  isSelected
                    ? 'bg-bb-flame-magenta text-white'
                    : 'text-bb-gray-300 hover:bg-bb-darker hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <Badge color={isSelected ? 'flame' : 'zinc'} className="text-xs">
                  {count}
                </Badge>
              </button>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-bb-darker">
          <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <a
              href="/contact"
              className="block w-full px-4 py-2 text-sm text-bb-gray-300 hover:text-white hover:bg-bb-darker rounded-lg transition-colors duration-200"
            >
              📞 Get Custom Quote
            </a>
            <a
              href="/custom"
              className="block w-full px-4 py-2 text-sm text-bb-gray-300 hover:text-white hover:bg-bb-darker rounded-lg transition-colors duration-200"
            >
              ✨ Custom Design
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 