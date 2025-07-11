'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  EyeIcon,
  PencilIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import SearchBar from '@/components/admin/search-bar'

interface Inquiry {
  id: string
  customer?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    company?: string
  }
  name: string
  email: string
  phone?: string
  projectType?: string
  message: string
  timeline?: string
  budget?: string
  status: string
  priority: string
  assignedTo?: string
  notes?: string
  followUpDate?: string
  createdAt: string
  updatedAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  useEffect(() => {
    fetchInquiries()
  }, [searchTerm, statusFilter, priorityFilter])

  const fetchInquiries = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      })

      const response = await fetch(`/api/admin/inquiries?${params}`)
      if (response.ok) {
        const data = await response.json()
        setInquiries(data.inquiries || [])
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateInquiryStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchInquiries()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error)
      alert('Error updating inquiry status')
    }
  }

  const convertToProject = async (inquiryId: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        fetchInquiries()
        alert('Inquiry converted to project successfully!')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error converting inquiry:', error)
      alert('Error converting inquiry to project')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'blue'
      case 'CONTACTED': return 'yellow'
      case 'QUOTED': return 'green'
      case 'CONVERTED': return 'purple'
      case 'CLOSED': return 'zinc'
      default: return 'zinc'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'zinc'
      case 'NORMAL': return 'yellow'
      case 'HIGH': return 'orange'
      case 'URGENT': return 'red'
      default: return 'zinc'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'contact_form': return '📝'
      case 'phone': return '📞'
      case 'email': return '✉️'
      case 'social': return '📱'
      case 'referral': return '👥'
      default: return '📝'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getResponseTime = (createdAt: string, respondedAt?: string) => {
    if (!respondedAt) return 'Not responded'
    
    const created = new Date(createdAt)
    const responded = new Date(respondedAt)
    const hours = Math.floor((responded.getTime() - created.getTime()) / (1000 * 60 * 60))
    
    if (hours < 1) return 'Less than 1 hour'
    if (hours < 24) return `${hours} hours`
    return `${Math.floor(hours / 24)} days`
  }

  if (loading) {
    return (
      <AdminLayout title="Customer Inquiries">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading inquiries...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Customer Inquiries">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search inquiries..."
              className="flex-1 max-w-md"
            />

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUOTED">Quoted</option>
              <option value="CONVERTED">Converted</option>
              <option value="CLOSED">Closed</option>
            </Select>

            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </Select>
          </div>

          <Button
            color="flame"
            onClick={fetchInquiries}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Refresh
          </Button>
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
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Priority
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
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-bb-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-bb-flame-blue bg-opacity-10 rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-bb-flame-blue" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-bb-gray-900">
                            {inquiry.customer?.firstName} {inquiry.customer?.lastName}
                          </div>
                          <div className="text-sm text-bb-gray-500">
                            {inquiry.email}
                          </div>
                          {inquiry.customer?.company && (
                            <div className="text-sm text-bb-gray-500">
                              {inquiry.customer.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-bb-gray-900">
                        {inquiry.name}
                      </div>
                      <div className="text-sm text-bb-gray-500 max-w-xs truncate">
                        {inquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={inquiry.status}
                        onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                        className="w-32"
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUOTED">Quoted</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="CLOSED">Closed</option>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge color={getPriorityColor(inquiry.priority)}>
                        {inquiry.priority.charAt(0).toUpperCase() + inquiry.priority.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                        <span className="text-sm text-bb-gray-900">
                          {formatDate(inquiry.createdAt)}
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
                        {inquiry.status !== 'CONVERTED' && (
                          <button
                            onClick={() => convertToProject(inquiry.id)}
                            className="text-bb-gray-400 hover:text-green-600"
                            title="Convert to Project"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {inquiries.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-bb-gray-400 mb-4">
              <ChatBubbleLeftRightIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No inquiries found</h3>
            <p className="text-bb-gray-500 mb-6">
              {searchTerm || statusFilter || priorityFilter
                ? 'Try adjusting your search or filter criteria.'
                : 'Customer inquiries will appear here when people submit the contact form.'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
