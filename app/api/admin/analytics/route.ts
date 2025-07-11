import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware/auth'
import { db } from '@/lib/db'

// GET /api/admin/analytics
export const GET = requireRole(['ADMIN', 'SUPER_ADMIN'], async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'

    // Calculate date range based on period
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    const dateFilter = {
      createdAt: {
        gte: startDate,
        lte: now
      }
    }

    // Fetch analytics data
    const [
      totalRevenue,
      totalOrders,
      totalCustomers,
      avgOrderValue,
      revenueChange,
      ordersChange,
      customersChange,
      avgOrderValueChange,
      salesByPeriod,
      topProducts,
      topCategories,
      customerInsights,
      inquiryStats
    ] = await Promise.all([
      // Total revenue
      db.order.aggregate({
        where: { ...dateFilter, status: { in: ['DELIVERED', 'SHIPPED'] } },
        _sum: { total: true }
      }).then(result => result._sum.total || 0),

      // Total orders
      db.order.count({ where: dateFilter }),

      // Total customers
      db.customer.count({ where: dateFilter }),

      // Average order value
      db.order.aggregate({
        where: { ...dateFilter, status: { in: ['DELIVERED', 'SHIPPED'] } },
        _avg: { total: true }
      }).then(result => result._avg.total || 0),

      // Revenue change (mock data for now)
      Promise.resolve(12.5),

      // Orders change (mock data for now)
      Promise.resolve(8.2),

      // Customers change (mock data for now)
      Promise.resolve(15.7),

      // Average order value change (mock data for now)
      Promise.resolve(4.1),

      // Sales by period (mock data for now)
      Promise.resolve([
        { period: 'Week 1', revenue: 2500, orders: 25, customers: 20 },
        { period: 'Week 2', revenue: 3200, orders: 32, customers: 28 },
        { period: 'Week 3', revenue: 2800, orders: 28, customers: 25 },
        { period: 'Week 4', revenue: 3500, orders: 35, customers: 30 }
      ]),

      // Top products
      db.product.findMany({
        take: 5,
        include: {
          category: true,
          images: {
            where: { isPrimary: true },
            take: 1
          },
          _count: {
            select: { orderItems: true }
          }
        },
        orderBy: {
          orderItems: {
            _count: 'desc'
          }
        }
      }),

      // Top categories
      db.category.findMany({
        include: {
          _count: {
            select: { products: true }
          },
          products: {
            include: {
              orderItems: true
            }
          }
        }
      }),

      // Customer insights
      Promise.resolve({
        newCustomers: 45,
        returningCustomers: 78,
        averageLifetimeValue: 125.50,
        topCustomers: [
          { id: '1', name: 'John Smith', email: 'john@example.com', totalSpent: 1250, orderCount: 8 },
          { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', totalSpent: 980, orderCount: 6 },
          { id: '3', name: 'Mike Davis', email: 'mike@example.com', totalSpent: 750, orderCount: 4 }
        ]
      }),

      // Inquiry stats
      db.contactInquiry.aggregate({
        where: dateFilter,
        _count: true
      }).then(result => ({
        totalInquiries: result._count,
        conversionRate: 65.2,
        averageResponseTime: 2.5,
        inquiriesByStatus: [
          { status: 'NEW', count: 12 },
          { status: 'CONTACTED', count: 8 },
          { status: 'QUOTED', count: 15 },
          { status: 'CONVERTED', count: 10 },
          { status: 'CLOSED', count: 5 }
        ]
      }))
    ])

    const analytics = {
      overview: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        avgOrderValue,
        revenueChange,
        ordersChange,
        customersChange,
        avgOrderValueChange
      },
      salesByPeriod,
      topProducts: topProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category.name,
        sales: product._count.orderItems,
        revenue: Number(product.price) * product._count.orderItems,
        image: product.images?.[0]?.url
      })),
      topCategories: topCategories.map(category => ({
        id: category.id,
        name: category.name,
        sales: category.products.reduce((sum, product) => sum + product.orderItems.length, 0),
        revenue: category.products.reduce((sum, product) => sum + (Number(product.price) * product.orderItems.length), 0),
        products: category._count.products
      })),
      customerInsights,
      inquiryStats
    }

    return NextResponse.json(analytics)
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
}) 