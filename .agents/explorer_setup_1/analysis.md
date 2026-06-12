# Website Investigation & E2E Testing Strategy Report

This report documents the structure, routing, fullscreen modal logic, Table of Contents layout, and proposed end-to-end (E2E) testing strategy for the Vite portfolio website.

---

## 1. Project Structure & Local Development

### 1.1 Project Directory Structure
The workspace root directory is located at `/Users/aj/git/vn-docker/Martketing Analytics/Websites/Build a Modern Tech-Oriented Resume Website/`.
Key directory paths and files of interest:
* **`/client`**: The Vite frontend application.
  * **`/client/src`**: Source code of the application.
    * **`App.tsx`**: Defines routing, spotlight cursor, WebMCP context registers, and providers.
    * **`/client/src/pages`**: Page components including:
      * **`Projects.tsx`**: Lists all projects, including the featured project, and provides project metadata.
      * **`ProjectViewer.tsx`**: Renders individual project details, the inline/fullscreen iframe viewer, and the "Agentic Summary" sidebar.
  * **`/client/public`**: Frontend assets served statically.
    * **`/client/public/projects`**: Houses Quarto-generated static HTML documents (e.g., `ab-testing.html`, `hw2.html`, `hw3-mle.html`, `hw4-maxdiff.html`, `hw5-key-drivers.html`) and the styling utility script `inject_theme.py`.
* **`/server`**: Backend express server files.
* **`/shared`**: Shared TypeScript types or utilities.
* **`package.json`**: Root package configuration.
* **`pnpm-lock.yaml`**: Lockfile for dependencies.
* **`vite.config.ts`**: Vite configuration (root directory set to `client`, build output directory set to `dist/public`, and development server port set to `3000`).

### 1.2 Package Manager & Dev Server Execution
* **Package Manager**: **`pnpm`** (as evidenced by `"packageManager": "pnpm@10.4.1..."` in `package.json` and the presence of `pnpm-lock.yaml`).
* **Dev Server Port**: `3000` (configured in `vite.config.ts`).
* **Running the Dev Server Locally**:
  ```bash
  pnpm dev
  ```
  This command starts the Vite development server with the `--host` flag.

---

## 2. Routing & Fullscreen Modal Logic

### 2.1 Routing Architecture
The application uses `wouter` for client-side routing. In `/client/src/App.tsx`, the routing is configured inside the `Router` component:
* `/` $\rightarrow$ `Home` (General portfolio resume presentation)
* `/theme-preview` $\rightarrow$ `ThemePreview` (A theme preview helper page)
* `/projects` $\rightarrow$ `Projects` (Editorial portfolio listing of projects)
* `/projects/:slug` $\rightarrow$ `ProjectViewer` (Displays a specific project using its slug)
* Wildcard $\rightarrow$ `NotFound`

### 2.2 Fullscreen Modal Auto-Opening Logic
In `/client/src/pages/ProjectViewer.tsx`, the fullscreen modal logic behaves as follows:

1. **State Initialization (Line 28)**:
   ```typescript
   const [fullscreen, setFullscreen] = useState(!!baseInfo?.url);
   ```
   * The `fullscreen` boolean state is initialized to `!!baseInfo?.url`.
   * **Behavior**: If the navigated project contains a non-null, truthy `url` property (e.g., `/projects/ab-testing.html` or `/projects/hw2.html`), `fullscreen` is set to `true` on page load. If the `url` is null (e.g., `bayesian-mmm-capstone`), it defaults to `false`.

2. **Body Scroll Prevention (Lines 39–48)**:
   ```typescript
   useEffect(() => {
     if (fullscreen) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }
     return () => {
       document.body.style.overflow = "auto";
     };
   }, [fullscreen]);
   ```
   * When `fullscreen` is active, it locks the page scroll by applying `overflow: hidden` to the document body. Upon leaving or toggling it off, it restores it to `auto`.

