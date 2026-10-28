import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'dot.Sales White Label | Seu Próprio CRM para Agências de Tráfego',
  description:
    'Sua agência já tem clientes. Agora pode ter seu próprio CRM e uma nova receita recorrente. Tecnologia comercial pronta com sua marca.',
  keywords: [
    'CRM White Label',
    'dot.Sales',
    'CRM para agências',
    'tráfego pago',
    'gestão de leads WhatsApp',
    'receita recorrente agência',
  ],
  authors: [{ name: 'dot.Sales Tecnologia' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'dot.Sales White Label | CRM com a Marca da sua Agência',
    description:
      'Transforme sua carteira de tráfego pago em uma nova receita recorrente com seu próprio CRM.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased font-sans text-brand-dark bg-white">
        {children}
      </body>
    </html>
  );
}
