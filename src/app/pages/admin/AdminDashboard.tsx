import { useEffect, useState } from 'react';
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
  AlertCircle,
  Loader2
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts (Charts usually need historical data which we might not have enough of yet)
const bookingsData = [
  { month: 'Jan', bookings: 12 },
  { month: 'Feb', bookings: 15 },
  { month: 'Mar', bookings: 18 },
  { month: 'Apr', bookings: 16 },
  { month: 'May', bookings: 20 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // State for Real Stats
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    lowStockItems: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch Stats from Server
  useEffect(() => {
    fetch('http://localhost:5000/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats", err);
        setLoading(false);
      });
  }, []);

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

  // Dynamic Stats Data based on API
  const statsDisplay = [
    { label: 'Total Bookings', value: stats.totalBookings, change: 'Live', icon: Calendar, color: '#FFC0CB' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue}`, change: 'Live', icon: FileText, color: '#ADD8E6' },
    { label: 'Active Users', value: stats.activeUsers, change: 'Live', icon: Users, color: '#FFD700' },
    { label: 'Low Stock Items', value: stats.lowStockItems, change: 'Alert', icon: AlertCircle, color: '#DC2626' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[#A9A9A9]">Admin Panel</p>
              <p className="font-medium">{user?.name || 'Administrator'}</p>
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
        {loading ? (
           <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FFC0CB]" size={40} /></div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsDisplay.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      stat.label === 'Low Stock Items' && stat.value > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">{stat.value}</h3>
                  <p className="text-sm text-[#A9A9A9]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Access Menu */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
              <h2 className="mb-6 font-bold text-gray-800">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      <item.icon size={24} style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="mb-4 font-bold text-gray-800">Monthly Bookings</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#FFC0CB" strokeWidth={3} dot={{r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="mb-4 font-bold text-gray-800">Revenue Overview</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#ADD8E6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};