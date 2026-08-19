import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Desktop (1440px)
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Scroll to pilot section
  await desktopPage.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await desktopPage.waitForTimeout(2000);
  
  // Full pilot section
  const pilotSection = await desktopPage.locator('#pilot').first();
  await pilotSection.screenshot({ path: 'screenshot-pilot-desktop-full.png' });
  
  // Zoom to Gate 3-4 area (scroll the inner diagram)
  await desktopPage.evaluate(() => {
    const scrollContainer = document.querySelector('#pilot .overflow-x-auto');
    if (scrollContainer) scrollContainer.scrollLeft = 800;
  });
  await desktopPage.waitForTimeout(500);
  await pilotSection.screenshot({ path: 'screenshot-pilot-desktop-gate34.png' });
  
  await desktopPage.close();
  
  // Tablet (768px)
  const tabletPage = await browser.newPage();
  await tabletPage.setViewportSize({ width: 768, height: 1024 });
  await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  await tabletPage.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await tabletPage.waitForTimeout(2000);
  
  const pilotSectionTablet = await tabletPage.locator('#pilot').first();
  await pilotSectionTablet.screenshot({ path: 'screenshot-pilot-tablet-full.png' });
  
  // Scroll diagram to show it's scrollable
  await tabletPage.evaluate(() => {
    const scrollContainer = document.querySelector('#pilot .overflow-x-auto');
    if (scrollContainer) scrollContainer.scrollLeft = 600;
  });
  await tabletPage.waitForTimeout(500);
  await pilotSectionTablet.screenshot({ path: 'screenshot-pilot-tablet-scrolled.png' });
  
  await tabletPage.close();
  
  // Mobile (375px)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  await mobilePage.evaluate(() => {
    document.querySelector('#pilot')?.scrollIntoView({ behavior: 'smooth' });
  });
  await mobilePage.waitForTimeout(2000);
  
  const pilotSectionMobile = await mobilePage.locator('#pilot').first();
  await pilotSectionMobile.screenshot({ path: 'screenshot-pilot-mobile-full.png' });
  
  // Scroll to end to show EMERGENCY ESCALATION
  await mobilePage.evaluate(() => {
    const scrollContainer = document.querySelector('#pilot .overflow-x-auto');
    if (scrollContainer) scrollContainer.scrollLeft = scrollContainer.scrollWidth;
  });
  await mobilePage.waitForTimeout(500);
  await pilotSectionMobile.screenshot({ path: 'screenshot-pilot-mobile-end.png' });
  
  await mobilePage.close();
  await browser.close();
  console.log('Pilot section screenshots captured!');
})();
