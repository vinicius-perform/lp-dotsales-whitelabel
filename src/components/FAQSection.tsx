import React from 'react';
import { Badge } from './ui/Badge';
import { Accordion } from './ui/Accordion';

export const FAQSection: React.FC = () => {
  const faqData = [
    {
      question: 'Preciso desenvolver meu próprio CRM?',
      answer:
        'Não. A dot.Sales fornece toda a infraestrutura tecnológica, servidores e atualizações contínuas, enquanto sua agência opera a solução White Label personalizada com a sua marca conforme as condições contratadas.',
    },
    {
      question: 'O CRM realmente terá a marca da minha agência?',
      answer:
        'A solução permite personalizar elementos como domínio próprio (ex: crm.suaagencia.com.br), cores da interface, logotipo, tela de login e identidade visual das mensagens, garantindo total posicionamento da sua empresa.',
    },
    {
      question: 'Posso vender o CRM para os clientes que já atendo?',
      answer:
        'Sim. Essa é a principal aplicação do modelo White Label: comercializar a plataforma diretamente para a carteira atual de tráfego e marketing, criando uma nova receita recorrente sem precisar prospectar novos clientes.',
    },
    {
      question: 'O CRM permite acompanhar resultados de tráfego pago?',
      answer:
        'Sim. A plataforma possui recursos de identificação de origem e acompanhamento da jornada comercial, com dados de campanhas Meta Ads, anúncios, criativos e etapas do pipeline disponíveis conforme os canais e integrações configurados.',
    },
    {
      question: 'O sistema funciona no celular?',
      answer:
        'Sim. A interface é totalmente otimizada para dispositivos móveis e conta com experiência instalável nos ambientes compatíveis, permitindo que as equipes comerciais dos seus clientes atendam leads onde estiverem.',
    },
    {
      question: 'Posso administrar diferentes clientes em um único ambiente?',
      answer:
        'O modelo White Label conta com painel de administração centralizada para a gestão dos clientes vinculados à agência, facilitando o gerenciamento das contas e a visualização do ecossistema.',
    },
    {
      question: 'Como funciona a contratação?',
      answer:
        'Após o envio das informações pelo formulário de qualificação desta página, nossa equipe comercial agenda uma apresentação exclusiva, esclarece os detalhes do modelo de parceria e orienta sobre os próximos passos.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="pale" className="mb-4">
            DÚVIDAS FREQUENTES
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-brand-dark tracking-tighter-title leading-title-section">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Tire suas dúvidas sobre a operação White Label da dot.Sales.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion items={faqData} />

      </div>
    </section>
  );
};
