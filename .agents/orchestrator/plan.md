# Plan: UX/UI and Functional Analysis of Resume Website

## Milestones

| Milestone | Description | Verification Method | Status |
|-----------|-------------|---------------------|--------|
| M1: Explore & Environment Setup | Examine codebase, locate Quarto reports, identify how the dev server runs, and verify dependencies. | Check `package.json` and project files, identify if playwright/puppeteer needs to be installed, find dev server port. | DONE |
| M2: Design & Implement Automated Test | Develop a Playwright/Puppeteer script to programmatically launch the site, navigate, open Key Drivers, and assert layout requirements (fullscreen modal, dark background, `#quarto-margin-sidebar` TOC visibility and left-alignment). | Review the test script source code. | IN_PROGRESS |
| M3: Run Automated Test & Collect Evidence | Run local dev server (`npm run dev` or `pnpm dev`), execute the automated test script, capture logs, assertions, and optionally screenshots. | Execute the test script and record console output and screenshot files. | PLANNED |
| M4: Perform UX/UI Review & Generate Report | Evaluate cinematic dark mode consistency across pages (Home, Projects), verify Table of Contents placement, and compile the final `ux_analysis_report.md` with script outputs. | Confirm the report file `ux_analysis_report.md` exists and contains all required details. | PLANNED |

## Interface Contracts
- The local server runs on `http://localhost:5173`.
- Clicking "View Project" on `hw5-key-drivers` (slug: `key-drivers`) should automatically open the fullscreen viewer with URL containing `/projects/key-drivers` and loading `/projects/hw5-key-drivers.html` in the iframe inside the fullscreen modal.
- The test script must check that the modal has a dark background and that the TOC (`#quarto-margin-sidebar`) is visible on the left side of the screen.

## Code Layout
- Test Script: To be written as `test_ux.js` (or similar) in the root of the project (so it doesn't modify client-side source code).
- Output: `ux_analysis_report.md` in the root of the project.
