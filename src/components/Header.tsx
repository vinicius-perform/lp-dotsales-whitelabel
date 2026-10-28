'use client';

import React from 'react';
import { DotSalesLogo } from './ui/DotSalesLogo';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('formulario-qualificacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-border/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center" aria-label="dot.Sales White Label">
          <DotSalesLogo size="md" whiteLabelBadge={false} />
        </a>

        <div className="flex items-center gap-4">
          <Button
            onClick={scrollToForm}
            variant="primary"
            size="sm"
            className="sm:text-sm shadow-sm"
          >
            Conhecer White Label
          </Button>
        </div>
      </div>
    </header>
  );
};
