const fs = require('fs');

function inspectStructure() {
  const wlHtml = fs.readFileSync('audit-wl.html', 'utf8');
  const mainHtml = fs.readFileSync('audit-main.html', 'utf8');

  // Let's search for headlines, badges, section titles in WL
  const findHeadings = (html) => {
    const headings = [];
    const regex = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      headings.push({ tag: match[1], text: match[2].replace(/<[^>]+>/g, '').trim() });
    }
    return headings;
  };

  console.log('--- White Label Headings ---');
  console.log(findHeadings(wlHtml));

  console.log('\n--- Main Site Headings (First 25) ---');
  console.log(findHeadings(mainHtml).slice(0, 25));

  // Let's search for images/illustrations/SVGs used in WL
  const imgMatches = [...wlHtml.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi)];
  console.log('\n--- White Label Images ---');
  imgMatches.forEach(m => console.log('Src:', m[1], 'Alt:', m[2]));

  // Let's check if there are SVG icons or illustrations
  const svgCount = (wlHtml.match(/<svg/g) || []).length;
  console.log('\nWhite Label SVG elements count:', svgCount);

  // Check how CRM is rendered in main site
  const crmSectionMatches = [...mainHtml.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
  console.log('\nMain site sections count:', crmSectionMatches.length);
}

inspectStructure();
