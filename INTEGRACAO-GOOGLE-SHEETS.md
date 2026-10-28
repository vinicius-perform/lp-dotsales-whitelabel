# Integração Google Sheets & Meta Ads — dot.Sales White Label

Planilha Vinculada:
**[https://docs.google.com/spreadsheets/d/1gFi3v9JPj6rvylljdydRofYyOk0Pe8EZKSx8FRq_7EI/edit](https://docs.google.com/spreadsheets/d/1gFi3v9JPj6rvylljdydRofYyOk0Pe8EZKSx8FRq_7EI/edit)**

---

## 1. Ativação em 1 Minuto no Google Sheets

Para que a planilha receba os dados do formulário automaticamente em tempo real:

1. Abra a [sua Planilha](https://docs.google.com/spreadsheets/d/1gFi3v9JPj6rvylljdydRofYyOk0Pe8EZKSx8FRq_7EI/edit).
2. No menu superior, clique em: **Extensões** > **Apps Script**.
3. Apague o código padrão que estiver lá e cole todo o conteúdo do arquivo [`google-apps-script.js`](./google-apps-script.js).
4. Clique no ícone de salvar (💾).
5. Clique no botão azul **Implantar** (Deploy) no canto superior direito > **Nova implantação**.
6. No ícone de engrenagem ⚙️ (Selecionar tipo), escolha **App da Web** (Web App).
7. Preencha as configurações:
   - **Descrição:** `Webhook Leads dot.Sales`
   - **Executar como:** `Eu (seu e-mail)`
   - **Quem pode acessar:** `Qualquer pessoa` *(necessário para o servidor enviar os leads)*
8. Clique em **Implantar**, autorize o acesso com sua conta do Google e copie a **URL do app da web** gerada (termina com `/exec`).
9. Abra o arquivo `.env.local` na raiz do projeto e cole a URL:
   ```env
   GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/SUA_URL_GERADA/exec"
   ```

Pronto! A partir desse momento, todo lead enviado pelo formulário é gravado na aba **"Leads dot.Sales"** da planilha com cabeçalhos estilizados em verde institucional.

---

## 2. Parâmetros do Meta Ads Rastreados

O formulário está programado para capturar automaticamente os seguintes parâmetros de URL e cookies:

| Parâmetro | Campo na Planilha | Descrição |
|---|---|---|
| `campaign_id` | **ID Campanha (Meta)** | ID numérico da campanha no Meta Ads |
| `adset_id` | **ID Conjunto (Meta)** | ID numérico do conjunto de anúncios |
| `ad_id` | **ID Anúncio (Meta)** | ID numérico do criativo/anúncio |
| `campaign_name` / `utm_campaign` | **Nome da Campanha** | Nome da campanha |
| `ad_name` / `utm_content` | **Nome do Anúncio** | Nome ou identificador do anúncio |
| `placement` / `site_source_name` | **Posicionamento** | Feed Instagram, Stories, Reels, etc. |
| `utm_source` | **UTM Source** | Origem (ex: `meta`, `instagram`) |
| `utm_medium` | **UTM Medium** | Mídia (ex: `cpc`, `stories`) |
| `utm_term` | **UTM Term** | Palavra-chave ou termo |
| `fbclid` | **fbclid** | Identificador de clique único do Facebook |
| `fbc` | **fbc** | Cookie de clique do Facebook |
| `fbp` | **fbp** | Cookie de navegador do Pixel do Facebook |
| `pageUrl` | **URL da Página** | URL completa com parâmetros de acesso |

---

## 3. Modelo de URL para Anúncios no Meta Ads

No Gerenciador de Anúncios do Meta, ao criar ou editar seus anúncios, adicione os seguintes parâmetros na seção **"Parâmetros de URL"** (URL Parameters):

```text
utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}&placement={{placement}}
```

Dessa forma, o Meta Ads substitui dinamicamente os valores reais de cada campanha e anúncio, e a planilha recebe tudo preenchido e organizado coluna por coluna!
