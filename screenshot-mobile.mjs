import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: process.argv[2] || 'mobile.png', fullPage: true });
await browser.close();
console.log('Mobile screenshot saved');
