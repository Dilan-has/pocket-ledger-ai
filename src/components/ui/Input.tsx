import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium uppercase tracking-wider text-warm-muted mb-2 font-sans">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-warm-muted pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white border border-warm-border rounded-sahara text-warm-dark placeholder:text-warm-muted/60 text-sm font-sans px-4 py-3 transition-all duration-200 focus:outline-none focus:border-sienna focus:ring-1 focus:ring-sienna ${
            icon ? 'pl-11' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose font-sans">{error}</p>}
    </div>
  );
};
