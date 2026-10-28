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

  // Meta Ads IDs & Tracking
  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  campaign_name?: string;
  adset_name?: string;
  ad_name?: string;
  placement?: string;
  site_source_name?: string;

  // UTM Parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;

  // Meta Clicks & Cookies
  fbclid?: string;
  fbc?: string;
  fbp?: string;

  // Meta Context
  pageUrl?: string;
  submittedAt?: string;
}

export type Step1Data = Pick<QualificationData, 'fullName' | 'instagram' | 'whatsapp' | 'email'>;
export type Step2Data = Pick<QualificationData, 'activeClients' | 'mainService' | 'useCrm'>;
