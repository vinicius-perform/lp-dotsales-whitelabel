const fs = require('fs');

function extractDemoBlocks() {
  const wlHtml = fs.readFileSync('audit-wl.html', 'utf8');

  // Let's find sections in audit-wl.html
  // 1. "O contato já abre dizendo de qual anúncio veio"
  const idx1 = wlHtml.indexOf('O contato já abre dizendo de qual anúncio veio');
  if (idx1 !== -1) {
    const chunk1 = wlHtml.slice(Math.max(0, idx1 - 300), idx1 + 2500);
    fs.writeFileSync('snippet-origin-demo.html', chunk1);
    console.log('Saved snippet-origin-demo.html');
  }

  // 2. "Quando a venda fecha, o Meta fica sabendo"
  const idx2 = wlHtml.indexOf('Quando a venda fecha, o Meta fica sabendo');
  if (idx2 !== -1) {
    const chunk2 = wlHtml.slice(Math.max(0, idx2 - 300), idx2 + 2500);
    fs.writeFileSync('snippet-meta-event-demo.html', chunk2);
    console.log('Saved snippet-meta-event-demo.html');
  }

  // 3. "Seu cliente só vê a sua marca" (White Label Login Mockup)
  const idx3 = wlHtml.indexOf('Seu cliente só vê a sua marca');
  if (idx3 !== -1) {
    const chunk3 = wlHtml.slice(Math.max(0, idx3 - 300), idx3 + 2500);
    fs.writeFileSync('snippet-whitelabel-brand-demo.html', chunk3);
    console.log('Saved snippet-whitelabel-brand-demo.html');
  }

  // 4. "Sua carteira de clientes num painel só" (Agency Multi-tenant Panel)
  const idx4 = wlHtml.indexOf('Sua carteira de clientes num painel só');
  if (idx4 !== -1) {
    const chunk4 = wlHtml.slice(Math.max(0, idx4 - 300), idx4 + 2500);
    fs.writeFileSync('snippet-agency-panel-demo.html', chunk4);
    console.log('Saved snippet-agency-panel-demo.html');
  }
}

extractDemoBlocks();
