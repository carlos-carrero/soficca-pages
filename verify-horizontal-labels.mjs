import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  const widths = [1280, 1440, 1920];
  
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    await page.evaluate(() => {
      document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    const pilot = await page.locator('#pilot').first();
    await pilot.screenshot({ path: `screenshot-horizontal-${width}.png` });
    
    await page.close();
  }
  
  await browser.close();
  console.log('✓ Screenshots captured!');
})();
