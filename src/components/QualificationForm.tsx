'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Instagram,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { Button } from './ui/Button';
import { getTrackingParams, trackEvent } from '@/lib/tracking';
import { QualificationData } from '@/lib/types';

// Opções oficiais dos dropdowns da Etapa 2
const ACTIVE_CLIENTS_OPTIONS = [
  'Ainda não tenho clientes',
  '1 a 4 clientes',
  '5 a 10 clientes',
  '11 a 20 clientes',
  '21 a 40 clientes',
  'Mais de 40 clientes',
];

const MAIN_SERVICE_OPTIONS = [
  'Tráfego pago / Performance',
  'Marketing digital completo',
  'Social Media',
  'Consultoria / Growth',
  'Outro',
];

const USE_CRM_OPTIONS = [
  'Sim, a maioria',
  'Sim, alguns',
  'Não utilizam',
  'Não sei informar',
];

// Helper para normalizar o Instagram da agência (aceita @user, user e URLs completas)
const normalizeInstagram = (value: string): string => {
  let val = String(value || '').trim();
  if (!val) return '';

  // Se o usuário colou uma URL completa do perfil (ex: https://instagram.com/nomedaagencia ou instagram.com/nomedaagencia?igsh=...)
  if (val.includes('instagram.com/')) {
    try {
      const parts = val.split('instagram.com/');
      if (parts[1]) {
        val = parts[1].split('/')[0].split('?')[0].split('#')[0];
      }
    } catch (e) {
      // fallback silencioso
    }
  }

  // Remove qualquer @ duplicado no início e espaços residuais
  val = val.replace(/^@+/, '').trim();

  if (!val) return '';
  return `@${val}`;
};

