import { Plus } from 'lucide-react';

export const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-[#FFC0CB] rounded-lg p-2 flex items-center justify-center">
        <Plus size={iconSizes[size]} className="text-white" strokeWidth={3} />
      </div>
      <span className={`${sizeClasses[size]} font-semibold text-[#333333]`}>
        Luna Clinical
      </span>
    </div>
  );
};
