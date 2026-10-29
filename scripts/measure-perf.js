const fs = require('fs');

async function measure() {
  const t0 = performance.now();
  const res = await fetch('http://localhost:3001');
  const ttfb = performance.now() - t0;
  const html = await res.text();
  const totalTime = performance.now() - t0;

  console.log('--- AUDITORIA DE PERFORMANCE LOCAL ---');
  console.log('Status HTTP:', res.status, res.statusText);
  console.log('TTFB:', ttfb.toFixed(2), 'ms');
  console.log('Tempo Total de Download HTML:', totalTime.toFixed(2), 'ms');
  console.log('Tamanho HTML:', Buffer.byteLength(html, 'utf8'), 'bytes');
  console.log('Scripts carregados:', (html.match(/<script/g) || []).length);
  console.log('next/font integrado:', html.includes('__className_') || html.includes('font-inter'));
  console.log('Renderização Three.js isolada:', !html.includes('WebGLRenderer'));
}

measure();
