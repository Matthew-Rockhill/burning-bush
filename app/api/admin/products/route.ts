import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

// GET /api/admin/products
export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where = {
      ...(category && { categoryId: category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          images: true,
          variants: true,
          features: true,
          materials: true,
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// POST /api/admin/products
export const POST = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const user = request.user!
    const data = await request.json()

    const {
      name,
      description,
      price,
      originalPrice,
      sku,
      categoryId,
      isActive,
      isFeatured,
      inStock,
      stockQuantity,
      minOrderQty,
    } = data

    // Validate required fields
    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        price,
        originalPrice,
        sku,
        categoryId,
        isActive,
        isFeatured,
        inStock,
        stockQuantity,
        minOrderQty,
        createdById: user.id,
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: {
          orderBy: { sortOrder: 'asc' }
        },
        features: true,
        materials: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}) 