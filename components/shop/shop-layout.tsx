'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ProductGrid from './product-grid'
import CategorySidebar from './category-sidebar'
import { getAllProducts, getProductsByCategory } from '@/lib/products'

export default function ShopLayout() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const pathname = usePathname()

  // Set initial category based on URL
  useEffect(() => {
    if (pathname.includes('/shop/hats')) {
      setSelectedCategory('hats')
    } else if (pathname.includes('/shop/shirts')) {
      setSelectedCategory('shirts')
    } else if (pathname.includes('/shop/gifts')) {
      setSelectedCategory('gifts')
    } else {
      setSelectedCategory(null)
    }
  }, [pathname])
  
  const allProducts = getAllProducts()
  const filteredProducts = selectedCategory 
    ? getProductsByCategory(selectedCategory as 'hats' | 'shirts' | 'gifts')
    : allProducts

  const productCounts = {
    all: allProducts.length,
    hats: getProductsByCategory('hats').length,
    shirts: getProductsByCategory('shirts').length,
    gifts: getProductsByCategory('gifts').length
  }

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'hats':
        return 'Custom Hats'
      case 'shirts':
        return 'Custom Shirts'
      case 'gifts':
        return 'Custom Gifts'
      default:
        return 'All Products'
    }
  }

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case 'hats':
        return 'Premium custom hats and caps with personalized embroidery. Perfect for teams, businesses, or personal style.'
      case 'shirts':
        return 'High-quality custom apparel including jerseys, hoodies, t-shirts, and polo shirts. Perfect for teams, events, and everyday wear.'
      case 'gifts':
        return 'Personalized wood, paper, acrylic, and leather engraved items. Perfect for awards, keepsakes, and meaningful gifts.'
      default:
        return 'Discover our complete collection of custom apparel, hats, and personalized gifts. Each item is crafted with care using God-given creativity.'
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <CategorySidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        productCounts={productCounts}
      />
      
      <div className="flex-1 min-w-0">
        <ProductGrid
          products={filteredProducts}
          title={getCategoryTitle()}
          description={getCategoryDescription()}
        />
      </div>
    </div>
  )
} 