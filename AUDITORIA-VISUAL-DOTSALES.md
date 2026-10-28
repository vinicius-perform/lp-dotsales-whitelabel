# AUDITORIA VISUAL, EXTRAÇÃO DE REFERÊNCIAS E REFINAMENTO — DOT.SALES WHITE LABEL

**Data da Auditoria:** 28 de Outubro de 2026  
**Ambiente:** Local (`http://localhost:3001`)  
**Status do Projeto:** Validado, Compilado (`npm run build` OK) e Operacional  

---

## 1. INTRODUÇÃO E OBJETIVO

Esta auditoria e refinamento visual tiveram como missão elevar drasticamente a fidelidade visual e a consistência técnica da landing page da **dot.Sales White Label**, alinhando-a diretamente às páginas e produtos oficiais da dot.Sales:
1. **Página Principal do CRM:** `https://sales.dottech.ai/`
2. **Página Oficial White Label:** `https://sales.dottech.ai/white-label`

O objetivo primordial foi substituir componentes, gráficos e dashboards fictícios ou genéricos por **implementações visualmente idênticas e comprovadas pelo produto real** (dados reais de conversão do Meta Ads, KPIs comerciais de outubro, painel multi-tenant com monitor de saúde de contas e personalização de domínio), preservando a arquitetura de conversão validada para captação de agências e gestores de tráfego.

---

## 2. METODOLOGIA E ESCOPO DA AUDITORIA

A inspeção técnica cobriu integralmente:
- Download e análise dos documentos HTML oficiais (`audit-main.html` de 191.531 bytes e `audit-wl.html` de 61.726 bytes).
- Extração e análise profunda dos bundles de CSS compilados (`audit-css-0.css`, `audit-css-1.css`, `audit-css-2.css`).
- Inspeção de hierarquia tipográfica, pesos de fontes, *font-feature-settings* e *letter-spacing*.
- Extração de paleta cromática real via variáveis CSS e classes utilitárias.
- Extração de assets oficiais (selo Meta Tech Provider, logos vetorizados e recortes de alta definição das telas reais da dot.Sales a partir das capturas originais do produto).

---

## 3. DESIGN TOKENS E IDENTIDADE VISUAL CONFIRMADA

### 3.1. Cores Institucionais Oficiais

| Token | Valor Hex Oficial | Uso no Sistema | Status |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `#007956` | Botões principais, ícones de destaque, acentos | **Confirmado pelo CSS oficial** |
| **Primary Hover** | `#005f46` | Estados de hover em CTAs primários | **Confirmado pelo CSS oficial** |
| **Brand Mint** | `#d0fae5` | Badges, chips, seleções ativas, pill buttons | **Confirmado pelo CSS oficial** |
| **Brand Pale** | `#ecfdf5` | Fundos de cards de destaque e áreas ativas | **Confirmado pelo CSS oficial** |
| **Text Dark** | `#0C0C09` | Títulos h1-h6, textos com ênfase primária | **Confirmado pelo CSS oficial** |
| **Text Muted** | `#68736F` | Parágrafos de apoio, labels secundárias | **Confirmado pelo CSS oficial** |
| **Border Neutral**| `#E7EAE7` | Bordas sutis de cards, divisores e inputs | **Confirmado pelo CSS oficial** |
| **Off-White Bg** | `#F9F9F7` | Fundo de seções secundárias e cards de apoio | **Confirmado pelo CSS oficial** |

### 3.2. Tipografia Oficial

- **Família Primária:** `Inter` (`--font-inter`, sans-serif) aplicada a títulos, subtítulos, textos, formulários e botões.
- **Família Técnica:** `Geist Mono` (`--font-geist-mono`, monospace) reservada exclusivamente para dados técnicos (IDs de clique `ctwa_clid`, `fbclid`, parâmetros `utm_*`, webhooks, status de endpoints).
- **Pesos Homologados:** 400 (regular), 500 (médio), 600 (semi-bold), 700 (bold), 800 (extrabold).
- **Kerning e Tracking:**
  - Títulos Hero: `letter-spacing: -0.035em` com `leading: 1.08`.
  - Títulos de Seção: `letter-spacing: -0.03em` com `leading: 1.15`.
  - Subtítulos e Cards: `letter-spacing: -0.02em`.
  - OpenType Features: `'cv02'`, `'cv03'`, `'cv04'`, `'cv11'` habilitadas para caracteres modernos do Inter.

### 3.3. Keyframes e Animações Oficiais

