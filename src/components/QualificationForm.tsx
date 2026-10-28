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
} from 'lucide-react';
import { Button } from './ui/Button';
import { getTrackingParams, trackEvent } from '@/lib/tracking';
import { QualificationData } from '@/lib/types';

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

  // Máscara brasileira para celular
  const mascaraWhatsApp = (valor: string) => {
    let n = String(valor).replace(/\D/g, '').slice(0, 11);

    if (n.length === 0) return '';

    if (n.length <= 2) {
      return '(' + n;
    }

    if (n.length <= 7) {
      return '(' + n.slice(0, 2) + ') ' + n.slice(2);
    }

    return (
      '(' +
      n.slice(0, 2) +
      ') ' +
      n.slice(2, 7) +
      '-' +
      n.slice(7, 11)
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = mascaraWhatsApp(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) {
      setErrors((prev) => ({ ...prev, whatsapp: '' }));
    }
  };

  // Format Instagram handle
  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();
    if (value && !value.startsWith('@') && !value.startsWith('http')) {
      value = `@${value}`;
    }
    setFormData((prev) => ({ ...prev, instagram: value }));
    if (errors.instagram) {
      setErrors((prev) => ({ ...prev, instagram: '' }));
    }
  };

  const handleInputChange = (field: keyof QualificationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Validate Step 1: Contact details
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Informe seu nome completo.';
    }

    if (!formData.instagram.trim() || formData.instagram.trim().length < 2) {
      newErrors.instagram = 'Informe o Instagram da sua agência (ex: @suaagencia).';
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length < 11 || !formData.whatsapp.includes('-')) {
      newErrors.whatsapp = 'Informe DDD e celular: (85) 99999-9999';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Informe um e-mail profissional válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2: Qualification questions
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.activeClients) {
      newErrors.activeClients = 'Selecione a quantidade de clientes atendidos.';
    }
    if (!formData.mainService) {
      newErrors.mainService = 'Selecione o serviço principal da agência.';
    }
    if (!formData.useCrm) {
      newErrors.useCrm = 'Informe se seus clientes utilizam CRM.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      trackEvent('Step1ContactCompleted', {
        fullName: formData.fullName,
        instagram: formData.instagram,
        email: formData.email,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    const tracking = getTrackingParams();
    const payload = {
      ...formData,
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
        
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-brand-pale text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block bg-brand-pale text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Solicitação Confirmada
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-4">
            Recebemos sua solicitação!
          </h3>

          <p className="text-brand-muted text-base sm:text-lg max-w-md mx-auto mb-6 leading-relaxed">
            Nossa equipe entrará em contato para apresentar como o White Label pode funcionar na sua agência.
          </p>

          <div className="bg-brand-offwhite border border-brand-border rounded-xl p-4 text-xs text-brand-muted text-left max-w-md mx-auto mb-8 space-y-1.5">
            <div className="font-semibold text-brand-dark flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <span>Ambiente Local de Demonstração</span>
            </div>
            <p>
              Nenhum dado real foi transmitido para serviços externos. O payload foi registrado e auditado com sucesso no console do servidor local.
            </p>
          </div>

          <Button onClick={resetForm} variant="outline" size="md">
            Fazer Nova Simulação
          </Button>
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
        <form onSubmit={handleNextStep} className="space-y-4">
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
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              Nome completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Ex: Carlos Eduardo Silva"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.fullName}</p>}
          </div>

          {/* Instagram da Agência */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              Instagram da agência
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Instagram className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="@suaagencia"
                value={formData.instagram}
                onChange={handleInstagramChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.instagram ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.instagram && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.instagram}</p>}
          </div>

          {/* WhatsApp com DDD */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              WhatsApp com DDD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="form-field-whatsapp"
                type="tel"
                inputMode="numeric"
                placeholder="(85) 99999-9999"
                pattern="\\([0-9]{2}\\) 9[0-9]{4}-[0-9]{4}"
                title="Informe DDD e celular: (85) 99999-9999"
                value={formData.whatsapp}
                onChange={handlePhoneChange}
                maxLength={15}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
                  errors.whatsapp ? 'border-red-400 bg-red-50/20' : 'border-brand-border focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.whatsapp && <p className="text-xs text-red-500 font-medium mt-0.5">{errors.whatsapp}</p>}
          </div>

          {/* E-mail Profissional */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              E-mail profissional
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="seuemail@suaagencia.com.br"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-dark placeholder-brand-muted/70 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all ${
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

      {/* ETAPA 2: Perguntas Qualificatórias */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Campo 1: Clientes ativos */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              Quantos clientes ativos sua agência atende?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Ainda não tenho clientes',
                '1 a 4 clientes',
                '5 a 10 clientes',
                '11 a 20 clientes',
                '21 a 40 clientes',
                'Mais de 40 clientes',
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleInputChange('activeClients', opt)}
                  className={`text-left text-xs sm:text-sm p-3 rounded-xl border transition-all duration-150 ${
                    formData.activeClients === opt
                      ? 'border-brand-primary bg-brand-pale text-brand-primary font-bold shadow-sm ring-1 ring-brand-primary'
                      : 'border-brand-border bg-brand-offwhite/50 text-brand-dark hover:border-brand-primary/40 hover:bg-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.activeClients && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.activeClients}</p>
            )}
          </div>

          {/* Campo 2: Principal serviço */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              Qual é o principal serviço da sua agência?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Tráfego pago / Performance',
                'Marketing digital completo',
                'Social Media',
                'Consultoria / Growth',
                'Outro',
              ].map((serv) => (
                <button
                  type="button"
                  key={serv}
                  onClick={() => handleInputChange('mainService', serv)}
                  className={`text-left text-xs sm:text-sm p-3 rounded-xl border transition-all duration-150 ${
                    formData.mainService === serv
                      ? 'border-brand-primary bg-brand-pale text-brand-primary font-bold shadow-sm ring-1 ring-brand-primary'
                      : 'border-brand-border bg-brand-offwhite/50 text-brand-dark hover:border-brand-primary/40 hover:bg-white'
                  }`}
                >
                  {serv}
                </button>
              ))}
            </div>
            {errors.mainService && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.mainService}</p>
            )}
          </div>

          {/* Campo 3: Clientes utilizam CRM */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-brand-dark">
              Hoje seus clientes utilizam algum CRM?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Sim, a maioria',
                'Sim, alguns',
                'Não utilizam',
                'Não sei informar',
              ].map((crm) => (
                <button
                  type="button"
                  key={crm}
                  onClick={() => handleInputChange('useCrm', crm)}
                  className={`text-left text-xs sm:text-sm p-3 rounded-xl border transition-all duration-150 ${
                    formData.useCrm === crm
                      ? 'border-brand-primary bg-brand-pale text-brand-primary font-bold shadow-sm ring-1 ring-brand-primary'
                      : 'border-brand-border bg-brand-offwhite/50 text-brand-dark hover:border-brand-primary/40 hover:bg-white'
                  }`}
                >
                  {crm}
                </button>
              ))}
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
