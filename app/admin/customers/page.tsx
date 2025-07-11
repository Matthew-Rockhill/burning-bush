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
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ShoppingBagIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  address?: string
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: {
    orders: number
    inquiries: number
    projects: number
  }
  orders?: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    createdAt: string
  }>
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')


  useEffect(() => {
    fetchCustomers()
  }, [searchTerm, statusFilter])

  const fetchCustomers = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),

      })

      const response = await fetch(`/api/admin/customers?${params}`)
      if (response.ok) {
        const data = await response.json()
        setCustomers(data.customers || [])
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCustomerStatus = async (customerId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        fetchCustomers()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating customer status:', error)
      alert('Error updating customer status')
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
      <AdminLayout title="Customers">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading customers...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Customers">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-bb-gray-400" />
              <Input
                type="text"
                placeholder="Search customers..."
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
              <option value="">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>


          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-bb-gray-200">
              <thead className="bg-bb-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Inquiries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-bb-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-bb-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-bb-flame-blue bg-opacity-10 rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-bb-flame-blue" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-bb-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          {customer.company && (
                            <div className="text-sm text-bb-gray-500">
                              {customer.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-bb-gray-900">
                          <EnvelopeIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center text-sm text-bb-gray-500">
                            <PhoneIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ShoppingBagIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                        <span className="text-sm text-bb-gray-900">
                          {customer._count.orders}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ChatBubbleLeftIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                        <span className="text-sm text-bb-gray-900">
                          {customer._count.inquiries}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => updateCustomerStatus(customer.id, !customer.isActive)}
                        className="focus:outline-none"
                      >
                        <Badge color={customer.isActive ? 'green' : 'red'}>
                          {customer.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                        <span className="text-sm text-bb-gray-900">
                          {formatDate(customer.createdAt)}
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

        {customers.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-bb-gray-400 mb-4">
              <UserIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No customers found</h3>
            <p className="text-bb-gray-500 mb-6">
              {searchTerm || statusFilter
                ? 'Try adjusting your search or filter criteria.'
                : 'Customer profiles will appear here when people submit contact forms or place orders.'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
