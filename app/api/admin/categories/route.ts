import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

// GET /api/admin/categories
export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// POST /api/admin/categories
export const POST = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const data = await request.json()

    const { name, description, icon } = data

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const category = await db.category.create({
      data: {
        name,
        slug,
        description,
        icon,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}) 