import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

// GET /api/admin/inquiries
export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (priority) {
      where.priority = priority
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { projectType: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { customer: { 
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } }
      ]
    }

    const [inquiries, total] = await Promise.all([
      db.contactInquiry.findMany({
        where,
        skip,
        take: limit,
        include: {
          customer: true,
          assignedAdmin: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.contactInquiry.count({ where }),
    ])

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}) 