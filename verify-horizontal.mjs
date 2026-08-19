import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  const viewports = [
    { name: '1280px', width: 1280, height: 900 },
    { name: '1440px', width: 1440, height: 900 },
    { name: '1536px', width: 1536, height: 900 },
    { name: '1920px', width: 1920, height: 1080 }
  ];
  
  console.log('=== VERIFYING HORIZONTAL LAYOUT ONLY ===\n');
  
  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Scroll to pilot section
    await page.evaluate(() => {
      document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    // Check for horizontal scrollbar
    const hasHorizontalScroll = await page.evaluate(() => {
      const pilot = document.querySelector('#pilot');
      return pilot && pilot.scrollWidth > pilot.clientWidth;
    });
    
    // Check if any content is clipped (overflow hidden)
    const overflow = await page.evaluate(() => {
      const svg = document.querySelector('#pilot svg');
      if (!svg) return 'not found';
      const computed = window.getComputedStyle(svg.parentElement);
      return computed.overflow + '/' + computed.overflowX;
    });
    
    console.log(`${viewport.name}:`);
    console.log(`  Horizontal scroll: ${hasHorizontalScroll ? '❌ YES' : '✓ NO'}`);
    console.log(`  Overflow style: ${overflow}`);
    
    // Capture screenshot
    const pilotSection = await page.locator('#pilot').first();
    await pilotSection.screenshot({ path: `screenshot-final-${viewport.width}.png` });
    
    await page.close();
  }
  
  await browser.close();
  console.log('\n✓ Verification complete!');
})();