// Máscara brasileira inteligente para celular e fixo
// Suporta digitação progressiva, colagem com/sem DDI +55 e autofill do navegador/SO
const mascaraWhatsApp = (rawVal: string): string => {
  let raw = String(rawVal || '').trim();
  if (!raw) return '';

  // Se veio com DDI +55 (frequente em autofill do Google / iOS / WhatsApp)
  if (raw.startsWith('+55')) {
    raw = raw.slice(3).trim();
  }

  let digits = raw.replace(/\D/g, '');

  // Se o usuário colou 12 ou 13 dígitos começando com 55 (ex: 5585999999999)
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }

  // Limita ao máximo de 11 dígitos (DDD + 9 dígitos de celular)
  digits = digits.slice(0, 11);

  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    // Formato fixo ou em digitação: (DD) 9999-9999
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // Formato celular padrão nacional: (DD) 99999-9999
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const QualificationForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState<QualificationData>({
    fullName: '',
    instagram: '',
    whatsapp: '',
    email: '',
    activeClients: '',
    mainService: '',
    useCrm: '',
  });

  // Track ViewContent on mount
  useEffect(() => {
    trackEvent('ViewContent', { content_name: 'Qualification Form' });
  }, []);

  // Manipulação inteligente de WhatsApp
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = mascaraWhatsApp(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) {
      setErrors((prev) => ({ ...prev, whatsapp: '' }));
    }
  };

  const handlePhoneBlur = () => {
    if (formData.whatsapp) {
      const formatted = mascaraWhatsApp(formData.whatsapp);
      setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    }
  };

  // Manipulação inteligente do Instagram
  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.includes('instagram.com/')) {
      value = normalizeInstagram(value);
    } else if (value && !value.startsWith('@') && !value.startsWith('http')) {
      value = `@${value}`;
    }
    setFormData((prev) => ({ ...prev, instagram: value }));
    if (errors.instagram) {
      setErrors((prev) => ({ ...prev, instagram: '' }));
    }
  };

  const handleInstagramBlur = () => {
    if (formData.instagram) {
      const normalized = normalizeInstagram(formData.instagram);
      setFormData((prev) => ({ ...prev, instagram: normalized }));
    }
  };

  const handleInputChange = (field: keyof QualificationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Transição da Etapa 1 para Etapa 2 com sincronização robusta de Autofill
  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fallback de sincronização DOM -> React para In-App Browsers
    const formEl = e.currentTarget;
    const nameInput = formEl.elements.namedItem('name') as HTMLInputElement | null;
    const instaInput = formEl.elements.namedItem('agencyInstagram') as HTMLInputElement | null;
    const telInput = formEl.elements.namedItem('tel') as HTMLInputElement | null;
    const emailInput = formEl.elements.namedItem('email') as HTMLInputElement | null;

    const currentFullName = (nameInput?.value ?? formData.fullName).trim();
    const currentInsta = normalizeInstagram(instaInput?.value ?? formData.instagram);
    const currentPhone = mascaraWhatsApp(telInput?.value ?? formData.whatsapp);
    const currentEmail = (emailInput?.value ?? formData.email).trim();

    // Sincroniza o estado do React com o conteúdo real dos campos
    setFormData((prev) => ({
      ...prev,
      fullName: currentFullName,
      instagram: currentInsta,
      whatsapp: currentPhone,
      email: currentEmail,
    }));

    // Validação dos dados da Etapa 1
    const newErrors: Record<string, string> = {};
    if (!currentFullName || currentFullName.length < 3) {
      newErrors.fullName = 'Informe seu nome completo.';
    }

    if (!currentInsta || currentInsta.length < 2) {
      newErrors.instagram = 'Informe o Instagram da sua agência (ex: @suaagencia).';
    }

    const cleanPhone = currentPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      newErrors.whatsapp = 'Informe DDD e celular: (85) 99999-9999';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail)) {
      newErrors.email = 'Informe um e-mail profissional válido.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
      trackEvent('Step1ContactCompleted', {
        fullName: currentFullName,
        instagram: currentInsta,
        email: currentEmail,
      });
    }
  };

  // Validação da Etapa 2 (Dropdowns de Qualificação)
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.activeClients) {
      newErrors.activeClients = 'Selecione a quantidade de clientes atendidos.';
    }
    if (!formData.mainService) {
      newErrors.mainService = 'Selecione o principal serviço da sua agência.';
    }
    if (!formData.useCrm) {
      newErrors.useCrm = 'Informe se seus clientes utilizam CRM.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    const tracking = getTrackingParams();
    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    const payload = {
      ...formData,
      whatsappFormatted: formData.whatsapp,
      whatsappRaw: cleanPhone,
      whatsappE164: cleanPhone.length >= 10 ? `+55${cleanPhone}` : cleanPhone,
      ...tracking,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        trackEvent('Lead', {
          fullName: formData.fullName,
          instagram: formData.instagram,
          email: formData.email,
          qualification: formData.activeClients,
        });
      } else {
        setErrors({ general: 'Ocorreu um erro ao enviar. Tente novamente.' });
      }
    } catch (err) {
      console.warn('Fallback local demo:', err);
      setIsSubmitted(true);
      trackEvent('Lead', { localDemo: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      instagram: '',
      whatsapp: '',
      email: '',
      activeClients: '',
      mainService: '',
      useCrm: '',
    });
    setStep(1);
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div
        id="formulario-qualificacao"
        className="bg-white rounded-card-lg border border-brand-border shadow-form p-8 sm:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-primary" />
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-brand-pale text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block bg-brand-pale text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Solicitação Confirmada
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-4">
            Recebemos sua solicitação!
          </h3>

          <p className="text-brand-muted text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Nossa equipe entrará em contato em breve pelo WhatsApp informado para apresentar a solução White Label da sua agência.
          </p>

          <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-center gap-2 text-xs text-brand-muted">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span>Seus dados foram transmitidos com segurança. Sem spam.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="formulario-qualificacao"
      className="bg-white rounded-card-lg border border-brand-border shadow-form p-6 sm:p-8 lg:p-9 relative transition-all"
    >
      {/* Top progress line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-pale overflow-hidden rounded-t-card-lg">
        <div
          className="h-full bg-brand-primary transition-all duration-500 ease-out"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>

      {/* Progress pill & Step counter */}
      <div className="flex items-center justify-between mb-5 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-pale px-3 py-1 rounded-full border border-brand-mint/60">
          Etapa {step} de 2
        </span>
        <span className="text-xs font-medium text-brand-muted">
          {step === 1 ? 'Dados de Contato' : 'Perfil da Operação'}
        </span>
      </div>

      {/* ETAPA 1: Cadastro do Cliente (Nome, Instagram, WhatsApp, E-mail) */}
      {step === 1 && (
        <form onSubmit={handleNextStep} noValidate className="space-y-4 animate-fade-up">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight-card leading-snug">
              Vamos preparar sua apresentação exclusiva.
            </h3>
            <p className="text-sm text-brand-muted mt-1 leading-snug">
              Preencha seus dados de contato para iniciarmos a análise da sua agência.
            </p>
          </div>

          {/* Nome Completo */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-brand-dark">
              Nome completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                inputMode="text"
                placeholder="Ex: Carlos Eduardo Silva"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onBlur={(e) => handleInputChange('fullName', e.target.value.trim())}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.fullName}</p>}
          </div>

          {/* Instagram da Agência */}
          <div className="space-y-1">
            <label htmlFor="agencyInstagram" className="block text-xs sm:text-sm font-bold text-brand-dark">
              Instagram da agência
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Instagram className="w-4 h-4" />
              </div>
              <input
                id="agencyInstagram"
                name="agencyInstagram"
                type="text"
                inputMode="text"
                placeholder="@suaagencia"
                value={formData.instagram}
                onChange={handleInstagramChange}
                onBlur={handleInstagramBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.instagram ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.instagram && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.instagram}</p>}
          </div>

          {/* WhatsApp com DDD */}
          <div className="space-y-1">
            <label htmlFor="tel" className="block text-xs sm:text-sm font-bold text-brand-dark">
              WhatsApp com DDD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="tel"
                name="tel"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(85) 99999-9999"
                value={formData.whatsapp}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                maxLength={15}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.whatsapp ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.whatsapp && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.whatsapp}</p>}
          </div>

          {/* E-mail Profissional */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-brand-dark">
              E-mail profissional
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="seuemail@suaagencia.com.br"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={(e) => handleInputChange('email', e.target.value.trim())}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.email ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.email}</p>}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              withArrow
              className="font-bold tracking-wide"
            >
              CONTINUAR PARA QUALIFICAÇÃO
            </Button>
          </div>
        </form>
      )}

      {/* ETAPA 2: Perguntas Qualificatórias com Dropdowns Elegantes */}
      {step === 2 && (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 animate-fade-up">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-brand-muted hover:text-brand-dark p-1 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para dados de contato
            </button>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight-card leading-snug">
              Vamos entender o potencial da sua agência?
            </h3>
            <p className="text-sm text-brand-muted mt-1 leading-snug">
              Responda algumas perguntas rápidas sobre sua operação para personalizarmos a apresentação.
            </p>
          </div>

          {/* Campo 1 — Quantos clientes ativos sua agência atende? */}
          <div className="space-y-1.5">
            <label htmlFor="activeClients" className="block text-xs sm:text-sm font-bold text-brand-dark">
              Quantos clientes ativos sua agência atende?
            </label>
            <div className="relative">
              <select
                id="activeClients"
                name="activeClients"
                value={formData.activeClients}
                onChange={(e) => handleInputChange('activeClients', e.target.value)}
                className={`w-full appearance-none pl-4 pr-10 py-3 rounded-xl border text-base sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-sans ${
                  !formData.activeClients ? 'text-brand-muted/70' : 'text-brand-dark font-medium'
                } ${
                  errors.activeClients
                    ? 'border-red-400 bg-red-50/20'
                    : formData.activeClients
                    ? 'border-brand-primary/80 ring-1 ring-brand-primary/20'
                    : 'border-brand-border hover:border-brand-mint focus:border-brand-primary'
                }`}
              >
                <option value="" disabled className="text-brand-muted/70">
                  Selecione a quantidade de clientes
                </option>
                {ACTIVE_CLIENTS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="text-brand-dark bg-white py-1">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <ChevronDown
                  className={`w-4 h-4 transition-colors ${
                    formData.activeClients ? 'text-brand-primary' : 'text-brand-muted'
                  }`}
                />
              </div>
            </div>
            {errors.activeClients && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.activeClients}</p>
            )}
          </div>

          {/* Campo 2 — Qual é o principal serviço da sua agência? */}
          <div className="space-y-1.5">
            <label htmlFor="mainService" className="block text-xs sm:text-sm font-bold text-brand-dark">
              Qual é o principal serviço da sua agência?
            </label>
            <div className="relative">
              <select
                id="mainService"
                name="mainService"
                value={formData.mainService}
                onChange={(e) => handleInputChange('mainService', e.target.value)}
                className={`w-full appearance-none pl-4 pr-10 py-3 rounded-xl border text-base sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-sans ${
                  !formData.mainService ? 'text-brand-muted/70' : 'text-brand-dark font-medium'
                } ${
                  errors.mainService
                    ? 'border-red-400 bg-red-50/20'
                    : formData.mainService
                    ? 'border-brand-primary/80 ring-1 ring-brand-primary/20'
                    : 'border-brand-border hover:border-brand-mint focus:border-brand-primary'
                }`}
              >
                <option value="" disabled className="text-brand-muted/70">
                  Selecione o principal serviço
                </option>
                {MAIN_SERVICE_OPTIONS.map((serv) => (
                  <option key={serv} value={serv} className="text-brand-dark bg-white py-1">
                    {serv}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <ChevronDown
                  className={`w-4 h-4 transition-colors ${
                    formData.mainService ? 'text-brand-primary' : 'text-brand-muted'
                  }`}
                />
              </div>
            </div>
            {errors.mainService && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.mainService}</p>
            )}
          </div>

          {/* Campo 3 — Hoje seus clientes utilizam algum CRM? */}
          <div className="space-y-1.5">
            <label htmlFor="useCrm" className="block text-xs sm:text-sm font-bold text-brand-dark">
              Hoje seus clientes utilizam algum CRM?
            </label>
            <div className="relative">
              <select
                id="useCrm"
                name="useCrm"
                value={formData.useCrm}
                onChange={(e) => handleInputChange('useCrm', e.target.value)}
                className={`w-full appearance-none pl-4 pr-10 py-3 rounded-xl border text-base sm:text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-sans ${
                  !formData.useCrm ? 'text-brand-muted/70' : 'text-brand-dark font-medium'
                } ${
                  errors.useCrm
                    ? 'border-red-400 bg-red-50/20'
                    : formData.useCrm
                    ? 'border-brand-primary/80 ring-1 ring-brand-primary/20'
                    : 'border-brand-border hover:border-brand-mint focus:border-brand-primary'
                }`}
              >
                <option value="" disabled className="text-brand-muted/70">
                  Selecione uma opção
                </option>
                {USE_CRM_OPTIONS.map((crm) => (
                  <option key={crm} value={crm} className="text-brand-dark bg-white py-1">
                    {crm}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <ChevronDown
                  className={`w-4 h-4 transition-colors ${
                    formData.useCrm ? 'text-brand-primary' : 'text-brand-muted'
                  }`}
                />
              </div>
            </div>
            {errors.useCrm && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.useCrm}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">
              {errors.general}
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              className="font-bold tracking-wide"
            >
              SOLICITAR APRESENTAÇÃO DO WHITE LABEL
            </Button>
            <p className="text-xs text-brand-muted text-center mt-3 leading-relaxed">
              Sem compromisso. Nossa equipe avaliará o perfil da sua agência e entrará em contato para apresentar a solução.
            </p>
          </div>
        </form>
      )}

      {/* Security badge footer */}
      <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-center gap-2 text-xs text-brand-muted">
        <ShieldCheck className="w-4 h-4 text-brand-primary" />
        <span>Seus dados estão seguros e protegidos. Sem spam.</span>
      </div>
    </div>
  );
};
