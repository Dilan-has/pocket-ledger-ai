import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sienna' | 'linen' | 'rose' | 'neutral' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sienna',
  className = ''
}) => {
  const variantStyles = {
    sienna: 'bg-sienna-light dark:bg-sienna-darkLight text-sienna dark:text-sienna-light border-sienna/20',
    linen: 'bg-linen-dim dark:bg-linen-darkDim text-warm-dark dark:text-warm-darkText border-warm-border dark:border-warm-darkBorder',
    rose: 'bg-rose-light dark:bg-rose-darkLight text-rose border-rose/20',
    neutral: 'bg-stone-100 dark:bg-stone-800 text-warm-dark dark:text-stone-200 border-stone-200 dark:border-stone-700',
    success: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-sans border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
