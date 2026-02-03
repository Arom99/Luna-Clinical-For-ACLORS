import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password, rememberMe);
    
    if (success) {
      // Redirect based on email (admin vs customer)
      if (email === 'admin123@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/welcome')}
            className="flex items-center gap-2 text-[#A9A9A9] mb-8 hover:text-[#333333]"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="md" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-[#A9A9A9]">Sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#F0F0F0] border-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#F0F0F0] border-0 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A9A9A9]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-[#FFC0CB] text-sm hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Log In'
              )}
            </Button>

            <div className="text-center text-sm text-[#A9A9A9]">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-[#FFC0CB] hover:underline"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-[#ADD8E6] bg-opacity-20 rounded-lg">
            <p className="text-sm text-[#A9A9A9] mb-2">Demo Credentials:</p>
            <p className="text-xs text-[#A9A9A9]">
              <strong>Admin:</strong> admin123@gmail.com / 774953
            </p>
            <p className="text-xs text-[#A9A9A9]">
              <strong>Customer:</strong> any@email.com / any password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};