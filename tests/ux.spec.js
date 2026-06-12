import { test, expect } from '@playwright/test';

test.describe('Resume Website UX E2E Tests', () => {
  test('should assert viewport, dark themes, and Quarto iframe layout constraints', async ({ page }) => {
    // 1. Resize viewport to desktop dimensions (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });

    // 2. Navigate to the homepage (/)
    await page.goto('/');
    
    // Check that dark cinematic style is active on homepage
    const homeBg = await page.evaluate(() => {
      const el = document.querySelector('.min-h-screen') || document.body;
      return window.getComputedStyle(el).backgroundColor;
    });
    // Expected background is #0A0E1A (rgb(10, 14, 26))
    const validBackgrounds = ['rgb(10, 14, 26)', 'rgb(8, 12, 24)', 'rgb(5, 8, 16)'];
    expect(validBackgrounds).toContain(homeBg);

    // Navigate to projects list (/projects)
    await page.goto('/projects');
    
    // Check that dark cinematic style is active on projects page
    const projectsBg = await page.evaluate(() => {
      const el = document.querySelector('.min-h-screen') || document.body;
      return window.getComputedStyle(el).backgroundColor;
    });
    // Expected background is #080C18 (rgb(8, 12, 24))
    expect(validBackgrounds).toContain(projectsBg);

    // 3. Navigate to /projects/key-drivers
    await page.goto('/projects/key-drivers');

    // Assert: Fullscreen modal is open automatically
    // The modal container has fixed and z-[100] layout
    const modal = page.locator('div.fixed.z-\\[100\\]');
    await expect(modal).toBeVisible();

    // Assert: Body overflow is locked (overflow: hidden)
    const bodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
    expect(bodyOverflow).toBe('hidden');

    // Assert: Modal background is dark
    const modalBg = await modal.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    // Expected background is #050810 (rgb(5, 8, 16))
    expect(modalBg).toBe('rgb(5, 8, 16)');

    // Access the iframe pointing to /projects/hw5-key-drivers.html
    const frame = page.frameLocator('div.fixed.z-\\[100\\] iframe');
    const sidebar = frame.locator('#quarto-margin-sidebar');
    
    // Wait for the iframe and sidebar to load/render
    await expect(sidebar).toBeVisible({ timeout: 15000 });

    // Assert: #quarto-margin-sidebar is visible and positioned on the left side of viewport
    // (left: 0px, width: 250px inside the iframe)
    const sidebarStyles = await sidebar.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        left: style.left,
        width: style.width
      };
    });
    expect(sidebarStyles.left).toBe('0px');
    expect(sidebarStyles.width).toBe('250px');

    // Assert: #quarto-content margin-left is offset by 280px
    const content = frame.locator('#quarto-content');
    await expect(content).toBeVisible();
    
    const contentStyles = await content.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        marginLeft: style.marginLeft
      };
    });
    expect(contentStyles.marginLeft).toBe('280px');
  });
});
