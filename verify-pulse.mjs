import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

await page.screenshot({ path: 'pulse-1.png', clip: { x: 0, y: 560, width: 400, height: 120 } });
await page.waitForTimeout(1250);
await page.screenshot({ path: 'pulse-2.png', clip: { x: 0, y: 560, width: 400, height: 120 } });

console.log('Pulse verification screenshots captured');
await browser.close();
