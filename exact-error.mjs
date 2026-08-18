import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleMessages = [];
  
  // Capture ALL console messages with exact text
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('CORS') || text.includes('web3forms') || text.includes('blocked')) {
      consoleMessages.push({
        type: msg.type(),
        text: text
      });
    }
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    consoleMessages.push({
      type: 'pageerror',
      text: error.message
    });
  });
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.click('header button:has-text("Contact")', { force: true });
  await page.waitForTimeout(800);
  
  await page.fill('#name', 'Test');
  await page.fill('#email', 'test@test.com');
  await page.fill('#message', 'Test message');
  
  console.log('=== Submitting form ===\n');
  await page.click('button:has-text("SEND MESSAGE")');
  
  await page.waitForTimeout(3000);
  
  console.log('=== EXACT CONSOLE ERROR MESSAGES ===\n');
  consoleMessages.forEach((msg, i) => {
    console.log(`[${i + 1}] Type: ${msg.type}`);
    console.log(`    Text: ${msg.text}`);
    console.log('');
  });
  
  await browser.close();
})();
