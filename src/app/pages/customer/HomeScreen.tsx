import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { Bell, Calendar, FileText, Users, MapPin, MessageCircle, User, Edit, LogOut, Clock, CreditCard, ChevronRight } from 'lucide-react';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { appointments, unreadCount } = useApp();

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const nextAppointment = upcomingAppointments[0];

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
    { icon: MapPin, label: 'Locations', path: '/locations' },
    { icon: User, label: 'My Profile', path: '/profile' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-sm opacity-90">Welcome back,</h2>
              <h1 className="text-white mt-1">{user?.name || 'Patient'}</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/edit-profile')}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                aria-label="Edit Profile"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                aria-label="Logout"
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
        {/* Next Appointment Widget */}
        {nextAppointment && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2>Upcoming Appointment</h2>
              <button
                onClick={() => navigate('/appointments')}
                className="text-sm text-[#FFC0CB] hover:underline flex items-center gap-1"
              >
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] p-6 rounded-lg text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{nextAppointment.doctorName}</h3>
                    <p className="text-sm opacity-90">{nextAppointment.specialty}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                  {nextAppointment.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <div>
                    <p className="text-xs opacity-75">Date</p>
                    <p className="text-sm font-medium">
                      {new Date(nextAppointment.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <div>
                    <p className="text-xs opacity-75">Time</p>
                    <p className="text-sm font-medium">{nextAppointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs opacity-75">Location</p>
                  <p className="text-sm">{nextAppointment.location}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => navigate('/appointments')}
                  className="flex-1 bg-white text-[#FFC0CB] hover:bg-opacity-90"
                  size="sm"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => navigate(`/doctor-chat/${nextAppointment.doctorId}`)}
                  variant="outline"
                  className="flex-1 border-white text-white hover:bg-white hover:bg-opacity-20"
                  size="sm"
                >
                  <MessageCircle size={16} className="mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="mb-4">Recent Activity</h2>
          <div className="space-y-3">
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

            {upcomingAppointments.length > 1 && (
              <div className="bg-[#ADD8E6] bg-opacity-20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#ADD8E6] rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">You have {upcomingAppointments.length} upcoming appointments</p>
                    <p className="text-sm text-[#A9A9A9]">Manage your appointments and set reminders</p>
                  </div>
                  <Button
                    onClick={() => navigate('/appointments')}
                    variant="outline"
                    className="border-[#ADD8E6] text-[#ADD8E6]"
                    size="sm"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            )}
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
        <div className="mt-8 bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] bg-opacity-10 p-6 rounded-lg border border-[#ADD8E6] border-opacity-30">
          <h3 className="mb-2">💡 Health Tip of the Day</h3>
          <p className="text-sm text-[#A9A9A9]">
            Fasting for 8-12 hours before blood tests helps ensure accurate results. Drink plenty of water and avoid strenuous exercise!
          </p>
        </div>
      </div>
    </div>
  );
};
