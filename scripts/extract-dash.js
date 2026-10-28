const fs = require('fs');

const wlHtml = fs.readFileSync('audit-wl.html', 'utf8');
const idx = wlHtml.indexOf('browser dash');
if (idx !== -1) {
  const dashChunk = wlHtml.slice(idx, idx + 4000);
  fs.writeFileSync('snippet-dash-detail.html', dashChunk);
  console.log('Saved snippet-dash-detail.html');
}
