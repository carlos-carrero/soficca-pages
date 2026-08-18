import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  const widths = [
    { name: 'desktop-1280', width: 1280, height: 900 },
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1536', width: 1536, height: 900 },
    { name: 'desktop-1920', width: 1920, height: 1080 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-375', width: 375, height: 812 }
  ];
  
  for (const viewport of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Scroll to pilot section
    await page.evaluate(() => {
      document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    // Capture pilot section
    const pilotSection = await page.locator('#pilot').first();
    await pilotSection.screenshot({ path: `screenshot-pilot-${viewport.name}.png` });
    
    await page.close();
  }
  
  await browser.close();
  console.log('All viewport screenshots captured!');
})();
