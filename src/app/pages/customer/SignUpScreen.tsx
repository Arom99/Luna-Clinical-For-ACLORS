import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export const SignUpScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    medicare: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, would validate and create account
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate('/welcome')}
            className="flex items-center gap-2 text-[#A9A9A9] mb-8 hover:text-[#333333]"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="flex justify-center mb-8">
            <Logo size="md" />
          </div>

          <div className="text-center mb-8">
            <h1 className="mb-2">Create Account</h1>
            <p className="text-[#A9A9A9]">Join Luna Clinical today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#F0F0F0] border-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#F0F0F0] border-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-[#F0F0F0] border-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicare">Medicare Number (Optional)</Label>
              <Input
                id="medicare"
                placeholder="1234 56789 0"
                value={formData.medicare}
                onChange={(e) => setFormData({ ...formData, medicare: e.target.value })}
                className="bg-[#F0F0F0] border-0"
              />
              <p className="text-xs text-[#A9A9A9]">Validation: 10 digits, format: XXXX XXXXX X</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-[#F0F0F0] border-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-[#F0F0F0] border-0"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12"
            >
              Sign Up
            </Button>

            <div className="text-center text-sm text-[#A9A9A9]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#FFC0CB] hover:underline"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
