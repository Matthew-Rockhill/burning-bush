import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await verifyToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      )
    }

    const dateFilter = {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    let csvData = ''
    let filename = ''

    switch (type) {
      case 'orders':
        const orders = await db.order.findMany({
          where: dateFilter,
          include: {
            customer: true,
            items: {
              include: {
                product: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        filename = `order_report_${startDate}_to_${endDate}.csv`
        csvData = 'Order ID,Customer Name,Customer Email,Status,Total Amount,Item Count,Created Date\n'
        
        orders.forEach(order => {
          const customerName = `${order.customer.firstName} ${order.customer.lastName}`
          const itemCount = order.items.length
          
          csvData += `${order.id},"${customerName}","${order.customer.email}","${order.status}","$${order.totalAmount}","${itemCount}","${order.createdAt.toISOString().split('T')[0]}"\n`
        })
        break

      case 'customers':
        const customers = await db.customer.findMany({
          where: dateFilter,
          orderBy: {
            createdAt: 'desc'
          }
        })

        filename = `customer_report_${startDate}_to_${endDate}.csv`
        csvData = 'Customer ID,First Name,Last Name,Email,Phone,Company,Created Date\n'
        
        customers.forEach(customer => {
          csvData += `${customer.id},"${customer.firstName}","${customer.lastName}","${customer.email}","${customer.phone || 'N/A'}","${customer.company || 'N/A'}","${customer.createdAt.toISOString().split('T')[0]}"\n`
        })
        break

      case 'projects':
        const projects = await db.project.findMany({
          where: dateFilter,
          include: {
            customer: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        filename = `project_report_${startDate}_to_${endDate}.csv`
        csvData = 'Project ID,Project Name,Customer Name,Customer Email,Status,Priority,Category,Estimated Price,Deadline,Created Date\n'
        
        projects.forEach(project => {
          const customerName = `${project.customer.firstName} ${project.customer.lastName}`
          const deadline = project.dueDate ? project.dueDate.toISOString().split('T')[0] : 'Not set'
          
          csvData += `${project.id},"${project.title}","${customerName}","${project.customer.email}","${project.status}","${project.priority}","${project.projectType}","$${project.budget || 0}","${deadline}","${project.createdAt.toISOString().split('T')[0]}"\n`
        })
        break

      case 'inquiries':
        const inquiries = await db.contactInquiry.findMany({
          where: dateFilter,
          include: {
            customer: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        filename = `inquiry_report_${startDate}_to_${endDate}.csv`
        csvData = 'Inquiry ID,Customer Name,Customer Email,Project Type,Status,Priority,Follow Up Date,Created Date\n'
        
        inquiries.forEach(inquiry => {
          const customerName = inquiry.customer ? `${inquiry.customer.firstName} ${inquiry.customer.lastName}` : 'No Customer'
          const followUpDate = inquiry.followUpDate ? inquiry.followUpDate.toISOString().split('T')[0] : 'Not set'
          
          csvData += `${inquiry.id},"${customerName}","${inquiry.customer?.email || inquiry.email}","${inquiry.projectType || 'Not specified'}","${inquiry.status}","${inquiry.priority}","${followUpDate}","${inquiry.createdAt.toISOString().split('T')[0]}"\n`
        })
        break

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        )
    }

    const response = new NextResponse(csvData)
    response.headers.set('Content-Type', 'text/csv')
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    
    return response

  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 