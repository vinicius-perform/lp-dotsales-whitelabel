'use client';

import React from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('formulario-qualificacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden hero-gradient border-b border-brand-border/60">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-light/35 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <Badge variant="mint" className="mb-6">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-brand-primary" />
          OPORTUNIDADE DE ESCALA
        </Badge>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tighter-title leading-[1.1] max-w-3xl mx-auto">
          Seus clientes já precisam de um CRM.{' '}
          <span className="text-brand-primary underline decoration-brand-light decoration-4 underline-offset-4">
            Por que essa receita ainda não faz parte da sua agência?
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Conheça a operação White Label da dot.Sales e descubra como oferecer uma plataforma comercial com sua marca para os clientes que você já atende.
        </p>

        <div className="mt-10">
          <Button
            onClick={scrollToForm}
            variant="primary"
            size="lg"
            withArrow
            className="text-base sm:text-lg px-9 py-4 font-bold shadow-cardHover"
          >
            QUERO CONHECER O WHITE LABEL
          </Button>

          <p className="mt-4 text-xs sm:text-sm text-brand-muted flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span>Solicite uma apresentação sem compromisso.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
