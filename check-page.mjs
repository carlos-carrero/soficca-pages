import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  // Check for Contact buttons
  const headerHtml = await page.locator('header').innerHTML();
  console.log('Header HTML (first 500 chars):');
  console.log(headerHtml.substring(0, 500));
  
  const contactButtons = await page.locator('button:has-text("Contact")').count();
  console.log('\nNumber of Contact buttons found:', contactButtons);
  
  // Try to click
  if (contactButtons > 0) {
    console.log('\nAttempting to click first Contact button...');
    await page.locator('button:has-text("Contact")').first().click({ timeout: 5000 });
    console.log('✓ Clicked successfully');
    
    await page.waitForTimeout(500);
    
    // Check if modal appeared
    const modalVisible = await page.isVisible('text=Get in touch');
    console.log('Modal visible after click:', modalVisible);
    
    if (modalVisible) {
      await page.screenshot({ path: 'test-modal-open.png' });
      console.log('✓ Screenshot saved: test-modal-open.png');
    }
  }
  
  await browser.close();
})();
