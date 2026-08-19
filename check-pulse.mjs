import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const results = [];
for (let i = 0; i < 5; i++) {
  const opacity = await page.evaluate(() => {
    const dot = document.querySelector('[style*="pulse-dot"]');
    if (!dot) return { error: 'no dot found', allSpans: document.querySelectorAll('span').length };
    return { opacity: getComputedStyle(dot).opacity, animation: getComputedStyle(dot).animation };
  });
  results.push({ t: i * 500, ...opacity });
  await page.waitForTimeout(500);
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
