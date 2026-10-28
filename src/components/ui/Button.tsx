import React from 'react';
import clsx from 'clsx';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  withArrow?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  withArrow = false,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm sm:text-base px-6 py-3 gap-2',
    lg: 'text-base sm:text-lg px-8 py-4 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary:
      'bg-brand-primary text-white hover:bg-brand-primaryHover shadow-card hover:shadow-cardHover',
    secondary:
      'bg-white text-brand-dark hover:bg-brand-offwhite border border-brand-border shadow-card',
    outline:
      'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-pale',
    ghost:
      'bg-transparent text-brand-dark hover:bg-brand-pale/50',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {withArrow && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
        </>
      )}
    </button>
  );
};
