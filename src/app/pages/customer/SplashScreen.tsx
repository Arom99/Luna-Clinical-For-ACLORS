import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '@/app/components/Logo';
import { motion } from 'motion/react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFC0CB] to-[#ADD8E6] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Logo size="lg" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-white text-lg"
        >
          Your Health, Our Priority
        </motion.p>
      </motion.div>
    </div>
  );
};