const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode + ' for ' + url));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function fetchOfficialAssets() {
  const assets = [
    { url: 'https://sales.dottech.ai/meta-tech-provider.png', name: 'meta-tech-provider.png' },
    { url: 'https://sales.dottech.ai/dotsales-icon.png', name: 'dotsales-icon.png' },
    { url: 'https://sales.dottech.ai/dot.sales.png', name: 'dotsales-brand-text.png' }
  ];

  for (const a of assets) {
    const dest = path.join('public', 'assets', a.name);
    try {
      await download(a.url, dest);
      console.log('Downloaded:', a.name);
    } catch (e) {
      console.warn('Could not download:', a.name, e.message);
    }
  }
}

fetchOfficialAssets();
