import React from 'react';
import { Badge } from './ui/Badge';
import {
  Compass,
  GitPullRequest,
  Share2,
  LineChart,
  Palette,
  Smartphone,
  LayoutGrid,
} from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Compass,
      title: 'Rastreamento de origem',
      description: 'Identificação de campanha, anúncio, criativo e identificadores de clique disponíveis.',
    },
    {
      icon: GitPullRequest,
      title: 'Jornada comercial',
      description: 'Acompanhamento do lead pelas etapas de atendimento, qualificação, negociação e venda.',
    },
    {
      icon: Share2,
      title: 'Integração com Meta Ads',
      description: 'Envio de eventos comerciais e personalizados conforme configuração técnica.',
    },
    {
      icon: LineChart,
      title: 'Dashboard comercial',
      description: 'CPL, CAC, ROAS e indicadores comerciais com base nos dados disponíveis.',
    },
    {
      icon: Palette,
      title: 'Personalização White Label',
      description: 'Domínio próprio, login exclusivo, cores da agência e e-mails transacionais.',
    },
    {
      icon: Smartphone,
      title: 'CRM mobile',
      description: 'Interface otimizada para celular e experiência instalável em ambientes compatíveis.',
    },
    {
      icon: LayoutGrid,
      title: 'Painel da agência',
      description: 'Administração centralizada dos clientes vinculados à sua operação White Label.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-brand-offwhite/50 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="pale" className="mb-3">
            RECURSOS DE PRODUTO
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark tracking-tight">
            Tecnologia corporativa pronta para sua operação
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted">
            Tudo o que sua agência precisa para entregar valor imediato aos seus clientes.
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.slice(0, 4).map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-mint card-hover-effect flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-pale text-brand-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-brand-dark mb-1.5">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2nd row: 3 features centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {features.slice(4).map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-mint card-hover-effect flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-pale text-brand-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-brand-dark mb-1.5">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
