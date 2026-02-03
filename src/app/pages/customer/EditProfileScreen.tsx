import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const countryCodes = [
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
];

const insuranceProviders = [
  'Medicare',
  'Bupa',
  'Medibank',
  'HCF',
  'NIB',
  'Australian Unity',
  'Teachers Health',
  'HBF',
  'GMHBA',
  'Other',
];

export const EditProfileScreen = () => {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile } = useApp();

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

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        countryCode: userProfile.countryCode || '+61',
        medicalNumber: userProfile.medicalNumber || '',
        insuranceProvider: userProfile.insuranceProvider || '',
        insuranceNumber: userProfile.insuranceNumber || '',
        dateOfBirth: userProfile.dateOfBirth || '',
        address: userProfile.address || '',
        emergencyContact: userProfile.emergencyContact || '',
        emergencyPhone: userProfile.emergencyPhone || '',
      });
    }
  }, [userProfile]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    toast.success('Profile updated successfully!');
    setTimeout(() => navigate('/profile'), 500);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-3xl">
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Edit Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-3xl">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
            <h2 className="mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1"
                  disabled
                />
                <p className="text-xs text-[#A9A9A9] mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2 mt-1">
                  <Select value={formData.countryCode} onValueChange={(val) => handleChange('countryCode', val)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="412345678"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="123 Health St, Sydney NSW 2000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
            <h2 className="mb-4">Medical Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medicalNumber">Medicare Number</Label>
                <Input
                  id="medicalNumber"
                  value={formData.medicalNumber}
                  onChange={(e) => handleChange('medicalNumber', e.target.value)}
                  placeholder="1234 56789 0"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Select value={formData.insuranceProvider} onValueChange={(val) => handleChange('insuranceProvider', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="insuranceNumber">Insurance Policy Number</Label>
                <Input
                  id="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={(e) => handleChange('insuranceNumber', e.target.value)}
                  placeholder="MED-123456"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
            <h2 className="mb-4">Emergency Contact</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="emergencyContact">Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone">Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                  placeholder="+61 400 000 000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 sticky bottom-4 bg-white p-4 -mx-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={() => navigate('/profile')}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
