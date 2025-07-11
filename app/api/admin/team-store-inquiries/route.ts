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
    const priority = searchParams.get('priority') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { organization: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status) {
      where.status = status
    }

    if (priority) {
      where.priority = priority
    }

    // Get total count
    const total = await db.teamStoreInquiry.count({ where })

    // Get inquiries with pagination
    const inquiries = await db.teamStoreInquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        teamStore: true,
        assignedAdmin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching team store inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}); 