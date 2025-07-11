import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    // Get analytics data
    const [
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
      totalProjects,
      totalInquiries,
      orderStatusCounts,
      topProducts,
      recentOrders
    ] = await Promise.all([
      // Total orders
      db.order.count({ where: dateFilter }),
      
      // Total revenue from completed orders
      db.order.aggregate({
        where: {
          ...dateFilter,
          status: { in: ['DELIVERED', 'SHIPPED'] }
        },
        _sum: { totalAmount: true }
      }),
      
      // Total customers
      db.customer.count({ where: dateFilter }),
      
      // Total products
      db.product.count(),
      
      // Total projects
      db.project.count({ where: dateFilter }),
      
      // Total inquiries
      db.contactInquiry.count({ where: dateFilter }),
      
      // Order status breakdown
      db.order.groupBy({
        by: ['status'],
        where: dateFilter,
        _count: { status: true }
      }),
      
      // Top selling products
      db.orderItem.groupBy({
        by: ['productId'],
        where: {
          order: dateFilter
        },
        _sum: { quantity: true },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 5
      }),
      
      // Recent orders
      db.order.findMany({
        where: dateFilter,
        include: {
          customer: true,
          items: {
            include: {
              product: {
                include: {
                  images: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      })
    ])

    // Get product details for top products
    const topProductDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await db.product.findUnique({
          where: { id: item.productId },
          include: { images: true }
        })
        return {
          ...item,
          product
        }
      })
    )

    return NextResponse.json({
      summary: {
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        totalCustomers,
        totalProducts,
        totalProjects,
        totalInquiries
      },
      orderStatusCounts,
      topProducts: topProductDetails,
      recentOrders
    })

  } catch (error) {
    console.error('Error fetching analytics:', error)
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
} 