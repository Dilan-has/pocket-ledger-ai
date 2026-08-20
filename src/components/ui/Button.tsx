import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium rounded-sahara transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sienna focus:ring-offset-1 focus:ring-offset-linen dark:focus:ring-offset-linen-darkBg disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-sienna hover:bg-sienna-hover text-white shadow-sm hover:shadow',
    secondary: 'bg-white dark:bg-linen-darkDim border border-warm-border dark:border-warm-darkBorder text-warm-dark dark:text-warm-darkText hover:bg-linen-dim dark:hover:bg-linen-darkCard hover:border-sienna/40',
    ghost: 'bg-transparent text-warm-muted dark:text-warm-darkMuted hover:text-warm-dark dark:hover:text-warm-darkText hover:bg-linen-dim dark:hover:bg-linen-darkDim',
    rose: 'bg-rose text-white hover:bg-rose/90 shadow-sm'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs tracking-wide',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3.5 text-base tracking-wide font-semibold'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
