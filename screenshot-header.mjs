import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Desktop screenshots
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);

  // State 1: At top (transparent header)
  await desktopPage.screenshot({
    path: 'screenshot-header-transparent-desktop.png',
    fullPage: false
  });

  // State 2: Scrolled down (solid header)
  await desktopPage.evaluate(() => window.scrollTo(0, 1000));
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: 'screenshot-header-solid-desktop.png',
    fullPage: false
  });

  await desktopPage.close();

  // Mobile screenshots
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);

  // State 1: At top (transparent header)
  await mobilePage.screenshot({
    path: 'screenshot-header-transparent-mobile.png',
    fullPage: false
  });

  // State 2: Scrolled down (solid header)
  await mobilePage.evaluate(() => window.scrollTo(0, 1000));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: 'screenshot-header-solid-mobile.png',
    fullPage: false
  });

  await mobilePage.close();
  await browser.close();
  console.log('Header screenshots captured!');
})();
