'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  GitBranch,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Smartphone,
  ExternalLink,
  Target,
  Flame,
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export const ProductDemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'pipeline' | 'dashboard'>('chat');

  const scrollToForm = () => {
    const el = document.getElementById('formulario-qualificacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="pale" className="mb-4">
            MAIS QUE UM CRM COM SUA MARCA
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight">
            Sua agência gera os leads. Agora também pode{' '}
            <span className="text-brand-primary">acompanhar o que acontece até a venda.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            Com a dot.Sales, sua agência pode conectar a origem dos leads ao processo comercial, acompanhar sua evolução no funil e visualizar resultados que não aparecem apenas no gerenciador de anúncios.
          </p>
        </div>

        {/* Two-column Feature / Demo layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Key Points of Support */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              
              {/* Point 1 */}
              <div 
                onClick={() => setActiveTab('chat')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'border-brand-primary bg-brand-pale/50 shadow-sm'
                    : 'border-brand-border bg-white hover:border-brand-mint'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-pale text-brand-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark">
                      Identificação da origem dos leads
                    </h3>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                      Rastreie de onde o lead veio: campanha, conjunto de anúncio, criativo específico do Meta Ads e parâmetros UTM direto na conversa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div 
                onClick={() => setActiveTab('pipeline')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 'pipeline'
                    ? 'border-brand-primary bg-brand-pale/50 shadow-sm'
                    : 'border-brand-border bg-white hover:border-brand-mint'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-pale text-brand-primary flex items-center justify-center shrink-0">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark">
                      Histórico da jornada comercial e pipeline
                    </h3>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                      Visualize a evolução por etapas: Primeiro Contato, Qualificação, Negociação e Fechamento. Saiba exatamente onde as vendas travam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 3 */}
              <div 
                onClick={() => setActiveTab('dashboard')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'border-brand-primary bg-brand-pale/50 shadow-sm'
                    : 'border-brand-border bg-white hover:border-brand-mint'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-pale text-brand-primary flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark">
                      Indicadores de performance e vendas
                    </h3>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                      Cruze investimento de mídia com receita faturada: CPL, CAC, ROAS real e conversões confirmadas pelo time de vendas do seu cliente.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <Button onClick={scrollToForm} variant="primary" size="lg" withArrow>
                QUERO CONHECER O WHITE LABEL
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Product UI Demo */}
          <div className="lg:col-span-7">
            <div className="bg-brand-offwhite rounded-3xl p-3 sm:p-5 border border-brand-border shadow-card relative">
              
              {/* Fake Browser / OS Window Bar */}
              <div className="bg-white rounded-2xl p-4 border border-brand-border/70 shadow-sm mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs font-mono text-brand-muted bg-brand-offwhite px-3 py-1 rounded-md border border-brand-border">
                      crm.suaagencia.com.br
                    </span>
                  </div>

                  {/* Tab switchers */}
                  <div className="flex items-center gap-1 bg-brand-offwhite p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activeTab === 'chat'
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'text-brand-muted hover:text-brand-dark'
                      }`}
                    >
                      WhatsApp & Rastreio
                    </button>
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activeTab === 'pipeline'
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'text-brand-muted hover:text-brand-dark'
                      }`}
                    >
                      Pipeline
                    </button>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activeTab === 'dashboard'
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'text-brand-muted hover:text-brand-dark'
                      }`}
                    >
                      Métricas
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Mockup Viewport */}
              <div className="bg-white rounded-2xl border border-brand-border p-4 sm:p-6 overflow-hidden min-h-[380px] flex flex-col justify-between">
                
                {/* TAB 1: Chat com WhatsApp & Rastreio de Campanha */}
                {activeTab === 'chat' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary text-white font-bold flex items-center justify-center text-sm">
                          RA
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-dark">Rodrigo Andrade</span>
                            <span className="text-[10px] bg-brand-pale text-brand-primary font-bold px-2 py-0.5 rounded-full">
                              Lead Qualificado
                            </span>
                          </div>
                          <span className="text-xs text-brand-muted">WhatsApp • (11) 98765-4321</span>
                        </div>
                      </div>

                      {/* Origin tracker tag */}
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Origem Detectada</span>
                        <span className="text-xs font-semibold text-brand-primary bg-brand-pale px-2.5 py-1 rounded-md border border-brand-mint">
                          Meta Ads • [Campanha_Escala_Q3]
                        </span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-3 py-2">
                      <div className="bg-brand-offwhite p-3 rounded-2xl rounded-tl-none max-w-md text-xs sm:text-sm text-brand-dark border border-brand-border/70">
                        <p>Olá! Vi o anúncio de vocês no Instagram sobre a consultoria e gostaria de agendar uma reunião para minha empresa.</p>
                        <span className="text-[10px] text-brand-muted mt-1 block">14:22 • Anúncio ID: #cr_video_depoimento_04</span>
                      </div>
                      
                      <div className="bg-brand-pale text-brand-dark p-3 rounded-2xl rounded-tr-none max-w-md ml-auto text-xs sm:text-sm border border-brand-mint">
                        <p>Olá Rodrigo! Perfeito. Já verifiquei seus dados e separei os horários disponíveis para apresentação.</p>
                        <span className="text-[10px] text-brand-primary font-semibold mt-1 block">14:24 • Atendente: Julia (Comercial)</span>
                      </div>
                    </div>

                    {/* Attribution Metadata Card */}
                    <div className="bg-brand-pale/60 rounded-xl p-3 border border-brand-mint/80 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-brand-primary flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Atribuição Comercial da Agência
                        </span>
                        <span className="font-mono text-[10px] text-brand-muted">fbclid: iwAR32_x81...</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-brand-dark font-medium">
                        <div><span className="text-brand-muted">Canal:</span> Instagram Feed</div>
                        <div><span className="text-brand-muted">Criativo:</span> Video_Case_02</div>
                        <div><span className="text-brand-muted">Custo Lead:</span> R$ 14,80</div>
                        <div><span className="text-brand-muted">Status:</span> Em Negociação</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: Pipeline de Vendas */}
                {activeTab === 'pipeline' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Funil de Vendas do Cliente</span>
                      <span className="text-xs font-bold text-brand-primary">48 Oportunidades Ativas</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {/* Col 1 */}
                      <div className="bg-brand-offwhite p-2.5 rounded-xl border border-brand-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-brand-dark">Novos Leads</span>
                          <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono font-bold">18</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white p-2 rounded-lg border border-brand-border text-xs shadow-2xs">
                            <p className="font-bold text-brand-dark">Dr. Gustavo Melo</p>
                            <span className="text-[10px] text-brand-primary font-semibold">Meta Ads • CPL R$ 12</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-brand-border text-xs shadow-2xs">
                            <p className="font-bold text-brand-dark">Studio Estética Prime</p>
                            <span className="text-[10px] text-brand-primary font-semibold">Instagram Direct</span>
                          </div>
                        </div>
                      </div>

                      {/* Col 2 */}
                      <div className="bg-brand-offwhite p-2.5 rounded-xl border border-brand-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-brand-dark">Em Qualificação</span>
                          <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono font-bold">14</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white p-2 rounded-lg border border-brand-border text-xs shadow-2xs">
                            <p className="font-bold text-brand-dark">Marina Silva (Imóveis)</p>
                            <span className="text-[10px] text-brand-muted">Agendamento feito</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-brand-border text-xs shadow-2xs">
                            <p className="font-bold text-brand-dark">Nexus Logística</p>
                            <span className="text-[10px] text-brand-muted">Reunião hoje 16h</span>
                          </div>
                        </div>
                      </div>

                      {/* Col 3 */}
                      <div className="bg-brand-pale/50 p-2.5 rounded-xl border border-brand-mint">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-brand-primary">Fechamento</span>
                          <span className="text-[10px] bg-brand-primary text-white px-1.5 py-0.5 rounded font-mono font-bold">16</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white p-2 rounded-lg border border-brand-mint text-xs shadow-2xs">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-brand-dark">Tech Soluções</p>
                              <span className="text-[10px] font-bold text-brand-primary">R$ 15.000</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-semibold">Contrato Assinado</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-brand-mint text-xs shadow-2xs">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-brand-dark">Clinica OdontoFit</p>
                              <span className="text-[10px] font-bold text-brand-primary">R$ 8.500</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-semibold">Venda Confirmada</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Métricas & Dashboard Comercial */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Painel de Retorno da Campanha</span>
                      <span className="text-xs bg-brand-pale text-brand-primary font-bold px-2 py-0.5 rounded">Últimos 30 dias</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                        <span className="text-[10px] uppercase font-bold text-brand-muted">Investimento</span>
                        <p className="text-base sm:text-lg font-extrabold text-brand-dark mt-0.5">R$ 4.250</p>
                        <span className="text-[10px] text-brand-muted">Meta Ads</span>
                      </div>
                      <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                        <span className="text-[10px] uppercase font-bold text-brand-muted">Leads Totais</span>
                        <p className="text-base sm:text-lg font-extrabold text-brand-dark mt-0.5">312</p>
                        <span className="text-[10px] text-brand-primary font-semibold">CPL R$ 13,62</span>
                      </div>
                      <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                        <span className="text-[10px] uppercase font-bold text-brand-muted">Vendas Fechadas</span>
                        <p className="text-base sm:text-lg font-extrabold text-brand-dark mt-0.5">38</p>
                        <span className="text-[10px] text-brand-primary font-semibold">12.1% Conversão</span>
                      </div>
                      <div className="bg-brand-pale p-3 rounded-xl border border-brand-mint">
                        <span className="text-[10px] uppercase font-bold text-brand-primary">Faturamento</span>
                        <p className="text-base sm:text-lg font-extrabold text-brand-primary mt-0.5">R$ 48.900</p>
                        <span className="text-[10px] text-brand-primary font-bold">ROAS 11.5x</span>
                      </div>
                    </div>

                    <div className="bg-brand-offwhite rounded-xl p-3 border border-brand-border text-xs flex items-center justify-between">
                      <span className="text-brand-muted">Dados integrados em tempo real com a operação do cliente</span>
                      <span className="font-semibold text-brand-primary flex items-center gap-1">
                        Sinal de conversão enviado ao Meta
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom branding bar */}
                <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Ambiente White Label Ativo</span>
                  </div>
                  <span className="font-semibold text-brand-dark">Sua Agência CRM</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
