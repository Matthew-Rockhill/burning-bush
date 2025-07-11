'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  EyeIcon,
  TrashIcon,
  CloudArrowUpIcon,
  PhotoIcon,
  DocumentIcon,
  FolderIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import SearchBar from '@/components/admin/search-bar'

interface FileItem {
  id: string
  fileName: string
  originalName: string
  fileType: string
  mimeType: string
  fileSize: number
  url: string
  uploadedAt: string
  uploadedBy: string
  category: 'product' | 'design' | 'general'
  isPublic: boolean
  metadata?: {
    width?: number
    height?: number
    productId?: string
    designId?: string
  }
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    fetchFiles()
  }, [searchTerm, categoryFilter, typeFilter])

  const fetchFiles = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(typeFilter && { type: typeFilter }),
      })

      const response = await fetch(`/api/admin/files?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles || uploadedFiles.length === 0) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      Array.from(uploadedFiles).forEach((file) => {
        formData.append('files', file)
      })

      const response = await fetch('/api/admin/files/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        fetchFiles()
        setShowUploadModal(false)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch(`/api/admin/files/${fileId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchFiles()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting file:', error)
      alert('Error deleting file')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedFiles.length} files?`)) return

    try {
      const response = await fetch('/api/admin/files/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileIds: selectedFiles }),
      })

      if (response.ok) {
        fetchFiles()
        setSelectedFiles([])
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting files:', error)
      alert('Error deleting files')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
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

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <PhotoIcon className="h-5 w-5 text-bb-flame-blue" />
    }
    return <DocumentIcon className="h-5 w-5 text-bb-gray-400" />
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'blue'
      case 'design': return 'purple'
      case 'general': return 'zinc'
      default: return 'zinc'
    }
  }

  const isImage = (mimeType: string) => {
    return mimeType.startsWith('image/')
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const selectAllFiles = () => {
    setSelectedFiles(files.map(file => file.id))
  }

  const deselectAllFiles = () => {
    setSelectedFiles([])
  }

  if (loading) {
    return (
      <AdminLayout title="File Management">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
            <p className="mt-4 text-bb-gray-500">Loading files...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="File Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search files..."
              className="flex-1 max-w-md"
            />

            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Categories</option>
              <option value="product">Product Images</option>
              <option value="design">Design Files</option>
              <option value="general">General Files</option>
            </Select>

            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="">All Types</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="other">Other</option>
            </Select>
          </div>

          <div className="flex gap-2">
            {selectedFiles.length > 0 && (
              <Button
                color="red"
                onClick={handleBulkDelete}
                className="flex items-center gap-2"
              >
                <TrashIcon className="h-4 w-4" />
                Delete Selected ({selectedFiles.length})
              </Button>
            )}
            <Button
              color="flame"
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2"
            >
              <CloudArrowUpIcon className="h-5 w-5" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Selection Controls */}
        {files.length > 0 && (
          <div className="flex items-center gap-4 text-sm text-bb-gray-600">
            <button
              onClick={selectAllFiles}
              className="hover:text-bb-flame-blue"
            >
              Select All
            </button>
            <button
              onClick={deselectAllFiles}
              className="hover:text-bb-flame-blue"
            >
              Deselect All
            </button>
            <span>{selectedFiles.length} selected</span>
          </div>
        )}

        {/* File Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
                selectedFiles.includes(file.id) ? 'border-bb-flame-blue' : 'border-bb-gray-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="mt-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="text-bb-gray-400 hover:text-bb-flame-blue"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-bb-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* File Preview */}
                <div className="mb-3">
                  {isImage(file.mimeType) ? (
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-32 bg-bb-gray-100 rounded-md flex items-center justify-center">
                      {getFileIcon(file.mimeType)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-bb-gray-900 truncate">
                    {file.originalName}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge color={getCategoryColor(file.category)}>
                      {file.category}
                    </Badge>
                    <span className="text-xs text-bb-gray-500">
                      {formatFileSize(file.fileSize)}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-bb-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {formatDate(file.uploadedAt)}
                  </div>

                  {file.metadata?.width && file.metadata?.height && (
                    <div className="text-xs text-bb-gray-500">
                      {file.metadata.width} × {file.metadata.height}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-bb-gray-900">Upload Files</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-bb-gray-400 hover:text-bb-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-bb-gray-300 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="h-12 w-12 text-bb-gray-400 mx-auto mb-4" />
                  <p className="text-bb-gray-600 mb-4">
                    Choose files to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    color="flame"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Select Files'}
                  </Button>
                </div>

                <div className="text-xs text-bb-gray-500">
                  Supported formats: Images (JPG, PNG, GIF), Documents (PDF, DOC, DOCX)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {files.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-bb-gray-400 mb-4">
              <FolderIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-bb-gray-900 mb-2">No files found</h3>
            <p className="text-bb-gray-500 mb-6">
              {searchTerm || categoryFilter || typeFilter
                ? 'Try adjusting your search or filter criteria.'
                : 'Upload your first files to get started.'
              }
            </p>
            <Button
              color="flame"
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 mx-auto"
            >
              <CloudArrowUpIcon className="h-5 w-5" />
              Upload Files
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
