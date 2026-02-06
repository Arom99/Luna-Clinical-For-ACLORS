import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const SignUpScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    medicare: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate cơ bản
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 3) {
      toast.error("Password must be at least 3 characters");
      return;
    }

    setLoading(true);

    try {
      // 2. Gửi dữ liệu về Server (Database)
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email, // Server sẽ tự động chuyển thành chữ thường
          password: formData.password,
          phone: formData.phone,
          medicalNumber: formData.medicare, // Lưu số Medicare vào DB
          role: 'Customer', // Mặc định là khách hàng
          status: 'Active'
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully! Please log in.");
        // Đợi 1 chút rồi chuyển sang trang login
        setTimeout(() => navigate('/login'), 1000);
      } else {
        // Hiển thị lỗi từ server (ví dụ: Email đã tồn tại)
        toast.error(data.error || "Sign up failed. Please try again.");
      }
    } catch (err) {
      toast.error("Cannot connect to server. Is it running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <h1 className="mb-2 text-2xl font-bold">Create Account</h1>
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
              <p className="text-xs text-[#A9A9A9]">This will be saved to your medical profile</p>
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
              disabled={loading}
              className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12 text-lg font-medium transition-all"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <div className="text-center text-sm text-[#A9A9A9] mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#FFC0CB] hover:underline font-medium"
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