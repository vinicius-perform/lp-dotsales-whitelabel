export interface QualificationData {
  // Step 1: Dados de Contato
  fullName: string;
  instagram: string;
  whatsapp: string;
  email: string;

  // Step 2: Perguntas Qualificatórias
  activeClients: string;
  mainService: string;
  useCrm: string;

  // Tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  pageUrl?: string;
  submittedAt?: string;
}

export type Step1Data = Pick<QualificationData, 'fullName' | 'instagram' | 'whatsapp' | 'email'>;
export type Step2Data = Pick<QualificationData, 'activeClients' | 'mainService' | 'useCrm'>;
