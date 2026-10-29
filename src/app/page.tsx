import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductDemoSection } from '@/components/ProductDemoSection';
import { SocialProofSection } from '@/components/SocialProofSection';
import { HowItWorks } from '@/components/HowItWorks';
import { BenefitsSection } from '@/components/BenefitsSection';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { IdealPartnerSection } from '@/components/IdealPartnerSection';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 1. Barra Superior */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header />

      {/* 3. Hero Section com Formulário de Qualificação */}
      <HeroSection />

      {/* 4. Case / Demonstração Principal */}
      <ProductDemoSection />

      {/* 5. Prova Social: Globo 3D + Carrossel de Clientes Oficiais */}
      <SocialProofSection />

      {/* 6. Como Funciona */}
      <HowItWorks />

      {/* 6. Provas Sociais e Benefícios */}
      <BenefitsSection />

      {/* 7. Funcionalidades Compactas */}
      <FeatureHighlights />

      {/* 8. Para Quem é Indicado */}
      <IdealPartnerSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. CTA Final */}
      <FinalCTA />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
