# Analysis Report: Quarto Margin Sidebar (TOC) & Programmatic Iframe Verification

This report provides a detailed static analysis of the Quarto HTML report `client/public/projects/hw5-key-drivers.html`, specifically focusing on the presence, styling, and viewport alignment of the `#quarto-margin-sidebar` (TOC) element. It also outlines test implementation strategies using Playwright and Puppeteer to inspect elements inside an iframe and assert their visibility and positioning.

---

## 1. Presence of `#quarto-margin-sidebar`

The `#quarto-margin-sidebar` element is **present** in the static HTML file `client/public/projects/hw5-key-drivers.html`. 

### HTML Structure
In the markup (around line 2457), it is declared as follows:
```html
2456: <div id="quarto-content" class="page-columns page-rows-contents page-layout-article">
2457: <div id="quarto-margin-sidebar" class="sidebar margin-sidebar">
2458:   <nav id="TOC" role="doc-toc" class="toc-active">
2459:     <h2 id="toc-title">Table of contents</h2>
...
2473: </nav>
2474: </div>
```
The element acts as a wrapper for the Table of Contents (`nav#TOC`).

---

## 2. CSS Styles Applied to `#quarto-margin-sidebar`

In the header `<style>` tag of the document (around line 2400), custom responsive styles are applied under a desktop media query:

```css
/* TOC on the Left */
@media (min-width: 992px) {
    div.page-columns {
        display: block !important;
        padding-left: 0 !important;
        margin-left: 0 !important;
    }
    #quarto-margin-sidebar {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: 250px !important;
        height: 100vh !important;
        padding: 40px 20px !important;
        border-right: 1px solid rgba(232,237,245,0.1) !important;
        background: #0A0E1A !important;
        overflow-y: auto !important;
        z-index: 1000 !important;
        grid-column: none !important;
    }
    #quarto-content {
        margin-left: 280px !important;
        max-width: calc(100% - 300px) !important;
        padding-top: 40px !important;
    }
    ...
}
```

### Analysis of the Styles
*   **Media Query:** `@media (min-width: 992px)` target viewports that are `992px` or wider (Desktop view).
*   **Positioning (`position: fixed !important; left: 0 !important; top: 0 !important;`):** Pin the sidebar directly to the top-left of the viewport. This overrides Quarto's standard right-side placement (the "margin" area).
*   **Dimensions (`width: 250px !important; height: 100vh !important;`):** Fixes the width to exactly `250px` and stretches the sidebar to the full height of the viewport.
*   **Layout Offset:** The sibling content container `#quarto-content` receives `margin-left: 280px !important;` to ensure the main document text clears the fixed sidebar and resides on the right side.

---

## 3. Integration Context

In the react application page `client/src/pages/ProjectViewer.tsx`, the project URL is loaded inside an `<iframe>` container:
```tsx
<iframe
  src={project.url} // resolves to "/projects/hw5-key-drivers.html"
  title={project.title}
  className="w-full h-full border-0"
/>
```
Consequently, end-to-end (E2E) testing frameworks must traverse the document boundary into the iframe context to inspect `#quarto-margin-sidebar`.

---

## 4. Programmatic Testing Strategies (Playwright & Puppeteer)

To verify that the TOC sidebar is visible and positioned on the left side of the viewport, E2E tests must:
1.  Target a desktop viewport size (e.g., $width \ge 992$px) to activate the `@media` rule.
2.  Switch execution context into the `<iframe>`.
3.  Query the element `#quarto-margin-sidebar`.
4.  Perform assertions on its visibility and bounding coordinates.

### Playwright Implementation

Playwright offers the first-class `frameLocator()` API which handles auto-waiting and makes iframe interactions straightforward.

