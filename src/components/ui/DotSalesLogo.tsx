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
    sm: { width: 105, height: 31, badge: 'text-[10px] px-2 py-0.5' },
    md: { width: 135, height: 40, badge: 'text-xs px-2.5 py-0.5' },
    lg: { width: 165, height: 49, badge: 'text-xs px-3 py-1' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official dot.Sales Logo */}
      <div className="relative flex items-center">
        <Image
          src="/logo.png"
          alt="dot.Sales Logo"
          width={current.width}
          height={current.height}
          priority
          className="object-contain w-auto h-auto max-h-[40px]"
        />
      </div>

      {whiteLabelBadge && (
        <span className={`bg-brand-pale text-brand-primary font-bold rounded-full border border-brand-mint uppercase tracking-wider shrink-0 ${current.badge}`}>
          White Label
        </span>
      )}
    </div>
  );
};
