const sharp = require('sharp');
const fs = require('fs');

async function extractOfficialCrops() {
  console.log('Extracting official screenshots and mockups from LP-CRM and LP-Whitelabel...');

  // 1. In LP-Whitelabel: The actual browser dashboard with Meta Ads KPIs (investimento, leads, CAC, ROAS)
  // Let's locate and crop it
  try {
    // We can also extract mobile app screenshot from LP-CRM or LP-Whitelabel
    // Let's extract clean, high-DPI crops
    await sharp('LP-Whitelabel.png')
      .extract({ left: 160, top: 1200, width: 1600, height: 950 })
      .png({ quality: 90 })
      .toFile('public/assets/official-meta-conversion-flow.png');
    console.log('Extracted: official-meta-conversion-flow.png');

    await sharp('LP-Whitelabel.png')
      .extract({ left: 160, top: 2200, width: 1600, height: 950 })
      .png({ quality: 90 })
      .toFile('public/assets/official-whitelabel-customization.png');
    console.log('Extracted: official-whitelabel-customization.png');

    await sharp('LP-Whitelabel.png')
      .extract({ left: 160, top: 4100, width: 1600, height: 950 })
      .png({ quality: 90 })
      .toFile('public/assets/official-partner-dashboard.png');
    console.log('Extracted: official-partner-dashboard.png');

    // From LP-CRM: CRM Chat with WhatsApp & Pipeline Kanban
    await sharp('LP-CRM.png')
      .extract({ left: 160, top: 650, width: 1600, height: 950 })
      .png({ quality: 90 })
      .toFile('public/assets/official-crm-chat-interface.png');
    console.log('Extracted: official-crm-chat-interface.png');

    await sharp('LP-CRM.png')
      .extract({ left: 160, top: 1750, width: 1600, height: 950 })
      .png({ quality: 90 })
      .toFile('public/assets/official-crm-pipeline-kanban.png');
    console.log('Extracted: official-crm-pipeline-kanban.png');

    await sharp('LP-CRM.png')
      .extract({ left: 160, top: 3800, width: 1600, height: 950 })
      .png({ quality: 90 })
      .toFile('public/assets/official-crm-mobile-experience.png');
    console.log('Extracted: official-crm-mobile-experience.png');

  } catch (err) {
    console.error('Error during extraction:', err);
  }
}

extractOfficialCrops();
