import { test, expect } from "@playwright/test";

test.describe("Resume Website UX E2E Tests", () => {
  test("should assert viewport, dark themes, and Quarto iframe layout constraints", async ({
    page,
  }) => {
    // 1. Resize viewport to desktop dimensions (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });

    // 2. Navigate to the homepage (/)
    await page.goto("/");

    // Check that dark cinematic style is active on homepage
    const homeBg = await page.evaluate(() => {
      const el = document.querySelector(".min-h-screen") || document.body;
      return window.getComputedStyle(el).backgroundColor;
    });
    // Expected background is #0A0E1A (rgb(10, 14, 26))
    const validBackgrounds = [
      "rgb(10, 14, 26)",
      "rgb(8, 12, 24)",
      "rgb(5, 8, 16)",
    ];
    expect(validBackgrounds).toContain(homeBg);

    // Navigate to projects list (/projects)
    await page.goto("/projects");

    // Check that dark cinematic style is active on projects page
    const projectsBg = await page.evaluate(() => {
      const el = document.querySelector(".min-h-screen") || document.body;
      return window.getComputedStyle(el).backgroundColor;
    });
    // Expected background is #080C18 (rgb(8, 12, 24))
    expect(validBackgrounds).toContain(projectsBg);

    // 3. Navigate to /projects/key-drivers
    await page.goto("/projects/key-drivers");

    // Assert: Fullscreen modal is open automatically
    // The modal container has fixed and z-[100] layout
    const modal = page.locator("div.fixed.z-\\[100\\]");
    await expect(modal).toBeVisible();

    // Assert: Body overflow is locked (overflow: hidden)
    const bodyOverflow = await page.evaluate(
      () => window.getComputedStyle(document.body).overflow
    );
    expect(bodyOverflow).toBe("hidden");

    // Assert: Modal background is dark
    const modalBg = await modal.evaluate(
      el => window.getComputedStyle(el).backgroundColor
    );
    // Expected background is #050810 (rgb(5, 8, 16))
    expect(modalBg).toBe("rgb(5, 8, 16)");

    // Access the iframe pointing to /projects/hw5-key-drivers.html
    const frame = page.frameLocator("div.fixed.z-\\[100\\] iframe");
    const sidebar = frame.locator(
      "#quarto-sidebar-toc-left, #quarto-margin-sidebar"
    );

    // Wait for the iframe and sidebar to load/render
    await expect(sidebar).toBeVisible({ timeout: 15000 });

    // Check that the sidebar is visible inside the iframe
    await expect(sidebar).toBeVisible();

    // Assert: sidebar is visible inside the iframe and positioned on the left
    const sidebarBox = await sidebar.boundingBox();
    expect(sidebarBox).not.toBeNull();
    expect(sidebarBox.width).toBeGreaterThanOrEqual(200);
    expect(sidebarBox.width).toBeLessThanOrEqual(260);
    expect(sidebarBox.x).toBeLessThan(150);

    // Verify that the main content #quarto-content is visible
    const content = frame.locator("#quarto-content");
    await expect(content).toBeVisible();

    // To verify that there are no overlaps under native grid styling, we verify that the main document
    // content (#quarto-document-content) is visible and its x-coordinate starts after the sidebar.
    const docContent = frame.locator("#quarto-document-content");
    await expect(docContent).toBeVisible();
    const contentBox = await docContent.boundingBox();
    expect(contentBox).not.toBeNull();
    expect(contentBox.x).toBeGreaterThanOrEqual(
      sidebarBox.x + sidebarBox.width
    );

    // Verify exiting fullscreen using the specific locator to avoid strict mode locator conflict
    const exitButton = page.locator(
      'div.fixed.z-\\[100\\] button:has-text("Exit Fullscreen")'
    );
    await expect(exitButton).toBeVisible();
    await exitButton.click();

    // Verify modal is closed/hidden
    await expect(modal).not.toBeVisible();

    // Verify body overflow is unlocked (overflow: auto)
    const bodyOverflowAfter = await page.evaluate(
      () => window.getComputedStyle(document.body).overflow
    );
    expect(bodyOverflowAfter).toBe("auto");
  });

  test("should collapse/hide TOC and verify no layout overflow on mobile viewports", async ({
    page,
  }) => {
    // 1. Set viewport to very narrow mobile (375px wide, < 768px)
    await page.setViewportSize({ width: 375, height: 800 });

    // 2. Navigate to a project page with Quarto content
    await page.goto("/projects/key-drivers");

    // Assert: Fullscreen modal is open automatically
    const modal = page.locator("div.fixed.z-\\[100\\]");
    await expect(modal).toBeVisible();

    const frame = page.frameLocator("div.fixed.z-\\[100\\] iframe");
    const sidebar = frame.locator(
      "#quarto-sidebar-toc-left, #quarto-margin-sidebar"
    );

    const sidebarMobileStyles = await sidebar.evaluate(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        left: style.left,
        width: style.width,
        position: style.position,
        display: style.display,
        visibility: style.visibility,
        rectLeft: rect.left,
        rectWidth: rect.width,
        rectHeight: rect.height,
      };
    });
    console.log("MOBILE SIDEBAR STYLES (375px):", sidebarMobileStyles);

    // Let's assert it is collapsed/hidden by display none or visibility
    expect(sidebarMobileStyles.display).toBe("none");

    // Check for layout overflow in the parent frame
    const parentOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(parentOverflow).toBe(false);

    // Check for layout overflow in the iframe
    const iframeOverflow = await frame.locator("html").evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(iframeOverflow).toBe(false);
  });

  test("should verify routing stability by loading multiple project routes sequentially", async ({
    page,
  }) => {
    // Viewport size
    await page.setViewportSize({ width: 1280, height: 800 });

    const projectSlugs = [
      "key-drivers",
      "poisson-mle",
      "card-krueger",
      "ab-testing",
    ];

    for (const slug of projectSlugs) {
      // Navigate to project route
      await page.goto(`/projects/${slug}`);
      await page.waitForLoadState("domcontentloaded");

      // Wait a short duration for client-side routing / state stabilization
      await page.waitForTimeout(500);

      // Verify the page loaded correctly and iframe/content is visible
      const modal = page.locator("div.fixed.z-\\[100\\]");
      await expect(modal).toBeVisible();

      // Check the iframe exists
      const iframe = page.locator("div.fixed.z-\\[100\\] iframe");
      await expect(iframe).toBeVisible();

      // Check that the body overflow is locked using locator evaluate to be context-safe
      const body = page.locator("body");
      const bodyOverflow = await body.evaluate(
        el => window.getComputedStyle(el).overflow
      );
      expect(bodyOverflow).toBe("hidden");
    }
  });
});
