import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'terracotta' | 'gold' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variants = {
    green: 'text-[#1B382B] bg-[#F2F7F4] border-[#DFEDE4]',
    terracotta: 'text-[#9A3412] bg-[#FDF6F3] border-[#F9E8E1]',
    gold: 'text-[#B89324] bg-[#FBF8EF] border-[#EFE9DC]',
    neutral: 'text-stone-700 bg-[#F8F5EE] border-[#E2D8C3]',
  };

  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
