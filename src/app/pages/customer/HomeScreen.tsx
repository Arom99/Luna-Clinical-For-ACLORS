import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/app/components/ui/button';
import {
  Calendar,
  FileText,
  MessageCircle,
  User,
  LogOut,
  BellRing,
  CreditCard,
  Users,
} from 'lucide-react';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const quickActions = [
    { icon: Calendar, label: 'Book Test', path: '/doctors', color: '#FFC0CB' },
    { icon: FileText, label: 'View Results', path: '/results', color: '#ADD8E6' },
    { icon: MessageCircle, label: 'AI Assistant', path: '/home', color: '#FFD700' },
  ];

  const menuItems = [
    { icon: Calendar, label: 'My Appointments', path: '/appointments' },
    { icon: Users, label: 'Find Doctors', path: '/doctors' },
    { icon: FileText, label: 'Test Results', path: '/results' },
    { icon: CreditCard, label: 'Payment Methods', path: '/payments' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: BellRing, label: 'Notifications', path: '/home' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm opacity-90">Welcome back,</h2>
              <h1 className="text-white mt-1">{user?.name || 'Patient'}</h1>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
                <BellRing size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Quick Actions - Mobile: Stack, Desktop: Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white text-[#333333] p-4 rounded-lg flex items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: action.color }}
                >
                  <action.icon size={24} className="text-white" />
                </div>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-6 max-w-7xl">
        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="mb-4">Recent Activity</h2>
          <div className="bg-[#ADD8E6] bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FFC0CB] rounded-full flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Blood Test Results Ready</p>
                <p className="text-sm text-[#A9A9A9]">Your recent blood test results are now available</p>
                <p className="text-xs text-[#A9A9A9] mt-1">2 hours ago</p>
              </div>
              <Button
                onClick={() => navigate('/results')}
                className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
                size="sm"
              >
                View
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div>
          <h2 className="mb-4">Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg hover:border-[#FFC0CB] transition-all flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 bg-[#ADD8E6] bg-opacity-30 rounded-full flex items-center justify-center">
                  <item.icon size={24} className="text-[#FFC0CB]" />
                </div>
                <span className="text-sm font-medium text-center">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
          <h3 className="mb-2">Health Tip of the Day</h3>
          <p className="text-sm text-[#A9A9A9]">
            Fasting for 8-12 hours before blood tests helps ensure accurate results. Drink plenty of water!
          </p>
        </div>
      </div>
    </div>
  );
};