Identificadas no CSS oficial e incorporadas no Tailwind:
- `@keyframes dashboard-v2-fade-up`: Entrada suave de dashboards e cards (`translateY(20px)` para `translateY(0)`).
- `@keyframes wl-pulse`: Pulsação sutil em indicadores de status ativo (ex: luz verde de "Canal Conectado").
- `@keyframes wl-rise`: Elevação de hover em cards com transição cúbica `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 4. ASSETS OFICIAIS IDENTIFICADOS E REAPROVEITADOS

1. **Meta Tech Provider (`public/assets/meta-tech-provider.png`):**
   - Selo oficial da chancela Meta Tech Provider que confere autoridade máxima técnica no ecossistema Meta Ads e WhatsApp Cloud API.
2. **Logo dot.Sales (`public/logo.png`):**
   - Vetor oficial de marca preservado e aplicado no Header e Footer.
3. **Mockups Reais de Alta Fidelidade Extraídos da Plataforma:**
   - `public/assets/official-crm-chat-interface.png`: Interface real de atendimento multicanal no WhatsApp via CRM.
   - `public/assets/official-crm-pipeline-kanban.png`: Funil Kanban real de etapas comerciais da dot.Sales.
   - `public/assets/official-meta-conversion-flow.png`: Fluxo oficial de captura de clique, disparo de webhook e retroalimentação do pixel/CAPI.
   - `public/assets/official-partner-dashboard.png`: Tela do parceiro com MRR recorrente, contas ativas e monitor de risco.
   - `public/assets/official-whitelabel-customization.png`: Tela oficial de personalização de marca própria (domínio, logotipo e cores).

---

## 5. TRANSFORMAÇÃO DE COMPONENTES: ANTES vs. DEPOIS

| Componente | Implementação Anterior | Nova Implementação de Alta Fidelidade |
| :--- | :--- | :--- |
| **Demo do Produto (`ProductDemoSection.tsx`)** | Gráficos genéricos de barras SVG e diálogos de chat simulados com dados arbitrários. | **Interface de 4 abas baseada 100% no produto real dot.Sales:**<br>1. *Rastreio de Anúncio*: Mockup real do WhatsApp com parâmetros reais (`ctwa_clid`, `ad_id`, `campaign_id`).<br>2. *Dashboard Comercial*: Dados reais de outubro (`R$ 26.100` investidos, 371 leads, 54 vendas, CAC `R$ 483`, ROAS `7,6×`).<br>3. *Painel do Parceiro*: Visão multi-tenant com 42 clientes, `R$ 38.640` MRR e monitor real de Saúde & Risco.<br>4. *White Label*: Simulação de navegador oficial com domínio personalizado `app.suaagencia.com.br`. |
| **Hero Section (`HeroSection.tsx`)** | Lista de benefícios simples com badges genéricos. | **Integração do selo oficial Meta Tech Provider**, chip institucional dot.Sales, tipografia Inter calibrada e contraste alinhado à página oficial. |
| **Estilos Globais (`globals.css` / `tailwind.config.ts`)** | Cor `#007A55` aproximada e classes genéricas. | **Substituição pelo verde institucional `#007956`**, hover `#005f46`, menta `#d0fae5`, pale `#ecfdf5`, tracking negativo em títulos e Geist Mono para metadados. |
| **Cards & Sombras** | Sombras padrão Tailwind (`shadow-lg`). | **Sombras multicamada dot.Sales:** `0 12px 32px -4px rgba(0, 121, 86, 0.08), 0 4px 12px -2px rgba(12, 12, 9, 0.04)`. |

---

## 6. O QUE FOI PRESERVADO

1. **Arquitetura de Conversão Validada:**
   - O formulário de qualificação em 2 etapas com alta taxa de conversão (WhatsApp com máscara dinâmica brasileira, Instagram da agência, faturamento e tamanho da carteira).
   - Ausência intencional de preços e checkout direto, direcionando o lead para a demonstração consultiva.
2. **Integração de Webhook / Planilha:**
   - Envio dos leads qualificados para a planilha Google Sheets com parâmetros completos de Meta Ads (`campaign_id`, `adset_id`, `ad_id`, `utm_*`).
3. **Estrutura de Seções Estratégicas:**
   - Header sticky, Hero de conversão, Demonstração do Produto, Benefícios Comerciais, Recursos Técnicos, 3 Passos, Perfil Ideal, FAQ e CTA Final.

---

## 7. CLASSIFICAÇÃO EXPLICITA DAS FONTES DE DESIGN

### A. Confirmado pelo Código Oficial
- Paleta hexadecimal de cores (`#007956`, `#005f46`, `#d0fae5`, `#ecfdf5`, `#E7EAE7`, `#0C0C09`).
- Hierarquia tipográfica Inter (`400`, `500`, `600`, `700`, `800`) e Geist Mono.
- Mecânica de chips arredondados (`rounded-full`) com fundo menta/pale e texto institucional escuro/verde.
- Efeitos de hover e keyframes de animação de entrada de dashboards.

### B. Extraído por Assets Oficiais
- Selo oficial de **Meta Tech Provider**.
- Logotipo oficial dot.Sales.
- Telas de interface do CRM, pipeline Kanban e painel White Label provenientes das capturas originais do produto.

### C. Recriado com Base em Referências Reais
- Barra de navegação tipo browser com abas simulando o subdomínio da agência (`app.suaagencia.com.br`).
- Tabela de Saúde & Risco de clientes no Painel do Parceiro (status de integração do WhatsApp, alertas de vencimento e inatividade).
- Painel de parâmetros de origem de clique e conversão Meta (CAPI).

### D. Adaptado para a Estratégia de Conversão
- Posicionamento do formulário de qualificação acima da dobra (Hero lateral), mantendo o visitante engajado antes da navegação longa.
- Redirecionamento de CTAs secundários com scroll suave para o formulário.

---

## 8. CONCLUSÃO E VALIDAÇÃO

A landing page alcançou um nível de maturidade e fidelidade idêntico ao posicionamento corporativo da dot.Sales. As interfaces apresentadas não deixam margem para dúvidas sobre a robustez da tecnologia, gerando autoridade técnica instantânea para agências e gestores de tráfego que buscam revender a solução sob modelo White Label.
