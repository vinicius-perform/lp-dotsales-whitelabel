// Script para testar a conexão com o Google Sheets Webhook
const fs = require('fs');
const path = require('path');

let url = process.env.GOOGLE_SHEET_WEBHOOK_URL;

if (!url) {
  try {
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
    const match = envContent.match(/GOOGLE_SHEET_WEBHOOK_URL=["']?([^"'\r\n]+)/);
    if (match) url = match[1];
  } catch (e) {}
}

console.log('=== TESTE DE CONEXÃO GOOGLE SHEETS WEBHOOK ===');
console.log('URL configurada no .env.local:');
console.log(url || '(NENHUMA URL CONFIGURADA)');

if (!url) {
  console.error('\nERRO: GOOGLE_SHEET_WEBHOOK_URL não encontrada no .env.local');
  process.exit(1);
}

const testPayload = {
  fullName: 'Teste Conexão dot.Sales',
  instagram: '@teste.dotsales',
  whatsapp: '(11) 99999-9999',
  email: 'teste@dotsales.com.br',
  activeClients: '5 a 10 clientes',
  mainService: 'Tráfego pago / Performance',
  useCrm: 'Sim, a maioria',
  utm_source: 'teste_diagnostico',
  utm_campaign: 'teste_conexao',
  pageUrl: 'http://localhost:3001',
  submittedAt: new Date().toISOString()
};

console.log('\nEnviando lead de teste via POST...');

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testPayload),
  redirect: 'follow'
})
.then(async (res) => {
  console.log(`\nStatus HTTP: ${res.status} ${res.statusText}`);
  const text = await res.text();
  console.log('Resposta do Google (primeiros 200 caracteres):');
  console.log(text.substring(0, 200).replace(/[\r\n]+/g, ' '));

  if (res.status === 200 && text.includes('success')) {
    console.log('\n✅ SUCESSO! A planilha recebeu o lead e respondeu com sucesso!');
  } else if (res.status === 401 || text.includes('ServiceLogin') || text.includes('Não foi possível abrir o arquivo')) {
    console.log('\n❌ DIAGNÓSTICO DO ERRO:');
    console.log('Status: 401 Unauthorized / Redirecionamento para Login do Google.');
    console.log('Motivo: A implantação do Apps Script foi configurada com acesso restrito ("Somente eu").');
    console.log('Solução: No Apps Script, altere "Quem pode acessar" para "Qualquer pessoa" (Anyone).');
  } else {
    console.log('\n⚠️ Resposta inesperada:', res.status);
  }
})
.catch((err) => {
  console.error('\nErro na requisição fetch:', err.message);
});
