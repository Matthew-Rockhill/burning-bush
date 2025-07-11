import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/middleware/auth'

export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request: NextRequest) => {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/')[4] // Extract id from path

    const project = await db.project.findUnique({
      where: { id },
      include: {
        customer: true,
        files: true,
        revisions: {
          orderBy: { revisionNumber: 'desc' }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

export const PATCH = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request: NextRequest) => {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/')[4] // Extract id from path
    const data = await request.json()

    const project = await db.project.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        customer: true,
        files: true,
        revisions: {
          orderBy: { revisionNumber: 'desc' }
        }
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

export const DELETE = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request: NextRequest) => {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/')[4] // Extract id from path

    await db.project.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}) 