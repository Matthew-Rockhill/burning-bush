'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  ShoppingBagIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  status: string
  total: number
  createdAt: string
  items: Array<{
    id: string
    product: {
      name: string
      price: number
    }
    quantity: number
    unitPrice: number
  }>
  projects?: Array<{
    id: string
    status: string
    title: string
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')


  useEffect(() => {
    fetchOrders()
  }, [searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),

      })

      const response = await fetch(`/api/admin/orders?${params}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchOrders()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Error updating order status')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <AdminLayout title="Orders">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading orders...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Orders">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-bb-gray-400" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_DESIGN">In Design</option>
              <option value="DESIGN_APPROVED">Design Approved</option>
              <option value="IN_PRODUCTION">In Production</option>
              <option value="READY_TO_SHIP">Ready to Ship</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REFUNDED">Refunded</option>
            </Select>


          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-bb-gray-200">
              <thead className="bg-bb-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-bb-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-bb-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-bb-flame-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                          <ShoppingBagIcon className="h-5 w-5 text-bb-flame-blue" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-bb-gray-900">
                            #{order.orderNumber}
                          </div>
                          <div className="text-sm text-bb-gray-500">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 bg-bb-gray-200 rounded-full flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-bb-gray-500" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-bb-gray-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="text-sm text-bb-gray-500">
                            {order.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge color={order.status === 'PENDING' ? 'yellow' : order.status === 'CONFIRMED' ? 'blue' : order.status === 'SHIPPED' ? 'green' : order.status === 'DELIVERED' ? 'emerald' : 'red'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-4 w-4 text-bb-gray-400 mr-1" />
                        <span className="text-sm font-medium text-bb-gray-900">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                        <span className="text-sm text-bb-gray-900">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-bb-gray-400 hover:text-bb-flame-blue">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-bb-gray-400 hover:text-bb-flame-orange">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-bb-gray-400 mb-4">
              <ShoppingBagIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No orders found</h3>
            <p className="text-bb-gray-500 mb-6">
              {searchTerm || statusFilter
                ? 'Try adjusting your search or filter criteria.'
                : 'Orders will appear here when customers make purchases.'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 