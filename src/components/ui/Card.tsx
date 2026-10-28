import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = true,
  bordered = true,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-card-lg p-6 sm:p-8',
        bordered && 'border border-brand-border',
        hoverable && 'card-hover-effect shadow-card',
        !hoverable && 'shadow-card',
        className
      )}
    >
      {children}
    </div>
  );
};
