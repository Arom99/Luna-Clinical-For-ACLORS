import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, User, Mail, Phone, CreditCard, Settings, LogOut, Shield, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const MyProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userProfile } = useApp();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">My Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-2xl">
        <div className="bg-[#ADD8E6] bg-opacity-20 rounded-lg p-6 mb-6 text-center">
          <div className="w-24 h-24 bg-[#ADD8E6] rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          <h2>{userProfile?.name || user?.name || 'Patient User'}</h2>
          <p className="text-[#A9A9A9]">{userProfile?.email || user?.email}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Mail size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Email</p>
              <p>{userProfile?.email || user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Phone size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Phone</p>
              <p>{userProfile?.countryCode} {userProfile?.phone || '+1 (555) 123-4567'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <CreditCard size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Medicare Number</p>
              <p>{userProfile?.medicalNumber || '1234 56789 0'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Shield size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Insurance</p>
              <p>{userProfile?.insuranceProvider || 'Medicare'} - {userProfile?.insuranceNumber || 'MED-123456'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/edit-profile')}>
            <Settings size={20} className="mr-3" />
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/notifications')}>
            <FileText size={20} className="mr-3" />
            Notification Settings
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};