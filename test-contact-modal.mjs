import { chromium } from 'playwright';

async function testContactModal() {
  const browser = await chromium.launch({ headless: true });

  // Test at desktop width
  console.log('\n=== DESKTOP WIDTH (1440px) ===\n');
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // 1. Initial state - page at top
    console.log('1. Capturing: initial page at top');
    await page.screenshot({ path: 'modal-test-1-desktop-initial.png', fullPage: false });

    // 2. Scroll partway down the page
    await page.evaluate(() => {
      window.scrollTo({ top: 1200, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    console.log('2. Capturing: scrolled partway down (before modal)');
    await page.screenshot({ path: 'modal-test-2-desktop-scrolled.png', fullPage: false });

    // 3. Click Contact button in footer
    await page.locator('footer button:has-text("Contact")').first().click();
    await page.waitForTimeout(300);
    console.log('3. Capturing: modal opened');
    await page.screenshot({ path: 'modal-test-3-desktop-modal-open.png', fullPage: false });

    // 4. Fill out the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from the automated test.');
    await page.waitForTimeout(200);
    console.log('4. Capturing: form filled');
    await page.screenshot({ path: 'modal-test-4-desktop-form-filled.png', fullPage: false });

    // 5. Close modal with Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    console.log('5. Capturing: after closing modal');
    await page.screenshot({ path: 'modal-test-5-desktop-after-close.png', fullPage: false });

    // 6. Verify smooth scrolling still works
    await page.evaluate(() => {
      window.scrollTo({ top: 2400, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    console.log('6. Capturing: after smooth scroll (Lenis verification)');
    await page.screenshot({ path: 'modal-test-6-desktop-lenis-works.png', fullPage: false });

    await page.close();

    // Test at mobile width
    console.log('\n=== MOBILE WIDTH (375px) ===\n');
    page = await browser.newPage({ viewport: { width: 375, height: 667 } });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // 1. Scroll partway down
    await page.evaluate(() => {
      window.scrollTo({ top: 800, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    console.log('1. Capturing: mobile scrolled');
    await page.screenshot({ path: 'modal-test-1-mobile-scrolled.png', fullPage: false });

    // 2. Open modal from footer
    await page.locator('footer button:has-text("Contact")').first().click();
    await page.waitForTimeout(300);
    console.log('2. Capturing: mobile modal open');
    await page.screenshot({ path: 'modal-test-2-mobile-modal-open.png', fullPage: false });

    // 3. Fill form
    await page.fill('input[name="name"]', 'Mobile Test');
    await page.fill('input[name="email"]', 'mobile@example.com');
    await page.fill('textarea[name="message"]', 'Mobile test message.');
    await page.waitForTimeout(200);
    console.log('3. Capturing: mobile form filled');
    await page.screenshot({ path: 'modal-test-3-mobile-form-filled.png', fullPage: false });

    // 4. Click outside to close
    await page.locator('[class*="fixed inset-0"]').click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(300);
    console.log('4. Capturing: mobile after close');
    await page.screenshot({ path: 'modal-test-4-mobile-after-close.png', fullPage: false });

    await page.close();

    console.log('\n✓ All modal tests completed successfully');
    console.log('Screenshots saved: modal-test-*.png');

  } catch (error) {
    console.error('Error during testing:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

testContactModal();
