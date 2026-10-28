import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Data payload com todos os campos estruturados para o Google Sheets e Meta Ads
    const leadPayload = {
      fullName: data.fullName || '',
      instagram: data.instagram || '',
      whatsapp: data.whatsapp || '',
      email: data.email || '',
      activeClients: data.activeClients || '',
      mainService: data.mainService || '',
      useCrm: data.useCrm || '',
      
      // Meta Ads IDs & Tracking
      campaign_id: data.campaign_id || '',
      adset_id: data.adset_id || '',
      ad_id: data.ad_id || '',
      campaign_name: data.campaign_name || data.utm_campaign || '',
      adset_name: data.adset_name || '',
      ad_name: data.ad_name || data.utm_content || '',
      placement: data.placement || data.site_source_name || '',
      
      // Standard UTMs
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_content: data.utm_content || '',
      utm_term: data.utm_term || '',
      
      // Meta Clicks & Cookies
      fbclid: data.fbclid || '',
      fbc: data.fbc || '',
      fbp: data.fbp || '',
      
      // Context
      pageUrl: data.pageUrl || '',
      submittedAt: new Date().toISOString(),
    };

    console.log('[Lead Recebido - Preparado para Google Sheets]:', JSON.stringify(leadPayload, null, 2));

    let sheetStatus = 'skipped';
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // Se houver Webhook do Google Apps Script configurado, dispara o envio
    if (webhookUrl) {
      try {
        const sheetResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
        });

        if (sheetResponse.ok) {
          sheetStatus = 'synced';
          console.log('[Google Sheets]: Dados sincronizados com sucesso na planilha!');
        } else {
          sheetStatus = 'error_remote';
          console.warn('[Google Sheets]: Webhook retornou status:', sheetResponse.status);
        }
      } catch (sheetErr) {
        sheetStatus = 'error_network';
        console.error('[Google Sheets Erro ao disparar webhook]:', sheetErr);
      }
    } else {
      console.log('[Google Sheets]: GOOGLE_SHEET_WEBHOOK_URL não configurado. Defina a variável no .env.local.');
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitação registrada com sucesso.',
      sheetStatus,
      lead: {
        fullName: leadPayload.fullName,
        instagram: leadPayload.instagram,
        whatsapp: leadPayload.whatsapp,
        email: leadPayload.email,
        campaign_id: leadPayload.campaign_id,
        adset_id: leadPayload.adset_id,
        ad_id: leadPayload.ad_id,
      },
    });
  } catch (error: any) {
    console.error('[Erro ao processar lead]:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar requisição' },
      { status: 400 }
    );
  }
}
