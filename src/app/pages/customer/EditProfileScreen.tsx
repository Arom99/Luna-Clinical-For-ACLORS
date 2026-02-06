import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Save, Loader2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

const countryCodes = [
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
];

const insuranceProviders = ['Medicare', 'Bupa', 'Medibank', 'HCF', 'NIB', 'Other'];

export const EditProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+61',
    medicalNumber: '',
    insuranceProvider: '',
    insuranceNumber: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  // 1. FETCH USER DATA FROM DB
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/email/${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setDbUser(data);
            // Fill form with DB data or empty strings
            setFormData({
              name: data.name || '',
              email: data.email || '',
              phone: data.phone || '',
              countryCode: data.countryCode || '+61',
              medicalNumber: data.medicalNumber || '',
              insuranceProvider: data.insuranceProvider || '',
              insuranceNumber: data.insuranceNumber || '',
              dateOfBirth: data.dateOfBirth || '',
              address: data.address || '',
              emergencyContact: data.emergencyContact || '',
              emergencyPhone: data.emergencyPhone || '',
            });
          }
          setLoading(false);
        })
        .catch(() => {
          toast.error("Could not fetch user data");
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!dbUser?._id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${dbUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('Profile saved successfully!');
        setTimeout(() => navigate('/profile'), 500);
      } else {
        toast.error("Failed to save profile");
      }
    } catch (e) {
      toast.error("Connection Error");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FFC0CB]"/></div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-3xl">
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 mb-2 hover:opacity-80">
            <ArrowLeft size={20} />
            <span>Back to Profile</span>
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Edit Profile</h1>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <UserIcon size={14}/> ID: {dbUser?.customId || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-3xl">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          
          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg border border-blue-50">
            <h2 className="mb-4 font-bold text-gray-700">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="mt-1 bg-white"/>
              </div>
              <div>
                <Label>Email</Label>
                <Input value={formData.email} disabled className="mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"/>
              </div>
              <div>
                <Label>Phone</Label>
                <div className="flex gap-2 mt-1">
                  <Select value={formData.countryCode} onValueChange={(val) => handleChange('countryCode', val)}>
                    <SelectTrigger className="w-[100px] bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((c) => <SelectItem key={c.code} value={c.code}>{c.flag} {c.code}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="flex-1 bg-white"/>
                </div>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" value={formData.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} className="mt-1 bg-white"/>
              </div>
              <div>
                <Label>Address</Label>
                <Input value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="mt-1 bg-white"/>
              </div>
            </div>
          </div>

          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg border border-blue-50">
            <h2 className="mb-4 font-bold text-gray-700">Medical Details</h2>
            <div className="space-y-4">
              <div>
                <Label>Medicare Number</Label>
                <Input value={formData.medicalNumber} onChange={(e) => handleChange('medicalNumber', e.target.value)} className="mt-1 bg-white"/>
              </div>
              <div>
                <Label>Insurance Provider</Label>
                <Select value={formData.insuranceProvider} onValueChange={(val) => handleChange('insuranceProvider', val)}>
                  <SelectTrigger className="mt-1 bg-white"><SelectValue placeholder="Select provider" /></SelectTrigger>
                  <SelectContent>
                    {insuranceProviders.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Policy Number</Label>
                <Input value={formData.insuranceNumber} onChange={(e) => handleChange('insuranceNumber', e.target.value)} className="mt-1 bg-white"/>
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 pt-4 bg-white border-t">
            <Button type="submit" className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12 text-lg shadow-md">
              <Save size={18} className="mr-2" /> Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};