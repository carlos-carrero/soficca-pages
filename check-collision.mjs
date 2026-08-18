import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Check at various widths to find where collision happens
  const widths = [375, 768, 1024, 1280, 1440, 1536, 1920];
  
  console.log('=== CHECKING GATE LABEL SPACING ===\n');
  
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    await page.evaluate(() => {
      document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    // Measure gate label positions
    const labelInfo = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('#pilot text'))
        .filter(el => el.textContent.includes('GATE'));
      
      return labels.map(label => {
        const bbox = label.getBBox();
        const screenRect = label.getBoundingClientRect();
        return {
          text: label.textContent.trim(),
          svgX: bbox.x,
          svgWidth: bbox.width,
          screenX: screenRect.x,
          screenWidth: screenRect.width
        };
      });
    });
    
    console.log(`${width}px viewport:`);
    labelInfo.forEach((info, i) => {
      console.log(`  ${info.text}`);
      console.log(`    Screen: x=${Math.round(info.screenX)}, width=${Math.round(info.screenWidth)}`);
      if (i > 0) {
        const gap = info.screenX - (labelInfo[i-1].screenX + labelInfo[i-1].screenWidth);
        console.log(`    Gap from previous: ${Math.round(gap)}px ${gap < 10 ? '⚠️ COLLISION!' : ''}`);
      }
    });
    console.log('');
    
    await page.close();
  }
  
  await browser.close();
})();
