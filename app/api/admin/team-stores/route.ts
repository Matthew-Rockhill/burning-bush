import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status) {
      where.status = status
    }

    // Get total count
    const total = await db.teamStore.count({ where })

    // Get team stores with pagination
    const teamStores = await db.teamStore.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            products: true,
            inquiries: true
          }
        }
      }
    })

    return NextResponse.json({
      teamStores,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching team stores:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team stores' },
      { status: 500 }
    )
  }
});

export const POST = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      logo,
      banner,
      website,
      email,
      phone,
      address,
      status,
      isActive
    } = body

    // Validate required fields
    if (!name || !slug || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug is unique
    const existingStore = await db.teamStore.findUnique({
      where: { slug }
    })

    if (existingStore) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    // Create team store
    const teamStore = await db.teamStore.create({
      data: {
        name,
        slug,
        description,
        logo,
        banner,
        website,
        email,
        phone,
        address,
        status: status || 'PENDING',
        isActive: isActive || false,
        createdById: 'admin-user-id' // This should come from the auth context
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(teamStore)

  } catch (error) {
    console.error('Error creating team store:', error)
    return NextResponse.json(
      { error: 'Failed to create team store' },
      { status: 500 }
    )
  }
}); 