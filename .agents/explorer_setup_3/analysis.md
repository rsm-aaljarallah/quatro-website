# Automated Browser Testing Requirements & Design Analysis

## 1. Automated Testing Requirements Analysis
To satisfy the requirements defined in `PROJECT.md`, the automated testing suite must programmatically verify the following behavior:
- **Dev Server Startup**: The app should be running locally (defaulting to port `3000`).
- **Initial Theme Inspection**: The application should render a cinematic dark mode. The root layout/body background must resolve to `#050810` (`rgb(5, 8, 16)`).
- **Routing & Fullscreen Autopopup**: Navigating to `/projects/key-drivers` must load the enhanced `ProjectViewer.tsx`. Because the `key-drivers` project specifies a `url` (`/projects/hw5-key-drivers.html`), the viewer should initialize in fullscreen mode (i.e., state variable `fullscreen` defaults to `true`).
- **Scroll Lock**: In fullscreen mode, `document.body.style.overflow` should be locked to `"hidden"`.
- **Iframe Inspection**: The fullscreen viewer must render an `iframe` pointing to `/projects/hw5-key-drivers.html`.
- **Table of Contents (TOC) inside Iframe**: The iframe must load the Quarto document, and the element `#quarto-margin-sidebar` (which hosts the Table of Contents) must be visible and properly rendered.

---

## 2. Environment & Dependency Status
- **Current package.json**: Neither `playwright` nor `puppeteer` is listed under `dependencies` or `devDependencies`.
- **Vitest Configuration**: `vitest` is installed (`^2.1.4`), but it is configured for unit/integration tests running in Node/jsdom, which is not suitable for full-fledged end-to-end headless browser testing (especially when traversing frames like `iframe` to inspect the embedded Quarto page).
- **Global & System Binaries**: 
  - `node` is available at version `v25.6.1`.
  - `pnpm` is available at version `10.4.1` (executable via `npx pnpm`).
  - **Crucially**, a local cache of Playwright browsers already exists on the system at `~/Library/Caches/ms-playwright/` (containing `chromium-1208` and `chromium_headless_shell-1208`, dated March 12, 2026).
  - No global `puppeteer` or `cypress` cache is present.

---

## 3. Recommended Technical Approach
Given that Playwright browser binaries are already cached on the filesystem, **Playwright is the cleanest and most efficient tool to use**. 

### Cleanest Installation Path
Since this is a read-only analysis phase, we recommend executing the installation offline using the cached directories to avoid external network calls:
```bash
npx pnpm add -D @playwright/test
```
Since the browser binary is already cached, there is no need to run `npx playwright install` or connect to external networks.

---

## 4. Test Runner Script Design
We recommend two designs for the test runner script:

### Option A: The Playwright Native Config (Recommended)
The cleanest, most standard, and robust design uses Playwright's built-in `webServer` option in `playwright.config.js`. This completely eliminates the need for custom bash scripts, port checkers, or cleanup traps.

#### 1. `playwright.config.js`
Create this config at the project root:
```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Built-in dev server lifecycle manager
  webServer: {
    command: 'npx pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
```

#### 2. The Test Script `tests/ux.spec.js`
```javascript
import { test, expect } from '@playwright/test';

test.describe('Portfolio Resume UX/UI Verification', () => {
  test('should load home page with cinematic dark theme background', async ({ page }) => {
    await page.goto('/');
    // Check main layout container background color is #050810 (rgb(5, 8, 16))
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(5, 8, 16)');
  });

  test('should auto-popup key-drivers project in fullscreen modal and render Quarto TOC', async ({ page }) => {
    // 1. Direct navigation to key-drivers page
    await page.goto('/projects/key-drivers');

    // 2. Verify fullscreen mode (overflow locked)
    const body = page.locator('body');
    await expect(body).toHaveCSS('overflow', 'hidden');

    // 3. Verify fullscreen modal layout is visible and dark themed
    const modalContainer = page.locator('.fixed.z-\\[100\\]');
    await expect(modalContainer).toBeVisible();
    await expect(modalContainer).toHaveCSS('background-color', 'rgb(5, 8, 16)');

    // 4. Inspect Quarto reports iframe content
    const iframe = page.frameLocator('iframe[title="Key Drivers Analysis"]');
    
    // Verify Quarto margin sidebar is visible inside the iframe
    const tocSidebar = iframe.locator('#quarto-margin-sidebar');
    await expect(tocSidebar).toBeVisible();
    await expect(tocSidebar).toHaveClass(/margin-sidebar/);
  });
});
```

#### 3. Execution Command
To start the server, run the tests, and tear everything down automatically, run:
```bash
npx playwright test
```

---

### Option B: Custom Node.js Runner Script (`run-tests.js`)
If the user prefers a standalone runner script without relying on Playwright's native runner configuration (for example, if using standard unit runners or custom test drivers):

```javascript
import { spawn } from 'child_process';
import http from 'http';

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

// 1. Start the dev server in the background
console.log('Starting dev server (Vite)...');
const devServer = spawn('npx', ['pnpm', 'dev'], {
  stdio: 'inherit',
  detached: false
});

// Clean up dev server on exit
const cleanup = () => {
  console.log('\nStopping dev server...');
  devServer.kill('SIGTERM');
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

// 2. Poll server until active
const checkServer = () => {
  return new Promise((resolve) => {
    const req = http.get(URL, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.end();
  });
};

const waitForServer = async () => {
  let attempts = 0;
  while (attempts < 30) {
    const ready = await checkServer();
    if (ready) {
      console.log('Server is ready!');
      return;
    }
    attempts++;
    await new Promise((res) => setTimeout(res, 500));
  }
  console.error('Server failed to start in time.');
  devServer.kill('SIGTERM');
  process.exit(1);
};

// 3. Execute tests
const run = async () => {
  await waitForServer();
  console.log('Executing automated tests...');
  const tests = spawn('npx', ['playwright', 'test'], { stdio: 'inherit' });
  tests.on('close', (code) => {
    devServer.kill('SIGTERM');
    process.exit(code || 0);
  });
};

run().catch((err) => {
  console.error('Test execution failed:', err);
  devServer.kill('SIGTERM');
  process.exit(1);
});
```

Executing this custom runner is simple:
```bash
node run-tests.js
```
