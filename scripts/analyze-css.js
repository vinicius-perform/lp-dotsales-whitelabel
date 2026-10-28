const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function analyzeCss() {
  const cssUrls = [
    'https://sales.dottech.ai/_next/static/chunks/abe24406814c49da.css?dpl=dpl_Cmc4QduaDrC2rWBigCwHzMRdyqSC',
    'https://sales.dottech.ai/_next/static/chunks/f3cd19875152a286.css?dpl=dpl_Cmc4QduaDrC2rWBigCwHzMRdyqSC',
    'https://sales.dottech.ai/_next/static/chunks/25cb93d923a85e0d.css?dpl=dpl_Cmc4QduaDrC2rWBigCwHzMRdyqSC'
  ];

  let combinedCss = '';
  for (let i = 0; i < cssUrls.length; i++) {
    const content = await fetchUrl(cssUrls[i]);
    fs.writeFileSync(`audit-css-${i}.css`, content);
    combinedCss += content + '\n';
  }

  // Extract color hex codes
  const hexColors = new Set();
  const hexRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
  let match;
  while ((match = hexRegex.exec(combinedCss)) !== null) {
    hexColors.add(match[0].toLowerCase());
  }

  // Extract font families
  const fonts = new Set();
  const fontRegex = /font-family:\s*([^;}]+)/gi;
  while ((match = fontRegex.exec(combinedCss)) !== null) {
    fonts.add(match[1].trim());
  }

  // Extract keyframes
  const keyframes = new Set();
  const kfRegex = /@keyframes\s+([a-zA-Z0-9_-]+)/g;
  while ((match = kfRegex.exec(combinedCss)) !== null) {
    keyframes.add(match[1]);
  }

  console.log('Hex Colors found in official CSS:', Array.from(hexColors));
  console.log('Font families found:', Array.from(fonts));
  console.log('Keyframes animations found:', Array.from(keyframes));

  fs.writeFileSync('audit-css-summary.json', JSON.stringify({
    colors: Array.from(hexColors),
    fonts: Array.from(fonts),
    keyframes: Array.from(keyframes)
  }, null, 2));
}

analyzeCss().catch(console.error);