3. **Conditional Rendering of Fullscreen Modal (Lines 197–222)**:
   ```tsx
   {fullscreen && (
     <motion.div ...>
       <button onClick={() => setFullscreen(false)} ...>
         <Minimize2 size={16} /> Exit Fullscreen
       </button>
       {project.url && (
         <iframe src={project.url} title={project.title} className="w-full h-full border-0" />
       )}
     </motion.div>
   )}
   ```
   * When `fullscreen` is `true`, a backdrop overlay and a fullscreen `motion.div` modal containing the project's iframe dynamically mount. An "Exit Fullscreen" button allows the user to change `fullscreen` to `false`.

4. **Fallback Inline Layout (Lines 167–194)**:
   * When `fullscreen` is `false` (either on load due to `url: null` or after closing the modal), the document Viewer falls back to an inline layout.
   * If there is no URL, a placeholder UI displaying *"Web View Not Available"* renders alongside the *Agentic Summary* sidebar.

---

## 3. Table of Contents (#quarto-margin-sidebar) Left-Placement

The Quarto-generated reports (`.html` files inside `/client/public/projects`) contain a Table of Contents (TOC) inside a container with the ID `#quarto-margin-sidebar`.
To integrate these reports seamlessly into the website's dark, modern look, the styling utility `/client/public/projects/inject_theme.py` injects a custom `<style>` block into each HTML report:

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

### Layout Characteristics to Verify:
1. **Left Alignment**: `#quarto-margin-sidebar` has `position: fixed !important`, `left: 0 !important`, and `width: 250px !important`. This forces the TOC to act as a fixed sidebar aligned to the absolute left of the screen/viewport.
2. **Offset Main Content**: `#quarto-content` is styled with `margin-left: 280px !important` to clear the sidebar space, preventing overlapping text or charts.
3. **Responsive Hiding**: Quarto's built-in media queries or additional custom CSS might hide it on smaller screens to ensure responsive readability.

---

## 4. Playwright / Puppeteer E2E Testing Strategy

To verify the portfolio website's layout, routing, modal auto-opening behaviors, and the TOC left-placement inside the iframes, we suggest the following Playwright (recommended) design strategy.

### 4.1 Playwright E2E Test Suite Structure

A structured testing plan should cover three key scenarios:
1. **Routing and Page Transitions**
2. **Modal Auto-Opening Logic (Conditional by Project URL availability)**
3. **Iframe Content Injection (Specifically verifying the left-aligned `#quarto-margin-sidebar`)**

