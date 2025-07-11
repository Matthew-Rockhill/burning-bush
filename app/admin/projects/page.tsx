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
  DocumentTextIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import SearchBar from '@/components/admin/search-bar'

interface Project {
  id: string
  customer: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  title: string
  description: string
  projectType: string
  timeline?: string
  budget?: string
  status: string
  priority: string
  requirements?: any
  notes?: string
  internalNotes?: string
  dueDate?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  files: Array<{
    id: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    url: string
    fileType: string
    isActive: boolean
    uploadedAt: string
  }>
  revisions: Array<{
    id: string
    revisionNumber: number
    description: string
    changes?: string
    createdAt: string
  }>
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [searchTerm, statusFilter, priorityFilter, typeFilter])

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(typeFilter && { type: typeFilter }),
      })

      const response = await fetch(`/api/admin/projects?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchProjects()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating project status:', error)
      alert('Error updating project status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'yellow'
      case 'IN_PROGRESS': return 'blue'
      case 'REVIEW': return 'orange'
      case 'APPROVED': return 'green'
      case 'COMPLETED': return 'emerald'
      case 'ON_HOLD': return 'gray'
      case 'CANCELLED': return 'red'
      default: return 'gray'
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'apparel': return '👕'
      case 'hat': return '🧢'
      case 'engraving': return '🎨'
      default: return '📦'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date()
  }

  if (loading) {
    return (
      <AdminLayout title="Custom Projects">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading custom projects...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Custom Projects">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search projects..."
              className="flex-1 max-w-md"
            />

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REVIEW">Review</option>
              <option value="APPROVED">Approved</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
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

            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Types</option>
              <option value="apparel">Apparel</option>
              <option value="hat">Hats</option>
              <option value="engraving">Engraving</option>
              <option value="other">Other</option>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-bb-gray-200">
              <thead className="bg-bb-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Files
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-bb-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-bb-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-bb-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">
                          {getTypeIcon(project.projectType)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-bb-gray-900">
                            {project.title}
                          </div>
                          <div className="text-sm text-bb-gray-500 truncate max-w-xs">
                            {project.description}
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
                            {project.customer.firstName} {project.customer.lastName}
                          </div>
                          <div className="text-sm text-bb-gray-500">
                            {project.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={project.status}
                        onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                        className="w-36"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="REVIEW">Review</option>
                        <option value="APPROVED">Approved</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="CANCELLED">Cancelled</option>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge color={getPriorityColor(project.priority)}>
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.dueDate ? (
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                          <span className={`text-sm ${isOverdue(project.dueDate) ? 'text-red-600 font-medium' : 'text-bb-gray-900'}`}>
                            {formatDate(project.dueDate)}
                          </span>
                          {isOverdue(project.dueDate) && (
                            <XCircleIcon className="h-4 w-4 text-red-500 ml-1" />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-bb-gray-400">No deadline</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <PhotoIcon className="h-4 w-4 text-bb-gray-400 mr-2" />
                        <span className="text-sm text-bb-gray-900">
                          {project.files.length} files
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

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-bb-gray-400 mb-4">
              <DocumentTextIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No custom projects found</h3>
            <p className="text-bb-gray-500 mb-6">
              {searchTerm || statusFilter || priorityFilter || typeFilter
                ? 'Try adjusting your search or filter criteria.'
                : 'Custom projects will appear here when customers submit design requests.'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
