import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pale' | 'mint' | 'outline' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pale',
  className,
}) => {
  const variantStyles = {
    pale: 'bg-brand-pale text-brand-primary border border-brand-mint/60',
    mint: 'bg-brand-mint/70 text-brand-primary border border-brand-light/60',
    outline: 'bg-white text-brand-dark border border-brand-border',
    dark: 'bg-brand-dark text-white',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
