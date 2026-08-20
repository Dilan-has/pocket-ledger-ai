import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'normal' | 'generous' | 'compact';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'generous'
}) => {
  const paddingStyles = {
    compact: 'p-4 sm:p-5',
    normal: 'p-5 sm:p-6',
    generous: 'p-7 sm:p-8' // 28-32px padding per DESIGN.md
  };

  return (
    <div className={`bg-white dark:bg-linen-darkCard rounded-sahara border border-warm-border/60 dark:border-warm-darkBorder shadow-sahara dark:shadow-sahara-dark transition-all duration-300 ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};
