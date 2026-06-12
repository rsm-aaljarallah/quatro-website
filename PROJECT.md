# Project: Resume Website UX Analysis

## Architecture
- **Web App**: A client-side React app built with Vite, utilizing Tailwind CSS for custom styling.
- **Embedded Quarto Reports**: Rendered inside an `iframe` element dynamically loaded based on URL routes `/projects/:slug`.
- **Test Harness**: A headless browser test script (`test_ux.js`) running Playwright/Puppeteer to programmatically inspect DOM elements in the main app and inside the embedded iframe.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Setup & Exploration | Start the local server, verify routing, find dependencies. | None | DONE |
| 2 | Automated Test implementation | Create headless browser testing script `test_ux.js` to inspect the DOM. | M1 | IN_PROGRESS (175f96e0-b886) |
| 3 | Verification & Analysis | Execute the test script on the local server and verify assertions. | M2 | PLANNED |
| 4 | Final Report Generation | Compile findings into `ux_analysis_report.md` in the root folder. | M3 | PLANNED |

## Interface Contracts
### Client App ↔ Quarto Reports
- The client app routes `/projects/:slug` (e.g. `/projects/key-drivers`) and mounts `ProjectViewer.tsx`.
- Inside `ProjectViewer.tsx`, if the project has a `url` parameter (like `/projects/hw5-key-drivers.html`), the app immediately defaults `fullscreen` state to `true` and renders the HTML report inside an `iframe`.
- The iframe points to the static HTML report file located in `client/public/projects/`.
- The HTML report must contain `#quarto-margin-sidebar` to display the Table of Contents on the left side of the page layout.
