'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Badge } from './ui/Badge';
import { Users, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CLIENTS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CLIENTS.length) % CLIENTS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* COMPOSIÇÃO EDITORIAL: COPY & MÉTRICAS (ESQUERDA) + DESTAQUE INDIVIDUAL DE CLIENTES (DIREITA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: Copy Editorial e Indicadores Oficiais */}
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

          {/* Coluna Direita: Destaque Fotográfico dos Clientes com Crossfade Suave */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            {/* Glow sutil institucional de fundo */}
            <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div
              className="relative w-full max-w-[460px] aspect-[4/4.8] sm:h-[490px] rounded-3xl overflow-hidden shadow-2xl border border-brand-border/80 bg-brand-offwhite group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Slides dos Clientes com Crossfade Suave */}
              {CLIENTS.map((client, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={client.name}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Imagem em Resolução Original e Nitidez Máxima (Sem recompressão) */}
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      unoptimized
                      priority={idx === 0}
                      className="object-cover object-center"
                    />

                    {/* Gradiente para leitura impecável dos textos */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                    {/* Informações do Cliente */}
                    <div className="absolute bottom-16 inset-x-0 p-6 sm:p-7 z-10 text-white">
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
                          {client.name}
                        </h3>
                        <p className="text-sm sm:text-base text-brand-mint font-semibold drop-shadow-xs">
                          {client.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Tag Superior e Contador de Slides (Camada Fixa) */}
              <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint" />
                  <span>Cliente Oficial dot.Sales</span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-mono font-medium">
                  {currentIndex + 1} / {CLIENTS.length}
                </div>
              </div>

              {/* Barra de Navegação e Controles Interativos (Camada Fixa) */}
              <div className="absolute bottom-0 inset-x-0 px-6 sm:px-7 pb-4 pt-2 z-20 flex items-center justify-between border-t border-white/15 bg-gradient-to-t from-black/80 to-transparent">
                {/* Dots Indicadores com clique direto */}
                <div className="flex items-center gap-1.5">
                  {CLIENTS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === currentIndex
                          ? 'w-6 bg-brand-primary shadow-xs'
                          : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Ver cliente ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                {/* Botões Anterior e Próximo */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white border border-white/20 transition-all backdrop-blur-sm"
                    aria-label="Cliente anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white border border-white/20 transition-all backdrop-blur-sm"
                    aria-label="Próximo cliente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
