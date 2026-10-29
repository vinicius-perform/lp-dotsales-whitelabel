'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Badge } from './ui/Badge';
import { Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CLIENTS.length);
  }, []);

  // Pausa a rotação quando a seção não estiver visível na tela (economia de bateria e GPU)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Transição automática a cada 3 segundos (reduzido pela metade conforme solicitado)
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isInView, nextSlide]);

  // Função de estilo em 3 camadas de profundidade editorial
  const getCardStyle = (rel: number): React.CSSProperties => {
    if (rel === 0) {
      // Camada 1: Fotografia Principal em destaque total
      return {
        zIndex: 30,
        transform: 'translateX(0%) scale(1)',
        opacity: 1,
        filter: 'blur(0px)',
        pointerEvents: 'auto',
      };
    }
    if (rel === 1) {
      // Camada 2: Próxima Fotografia, posicionada à direita, com desfoque moderado
      return {
        zIndex: 20,
        transform: 'translateX(18%) scale(0.92)',
        opacity: 0.55,
        filter: 'blur(2.5px)',
        pointerEvents: 'none',
      };
    }
    if (rel === 2) {
      // Camada 3: Terceira Fotografia ao fundo com maior desfoque e opacidade sutil
      return {
        zIndex: 10,
        transform: 'translateX(34%) scale(0.84)',
        opacity: 0.28,
        filter: 'blur(4.5px)',
        pointerEvents: 'none',
      };
    }
    if (rel === CLIENTS.length - 1) {
      // Fotografia anterior saindo suavemente para a esquerda
      return {
        zIndex: 25,
        transform: 'translateX(-14%) scale(0.95)',
        opacity: 0,
        filter: 'blur(1px)',
        pointerEvents: 'none',
      };
    }
    // Demais fotos preparadas no pool de animação
    return {
      zIndex: 0,
      transform: 'translateX(40%) scale(0.8)',
      opacity: 0,
      filter: 'blur(6px)',
      pointerEvents: 'none',
    };
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-white border-b border-brand-border/60 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* COMPOSIÇÃO EDITORIAL: COPY & MÉTRICAS (ESQUERDA) + CARROSSEL EM 3 CAMADAS (DIREITA) */}
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

          {/* Coluna Direita: Carrossel Editorial em 3 Camadas Sobrepostas */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start items-center relative pl-0 lg:pl-6">
            {/* Stage proporcional com overflow horizontal contido */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/4.9] sm:h-[480px]">
              {CLIENTS.map((client, idx) => {
                const rel = (idx - currentIndex + CLIENTS.length) % CLIENTS.length;
                const style = getCardStyle(rel);
                const isMain = rel === 0;

                return (
                  <div
                    key={client.name}
                    aria-hidden={!isMain}
                    style={style}
                    className="editorial-carousel-card absolute inset-0 rounded-[24px] overflow-hidden shadow-xl shadow-slate-900/10 will-change-transform will-change-[filter,opacity]"
                  >
                    {/* Fotografia em Resolução Original e Nitidez Máxima */}
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      unoptimized
                      priority={idx < 3}
                      className="object-cover object-center"
                    />

                    {/* Gradiente escuro suave na região inferior apenas para legibilidade */}
                    {isMain && (
                      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    )}

                    {/* Informações do Cliente — Exclusivas na Fotografia Principal */}
                    {isMain && (
                      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-10 text-white animate-fade-up">
                        {/* Selo discreto de Cliente Oficial dot.Sales */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold mb-2.5 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint" />
                          <span>Cliente Oficial dot.Sales</span>
                        </div>

                        <div className="space-y-0.5">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
                            {client.name}
                          </h3>
                          <p className="text-sm sm:text-base text-brand-mint font-semibold drop-shadow-xs">
                            {client.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
