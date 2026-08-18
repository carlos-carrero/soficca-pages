import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Desktop screenshot
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);

  // Hero section (top of page)
  await desktopPage.screenshot({
    path: 'screenshot-hero-final-desktop.png',
    fullPage: false
  });

  await desktopPage.close();

  // Mobile screenshot
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);

  // Hero section mobile
  await mobilePage.screenshot({
    path: 'screenshot-hero-final-mobile.png',
    fullPage: false
  });

  await mobilePage.close();
  await browser.close();
  console.log('Hero screenshots captured!');
})();
