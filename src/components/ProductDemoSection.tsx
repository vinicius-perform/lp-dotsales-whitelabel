'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  BarChart3,
  Users,
  Palette,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

type TabId = 'rastreio' | 'dashboard' | 'painel' | 'marca';

export const ProductDemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('rastreio');

  const scrollToForm = () => {
    const el = document.getElementById('formulario-qualificacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const tabs = [
    {
      id: 'rastreio' as TabId,
      icon: MessageSquare,
      title: 'Rastreio de anúncio e conversa',
      desc: (
        <>
          O lead clica no anúncio e a origem entra no contato no WhatsApp com identificador exato (
          <code className="font-mono text-brand-primary text-xs">ctwa_clid</code>, campanha e criativo).
        </>
      ),
      browserUrl: 'app.suaagencia.com.br/dashboard',
    },
    {
      id: 'dashboard' as TabId,
      icon: BarChart3,
      title: 'Dashboard comercial integrado ao Meta',
      desc: (
        <>
          Investimento puxado da conta conectada, CPL, vendas e ROAS real apurado por canal com envio de evento{' '}
          <code className="font-mono text-brand-primary text-xs">Purchase</code> ao Meta.
        </>
      ),
      browserUrl: 'app.suaagencia.com.br/dashboard',
    },
    {
      id: 'painel' as TabId,
      icon: Users,
      title: 'Sua carteira de clientes num painel só',
      desc: 'Administre todos os clientes, receita recorrente, usuários ativos e alertas preventivos de canais em um único login master.',
      browserUrl: 'app.suaagencia.com.br/parceiro',
    },
    {
      id: 'marca' as TabId,
      icon: Palette,
      title: 'Seu cliente só vê a sua marca',
      desc: (
        <>
          Acesso por <code className="font-mono text-brand-primary text-xs">app.suaagencia.com.br</code> com seu
          logotipo, cores e identidade visual sem menção à dot.Sales.
        </>
      ),
      browserUrl: 'app.suaagencia.com.br/login',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="pale" className="mb-4">
            TECNOLOGIA REAL HOMOLOGADA
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-brand-dark tracking-tighter-title leading-title-section">
            Sua agência gera os leads. Agora também pode{' '}
            <span className="text-brand-primary">acompanhar o que acontece até a venda.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            A infraestrutura oficial da dot.Sales conecta o clique exato do anúncio no Meta Ads até a confirmação do pedido, dando à sua agência comprovação cirúrgica de ROI e um CRM completo com a sua marca.
          </p>
        </div>

        {/* Two-column Feature / Demo layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Feature Selector Cards with Polished Active States */}
          <div className="lg:col-span-5 space-y-3.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 ease-out cursor-pointer overflow-hidden group select-none ${
                    isActive
                      ? 'border-brand-primary bg-brand-pale/70 shadow-sm ring-1 ring-brand-primary/20'
                      : 'border-brand-border bg-white hover:border-brand-mint hover:bg-brand-offwhite/70'
                  }`}
                >
                  {/* Smooth active indicator bar on left border */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 bg-brand-primary transition-all duration-300 ease-out ${
                      isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-30'
                    }`}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-primary text-white shadow-xs scale-105'
                          : 'bg-brand-pale text-brand-primary scale-100 group-hover:bg-brand-pale/90'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-dark tracking-tight-card transition-colors duration-200">
                        {tab.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                        {tab.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex items-center gap-4">
              <Button onClick={scrollToForm} variant="primary" size="md" withArrow>
                QUERO CONHECER O WHITE LABEL
              </Button>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-muted">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>Meta Tech Provider</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Browser Mockup with Smooth Crossfade */}
          <div className="lg:col-span-7">
            <div className="bg-brand-offwhite rounded-3xl p-3 sm:p-5 border border-brand-border shadow-card relative">
              
              {/* Official Browser Window Bar */}
              <div className="bg-white rounded-2xl p-3.5 border border-brand-border/70 shadow-xs mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-2 flex items-center gap-1.5 text-xs font-mono text-brand-muted bg-brand-offwhite px-3 py-1 rounded-md border border-brand-border transition-all duration-300">
                      <Lock className="w-3 h-3 text-brand-muted" />
                      <span>{currentTab.browserUrl}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-brand-primary bg-brand-pale px-2.5 py-0.5 rounded-full border border-brand-mint">
                    Interface Oficial
                  </span>
                </div>
              </div>

              {/* Dynamic Screen Viewport with True Crossfade Grid Stacking */}
              <div className="bg-white rounded-2xl border border-brand-border p-4 sm:p-6 overflow-hidden min-h-[460px] flex flex-col justify-between relative shadow-xs">
                
                {/* Crossfade Grid Stack: all views rendered together in same space */}
                <div className="grid grid-cols-1 grid-rows-1 relative flex-1">
                  
                  {/* VIEW 1: Rastreio de Anúncio e Atendimento */}
                  <div
                    className={`col-start-1 row-start-1 w-full transition-all duration-350 ease-in-out ${
                      activeTab === 'rastreio'
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 translate-y-1 scale-[0.985] pointer-events-none z-0'
                    }`}
                    aria-hidden={activeTab !== 'rastreio'}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-pale px-2 py-0.5 rounded">
                            Rastreio de Anúncio
                          </span>
                          <h4 className="text-base font-bold text-brand-dark mt-1">
                            Origem confirmada no WhatsApp
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-brand-muted block font-mono">ctwa_clid</span>
                          <span className="text-xs font-mono font-bold text-brand-dark bg-brand-offwhite px-2 py-1 rounded border border-brand-border">
                            ARAkLx...f9Qd
                          </span>
                        </div>
                      </div>

                      {/* Screenshot real do chat dot.Sales */}
                      <div className="relative rounded-xl overflow-hidden border border-brand-border shadow-xs bg-slate-50">
                        <Image
                          src="/assets/official-crm-chat-interface.png"
                          alt="Interface oficial de conversa e rastreamento dot.Sales"
                          width={1200}
                          height={700}
                          priority
                          className="w-full h-auto object-cover max-h-[280px]"
                        />
                      </div>

                      {/* Origem e identificadores reconhecidos pelo CRM */}
                      <div className="bg-brand-offwhite rounded-xl p-3 border border-brand-border/70 text-xs">
                        <span className="font-bold text-brand-dark block mb-1">
                          Canais de origem reconhecidos pelo dot.Sales:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                          <div className="bg-white p-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-muted block">Instagram & Facebook:</span>
                            <code className="font-mono text-brand-primary font-semibold">ctwa_clid</code>
                          </div>
                          <div className="bg-white p-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-muted block">Comentário em anúncio:</span>
                            <code className="font-mono text-brand-primary font-semibold">ad_id</code>
                          </div>
                          <div className="bg-white p-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-muted block">Google Ads:</span>
                            <code className="font-mono text-brand-primary font-semibold">gclid</code>
                          </div>
                          <div className="bg-white p-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-muted block">Formulários & Webhooks:</span>
                            <code className="font-mono text-brand-primary font-semibold">utm_*</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VIEW 2: Dashboard Real Oficial de Vendas */}
                  <div
                    className={`col-start-1 row-start-1 w-full transition-all duration-350 ease-in-out ${
                      activeTab === 'dashboard'
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 translate-y-1 scale-[0.985] pointer-events-none z-0'
                    }`}
                    aria-hidden={activeTab !== 'dashboard'}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-brand-dark">Funil de vendas · outubro</h4>
                          <span className="text-[10px] bg-brand-offwhite text-brand-muted px-2 py-0.5 rounded font-bold border border-brand-border">
                            Exemplo Real
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-brand-primary">Conta Meta Ads conectada</span>
                      </div>

                      {/* 6 KPIs Oficiais da dot.Sales */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted font-medium block">Investimento (Meta Ads)</small>
                          <b className="text-lg font-extrabold text-brand-dark tracking-tight">R$ 26.100</b>
                        </div>
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted font-medium block">Leads</small>
                          <b className="text-lg font-extrabold text-brand-dark tracking-tight">371</b>
                        </div>
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted font-medium block">Custo por lead</small>
                          <b className="text-lg font-extrabold text-brand-dark tracking-tight">R$ 70</b>
                        </div>
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted font-medium block">Vendas</small>
                          <b className="text-lg font-extrabold text-brand-dark tracking-tight">54</b>
                        </div>
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted font-medium block">CAC</small>
                          <b className="text-lg font-extrabold text-brand-dark tracking-tight">R$ 483</b>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-xl border border-brand-mint">
                          <small className="text-[11px] text-brand-primary font-bold block">ROAS Oficial</small>
                          <b className="text-xl font-extrabold text-brand-primary tracking-tight">7,6×</b>
                        </div>
                      </div>

                      {/* Origem das Vendas com barras reais oficiais */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-bold text-brand-dark block">Origem das vendas:</span>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="w-28 text-brand-muted">Instagram Ads</span>
                            <div className="flex-1 bg-brand-offwhite h-2.5 rounded-full overflow-hidden border border-brand-border">
                              <div className="bg-brand-primary h-full rounded-full" style={{ width: '61%' }} />
                            </div>
                            <span className="font-bold text-brand-dark w-10 text-right">61%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-28 text-brand-muted">Facebook Ads</span>
                            <div className="flex-1 bg-brand-offwhite h-2.5 rounded-full overflow-hidden border border-brand-border">
                              <div className="bg-brand-primary/80 h-full rounded-full" style={{ width: '18%' }} />
                            </div>
                            <span className="font-bold text-brand-dark w-10 text-right">18%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-28 text-brand-muted">Orgânico</span>
                            <div className="flex-1 bg-brand-offwhite h-2.5 rounded-full overflow-hidden border border-brand-border">
                              <div className="bg-brand-primary/50 h-full rounded-full" style={{ width: '12%' }} />
                            </div>
                            <span className="font-bold text-brand-dark w-10 text-right">12%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-28 text-brand-muted">Google</span>
                            <div className="flex-1 bg-brand-offwhite h-2.5 rounded-full overflow-hidden border border-brand-border">
                              <div className="bg-brand-primary/30 h-full rounded-full" style={{ width: '9%' }} />
                            </div>
                            <span className="font-bold text-brand-dark w-10 text-right">9%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-brand-pale/50 rounded-xl p-2.5 border border-brand-mint text-[11px] text-brand-muted flex items-center justify-between">
                        <span>Custo por lead, CAC e ROAS com o investimento puxado da conta conectada.</span>
                        <span className="font-mono text-brand-primary font-bold">Purchase · R$ 3.260</span>
                      </div>
                    </div>
                  </div>

                  {/* VIEW 3: Painel da Agência / Parceiro Real */}
                  <div
                    className={`col-start-1 row-start-1 w-full transition-all duration-350 ease-in-out ${
                      activeTab === 'painel'
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 translate-y-1 scale-[0.985] pointer-events-none z-0'
                    }`}
                    aria-hidden={activeTab !== 'painel'}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-pale px-2 py-0.5 rounded">
                            Painel do Parceiro
                          </span>
                          <h4 className="text-base font-bold text-brand-dark mt-1">
                            Visão geral da carteira de clientes
                          </h4>
                        </div>
                        <span className="text-[10px] bg-brand-offwhite text-brand-muted px-2 py-0.5 rounded font-bold border border-brand-border">
                          Exemplo Real
                        </span>
                      </div>

                      {/* KPIs da Carteira */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted block">Clientes ativos</small>
                          <b className="text-lg font-extrabold text-brand-dark">42</b>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-xl border border-brand-mint">
                          <small className="text-[11px] text-brand-primary font-bold block">Receita recorrente</small>
                          <b className="text-lg font-extrabold text-brand-primary">R$ 38.640</b>
                        </div>
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted block">Usuários totais</small>
                          <b className="text-lg font-extrabold text-brand-dark">196</b>
                        </div>
                        <div className="bg-brand-offwhite p-3 rounded-xl border border-brand-border">
                          <small className="text-[11px] text-brand-muted block">Alertas ativos</small>
                          <b className="text-lg font-extrabold text-amber-600">3</b>
                        </div>
                      </div>

                      {/* Monitor de Saúde & Risco Oficial */}
                      <div className="border border-brand-border rounded-xl p-3.5 bg-brand-offwhite/50 space-y-2">
                        <span className="text-xs font-bold text-brand-dark block">Saúde &amp; risco operacional:</span>
                        <div className="space-y-2 text-xs">
                          <div className="bg-white p-2.5 rounded-lg border border-brand-border flex items-center justify-between">
                            <div>
                              <b className="text-brand-dark block">Clínica Bem Viver</b>
                              <span className="text-brand-muted text-[11px]">WhatsApp desconectado há 14 min</span>
                            </div>
                            <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                              Canal caído
                            </span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-brand-border flex items-center justify-between">
                            <div>
                              <b className="text-brand-dark block">Imobiliária Norte</b>
                              <span className="text-brand-muted text-[11px]">Mensalidade vencida há 6 dias</span>
                            </div>
                            <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                              Fatura vencida
                            </span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-brand-border flex items-center justify-between">
                            <div>
                              <b className="text-brand-dark block">Auto Center JR</b>
                              <span className="text-brand-muted text-[11px]">Nenhum acesso há 9 dias</span>
                            </div>
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                              Sem uso
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VIEW 4: Mockup White Label Real */}
                  <div
                    className={`col-start-1 row-start-1 w-full transition-all duration-350 ease-in-out ${
                      activeTab === 'marca'
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 translate-y-1 scale-[0.985] pointer-events-none z-0'
                    }`}
                    aria-hidden={activeTab !== 'marca'}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-pale px-2 py-0.5 rounded">
                            White Label
                          </span>
                          <h4 className="text-base font-bold text-brand-dark mt-1">
                            Personalização integral da marca
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-primary bg-brand-pale px-2 py-1 rounded border border-brand-mint">
                          app.suaagencia.com.br
                        </span>
                      </div>

                      <div className="relative rounded-xl overflow-hidden border border-brand-border shadow-xs bg-slate-50">
                        <Image
                          src="/assets/official-whitelabel-customization.png"
                          alt="Personalização oficial White Label dot.Sales"
                          width={1200}
                          height={700}
                          className="w-full h-auto object-cover max-h-[280px]"
                        />
                      </div>

                      <div className="bg-brand-offwhite rounded-xl p-3 border border-brand-border/70 text-xs flex items-center justify-between">
                        <span className="text-brand-muted">
                          Domínio próprio, tela de login, cores, logotipo e e-mails transacionais 100% com a marca da agência.
                        </span>
                        <span className="font-bold text-brand-primary">Sem menção à dot.Sales</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom status indicator */}
                <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted mt-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Plataforma Homologada Meta Tech Provider</span>
                  </div>
                  <span className="font-semibold text-brand-dark">dot.Sales Core Engine</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
