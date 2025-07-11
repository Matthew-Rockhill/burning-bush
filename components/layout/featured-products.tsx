'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Link } from '../ui/link'
import Section from './section'
import { getFeaturedProducts } from '@/lib/products'
import { useRouter } from 'next/navigation'

export default function FeaturedProducts() {
  const products = getFeaturedProducts()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const itemsPerPage = 4
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const showSlider = products.length > itemsPerPage
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }, [totalPages])
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])
  
  // Auto-play functionality
  useEffect(() => {
    if (!showSlider || !isAutoPlaying) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slides every 5 seconds
    
    return () => clearInterval(interval)
  }, [showSlider, isAutoPlaying, nextSlide])
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showSlider) return
      
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [showSlider, prevSlide, nextSlide])
  
  const currentProducts = showSlider 
    ? products.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
    : products.slice(0, itemsPerPage)
  
  const router = useRouter()

  return (
    <Section background="default" spacing="xl">
      <div className="text-center">
        <h2 className="text-base/7 font-semibold text-bb-flame-magenta">Featured Products</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Our most popular designs
        </p>
        <p className="mt-4 text-xl text-bb-gray-300">
          Discover the products that our customers love most
        </p>
      </div>
      
      <div 
        className="mt-16 relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {showSlider && (
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-bb-darker hover:bg-bb-flame-magenta transition-all duration-200 text-white hover:scale-110 active:scale-95"
              aria-label="Previous products"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 relative ${
                    index === currentIndex ? 'bg-bb-flame-magenta' : 'bg-bb-darker hover:bg-bb-flame-magenta/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === currentIndex && isAutoPlaying && (
                    <div className="absolute inset-0 rounded-full bg-bb-flame-magenta/30 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-bb-darker hover:bg-bb-flame-magenta transition-all duration-200 text-white hover:scale-110 active:scale-95"
              aria-label="Next products"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-500 ease-in-out">
          {currentProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group h-full flex flex-col opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
      </div>
      
      {/* CTA Banner */}
      <div className="mt-16 relative overflow-hidden rounded-2xl bg-bb-subtle-gradient p-8 shadow-2xl">
        <div className="absolute inset-0 bg-bb-flame-gradient opacity-10"></div>
        <div className="relative mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to find your perfect design?
          </h3>
          <p className="mt-4 text-lg text-bb-gray-300">
            Explore our full collection of custom apparel, hats, and unique gifts. 
            From team uniforms to personalized keepsakes, we have everything you need.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="px-8 py-3 text-lg inline-flex items-center justify-center text-base font-semibold text-white bg-bb-flame-magenta hover:bg-bb-flame-purple rounded-lg"
            >
              Shop All Products
            </Link>
            <Link
              href="/custom"
              className="px-8 py-3 text-lg inline-flex items-center justify-center text-base font-semibold bg-bb-gray-100 text-bb-darkest hover:bg-bb-gray-200 rounded-lg"
            >
              Start a Custom Project
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
} 