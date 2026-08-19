import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Opening page and modal...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.click('header button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  
  console.log('Filling form...');
  await page.fill('#name', 'Test Submission');
  await page.fill('#organization', 'Soficca QA');
  await page.fill('#email', 'test@soficca-qa.com');
  await page.fill('#message', 'This is a verification test from the Contact modal build — soficca-next, August 18, 2026.');
  
  // Capture network response
  let responseData = null;
  page.on('response', async (response) => {
    if (response.url().includes('api.web3forms.com')) {
      try {
        const body = await response.json();
        responseData = {
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          body: body
        };
      } catch (e) {
        responseData = {
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          body: null
        };
      }
    }
  });
  
  // Single click to submit
  console.log('Submitting...');
  await page.click('button:has-text("SEND MESSAGE")');
  
  // Wait for success
  await page.waitForSelector('text=Message sent', { timeout: 5000 });
  await page.waitForTimeout(500);
  
  await page.screenshot({ path: 'final-5-success.png' });
  console.log('✓ Success screenshot saved');
  
  if (responseData) {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('NETWORK RESPONSE:');
    console.log('═══════════════════════════════════════════════════════');
    console.log('Status:', responseData.status, responseData.statusText);
    console.log('Body:', JSON.stringify(responseData.body, null, 2));
    console.log('═══════════════════════════════════════════════════════');
  }
  
  await browser.close();
  console.log('\n✅ Test complete!');
  console.log('\n📧 Check hello@soficca.com for the test message');
})();
