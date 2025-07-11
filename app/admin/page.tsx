import AdminLayout from '@/components/admin/admin-layout'
import { 
  CubeIcon, 
  ShoppingCartIcon, 
  UserGroupIcon, 
  PaintBrushIcon 
} from '@heroicons/react/24/outline'

// Mock data - will be replaced with real data from API
const stats = [
  { name: 'Total Products', value: '11', icon: CubeIcon },
  { name: 'Active Orders', value: '4', icon: ShoppingCartIcon },
  { name: 'Customers', value: '23', icon: UserGroupIcon },
  { name: 'Pending Designs', value: '2', icon: PaintBrushIcon },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Smith', product: 'Custom Team Jersey', status: 'In Design', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Sarah Johnson', product: 'Flame Hoodie', status: 'In Production', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Mike Davis', product: 'Engraved Wooden Plaque', status: 'Shipped', date: '2024-01-13' },
]

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-bb-flame-magenta" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-bb-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-bb-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-bb-gray-200">
            <h3 className="text-lg font-medium text-bb-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-bb-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-bb-flame-magenta rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-bb-gray-900">{order.id}</p>
                    <p className="text-sm text-bb-gray-500">{order.customer}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-bb-gray-900">{order.product}</p>
                  <p className="text-sm text-bb-gray-500">{order.date}</p>
                </div>
                <div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                    order.status === 'In Production' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-bb-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="bg-bb-flame-magenta text-white px-4 py-2 rounded-lg hover:bg-bb-flame-pink transition-colors">
              Add Product
            </button>
            <button className="bg-bb-flame-orange text-white px-4 py-2 rounded-lg hover:bg-bb-flame-yellow transition-colors">
              Create Order
            </button>
            <button className="bg-bb-flame-blue text-white px-4 py-2 rounded-lg hover:bg-bb-flame-cyan transition-colors">
              New Design
            </button>
            <button className="bg-bb-flame-green text-white px-4 py-2 rounded-lg hover:bg-bb-flame-teal transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 