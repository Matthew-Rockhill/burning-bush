'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  HomeIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  UserGroupIcon, 
  PaintBrushIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { Button } from '../ui/button'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: CubeIcon },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
  { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
  { name: 'Projects', href: '/admin/projects', icon: PaintBrushIcon },
  { name: 'Inquiries', href: '/admin/inquiries', icon: ChatBubbleLeftRightIcon },
  { name: 'Team Stores', href: '/admin/team-stores', icon: BuildingStorefrontIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
]

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bb-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bb-flame-magenta mx-auto"></div>
          <p className="mt-4 text-bb-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-bb-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-bb-dark">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <Sidebar />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-bb-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-bb-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center">
              {title && (
                <h1 className="text-2xl font-bold text-bb-gray-900">{title}</h1>
              )}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              <div className="hidden sm:flex items-center gap-x-2">
                <span className="text-sm text-bb-gray-600">Welcome,</span>
                <span className="text-sm font-medium text-bb-gray-900">{user.name}</span>
                <span className="text-xs text-bb-gray-500 bg-bb-gray-100 px-2 py-1 rounded-full">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <Button
                color="zinc"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  const router = useRouter()

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-bb-dark px-6 pb-2">
      <div className="flex h-16 shrink-0 items-center">
        <h2 className="text-xl font-bold text-white">Burning Bush Admin</h2>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => router.push(item.href)}
                    className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-bb-gray-300 hover:text-white hover:bg-bb-darker w-full text-left"
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
} 