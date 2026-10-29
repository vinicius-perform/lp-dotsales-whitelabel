import React from 'react';
import Image from 'next/image';
import { CheckCircle2, TrendingUp, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Badge } from './ui/Badge';
import { QualificationForm } from './QualificationForm';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden hero-gradient pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 border-b border-brand-border/60">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-light/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-mint/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center">
              <Badge variant="mint" className="py-1 px-3.5 text-xs font-bold tracking-wider">
                <Layers className="w-3.5 h-3.5 mr-1 text-brand-primary" />
                DOT.SALES WHITE LABEL | PARA AGÊNCIAS
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-brand-dark tracking-tighter-hero leading-[1.08]">
              Transforme cada cliente da sua agência em{' '}
              <span className="text-brand-primary underline decoration-brand-light decoration-4 underline-offset-4">
                uma nova oportunidade de receita mensal.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-brand-muted leading-relaxed max-w-2xl font-normal">
              Tenha um CRM com a marca da sua agência, sem desenvolver a infraestrutura, e acompanhe os resultados comerciais dos leads que você gera.
            </p>

            {/* Microbenefits list */}
            <div className="space-y-3 pt-2">
              {[
                'CRM com a marca da sua agência (domínio, cores e logo).',
                'Nova receita recorrente com os clientes que você já atende.',
                'Rastreamento comercial integrado ao tráfego pago (Meta Ads e WhatsApp).',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-brand-dark">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Micro-proof badge */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-brand-border/60">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-muted font-medium">
                <TrendingUp className="w-4 h-4 text-brand-primary shrink-0" />
                <span>+ Margem por cliente</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-muted font-medium">
                <Zap className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Tecnologia pronta, sem código</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-muted font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Infraestrutura dot.Sales</span>
              </div>
            </div>

            {/* Official Meta Tech Provider endorsement */}
            <div className="pt-1 flex items-center gap-3 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-brand-border/70 max-w-lg">
              <Image
                src="/assets/meta-tech-provider.png"
                alt="Meta Tech Provider"
                width={120}
                height={26}
                priority
                className="h-6 w-auto object-contain shrink-0"
              />
              <span className="text-xs text-brand-muted border-l border-brand-border/80 pl-2.5 leading-snug">
                Integração nativa oficial homologada com <br />
                <strong className="text-brand-dark font-semibold">Meta Ads</strong> e{' '}
                <strong className="text-brand-dark font-semibold">WhatsApp Cloud API</strong>
              </span>
            </div>

          </div>

          {/* Right Column: Qualification Form */}
          <div className="lg:col-span-5">
            <QualificationForm />
          </div>

        </div>
      </div>
    </section>
  );
};
