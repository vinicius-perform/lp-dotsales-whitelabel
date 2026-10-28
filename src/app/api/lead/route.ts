import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log submission on the local server console for audit/inspection
    console.log('[Lead Recebido - Modo Demonstração Local]:', JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Solicitação registrada com sucesso no ambiente local.',
      isDemo: true,
      receivedAt: new Date().toISOString(),
      lead: {
        fullName: data.fullName,
        instagram: data.instagram,
        whatsapp: data.whatsapp,
        email: data.email,
        activeClients: data.activeClients,
        mainService: data.mainService,
        useCrm: data.useCrm,
      }
    });
  } catch (error: any) {
    console.error('[Erro ao processar lead]:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar requisição' },
      { status: 400 }
    );
  }
}
