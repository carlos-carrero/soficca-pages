import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🔍 Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for Pen section to be visible
  console.log('⏳ Waiting for Pen section...');
  await page.waitForSelector('text=Pen is the first market-facing workflow', { timeout: 10000 });

  // Scroll to Pen section
  const penSection = page.locator('section:has(h2:has-text("Pen is the first"))');
  await penSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Desktop verification
  console.log('\n📱 DESKTOP (1920x1080)');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500);

  const bgColorDesktop = await penSection.evaluate(el => {
    const style = window.getComputedStyle(el);
    return {
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
    };
  });

  console.log('  Background color:', bgColorDesktop.backgroundColor);
  await page.screenshot({ path: 'pen-section-desktop.png', fullPage: false });
  console.log('  Screenshot saved: pen-section-desktop.png');

  // Mobile verification
  console.log('\n📱 MOBILE (375x812)');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await penSection.scrollIntoViewIfNeeded();

  const bgColorMobile = await penSection.evaluate(el => {
    const style = window.getComputedStyle(el);
    return {
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
    };
  });

  console.log('  Background color:', bgColorMobile.backgroundColor);
  await page.screenshot({ path: 'pen-section-mobile.png', fullPage: false });
  console.log('  Screenshot saved: pen-section-mobile.png');

  // Get the CSS variable values for comparison
  const cssVars = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    return {
      paper: root.getPropertyValue('--paper').trim(),
      warmWhite: root.getPropertyValue('--warm-white').trim(),
    };
  });

  console.log('\n🎨 CSS Variables:');
  console.log('  --paper:', cssVars.paper);
  console.log('  --warm-white:', cssVars.warmWhite);

  // Convert rgb to hex for easier comparison
  function rgbToHex(rgb) {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return rgb;
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  const bgHex = rgbToHex(bgColorDesktop.backgroundColor);
  console.log('\n✅ Verification:');
  console.log('  Computed background (hex):', bgHex);
  console.log('  Expected --warm-white: #fdfcf9');
  console.log('  Expected --paper: #f8f6f1');

  if (bgHex.toLowerCase() === '#fdfcf9') {
    console.log('  ✓ Background correctly set to --warm-white (#fdfcf9)');
  } else if (bgHex.toLowerCase() === '#f8f6f1') {
    console.log('  ✗ Background still using --paper (#f8f6f1)');
  } else {
    console.log('  ? Background is:', bgHex);
  }

  // Check console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  if (errors.length > 0) {
    console.log('\n⚠️  Console errors:', errors);
  } else {
    console.log('\n✓ No console errors');
  }

  await browser.close();
})();
