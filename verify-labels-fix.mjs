import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  const widths = [375, 768, 1024, 1280, 1440, 1536, 1920];
  
  console.log('=== VERIFYING GATE LABEL FIX ===\n');
  
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    await page.evaluate(() => {
      document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    // Capture screenshot showing labels
    const pilot = await page.locator('#pilot').first();
    await pilot.screenshot({ path: `screenshot-labels-${width}.png` });
    
    // Measure spacing
    const labelInfo = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('#pilot text'))
        .filter(el => el.textContent.includes('GATE'))
        .sort((a, b) => {
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          if (Math.abs(aRect.y - bRect.y) < 5) {
            return aRect.x - bRect.x;
          }
          return aRect.y - bRect.y;
        });
      
      return labels.map(label => {
        const rect = label.getBoundingClientRect();
        return {
          text: label.textContent.trim(),
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width)
        };
      });
    });
    
    console.log(`${width}px:`);
    labelInfo.forEach((info, i) => {
      const shortText = info.text.replace('GATE ', 'G').replace(': AI SIGNAL EXTRACTION', ':AI')
        .replace(': DETERMINISTIC GOVERNANCE', ':DET').replace(': SAFETY OVERRIDE', ':SAFE')
        .replace(': RESOLUTION', ':RES');
      console.log(`  ${shortText} | x=${info.x}, width=${info.width}`);
      
      // Check horizontal collision with previous label on same row
      if (i > 0 && Math.abs(info.y - labelInfo[i-1].y) < 5) {
        const gap = info.x - (labelInfo[i-1].x + labelInfo[i-1].width);
        console.log(`    → Gap from prev: ${gap}px ${gap < 24 ? '⚠️' : '✓'}`);
      }
    });
    console.log('');
    
    await page.close();
  }
  
  await browser.close();
  console.log('✓ Verification complete!');
})();
