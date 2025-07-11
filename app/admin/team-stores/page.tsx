'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SearchBar from '@/components/admin/search-bar'
import { 
  PlusIcon, 
  EyeIcon, 
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

interface TeamStore {
  id: string
  name: string
  slug: string
  description: string | null
  logo: string | null
  banner: string | null
  website: string | null
  email: string
  phone: string | null
  address: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'SUSPENDED'
  isActive: boolean
  launchedAt: string | null
  createdAt: string
  updatedAt: string
  createdBy: {
    id: string
    name: string
    email: string
  }
  _count: {
    products: number
    inquiries: number
  }
}

interface TeamStoreInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  organization: string
  website: string | null
  description: string
  logo: string | null
  design: string | null
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'APPROVED' | 'REJECTED' | 'CONVERTED' | 'CLOSED'
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
  assignedTo: string | null
  notes: string | null
  followUpDate: string | null
  createdAt: string
  updatedAt: string
  teamStore: TeamStore | null
  assignedAdmin: {
    id: string
    name: string
    email: string
  } | null
}

export default function TeamStoresPage() {
  const router = useRouter()
  const [teamStores, setTeamStores] = useState<TeamStore[]>([])
  const [inquiries, setInquiries] = useState<TeamStoreInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'stores' | 'inquiries'>('stores')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchTeamStores()
    fetchInquiries()
  }, [])

  const fetchTeamStores = async () => {
    try {
      const response = await fetch('/api/admin/team-stores')
      if (response.ok) {
        const data = await response.json()
        setTeamStores(data.teamStores || [])
      }
    } catch (error) {
      console.error('Error fetching team stores:', error)
    }
  }

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/team-store-inquiries')
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'APPROVED':
        return 'bg-blue-100 text-blue-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'SUSPENDED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getInquiryStatusColor = (status: string) => {
    switch (status) {
      case 'CONVERTED':
        return 'bg-green-100 text-green-800'
      case 'APPROVED':
        return 'bg-blue-100 text-blue-800'
      case 'NEW':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800'
      case 'HIGH':
        return 'bg-orange-100 text-orange-800'
      case 'NORMAL':
        return 'bg-blue-100 text-blue-800'
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTeamStores = teamStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.organization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout title="Team Stores">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('stores')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stores'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Team Stores ({teamStores.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inquiries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center">
          <SearchBar
            placeholder={`Search ${activeTab === 'stores' ? 'team stores' : 'inquiries'}...`}
            value={searchTerm}
            onChange={setSearchTerm}
          />
          {activeTab === 'stores' && (
            <Button
              onClick={() => router.push('/admin/team-stores/new')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Team Store
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'stores' && (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredTeamStores.map((store) => (
                    <li key={store.id}>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {store.logo ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={store.logo}
                                alt={store.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <BuildingStorefrontIcon className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{store.name}</p>
                              <Badge className={`ml-2 ${getStatusColor(store.status)}`}>
                                {store.status}
                              </Badge>
                              {store.isActive && (
                                <Badge className="ml-2 bg-green-100 text-green-800">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{store.email}</p>
                            <p className="text-sm text-gray-500">
                              {store._count.products} products • {store._count.inquiries} inquiries
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            outline
                            className="text-sm px-2 py-1"
                            onClick={() => router.push(`/admin/team-stores/${store.id}`)}
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            outline
                            className="text-sm px-2 py-1"
                            onClick={() => router.push(`/admin/team-stores/${store.id}/edit`)}
                          >
                            <PencilIcon className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {filteredTeamStores.length === 0 && (
                  <div className="text-center py-8">
                    <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No team stores</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new team store.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <li key={inquiry.id}>
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {inquiry.logo ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={inquiry.logo}
                                  alt={inquiry.organization}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <BuildingStorefrontIcon className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900">{inquiry.organization}</p>
                                <Badge className={`ml-2 ${getInquiryStatusColor(inquiry.status)}`}>
                                  {inquiry.status}
                                </Badge>
                                <Badge className={`ml-2 ${getPriorityColor(inquiry.priority)}`}>
                                  {inquiry.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{inquiry.name} • {inquiry.email}</p>
                              <p className="text-sm text-gray-500 truncate max-w-md">
                                {inquiry.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              outline
                              className="text-sm px-2 py-1"
                              onClick={() => router.push(`/admin/team-store-inquiries/${inquiry.id}`)}
                            >
                              <EyeIcon className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              outline
                              className="text-sm px-2 py-1"
                              onClick={() => router.push(`/admin/team-store-inquiries/${inquiry.id}/edit`)}
                            >
                              <PencilIcon className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {filteredInquiries.length === 0 && (
                  <div className="text-center py-8">
                    <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No inquiries</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No team store inquiries found.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
} 