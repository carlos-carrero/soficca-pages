import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Scroll to roadmap section
  await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      if (section.textContent.includes('Our Roadmap')) {
        section.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  });
  await page.waitForTimeout(2000);
  
  // Capture roadmap section
  const roadmapSection = await page.locator('section').filter({ hasText: 'Our Roadmap' }).first();
  await roadmapSection.screenshot({ path: 'screenshot-roadmap-fixed.png' });
  
  await page.close();
  await browser.close();
  console.log('✓ Roadmap fix screenshot captured!');
})();
