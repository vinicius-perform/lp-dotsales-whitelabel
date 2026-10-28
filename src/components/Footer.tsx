'use client';

import React, { useState } from 'react';
import { DotSalesLogo } from './ui/DotSalesLogo';
import { ShieldCheck, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-brand-border py-12 text-sm text-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-brand-border/60">
          
          {/* Logo and brief tag */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <button onClick={scrollToTop} className="focus:outline-none">
              <DotSalesLogo size="sm" />
            </button>
            <span className="hidden sm:inline text-brand-border">|</span>
            <span className="text-xs text-brand-muted">
              Plataforma de CRM e Operação White Label para Agências de Tráfego e Performance.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-brand-muted">
            <button
              onClick={() => setModalContent('privacy')}
              className="hover:text-brand-dark transition-colors"
            >
              Política de Privacidade
            </button>
            <button
              onClick={() => setModalContent('terms')}
              className="hover:text-brand-dark transition-colors"
            >
              Termos de Uso
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>
            © {new Date().getFullYear()} dot.Sales. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span>Infraestrutura corporativa com alta disponibilidade</span>
          </p>
        </div>
      </div>

      {/* Legal Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-brand-border shadow-2xl relative">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-offwhite text-brand-muted hover:text-brand-dark transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-brand-dark mb-4">
              {modalContent === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
            </h3>

            <div className="text-xs sm:text-sm text-brand-muted space-y-3 max-h-80 overflow-y-auto pr-2 leading-relaxed">
              {modalContent === 'privacy' ? (
                <>
                  <p>
                    A dot.Sales valoriza a privacidade dos dados coletados em suas plataformas e páginas de qualificação.
                  </p>
                  <p>
                    As informações fornecidas no formulário são utilizadas exclusivamente pela equipe comercial para avaliar o perfil da sua agência e agendar a apresentação do modelo White Label.
                  </p>
                  <p>
                    Seus dados não são comercializados ou compartilhados com terceiros para fins publicitários não relacionados.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    O acesso a esta página tem como objetivo a apresentação do modelo White Label da dot.Sales para agências e parceiros estratégicos.
                  </p>
                  <p>
                    As informações comerciais, condições de contratação e personalização são apresentadas de forma consultiva pela equipe de atendimento após o envio dos dados de qualificação.
                  </p>
                  <p>
                    Todos os direitos de propriedade intelectual da plataforma pertencem à dot.Sales.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border text-right">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-brand-primary text-white rounded-full text-xs font-semibold hover:bg-brand-primaryHover transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
