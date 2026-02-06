import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, User, Mail, Phone, CreditCard, Settings, LogOut, Shield, FileText, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const MyProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user?.email) {
      // Gọi API với email đã trim khoảng trắng
      fetch(`http://localhost:5000/users/email/${user.email.trim()}`)
        .then(res => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then(data => {
          setProfile(data);
          setLoading(false);
        })
        .catch(() => {
          console.error("Profile fetch failed");
          setError(true);
          setLoading(false);
        });
    } else {
        setLoading(false);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FFC0CB]"/></div>;

  // GIAO DIỆN LỖI (FIX ĐẸP HƠN)
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} className="text-red-400"/>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Profile Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-xs">It seems your account data is missing or mismatched. Please try logging in again.</p>
        <Button onClick={handleLogout} className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white px-8 h-12 shadow-md">
            Log Out & Retry
        </Button>
      </div>
    );
  }

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
          <h2 className="font-bold text-xl">{profile.name}</h2>
          <p className="text-[#A9A9A9]">{profile.email}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-white rounded-full text-xs text-gray-500 shadow-sm">
            ID: {profile.customId}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Mail size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Email</p>
              <p>{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Phone size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Phone</p>
              <p>{profile.countryCode} {profile.phone || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <CreditCard size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Medicare Number</p>
              <p>{profile.medicalNumber || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Shield size={20} className="text-[#FFC0CB]" />
            <div>
              <p className="text-sm text-[#A9A9A9]">Insurance</p>
              <p>{profile.insuranceProvider || 'None'} - {profile.insuranceNumber}</p>
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