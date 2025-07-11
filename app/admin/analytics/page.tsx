'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    avgOrderValue: number
    revenueChange: number
    ordersChange: number
    customersChange: number
    avgOrderValueChange: number
  }
  salesByPeriod: Array<{
    period: string
    revenue: number
    orders: number
    customers: number
  }>
  topProducts: Array<{
    id: string
    name: string
    category: string
    sales: number
    revenue: number
    image?: string
  }>
  topCategories: Array<{
    id: string
    name: string
    sales: number
    revenue: number
    products: number
  }>
  customerInsights: {
    newCustomers: number
    returningCustomers: number
    averageLifetimeValue: number
    topCustomers: Array<{
      id: string
      name: string
      email: string
      totalSpent: number
      orderCount: number
    }>
  }
  inquiryStats: {
    totalInquiries: number
    conversionRate: number
    averageResponseTime: number
    inquiriesByStatus: Array<{
      status: string
      count: number
    }>
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?period=${dateRange}`)
      if (response.ok) {
        const analytics = await response.json()
        setData(analytics)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-bb-gray-500'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowTrendingUpIcon className="h-4 w-4" />
    if (change < 0) return <ArrowTrendingDownIcon className="h-4 w-4" />
    return null
  }

  const exportReport = async () => {
    try {
      const response = await fetch(`/api/admin/analytics/export?period=${dateRange}`, {
        method: 'POST',
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-report-${dateRange}.pdf`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error exporting report:', error)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Analytics & Reports">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!data) {
    return (
      <AdminLayout title="Analytics & Reports">
        <div className="text-center py-12">
          <ChartBarIcon className="h-16 w-16 text-bb-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No analytics data available</h3>
          <p className="text-bb-gray-500">Please check back later.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Analytics & Reports">
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-4">
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-48"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </Select>
            
            {lastUpdated && (
              <div className="flex items-center text-sm text-bb-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Updated {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              color="zinc"
              onClick={fetchAnalytics}
              className="flex items-center gap-2"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              color="flame"
              onClick={exportReport}
              className="flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bb-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-bb-gray-900">
                  {formatCurrency(data.overview.totalRevenue)}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className={`flex items-center mt-2 ${getChangeColor(data.overview.revenueChange)}`}>
              {getChangeIcon(data.overview.revenueChange)}
              <span className="text-sm ml-1">
                {formatPercent(data.overview.revenueChange)} from last period
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bb-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-bb-gray-900">
                  {data.overview.totalOrders.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className={`flex items-center mt-2 ${getChangeColor(data.overview.ordersChange)}`}>
              {getChangeIcon(data.overview.ordersChange)}
              <span className="text-sm ml-1">
                {formatPercent(data.overview.ordersChange)} from last period
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bb-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-bb-gray-900">
                  {data.overview.totalCustomers.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className={`flex items-center mt-2 ${getChangeColor(data.overview.customersChange)}`}>
              {getChangeIcon(data.overview.customersChange)}
              <span className="text-sm ml-1">
                {formatPercent(data.overview.customersChange)} from last period
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bb-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-bb-gray-900">
                  {formatCurrency(data.overview.avgOrderValue)}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className={`flex items-center mt-2 ${getChangeColor(data.overview.avgOrderValueChange)}`}>
              {getChangeIcon(data.overview.avgOrderValueChange)}
              <span className="text-sm ml-1">
                {formatPercent(data.overview.avgOrderValueChange)} from last period
              </span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-bb-gray-900 mb-4">Top Products</h3>
            <div className="space-y-4">
              {data.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-bb-gray-500 w-6">
                      #{index + 1}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-bb-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-bb-gray-500">
                        {product.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-bb-gray-900">
                      {formatCurrency(product.revenue)}
                    </div>
                    <div className="text-sm text-bb-gray-500">
                      {product.sales} sales
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-bb-gray-900 mb-4">Top Categories</h3>
            <div className="space-y-4">
              {data.topCategories.map((category, index) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-bb-gray-500 w-6">
                      #{index + 1}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-bb-gray-900">
                        {category.name}
                      </div>
                      <div className="text-sm text-bb-gray-500">
                        {category.products} products
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-bb-gray-900">
                      {formatCurrency(category.revenue)}
                    </div>
                    <div className="text-sm text-bb-gray-500">
                      {category.sales} sales
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-bb-gray-900 mb-4">Customer Insights</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-bb-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-bb-gray-900">
                    {data.customerInsights.newCustomers}
                  </div>
                  <div className="text-sm text-bb-gray-600">New Customers</div>
                </div>
                <div className="text-center p-4 bg-bb-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-bb-gray-900">
                    {data.customerInsights.returningCustomers}
                  </div>
                  <div className="text-sm text-bb-gray-600">Returning Customers</div>
                </div>
              </div>
              <div className="text-center p-4 bg-bb-flame-orange bg-opacity-10 rounded-lg">
                <div className="text-2xl font-bold text-bb-flame-orange">
                  {formatCurrency(data.customerInsights.averageLifetimeValue)}
                </div>
                <div className="text-sm text-bb-gray-600">Average Lifetime Value</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-bb-gray-900 mb-4">Top Customers</h3>
            <div className="space-y-4">
              {data.customerInsights.topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-bb-gray-500 w-6">
                      #{index + 1}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-bb-gray-900">
                        {customer.name}
                      </div>
                      <div className="text-sm text-bb-gray-500">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-bb-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                    <div className="text-sm text-bb-gray-500">
                      {customer.orderCount} orders
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-bb-gray-900 mb-4">Inquiry Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bb-gray-900">
                {data.inquiryStats.totalInquiries}
              </div>
              <div className="text-sm text-bb-gray-600">Total Inquiries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {data.inquiryStats.conversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-bb-gray-600">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bb-flame-blue">
                {data.inquiryStats.averageResponseTime}h
              </div>
              <div className="text-sm text-bb-gray-600">Avg Response Time</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {data.inquiryStats.inquiriesByStatus.map((status) => (
                <div key={status.status} className="flex items-center">
                  <Badge color="zinc" className="mr-2">
                    {status.status}
                  </Badge>
                  <span className="text-sm text-bb-gray-600">{status.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
