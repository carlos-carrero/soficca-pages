import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let capturedKey = null;
  
  // Intercept fetch to capture the access_key being sent
  await page.route('**/api.web3forms.com/**', route => {
    const postData = route.request().postData();
    if (postData) {
      const match = postData.match(/access_key[^&]*/);
      if (match) {
        capturedKey = match[0];
      }
    }
    route.continue();
  });
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Open contact modal
  await page.click('header button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  
  // Fill minimal form
  await page.fill('#name', 'Env Test');
  await page.fill('#email', 'test@test.com');
  await page.fill('#message', 'Testing env var');
  
  console.log('Submitting form to check if env var is loaded...');
  await page.click('button:has-text("SEND MESSAGE")');
  
  await page.waitForTimeout(2000);
  
  if (capturedKey) {
    console.log('\n✅ Environment variable loaded correctly!');
    console.log('Captured key from request:', capturedKey);
    
    if (capturedKey.includes('bcef9651')) {
      console.log('✅ Correct access key value detected');
    } else if (capturedKey.includes('undefined') || capturedKey.includes('null')) {
      console.log('❌ ERROR: access_key is undefined or null');
    } else {
      console.log('⚠️  Unexpected key value');
    }
  } else {
    console.log('⚠️  Could not capture request data');
  }
  
  await browser.close();
})();
