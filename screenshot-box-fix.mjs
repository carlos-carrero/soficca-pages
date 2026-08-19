import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Desktop viewport to see the box clearly
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);
  
  // Full section
  const pilot = await page.locator('#pilot').first();
  await pilot.screenshot({ path: 'screenshot-box-fixed-full.png' });
  
  await page.close();
  await browser.close();
  console.log('✓ Box fix screenshot captured!');
})();