Below is a proposed JavaScript/TypeScript test design template using Playwright.

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Vite Portfolio Projects & Viewer Layout Tests', () => {

  // Test Case 1: Route Verification
  test('should navigate to the Projects list and then to a specific Project Viewer', async ({ page }) => {
    // 1. Go to homepage
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);

    // 2. Navigate to /projects
    await page.goto(`${BASE_URL}/projects`);
    await expect(page).toHaveURL(/\/projects$/);
    
    // Verify projects page title is visible
    const pageHeader = page.locator('h1', { hasText: 'Projects' });
    await expect(pageHeader).toBeVisible();
  });

  // Test Case 2: Fullscreen Modal Auto-Opening (Project with URL)
  test('should auto-open fullscreen modal when project has a valid URL', async ({ page }) => {
    // Project 'ab-testing' has a valid URL ('/projects/ab-testing.html')
    await page.goto(`${BASE_URL}/projects/ab-testing`);
    await expect(page).toHaveURL(/\/projects\/ab-testing/);

    // 1. Verify body overflow is locked (hidden)
    const bodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
    expect(bodyOverflow).toBe('hidden');

    // 2. Verify fullscreen modal is visible
    const modalContainer = page.locator('.fixed.inset-4, .fixed.inset-8, .fixed.inset-12');
    await expect(modalContainer).toBeVisible();

    // 3. Verify 'Exit Fullscreen' button is present
    const exitButton = page.locator('button:has-text("Exit Fullscreen")');
    await expect(exitButton).toBeVisible();

    // 4. Verify iframe inside modal is loading the correct static document
    const iframe = modalContainer.locator('iframe');
    await expect(iframe).toBeVisible();
    const iframeSrc = await iframe.getAttribute('src');
    expect(iframeSrc).toContain('/projects/ab-testing.html');

    // 5. Verify closing the modal
    await exitButton.click();
    
    // The modal container should be hidden/detached
    await expect(modalContainer).not.toBeVisible();
    
    // Body overflow should return to auto
    const bodyOverflowPost = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
    expect(bodyOverflowPost).toBe('auto');
  });

  // Test Case 3: No Fullscreen Modal on Load (Project with Null URL)
  test('should NOT auto-open fullscreen modal when project URL is null', async ({ page }) => {
    // Project 'bayesian-mmm-capstone' has URL set to null
    await page.goto(`${BASE_URL}/projects/bayesian-mmm-capstone`);
    await expect(page).toHaveURL(/\/projects\/bayesian-mmm-capstone/);

    // 1. Verify body overflow is NOT locked
    const bodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
    expect(bodyOverflow).toBe('auto');

    // 2. Verify fullscreen modal is NOT present
    const modalContainer = page.locator('.fixed.inset-4, .fixed.inset-8, .fixed.inset-12');
    await expect(modalContainer).not.toBeVisible();

    // 3. Verify 'Web View Not Available' fallback UI is displayed
    const fallbackText = page.locator('text=Web View Not Available');
    await expect(fallbackText).toBeVisible();

    // 4. Verify the Agentic Summary sidebar is visible
    const agenticSummary = page.locator('span:has-text("Agentic Summary")');
    await expect(agenticSummary).toBeVisible();
  });

  // Test Case 4: Table of Contents Left Placement (Inside Iframe Context)
  test('should place Table of Contents (#quarto-margin-sidebar) on the left inside the iframe', async ({ page }) => {
    // Load project with iframe in a desktop resolution (>= 992px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/projects/ab-testing`);

    // 1. Locate the iframe element
    const iframeElement = page.locator('iframe');
    await expect(iframeElement).toBeVisible();

    // 2. Obtain handle to the iframe context
    const iframeContext = page.frameLocator('iframe');

    // 3. Wait for the TOC element inside the iframe to load
    const tocSidebar = iframeContext.locator('#quarto-margin-sidebar');
    await expect(tocSidebar).toBeVisible({ timeout: 5000 });

    // 4. Verify structural positions and styling inside the iframe
    const tocStyles = await tocSidebar.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        position: style.position,
        left: style.left,
        width: style.width
      };
    });

    expect(tocStyles.position).toBe('fixed');
    expect(tocStyles.left).toBe('0px');
    expect(tocStyles.width).toBe('250px');

    // 5. Verify the content area offset matches left-alignment
    const contentArea = iframeContext.locator('#quarto-content');
    const contentMarginLeft = await contentArea.evaluate((el) => window.getComputedStyle(el).marginLeft);
    expect(contentMarginLeft).toBe('280px');

    // 6. Verify sidebar is positioned on the left side of the viewport (x-coordinate close to 0)
    const boundingBox = await tocSidebar.boundingBox();
    expect(boundingBox).not.toBeNull();
    if (boundingBox) {
      expect(boundingBox.x).toBeLessThan(10); // It must be fixed to the absolute left margin
    }
  });

});
```

### 4.2 Key Considerations for Script execution
* **Iframe Context Switching**: Because Quarto files load from separate documents, querying `document.querySelector('#quarto-margin-sidebar')` directly in `page` will fail or return `null`. Testers must use Playwright's `frameLocator()` or Puppeteer's `contentFrame()` to cross the boundary.
* **Viewport Dimensions**: The CSS rule responsible for left-placement is wrapped inside `@media (min-width: 992px)`. If the test browser runs at default mobile widths or smaller test viewports, the CSS will not apply, and `#quarto-margin-sidebar` might be hidden or default-positioned. Thus, setting `page.setViewportSize({ width: 1280, height: 800 })` is crucial.
* **Animations**: The viewer uses `framer-motion` for transitions. Tests that toggle the modal or navigate pages should wait for transitional states or elements (e.g. `AnimatePresence` effects) to stabilize before asserting bounding box locations.
