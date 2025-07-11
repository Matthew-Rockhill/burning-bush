import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

export const PATCH = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const inquiryId = request.nextUrl.pathname.split('/').pop()
    const body = await request.json()
    const { status, priority, assignedTo, responseNotes } = body

    // Validate status
    const validStatuses = ['NEW', 'CONTACTED', 'QUOTED', 'CONVERTED', 'CLOSED']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Validate priority
    const validPriorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT']
    if (priority && !validPriorities.includes(priority)) {
      return NextResponse.json(
        { error: 'Invalid priority' },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date()
    }

    if (status) {
      updateData.status = status
    }

    if (priority) {
      updateData.priority = priority
    }

    if (assignedTo) {
      updateData.assignedTo = assignedTo
    }

    if (responseNotes) {
      updateData.notes = responseNotes
    }

    // Update the inquiry
    const updatedInquiry = await db.contactInquiry.update({
      where: { id: inquiryId },
      data: updateData,
      include: {
        customer: true
      }
    })

    return NextResponse.json(updatedInquiry)

  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
});

export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const inquiryId = request.nextUrl.pathname.split('/').pop()

    // Get inquiry with customer data
    const inquiry = await db.contactInquiry.findUnique({
      where: { id: inquiryId },
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

    return NextResponse.json(inquiry)

  } catch (error) {
    console.error('Error fetching inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiry' },
      { status: 500 }
    )
  }
});