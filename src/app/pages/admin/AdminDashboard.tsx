import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/app/components/ui/button';
import {
  Users,
  Calendar,
  FileText,
  Package,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bookingsData = [
  { month: 'Jan', bookings: 120 },
  { month: 'Feb', bookings: 150 },
  { month: 'Mar', bookings: 180 },
  { month: 'Apr', bookings: 160 },
  { month: 'May', bookings: 200 },
];

const statsData = [
  { label: 'Total Bookings', value: '1,234', change: '+12%', icon: Calendar, color: '#FFC0CB' },
  { label: 'Pending Results', value: '45', change: '-5%', icon: FileText, color: '#ADD8E6' },
  { label: 'Active Users', value: '856', change: '+8%', icon: Users, color: '#FFD700' },
  { label: 'Low Stock Items', value: '12', change: '+3', icon: AlertCircle, color: '#DC2626' },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  const menuItems = [
    { icon: Users, label: 'User Management', path: '/admin/users', color: '#FFC0CB' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings', color: '#ADD8E6' },
    { icon: FileText, label: 'Results', path: '/admin/results', color: '#FFD700' },
    { icon: Package, label: 'Inventory', path: '/admin/inventory', color: '#90EE90' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports', color: '#DDA0DD' },
    { icon: Settings, label: 'Settings', path: '/admin', color: '#A9A9A9' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[#A9A9A9]">Admin</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">{stat.value}</h3>
              <p className="text-sm text-[#A9A9A9]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4">Booking Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#FFC0CB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4">Monthly Performance</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#ADD8E6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Access Menu */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium text-center">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mt-8">
          <h2 className="mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New booking created', user: 'John Doe', time: '5 minutes ago' },
              { action: 'Result uploaded', user: 'Lab Tech #45', time: '12 minutes ago' },
              { action: 'User registered', user: 'Jane Smith', time: '1 hour ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-[#FFC0CB] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-[#A9A9A9]">{activity.user}</p>
                </div>
                <p className="text-xs text-[#A9A9A9]">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};