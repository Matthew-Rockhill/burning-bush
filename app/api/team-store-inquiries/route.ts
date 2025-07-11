import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const organization = formData.get('organization') as string
    const website = formData.get('website') as string
    const description = formData.get('description') as string
    const logo = formData.get('logo') as File | null
    const design = formData.get('design') as File | null

    // Validate required fields
    if (!name || !email || !organization || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Handle file uploads (for now, we'll store URLs - in production you'd upload to cloud storage)
    let logoUrl = null
    let designUrl = null

    if (logo) {
      // In a real implementation, you'd upload to cloud storage (AWS S3, Cloudinary, etc.)
      // For now, we'll just store a placeholder
      logoUrl = `/uploads/logos/${Date.now()}-${logo.name}`
    }

    if (design) {
      // In a real implementation, you'd upload to cloud storage
      designUrl = `/uploads/designs/${Date.now()}-${design.name}`
    }

    // Create the team store inquiry
    const inquiry = await db.teamStoreInquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        organization,
        website: website || null,
        description,
        logo: logoUrl,
        design: designUrl,
        status: 'NEW',
        priority: 'NORMAL'
      }
    })

    // In a real implementation, you might want to:
    // 1. Send email notifications to admin
    // 2. Send confirmation email to user
    // 3. Create a customer record if they don't exist
    // 4. Upload files to cloud storage

    return NextResponse.json({
      success: true,
      message: 'Team store inquiry submitted successfully',
      inquiry
    })

  } catch (error) {
    console.error('Error submitting team store inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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
} 