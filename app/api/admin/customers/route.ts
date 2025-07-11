import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

// GET /api/admin/customers
export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (status) {
      if (status === 'active') {
        where.isActive = true
      } else if (status === 'inactive') {
        where.isActive = false
      }
    }

    const [customers, total] = await Promise.all([
      db.customer.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              orders: true,
              inquiries: true,
              projects: true
            }
          },
          orders: {
            take: 5,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              items: {
                include: {
                  product: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.customer.count({ where }),
    ])

    return NextResponse.json({
      customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}) 