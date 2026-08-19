import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // 1. Default state - no modal
  console.log('1. Capturing default state...');
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'ss1-default.png', fullPage: true });
  console.log('   ✓ ss1-default.png');
  
  // 2. Click header Contact
  console.log('2. Testing header Contact...');
  const headerButton = page.locator('header').locator('button', { hasText: 'Contact' });
  await headerButton.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss2-modal-header.png' });
  console.log('   ✓ ss2-modal-header.png');
  
  // 3. Close with click outside
  console.log('3. Closing modal...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  
  // 4. Footer Contact
  console.log('4. Testing footer Contact...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const footerButton = page.locator('footer').locator('button', { hasText: 'Contact' });
  await footerButton.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ss3-modal-footer.png' });
  console.log('   ✓ ss3-modal-footer.png');
  
  // 5. Mobile view
  console.log('5. Testing mobile view...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'ss4-modal-mobile.png' });
  console.log('   ✓ ss4-modal-mobile.png');
  
  await browser.close();
  console.log('\n✅ All screenshots captured!');
})();
