import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-brand-primary text-white py-2 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border-b border-brand-primaryHover">
      <Sparkles className="w-3.5 h-3.5 text-brand-light animate-pulse" />
      <span>EXCLUSIVO PARA DONOS DE AGÊNCIAS DE TRÁFEGO E PERFORMANCE</span>
    </div>
  );
};
