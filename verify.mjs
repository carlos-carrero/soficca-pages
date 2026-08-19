import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const results = [];

for (let i = 0; i < 4; i++) {
  await page.screenshot({ path: `verify-${i + 1}.png`, fullPage: true });

  const data = await page.evaluate(() => {
    const svg = document.querySelector('svg[aria-hidden="true"]');
    if (!svg) return { error: 'no svg' };

    const svgRect = svg.getBoundingClientRect();
    const scale = svgRect.width / 910;

    const texts = svg.querySelectorAll('text');
    let labelEl = null;
    for (const t of texts) {
      if (t.textContent.trim() === '[low_density]') {
        labelEl = t;
        break;
      }
    }
    if (!labelEl) return { error: 'no label' };

    const labelRect = labelEl.getBoundingClientRect();

    const circles = svg.querySelectorAll('circle');
    let nearestDotLeft = Infinity;
    let minGap = Infinity;

    for (const c of circles) {
      const rect = c.getBoundingClientRect();
      if (rect.bottom > labelRect.top - 3 && rect.top < labelRect.bottom + 3) {
        if (rect.left < nearestDotLeft) nearestDotLeft = rect.left;
        const gap = rect.left - labelRect.right;
        if (gap < minGap) minGap = gap;
      }
    }

    return {
      labelRight: labelRect.right,
      labelLeft: labelRect.left,
      nearestDotLeftInVerticalBand: nearestDotLeft === Infinity ? null : nearestDotLeft,
      gapPx: minGap === Infinity ? null : minGap,
      labelClippedLeft: labelRect.left < svgRect.left,
      svgLeft: svgRect.left,
      scale,
    };
  });

  results.push({ frame: i + 1, ...data });
  if (i < 3) await page.waitForTimeout(1200);
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
