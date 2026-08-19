import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.click('header button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  
  await page.fill('#name', 'Test Submission');
  await page.fill('#organization', 'Soficca QA');
  await page.fill('#email', 'test@soficca-qa.com');
  await page.fill('#message', 'This is a verification test from the Contact modal build — soficca-next, August 18, 2026.');
  
  console.log('Form filled. Taking screenshot before submit...');
  await page.screenshot({ path: 'debug-before-submit.png' });
  
  let responseData = null;
  page.on('response', async (response) => {
    if (response.url().includes('api.web3forms.com')) {
      console.log('Network response received:', response.status());
      try {
        const body = await response.json();
        responseData = { status: response.status(), body };
      } catch (e) {
        responseData = { status: response.status(), body: null };
      }
    }
  });
  
  console.log('Clicking submit button...');
  await page.click('button:has-text("SEND MESSAGE")');
  
  await page.waitForTimeout(3000);
  
  console.log('Taking screenshot after submit...');
  await page.screenshot({ path: 'debug-after-submit.png' });
  
  if (responseData) {
    console.log('\nNetwork Response:', JSON.stringify(responseData, null, 2));
  } else {
    console.log('\nNo network response captured');
  }
  
  const successVisible = await page.isVisible('text=Message sent');
  console.log('Success message visible:', successVisible);
  
  await browser.close();
})();
