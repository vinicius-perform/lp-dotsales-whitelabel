import React from 'react';
import Image from 'next/image';

interface DotSalesLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  whiteLabelBadge?: boolean;
}

export const DotSalesLogo: React.FC<DotSalesLogoProps> = ({
  className = '',
  size = 'md',
  whiteLabelBadge = true,
}) => {
  const sizeMap = {
    sm: { height: 24, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    md: { height: 32, text: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' },
    lg: { height: 40, text: 'text-3xl', badge: 'text-xs px-3 py-1' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand typographic mark */}
      <div className="flex items-center tracking-tight font-extrabold text-brand-dark">
        <span className="text-brand-primary">dot</span>
        <span className="text-brand-primary text-3xl leading-none">.</span>
        <span className="text-brand-dark font-black tracking-tighter">Sales</span>
      </div>

      {whiteLabelBadge && (
        <span className={`bg-brand-pale text-brand-primary font-bold rounded-full border border-brand-mint uppercase tracking-wider ${current.badge}`}>
          White Label
        </span>
      )}
    </div>
  );
};
