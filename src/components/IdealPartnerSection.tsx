import React from 'react';
import { Badge } from './ui/Badge';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const IdealPartnerSection: React.FC = () => {
  const criteria = [
    'Você já possui uma carteira ativa de clientes.',
    'Sua agência trabalha com tráfego pago ou geração de leads.',
    'Seus clientes recebem oportunidades pelo WhatsApp ou Instagram.',
    'Você quer criar uma receita recorrente além da gestão de tráfego.',
    'Você deseja comprovar resultados comerciais com maior profundidade.',
    'Você quer oferecer tecnologia com sua marca, sem desenvolver um software do zero.',
  ];

  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite border-b border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Central Card */}
        <div className="bg-white rounded-card-lg p-8 sm:p-12 lg:p-14 border border-brand-border shadow-card relative overflow-hidden">
          
          {/* Subtle top decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="pale" className="mb-4">
              PARA AGÊNCIAS QUE QUEREM CRESCER
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
              Essa oportunidade faz sentido para sua agência se:
            </h2>
          </div>

          {/* Checklist */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {criteria.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-brand-offwhite/60 border border-brand-border/70 hover:border-brand-mint transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-brand-dark leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Qualified Audience Note */}
          <div className="mt-10 pt-6 border-t border-brand-border text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-brand-muted flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-brand-primary shrink-0" />
              <span>
                A solução é voltada a agências que desejam comercializar e operar um CRM para seus clientes, e não apenas contratar uma ferramenta de uso individual.
              </span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
