import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // 1280px viewport
  const page1280 = await browser.newPage();
  await page1280.setViewportSize({ width: 1280, height: 900 });
  await page1280.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  await page1280.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page1280.waitForTimeout(2000);
  
  // Full diagram at 1280px
  const pilot1280 = await page1280.locator('#pilot').first();
  await pilot1280.screenshot({ path: 'screenshot-fix-full-1280.png' });
  
  await page1280.close();
  
  // Mobile viewport
  const pageMobile = await browser.newPage();
  await pageMobile.setViewportSize({ width: 375, height: 812 });
  await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  await pageMobile.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await pageMobile.waitForTimeout(2000);
  
  // Full diagram at mobile
  const pilotMobile = await pageMobile.locator('#pilot').first();
  await pilotMobile.screenshot({ path: 'screenshot-fix-full-mobile.png' });
  
  await pageMobile.close();
  
  // 1920px for full view
  const page1920 = await browser.newPage();
  await page1920.setViewportSize({ width: 1920, height: 1080 });
  await page1920.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  await page1920.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page1920.waitForTimeout(2000);
  
  // Full diagram showing all gates
  const pilot1920 = await page1920.locator('#pilot').first();
  await pilot1920.screenshot({ path: 'screenshot-fix-full-1920.png' });
  
  await page1920.close();
  
  await browser.close();
  console.log('✓ Fix verification screenshots captured!');
})();
