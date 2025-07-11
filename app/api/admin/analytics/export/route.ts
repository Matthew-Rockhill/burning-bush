import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireRole } from '@/lib/middleware/auth'

export const POST = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request: NextRequest) => {
  try {

    const body = await request.json()
    const { 
      reportType, 
      startDate, 
      endDate, 
      format = 'csv' 
    } = body

    // Validate required fields
    if (!reportType || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Report type, start date, and end date are required' },
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

    switch (reportType) {
      case 'revenue':
        const orders = await db.order.findMany({
          where: { ...dateFilter, status: { in: ['DELIVERED', 'SHIPPED'] } },
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

        filename = `revenue_report_${startDate}_to_${endDate}.csv`
        csvData = 'Order ID,Customer Name,Customer Email,Date,Items,Total,Payment Status\n'
        
        orders.forEach(order => {
          const customerName = `${order.customer.firstName} ${order.customer.lastName}`
          const itemsDescription = order.items.map(item => 
            `${item.product.name} (${item.quantity}x)`
          ).join('; ')
          
          csvData += `${order.id},"${customerName}","${order.customer.email}","${order.createdAt.toISOString().split('T')[0]}","${itemsDescription}","$${order.total}","${order.paymentStatus}"\n`
        })
        break

      case 'customers':
        const customers = await db.customer.findMany({
          where: dateFilter,
          include: {
            orders: true,
            inquiries: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        filename = `customer_report_${startDate}_to_${endDate}.csv`
        csvData = 'Customer ID,First Name,Last Name,Email,Phone,Company,Registration Date,Total Orders,Total Inquiries\n'
        
        customers.forEach(customer => {
          csvData += `${customer.id},"${customer.firstName}","${customer.lastName}","${customer.email}","${customer.phone || ''}","${customer.company || ''}","${customer.createdAt.toISOString().split('T')[0]}","${customer.orders.length}","${customer.inquiries.length}"\n`
        })
        break

      case 'products':
        const productSales = await db.$queryRaw<Array<{
          id: string
          name: string
          price: number
          category_name: string | null
          total_sold: number
          total_revenue: number
          order_count: number
        }>>`
          SELECT 
            p.id,
            p.name,
            p.price,
            p.category_id,
            c.name as category_name,
            COALESCE(SUM(oi.quantity), 0) as total_sold,
            COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue,
            COUNT(DISTINCT o.id) as order_count
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          LEFT JOIN order_items oi ON p.id = oi.product_id
          LEFT JOIN orders o ON oi.order_id = o.id
          WHERE o.created_at >= ${dateFilter.createdAt.gte}
          AND o.created_at <= ${dateFilter.createdAt.lte}
          AND o.status IN ('DELIVERED', 'SHIPPED')
          GROUP BY p.id, p.name, p.price, p.category_id, c.name
          ORDER BY total_sold DESC
        `

        filename = `product_sales_report_${startDate}_to_${endDate}.csv`
        csvData = 'Product ID,Product Name,Category,Price,Units Sold,Total Revenue,Order Count\n'
        
        productSales.forEach((product) => {
          csvData += `${product.id},"${product.name}","${product.category_name || 'Uncategorized'}","$${product.price}","${product.total_sold}","$${product.total_revenue}","${product.order_count}"\n`
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
          { error: 'Invalid report type' },
          { status: 400 }
        )
    }

    // Return CSV data
    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    })

  } catch (error) {
    console.error('Error generating analytics report:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}) 