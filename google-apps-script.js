/**
 * GOOGLE APPS SCRIPT — INTEGRAÇÃO DOT.SALES WHITE LABEL
 * Planilha: https://docs.google.com/spreadsheets/d/1gFi3v9JPj6rvylljdydRofYyOk0Pe8EZKSx8FRq_7EI/edit
 * ID da Planilha: 1gFi3v9JPj6rvylljdydRofYyOk0Pe8EZKSx8FRq_7EI
 * 
 * INSTRUÇÕES DE INSTALAÇÃO (1 MINUTO):
 * 1. Abra sua planilha do Google Sheets.
 * 2. No menu superior, clique em: Extensões > Apps Script.
 * 3. Apague o código padrão e cole todo este código.
 * 4. Clique no ícone de Salvar (💾).
 * 5. Clique no botão azul "Implantar" (Deploy) > "Nova implantação".
 * 6. Em "Tipo", selecione "App da Web" (Web App).
 * 7. Configure:
 *    - Descrição: "Webhook Leads dot.Sales"
 *    - Executar como: "Eu (seu e-mail)"
 *    - Quem pode acessar: "Qualquer pessoa" (Anyone)
 * 8. Clique em "Implantar" e copie a URL gerada (termina com /exec).
 * 9. Cole essa URL no arquivo .env.local do seu projeto:
 *    GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/SEU_ID/exec"
 */

const SHEET_ID = '1gFi3v9JPj6rvylljdydRofYyOk0Pe8EZKSx8FRq_7EI';
const SHEET_NAME = 'Leads dot.Sales';

function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Se a aba não existir, cria e formata os cabeçalhos
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Se a planilha estiver vazia, cria os cabeçalhos com estilo dot.Sales
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Data e Hora',
        'Nome Completo',
        'Instagram da Agência',
        'WhatsApp',
        'E-mail',
        'Clientes Ativos',
        'Principal Serviço',
        'Utilizam CRM',
        'ID Campanha (Meta)',
        'ID Conjunto (Meta)',
        'ID Anúncio (Meta)',
        'Nome da Campanha',
        'Nome do Anúncio / Criativo',
        'Posicionamento (Placement)',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'UTM Content',
        'UTM Term',
        'fbclid',
        'fbc',
        'fbp',
        'URL da Página'
      ];

      sheet.appendRow(headers);

      // Estilização institucional dot.Sales (Verde #007A55 e texto branco)
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#007A55');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setFontFamily('Arial');
      headerRange.setFontSize(10);
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    }

    // Formata a data atual no horário de Brasília (UTC-3)
    const dataHora = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

    const row = [
      dataHora,
      data.fullName || '',
      data.instagram || '',
      data.whatsapp || '',
      data.email || '',
      data.activeClients || '',
      data.mainService || '',
      data.useCrm || '',
      data.campaign_id || '',
      data.adset_id || '',
      data.ad_id || '',
      data.campaign_name || data.utm_campaign || '',
      data.ad_name || data.utm_content || '',
      data.placement || data.site_source_name || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.utm_term || '',
      data.fbclid || '',
      data.fbc || '',
      data.fbp || '',
      data.pageUrl || ''
    ];

    sheet.appendRow(row);

    // Ajusta largura automática das colunas principais
    sheet.autoResizeColumns(1, 8);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead gravado com sucesso!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', service: 'dot.Sales Leads Webhook', sheetId: SHEET_ID }))
    .setMimeType(ContentService.MimeType.JSON);
}
