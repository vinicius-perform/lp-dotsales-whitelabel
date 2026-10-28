const fs = require('fs');

const wlHtml = fs.readFileSync('audit-wl.html', 'utf8');
const idx = wlHtml.indexOf('Exemplo do painel do parceiro com clientes ativos');
if (idx !== -1) {
  const chunk = wlHtml.slice(idx, idx + 3500);
  fs.writeFileSync('snippet-partner-panel-detail.html', chunk);
  console.log('Saved snippet-partner-panel-detail.html');
}