```typescript
import { test, expect } from '@playwright/test';

test('verify TOC is positioned on the left side inside the iframe', async ({ page }) => {
  // 1. Ensure desktop viewport width >= 992px
  await page.setViewportSize({ width: 1200, height: 800 });

  // Navigate to the project page
  await page.goto('/projects/key-drivers');

  // 2. Access the iframe using its frame locator (by selector or title)
  const iframeLocator = page.frameLocator('iframe[title="Key Drivers Analysis"]');

  // 3. Reference the sidebar element inside the iframe
  const sidebar = iframeLocator.locator('#quarto-margin-sidebar');

  // 4. Assert element visibility
  await expect(sidebar).toBeVisible();

  // 5. Assert viewport positioning (Left Side Alignment)
  // Method A: Check bounding box coordinates relative to the iframe's viewport
  const boundingBox = await sidebar.boundingBox();
  expect(boundingBox).not.toBeNull();
  
  // X-coordinate should be 0 because of "left: 0 !important"
  expect(boundingBox!.x).toBe(0);
  
  // Width should match the custom CSS width of 250px
  expect(boundingBox!.width).toBe(250);

  // Method B: Verify computed styles via page evaluation inside the iframe
  const computedStyle = await sidebar.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      position: style.position,
      left: style.left,
      width: style.width
    };
  });

  expect(computedStyle.position).toBe('fixed');
  expect(computedStyle.left).toBe('0px');
  expect(computedStyle.width).toBe('250px');
});
```

---

### Puppeteer Implementation

In Puppeteer, frame crossing requires locating the element handle for the iframe, converting it to a `Frame` object, and evaluating selectors within that sub-frame.

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 1. Ensure viewport is >= 992px
  await page.setViewport({ width: 1200, height: 800 });

  // Navigate to the project page
  await page.goto('http://localhost:5173/projects/key-drivers');

  // 2. Locate the iframe element
  const iframeElement = await page.waitForSelector('iframe');
  
  // 3. Retrieve the Content Frame reference
  const frame = await iframeElement.contentFrame();
  if (!frame) {
    throw new Error('Failed to access iframe content frame.');
  }

  // 4. Wait for and assert visibility of the sidebar
  const sidebar = await frame.waitForSelector('#quarto-margin-sidebar', { visible: true });
  if (!sidebar) {
    throw new Error('Sidebar #quarto-margin-sidebar is not present or visible.');
  }

  // 5. Assert viewport positioning
  // Method A: Bounding box check
  const boundingBox = await sidebar.boundingBox();
  if (!boundingBox) {
    throw new Error('Could not calculate sidebar bounding box.');
  }
  
  // X coordinate must be at the left edge of the iframe's viewport (0px)
  if (boundingBox.x !== 0) {
    throw new Error(`Expected sidebar X position to be 0, but got ${boundingBox.x}`);
  }
  if (boundingBox.width !== 250) {
    throw new Error(`Expected sidebar width to be 250px, but got ${boundingBox.width}px`);
  }

  // Method B: Evaluate computed styles in the frame context
  const styles = await frame.evaluate(() => {
    const element = document.querySelector('#quarto-margin-sidebar');
    if (!element) return null;
    const computed = window.getComputedStyle(element);
    return {
      position: computed.position,
      left: computed.left,
      width: computed.width
    };
  });

  if (!styles) {
    throw new Error('Failed to retrieve computed style.');
  }

  console.log('Sidebar styles:', styles);
  // Assertions
  if (styles.position !== 'fixed' || styles.left !== '0px' || styles.width !== '250px') {
    throw new Error('Style assertions failed: Sidebar is not left-aligned and fixed.');
  }

  console.log('All tests passed successfully!');
  await browser.close();
})();
```

---

## 5. Summary of Findings

| Target | Parameter | Observed Behavior / Styles |
| --- | --- | --- |
| **Element Presence** | `#quarto-margin-sidebar` | Yes, wraps `<nav id="TOC">` (lines 2457–2474). |
| **Media Constraint** | `@media (min-width: 992px)` | Styles only apply to Desktop sizes. Below this, standard Quarto responsive styles or layout defaults apply. |
| **Positioning** | `position` | `fixed !important` (pins to viewport). |
| **Alignment** | `left` | `0 !important` (positions on the far-left). |
| **Dimensions** | `width`, `height` | `250px !important`, `100vh !important`. |
| **Sibling Offset** | `#quarto-content` | `margin-left: 280px !important` (shifts main text to the right). |
