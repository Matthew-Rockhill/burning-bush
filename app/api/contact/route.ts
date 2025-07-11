import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/contact
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      name,
      email,
      phone,
      projectType,
      message,
      timeline,
      budget,
    } = data

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Check if customer exists
    let customer = await db.customer.findUnique({
      where: { email },
    })

    // Create customer if doesn't exist
    if (!customer) {
      const [firstName, ...lastNameParts] = name.split(' ')
      const lastName = lastNameParts.join(' ')

      customer = await db.customer.create({
        data: {
          email,
          firstName,
          lastName: lastName || '',
          phone,
        },
      })
    }

    // Create contact inquiry
    const inquiry = await db.contactInquiry.create({
      data: {
        customerId: customer.id,
        name,
        email,
        phone,
        projectType,
        message,
        timeline,
        budget,
        status: 'NEW',
        priority: 'NORMAL',
      },
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: inquiry.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/contact (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where = {
      ...(status && { status: status as 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONVERTED' | 'CLOSED' }),
      ...(priority && { priority: priority as 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' }),
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
              email: true,
            },
          },
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
    console.error('Error fetching contact inquiries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 