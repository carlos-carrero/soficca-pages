import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Loading page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Screenshot default state
  await page.screenshot({ path: 'screenshot-default.png', fullPage: true });
  console.log('✓ Default state screenshot saved');
  
  // Open modal from header
  console.log('Clicking header Contact...');
  await page.click('header button:has-text("Contact")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshot-modal-header.png' });
  console.log('✓ Header modal screenshot saved');
  
  // Close with Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  
  // Scroll to footer and test footer trigger
  console.log('Scrolling to footer...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  await page.click('footer button:has-text("Contact")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshot-modal-footer.png' });
  console.log('✓ Footer modal screenshot saved');
  
  // Test mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshot-modal-mobile.png' });
  console.log('✓ Mobile modal screenshot saved');
  
  await browser.close();
  console.log('\n✅ Screenshots captured successfully!');
})();
