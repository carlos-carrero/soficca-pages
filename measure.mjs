import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Wait for animation to start
await page.waitForTimeout(2000);

const results = [];

for (let i = 0; i < 4; i++) {
  await page.screenshot({ path: `measure-${i + 1}.png`, fullPage: true });

  const data = await page.evaluate(() => {
    const svg = document.querySelector('svg[aria-hidden="true"]');
    if (!svg) return { error: 'no svg found' };

    // Find the [low_density] text element
    const texts = svg.querySelectorAll('text');
    let lowDensityEl = null;
    for (const t of texts) {
      if (t.textContent.trim() === '[low_density]') {
        lowDensityEl = t;
        break;
      }
    }

    if (!lowDensityEl) return { error: 'no low_density text found' };

    const labelRect = lowDensityEl.getBoundingClientRect();

    // Find all circles (dots) and get their bounding boxes
    const circles = svg.querySelectorAll('circle');
    const dotRects = [];
    for (const c of circles) {
      const rect = c.getBoundingClientRect();
      // Only consider dots near the label vertically (within 30px)
      if (Math.abs(rect.top + rect.height/2 - (labelRect.top + labelRect.height/2)) < 40) {
        dotRects.push({
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          cx: rect.left + rect.width/2,
          cy: rect.top + rect.height/2
        });
      }
    }

    // Sort dots by distance to label's right edge
    dotRects.sort((a, b) => a.left - b.left);

    // Find the nearest dot to the label (closest to the label's right edge)
    let nearestDot = null;
    let minDistance = Infinity;
    for (const d of dotRects) {
      const dist = d.left - labelRect.right;
      if (Math.abs(dist) < Math.abs(minDistance)) {
        minDistance = dist;
        nearestDot = d;
      }
    }

    return {
      label: {
        left: labelRect.left,
        right: labelRect.right,
        top: labelRect.top,
        bottom: labelRect.bottom,
        width: labelRect.width,
      },
      nearestDot,
      distanceLabelRightToNearestDotLeft: nearestDot ? nearestDot.left - labelRect.right : null,
      nearbyDotCount: dotRects.length,
      leftmostDotLeft: dotRects.length > 0 ? dotRects[0].left : null,
    };
  });

  results.push({ frame: i + 1, ...data });

  if (i < 3) await page.waitForTimeout(1000);
}

console.log(JSON.stringify(results, null, 2));

await browser.close();
