import { useNavigate } from 'react-router';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';

export const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile & Desktop Layout */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-md mx-auto md:max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-8 md:mb-12">
            <Logo size="lg" />
          </div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="mb-4">Welcome to Luna Clinical</h1>
            <p className="text-[#A9A9A9] mb-8">
              Professional pathology lab services with easy online booking and instant results.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#ADD8E6] bg-opacity-20 p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#FFC0CB] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3>Easy Booking</h3>
                <p className="text-sm text-[#A9A9A9] mt-2">Schedule tests in minutes</p>
              </div>

              <div className="bg-[#ADD8E6] bg-opacity-20 p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#FFC0CB] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3>Quick Results</h3>
                <p className="text-sm text-[#A9A9A9] mt-2">Get reports instantly</p>
              </div>

              <div className="bg-[#ADD8E6] bg-opacity-20 p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#FFC0CB] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3>AI Assistant</h3>
                <p className="text-sm text-[#A9A9A9] mt-2">24/7 support available</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12"
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="outline"
              className="w-full border-[#FFC0CB] text-[#FFC0CB] hover:bg-[#FFC0CB] hover:text-white h-12"
            >
              Sign Up
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};