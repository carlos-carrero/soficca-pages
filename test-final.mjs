import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('1. Default state screenshot...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'final-1-default.png', fullPage: true });
  console.log('   ✓ final-1-default.png');
  
  // Verify modal is NOT visible
  const modalBefore = await page.isVisible('text=Get in touch');
  console.log('   Modal visible on load:', modalBefore);
  
  console.log('\n2. Header Contact trigger...');
  await page.click('header button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'final-2-modal-header.png' });
  console.log('   ✓ final-2-modal-header.png');
  
  const modalAfterHeader = await page.isVisible('text=Get in touch');
  console.log('   Modal opened:', modalAfterHeader);
  
  // Close with Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  console.log('   ✓ Closed with Escape');
  
  console.log('\n3. Footer Contact trigger...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.click('footer button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'final-3-modal-footer.png' });
  console.log('   ✓ final-3-modal-footer.png');
  
  const modalAfterFooter = await page.isVisible('text=Get in touch');
  console.log('   Modal opened:', modalAfterFooter);
  
  console.log('\n4. Mobile view...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final-4-modal-mobile.png', fullPage: true });
  console.log('   ✓ final-4-modal-mobile.png');
  
  await browser.close();
  console.log('\n✅ Screenshot phase complete!');
})();
