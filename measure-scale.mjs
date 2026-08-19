import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const svg = document.querySelector('svg[aria-hidden="true"]');
  if (!svg) return { error: 'no svg' };

  const svgRect = svg.getBoundingClientRect();

  // Get all circles with their actual SVG cx values and pixel positions
  const circles = svg.querySelectorAll('circle');
  const dots = [];
  for (const c of circles) {
    const rect = c.getBoundingClientRect();
    dots.push({
      pixelLeft: rect.left,
      pixelRight: rect.right,
      pixelTop: rect.top,
      pixelBottom: rect.bottom,
      pixelCx: rect.left + rect.width / 2,
      pixelCy: rect.top + rect.height / 2,
    });
  }

  // Find the [low_density] text
  const texts = svg.querySelectorAll('text');
  let labelEl = null;
  for (const t of texts) {
    if (t.textContent.trim() === '[low_density]') {
      labelEl = t;
      break;
    }
  }
  const labelRect = labelEl ? labelEl.getBoundingClientRect() : null;

  return {
    svgRect: { left: svgRect.left, right: svgRect.right, top: svgRect.top, bottom: svgRect.bottom, width: svgRect.width, height: svgRect.height },
    viewBoxWidth: 840,
    viewBoxHeight: 250,
    pxPerViewBoxUnit: svgRect.width / 840,
    labelPixelRect: labelRect ? { left: labelRect.left, right: labelRect.right, top: labelRect.top, bottom: labelRect.bottom } : null,
    dotCount: dots.length,
    // Find dots that overlap label vertically (within label top-5 to label bottom+5)
    dotsOverlappingLabelVertically: labelRect ? dots.filter(d => d.pixelBottom > labelRect.top - 5 && d.pixelTop < labelRect.bottom + 5).map(d => ({ left: d.pixelLeft, right: d.pixelRight })).sort((a, b) => a.left - b.left) : [],
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
