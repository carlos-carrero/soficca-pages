import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  // Capture page errors
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  // Capture failed requests
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url());
    console.log('Failure:', request.failure()?.errorText);
  });
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.click('header button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  
  console.log('\n=== Filling form ===');
  await page.fill('#name', 'Test Submission');
  await page.fill('#organization', 'Soficca QA');
  await page.fill('#email', 'test@soficca-qa.com');
  await page.fill('#message', 'This is a verification test from the Contact modal build — soficca-next, August 18, 2026.');
  
  console.log('=== Submitting ===\n');
  await page.click('button:has-text("SEND MESSAGE")');
  
  await page.waitForTimeout(4000);
  
  console.log('\n=== Final state ===');
  const errorVisible = await page.isVisible('text=Something went wrong');
  const successVisible = await page.isVisible('text=Message sent');
  console.log('Error message visible:', errorVisible);
  console.log('Success message visible:', successVisible);
  
  await browser.close();
})();
