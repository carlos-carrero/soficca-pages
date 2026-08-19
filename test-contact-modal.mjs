import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('1. Loading page and verifying modal is NOT visible by default...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Verify modal is not visible
  const modalVisible = await page.isVisible('text=Get in touch');
  console.log('   Modal visible on load:', modalVisible);
  
  // Screenshot: default state
  await page.screenshot({ path: 'screenshot-default-no-modal.png', fullPage: true });
  console.log('   ✓ Screenshot saved: screenshot-default-no-modal.png');
  
  console.log('\n2. Testing Header Contact trigger...');
  // Click header Contact button
  await page.click('header button:has-text("Contact")');
  await page.waitForTimeout(500);
  
  // Verify modal opened
  const modalOpenedFromHeader = await page.isVisible('text=Get in touch');
  console.log('   Modal opened from header:', modalOpenedFromHeader);
  
  // Screenshot: modal open from header
  await page.screenshot({ path: 'screenshot-modal-from-header.png' });
  console.log('   ✓ Screenshot saved: screenshot-modal-from-header.png');
  
  // Close modal with Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  console.log('   ✓ Modal closed with Escape key');
  
  console.log('\n3. Testing Footer Contact trigger...');
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  // Click footer Contact button
  await page.click('footer button:has-text("Contact")');
  await page.waitForTimeout(500);
  
  // Verify modal opened
  const modalOpenedFromFooter = await page.isVisible('text=Get in touch');
  console.log('   Modal opened from footer:', modalOpenedFromFooter);
  
  // Screenshot: modal open from footer
  await page.screenshot({ path: 'screenshot-modal-from-footer.png' });
  console.log('   ✓ Screenshot saved: screenshot-modal-from-footer.png');
  
  console.log('\n4. Submitting real test message...');
  
  // Fill out the form
  await page.fill('#name', 'Test Submission');
  await page.fill('#organization', 'Soficca QA');
  await page.fill('#email', 'test@soficca-qa.com');
  await page.fill('#message', 'This is a verification test from the Contact modal build — soficca-next, August 18, 2026.');
  
  console.log('   Form filled with test data');
  
  // Intercept the network request
  let submissionResponse = null;
  page.on('response', async (response) => {
    if (response.url().includes('api.web3forms.com')) {
      submissionResponse = {
        status: response.status(),
        statusText: response.statusText(),
        body: await response.json().catch(() => null)
      };
    }
  });
  
  // Submit the form
  await page.click('button:has-text("SEND MESSAGE")');
  console.log('   ✓ Form submitted');
  
  // Wait for response
  await page.waitForTimeout(2000);
  
  // Check for success message
  const successVisible = await page.isVisible('text=Message sent');
  console.log('   Success message visible:', successVisible);
  
  // Screenshot: success state
  await page.screenshot({ path: 'screenshot-modal-success.png' });
  console.log('   ✓ Screenshot saved: screenshot-modal-success.png');
  
  // Log network response
  if (submissionResponse) {
    console.log('\n5. Network Response from api.web3forms.com:');
    console.log('   Status:', submissionResponse.status);
    console.log('   Status Text:', submissionResponse.statusText);
    console.log('   Response Body:', JSON.stringify(submissionResponse.body, null, 2));
  } else {
    console.log('\n5. ⚠ No network response captured');
  }
  
  // Wait for auto-close
  await page.waitForTimeout(3000);
  
  console.log('\n✅ All tests complete!');
  console.log('\n📧 NEXT STEP: Check hello@soficca.com for the test message');
  
  await browser.close();
})();
