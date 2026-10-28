const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = u.origin + redirectUrl;
        }
        return fetchUrl(redirectUrl).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, html: data }));
    }).on('error', reject);
  });
}

async function audit() {
  console.log('--- AUDITING OFFICIAL DOT.SALES WEBSITES ---');
  
  const main = await fetchUrl('https://sales.dottech.ai/');
  const wl = await fetchUrl('https://sales.dottech.ai/white-label');

  fs.writeFileSync('audit-main.html', main.html);
  fs.writeFileSync('audit-wl.html', wl.html);

  console.log('Saved audit-main.html and audit-wl.html');

  // Extract all image/svg/webp urls
  const extractMedia = (html, baseUrl) => {
    const urls = new Set();
    // src and href matches
    const regex = /(?:src|href|poster)=["']([^"']+\.(?:png|jpg|jpeg|webp|svg|gif|mp4|webm))["']/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      let u = match[1];
      if (u.startsWith('//')) u = 'https:' + u;
      else if (u.startsWith('/')) u = baseUrl + u;
      urls.add(u);
    }
    // Also look for background-image: url(...)
    const bgRegex = /url\(["']?([^"')]+\.(?:png|jpg|jpeg|webp|svg|gif))["']?\)/gi;
    while ((match = bgRegex.exec(html)) !== null) {
      let u = match[1];
      if (u.startsWith('//')) u = 'https:' + u;
      else if (u.startsWith('/')) u = baseUrl + u;
      urls.add(u);
    }
    return Array.from(urls);
  };

  const mainMedia = extractMedia(main.html, 'https://sales.dottech.ai');
  const wlMedia = extractMedia(wl.html, 'https://sales.dottech.ai');

  console.log('\nMain Site Media count:', mainMedia.length);
  console.log('Sample Main Media:', mainMedia.slice(0, 10));

  console.log('\nWhite Label Site Media count:', wlMedia.length);
  console.log('Sample WL Media:', wlMedia.slice(0, 10));

  fs.writeFileSync('audit-main-media.json', JSON.stringify(mainMedia, null, 2));
  fs.writeFileSync('audit-wl-media.json', JSON.stringify(wlMedia, null, 2));

  // Extract CSS files
  const extractCss = (html, baseUrl) => {
    const css = [];
    const regex = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      let u = match[1];
      if (u.startsWith('/')) u = baseUrl + u;
      css.push(u);
    }
    return css;
  };

  const mainCss = extractCss(main.html, 'https://sales.dottech.ai');
  const wlCss = extractCss(wl.html, 'https://sales.dottech.ai');

  console.log('\nMain CSS files:', mainCss);
  console.log('WL CSS files:', wlCss);
}

audit().catch(console.error);
