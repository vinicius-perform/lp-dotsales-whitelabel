'use client';

import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Coins, BarChart2, ShieldPlus, ArrowRight } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('formulario-qualificacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const benefits = [
    {
      icon: Coins,
      title: 'Venda tecnologia para quem já compra seus serviços.',
      description:
        'Transforme clientes da sua carteira em potenciais assinantes do CRM com a marca da sua agência.',
      tag: 'Nova Receita',
      impact: 'Monetização de base existente',
    },
    {
      icon: BarChart2,
      title: 'Mostre o que aconteceu depois que o lead chegou.',
      description:
        'Acompanhe etapas comerciais, atendimentos e vendas para aprofundar a análise das campanhas.',
      tag: 'Comprovação Real',
      impact: 'Visão além do gerenciador',
    },
    {
      icon: ShieldPlus,
      title: 'Crie um novo vínculo com seus clientes.',
      description:
        'Além da gestão de tráfego, sua agência passa a oferecer uma ferramenta que pode continuar sendo utilizada no dia a dia da operação comercial.',
      tag: 'Retenção Alta',
      impact: 'Menor risco de churn',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="pale" className="mb-4">
            VANTAGEM ESTRATÉGICA
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight">
            Mais receita para sua agência.{' '}
            <span className="text-brand-primary">Mais controle sobre os resultados dos seus clientes.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Uma relação comercial mais lucrativa, sólida e baseada em dados reais de vendas.
          </p>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <Card
                key={idx}
                className="flex flex-col justify-between p-8 border border-brand-border bg-white rounded-card-lg relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-pale text-brand-primary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-offwhite text-brand-dark border border-brand-border">
                      {b.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-brand-dark mb-3 tracking-tight leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-primary">
                  <span>{b.impact}</span>
                  <ArrowRight className="w-4 h-4 text-brand-primary" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Central CTA */}
        <div className="mt-16 text-center">
          <Button onClick={scrollToForm} variant="primary" size="lg" withArrow>
            QUERO TER MEU PRÓPRIO CRM
          </Button>
        </div>

      </div>
    </section>
  );
};
