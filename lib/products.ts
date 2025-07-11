export interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  description: string
  category: 'hats' | 'shirts' | 'gifts'
  features: string[]
  materials: string[]
  colors: string[]
  sizes?: string[]
  inStock: boolean
  featured?: boolean
}

export const products: Product[] = [
  // Custom Hats
  {
    id: 1,
    name: 'Classic Custom Cap',
    price: '$28',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Premium embroidered cap with your custom design.',
    category: 'hats',
    features: ['Custom Embroidery', 'Adjustable Strap', 'Premium Cotton'],
    materials: ['100% Cotton', 'Polyester Blend'],
    colors: ['Black', 'Navy', 'Red', 'White', 'Gray'],
    sizes: ['One Size'],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Trucker Hat',
    price: '$32',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Mesh-back trucker style with custom front panel design.',
    category: 'hats',
    features: ['Mesh Back', 'Snapback Closure', 'Custom Front Panel'],
    materials: ['Cotton/Polyester Front', 'Mesh Back'],
    colors: ['Black/White', 'Navy/Gray', 'Red/White'],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 3,
    name: 'Beanie',
    price: '$24',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Warm knit beanie with embroidered logo.',
    category: 'hats',
    features: ['Warm Knit', 'Embroidered Design', 'Cuffed Style'],
    materials: ['Acrylic Yarn', 'Fleece Lined'],
    colors: ['Black', 'Navy', 'Gray', 'Burgundy'],
    sizes: ['One Size'],
    inStock: true
  },
  
  // Custom Shirts
  {
    id: 4,
    name: 'Custom Team Jersey',
    price: '$89',
    originalPrice: '$120',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Professional quality jerseys with team colors and custom numbering.',
    category: 'shirts',
    features: ['Moisture Wicking', 'Custom Numbers', 'Team Colors', 'Durable Print'],
    materials: ['100% Polyester', 'Mesh Panels'],
    colors: ['Custom Team Colors'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Flame Hoodie',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable hoodie featuring our signature flame design.',
    category: 'shirts',
    features: ['Soft Cotton Blend', 'Kangaroo Pocket', 'Drawstring Hood'],
    materials: ['80% Cotton', '20% Polyester'],
    colors: ['Black', 'Navy', 'Charcoal', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: 'Team Spirit Tee',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Classic t-shirt perfect for showing your team spirit.',
    category: 'shirts',
    features: ['Soft Cotton', 'Screen Print', 'Pre-Shrunk'],
    materials: ['100% Cotton'],
    colors: ['White', 'Black', 'Navy', 'Red', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: 'Performance Polo',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Professional polo shirt with embroidered logo.',
    category: 'shirts',
    features: ['Moisture Wicking', 'Embroidered Logo', 'Professional Look'],
    materials: ['100% Polyester Performance Fabric'],
    colors: ['White', 'Navy', 'Black', 'Red', 'Royal Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true
  },
  
  // Gifts
  {
    id: 8,
    name: 'Engraved Wooden Plaque',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful wooden plaque with custom laser engraving.',
    category: 'gifts',
    features: ['Laser Engraved', 'Premium Wood', 'Custom Text', 'Gift Ready'],
    materials: ['Oak Wood', 'Walnut Wood', 'Cherry Wood'],
    colors: ['Natural Oak', 'Dark Walnut', 'Rich Cherry'],
    inStock: true,
    featured: true
  },
  {
    id: 9,
    name: 'Custom Leather Keychain',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Personalized leather keychain with embossed design.',
    category: 'gifts',
    features: ['Genuine Leather', 'Embossed Design', 'Key Ring Included'],
    materials: ['Genuine Leather', 'Metal Key Ring'],
    colors: ['Brown', 'Black', 'Tan'],
    inStock: true
  },
  {
    id: 10,
    name: 'Acrylic Awards',
    price: '$75',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Crystal clear acrylic awards with laser engraving.',
    category: 'gifts',
    features: ['Crystal Clear Acrylic', 'Laser Engraved', 'Professional Finish'],
    materials: ['Premium Acrylic'],
    colors: ['Clear', 'Blue Tint'],
    inStock: true
  },
  {
    id: 11,
    name: 'Custom Paper Goods',
    price: '$25',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Personalized stationery and paper products.',
    category: 'gifts',
    features: ['Custom Design', 'High Quality Paper', 'Various Sizes'],
    materials: ['Premium Paper Stock'],
    colors: ['White', 'Cream', 'Light Gray'],
    inStock: true
  }
]

export const getProductsByCategory = (category: 'hats' | 'shirts' | 'gifts') => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured)
}

export const getProductById = (id: number) => {
  return products.find(product => product.id === id)
}

export const getAllProducts = () => {
  return products
} 