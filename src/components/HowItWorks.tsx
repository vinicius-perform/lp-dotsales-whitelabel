import React from 'react';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { Info, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Solicite uma apresentação',
      description:
        'Preencha as informações da sua agência para que nossa equipe entenda seu perfil e sua carteira de clientes.',
      highlight: 'Análise de perfil',
    },
    {
      number: '02',
      title: 'Conheça sua operação White Label',
      description:
        'Veja como funcionam a personalização da marca, os recursos do CRM e o modelo de comercialização para seus clientes.',
      highlight: 'Apresentação guiada',
    },
    {
      number: '03',
      title: 'Comece a estruturar sua nova receita',
      description:
        'Após a contratação e configuração, sua agência poderá oferecer o CRM à própria carteira e acompanhar a expansão dos usuários ativos.',
      highlight: 'Expansão de margem',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite/60 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="pale" className="mb-4">
            SIMPLES DE COMEÇAR
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tight">
            Seu próprio CRM em três passos.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Um caminho estruturado para sua agência adicionar um ativo de software à sua oferta.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, idx) => (
            <Card
              key={idx}
              className="relative flex flex-col justify-between p-8 border border-brand-border bg-white rounded-card-lg"
            >
              <div>
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-brand-primary/80 font-mono tracking-tighter">
                    {st.number}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-pale text-brand-primary border border-brand-mint/60">
                    {st.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">
                  {st.title}
                </h3>

                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-brand-border/50 flex items-center gap-2 text-xs font-semibold text-brand-primary">
                <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                <span>Processo consultivo sem atrito</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Legal/Disclaimer Note */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-xs text-brand-muted flex items-center justify-center gap-2 bg-white py-2.5 px-4 rounded-full border border-brand-border shadow-xs">
            <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span>A implantação depende da contratação, configuração e condições comerciais acordadas.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
