import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/middleware/auth'

export const POST = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request: NextRequest) => {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/')[4] // Extract id from path
    const body = await request.json()
    const { 
      projectName, 
      description, 
      budget, 
      dueDate, 
      priority = 'NORMAL',
      projectType = 'other'
    } = body

    // Validate required fields
    if (!projectName || !description) {
      return NextResponse.json(
        { error: 'Project name and description are required' },
        { status: 400 }
      )
    }

    // Get the inquiry to convert
    const inquiry = await db.contactInquiry.findUnique({
      where: { id },
      include: {
        customer: true
      }
    })

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    // Start transaction to convert inquiry to project
    const result = await db.$transaction(async (tx) => {
      // Create new project
      const project = await tx.project.create({
        data: {
          title: projectName,
          description,
          projectType,
          status: 'PENDING',
          priority,
          customerId: inquiry.customerId || '',
          budget: budget || null,
          dueDate: dueDate ? new Date(dueDate) : null,
          createdById: 'admin-user-id', // You'll need to get this from the auth context
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: {
          customer: true
        }
      })

      // Update inquiry status to converted
      await tx.contactInquiry.update({
        where: { id },
        data: {
          status: 'CONVERTED',
          updatedAt: new Date()
        }
      })

      return project
    })

    return NextResponse.json({
      success: true,
      project: result,
      message: 'Inquiry successfully converted to project'
    })

  } catch (error) {
    console.error('Error converting inquiry to project:', error)
    return NextResponse.json(
      { error: 'Failed to convert inquiry to project' },
      { status: 500 }
    )
  }
}) 