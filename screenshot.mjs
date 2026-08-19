import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Desktop screenshots
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);

  // Hero section (top of page)
  await desktopPage.screenshot({
    path: 'screenshot-hero-desktop.png',
    fullPage: false
  });

  // Scroll to Pilot section
  await desktopPage.evaluate(() => window.scrollTo(0, 1400));
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: 'screenshot-pilot-desktop.png',
    fullPage: false
  });

  // Scroll to Pen section
  await desktopPage.evaluate(() => window.scrollTo(0, 4000));
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: 'screenshot-pen-desktop.png',
    fullPage: false
  });

  await desktopPage.close();

  // Mobile screenshots
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);

  // Hero section mobile
  await mobilePage.screenshot({
    path: 'screenshot-hero-mobile.png',
    fullPage: false
  });

  // Scroll to Pen section mobile
  await mobilePage.evaluate(() => window.scrollTo(0, 4500));
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: 'screenshot-pen-mobile.png',
    fullPage: false
  });

  await mobilePage.close();
  await browser.close();
  console.log('Screenshots captured successfully!');
})();
