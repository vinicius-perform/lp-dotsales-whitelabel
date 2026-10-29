'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Badge } from './ui/Badge';
import { Sparkles, Users, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

const InteractiveGlobe = dynamic(
  () => import('./InteractiveGlobe').then((mod) => mod.InteractiveGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-44 h-44 rounded-full border-2 border-dashed border-brand-primary/20 animate-spin duration-1000 opacity-60" />
      </div>
    ),
  }
);

interface ClientItem {
  name: string;
  role: string;
  image: string;
}

const CLIENTS: ClientItem[] = [
  {
    name: 'Dr. Lemuel Gomes',
    role: 'Clínicas Dr. Brasil',
    image: '/assets/clients/lemuel-gomes.jpeg',
  },
  {
    name: 'Dr. Pedro Lima',
    role: 'Harmonização Corporal',
    image: '/assets/clients/pedro-lima.jpeg',
  },
  {
    name: 'Dr. Rafael Almenara',
    role: 'Harmonização Corporal',
    image: '/assets/clients/rafael-almenara.jpeg',
  },
  {
    name: 'Dra. Keyla Klava',
    role: 'Harmonização Corporal',
    image: '/assets/clients/keyla-klava.jpeg',
  },
  {
    name: 'Dra. Lannay',
    role: 'Full Faceplastia',
    image: '/assets/clients/lannay.jpeg',
  },
  {
    name: 'Dra. Marcela Fiel',
    role: 'Harmonização Corporal',
    image: '/assets/clients/marcela-fiel.jpeg',
  },
  {
    name: 'Mathyas Santos',
    role: 'Fazendo Acontecer',
    image: '/assets/clients/mathyas.jpg',
  },
  {
    name: 'Dr. Cristiano César',
    role: 'Harmonização Corporal',
    image: '/assets/clients/cristiano-cesar.jpeg',
  },
  {
    name: 'Dr. Fernando Silveira',
    role: 'Faceplastia',
    image: '/assets/clients/fernando-silveira.jpeg',
  },
  {
    name: 'Dr. Flegon David',
    role: 'Harmonização Corporal',
    image: '/assets/clients/flegon-david.jpeg',
  },
  {
    name: 'Dr. Gustavo Rocha',
    role: 'Alta Performance',
    image: '/assets/clients/gustavo-rocha.jpeg',
  },
];

export const SocialProofSection: React.FC = () => {
  // Duplicate array for seamless infinite marquee loop
  const carouselItems = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PARTE SUPERIOR: GLOBO 3D + COPY EDITORIAL E INDICADORES OFICIAIS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20">
          
          {/* Coluna Esquerda: Copy Editorial e Indicadores */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center">
              <Badge variant="mint" className="py-1 px-3.5 text-xs font-bold tracking-wider">
                <Users className="w-3.5 h-3.5 mr-1.5 text-brand-primary" />
                QUEM CONFIA NA DOT.SALES
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-brand-dark tracking-tighter-title leading-title-section">
              Por trás de cada operação comercial, existem{' '}
              <span className="text-brand-primary">pessoas e empresas reais.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-xl font-normal">
              Conheça alguns dos profissionais e clínicas que utilizam a infraestrutura dot.Sales e veja como a plataforma se conecta à rotina de negócios que precisam transformar conversas no WhatsApp em vendas previsíveis.
            </p>

            {/* Indicadores Oficiais de Credibilidade */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-border/70">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
                  +500
                </div>
                <div className="text-xs sm:text-sm text-brand-muted font-medium leading-tight">
                  empresas usando
                </div>
              </div>

              <div className="space-y-1 border-l border-brand-border/70 pl-4">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
                  +2M
                </div>
                <div className="text-xs sm:text-sm text-brand-muted font-medium leading-tight">
                  mensagens/mês
                </div>
              </div>

              <div className="space-y-1 border-l border-brand-border/70 pl-4">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
                  +24%
                </div>
                <div className="text-xs sm:text-sm text-brand-muted font-medium leading-tight">
                  conversão média
                </div>
              </div>
            </div>

            {/* Selo de autoridade em texto */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-brand-muted font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
              <span>Tecnologia robusta operando no dia a dia de clínicas e empresas de alto padrão</span>
            </div>
          </div>

          {/* Coluna Direita: Globo 3D Interativo */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-brand-pale/50 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="w-full h-[360px] sm:h-[440px] relative rounded-3xl bg-brand-offwhite/40 border border-brand-border/50 shadow-inner flex items-center justify-center overflow-hidden">
              <InteractiveGlobe className="w-full h-full" />
              
              {/* Interaction Hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="text-[11px] font-medium text-brand-muted/80 bg-white/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-brand-border/40 shadow-2xs">
                  Arraste para girar as conexões 3D
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* PARTE INFERIOR: CARROSSEL INFINITO DE CLIENTES */}
        <div className="pt-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-widest text-brand-muted uppercase">
              Quem já vende com o dot.Sales
            </span>
          </div>

          {/* Wrapper com fade lateral moderno */}
          <div className="relative w-full overflow-hidden">
            {/* Lateral Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            {/* Marquee Track */}
            <div className="flex gap-4 sm:gap-5 animate-marquee hover:[animation-play-state:paused] w-max py-3">
              {carouselItems.map((client, idx) => (
                <div
                  key={idx}
                  className="group relative flex-shrink-0 w-[200px] sm:w-[230px] md:w-[250px] h-[280px] sm:h-[320px] md:h-[340px] rounded-2xl overflow-hidden shadow-card border border-brand-border/80 bg-brand-offwhite transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
                >
                  {/* Photo */}
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 230px, 250px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority={idx < 4}
                  />

                  {/* Dark gradient overlay on bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Card Label info */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-xs">
                      {client.name}
                    </h3>
                    <p className="text-xs text-brand-mint font-medium mt-0.5 leading-tight opacity-95">
                      {client.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
