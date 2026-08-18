import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

for (let i = 0; i < 6; i++) {
  await page.screenshot({ path: `morph-${i + 1}.png`, fullPage: true });
  if (i < 5) await page.waitForTimeout(500);
}

console.log('6 morph screenshots captured');
await browser.close();
