# Quality & Adversarial Review Report

**Verdict**: APPROVE

---

## Review Summary
The Playwright UX test suite (`tests/ux.spec.js`) and configuration (`playwright.config.js`) were successfully reviewed. The tests correctly assert all UX specifications: viewport size, dark theme backgrounds, auto-opening of fullscreen modal, scroll lock via body overflow, left positioning and width of the `#quarto-margin-sidebar` (TOC) inside the iframe, and the sibling margin offset of `#quarto-content`. The build compiles successfully (`npx pnpm build` passed), and the tests run and pass without errors.

---

## Quality Review Findings

### [Minor] Finding 1: Fullscreen Button Rendering for Projects Without Web Views
- **What**: The "Fullscreen" button is rendered on the project viewer page even for projects that do not have an embedded web report (`url: null`).
- **Where**: `client/src/pages/ProjectViewer.tsx`, lines 157-164.
- **Why**: Clicking this button opens an empty dark modal overlay with only the "Exit Fullscreen" button visible. While this does not crash the app, it is an undesirable user experience.
- **Suggestion**: Conditionally render the "Fullscreen" button only if `project.url` is defined (similar to how the inline iframe and page action buttons are conditionally handled), or show an informative placeholder message inside the fullscreen modal if `project.url` is missing.

---

## Verified Claims

- **Claim 1**: Viewport resizing to 1280x800 is correctly set up.
  - *Verified via*: Inspecting `tests/ux.spec.js` (line 8) and running `npx playwright test` $\rightarrow$ **PASS**.
- **Claim 2**: Background colors conform to the cinematic dark theme.
  - *Verified via*: Inspecting `tests/ux.spec.js` (lines 14-35, 52-56) asserting `rgb(10, 14, 26)` for home page, `rgb(8, 12, 24)` for projects page, and `rgb(5, 8, 16)` for the modal, and running `npx playwright test` $\rightarrow$ **PASS**.
- **Claim 3**: Fullscreen modal auto-opens and locks page scroll.
  - *Verified via*: Inspecting `tests/ux.spec.js` (lines 40-49) asserting visible modal locator `div.fixed.z-[100]` and `body` overflow style set to `hidden` when accessing `/projects/key-drivers`, and running `npx playwright test` $\rightarrow$ **PASS**.
- **Claim 4**: The presence, visibility, left position (`0px`), and width (`250px`) of `#quarto-margin-sidebar` inside the iframe are asserted.
  - *Verified via*: Inspecting `tests/ux.spec.js` (lines 59-75) and running `npx playwright test` $\rightarrow$ **PASS**.
- **Claim 5**: Sibling margin offset of `#quarto-content` is offset by `280px` in the iframe.
  - *Verified via*: Inspecting `tests/ux.spec.js` (lines 77-87) and running `npx playwright test` $\rightarrow$ **PASS**.
- **Claim 6**: The production build compiles successfully.
  - *Verified via*: Running `npx pnpm build` in the workspace root $\rightarrow$ **PASS**.

---

## Coverage Gaps

- **Plotly Chart Contrast Check** — risk level: low — recommendation: accept risk. (Though the injected CSS recolors Plotly's main background via `.js-plotly-plot .plotly .bg`, individual SVG text elements and chart lines within Plotly might require verification for color contrast, but they are not critical for the layout skeleton).

---

## Unverified Items
- None. All requirements were independently verified via the test harness and manual code analysis.

---

# Adversarial Challenge Report

**Overall risk assessment**: LOW

## Challenges

### [Low] Challenge 1: Absence of Fallback for Missing Public Asset Files
- **Assumption challenged**: Assumes that all HTML files referenced in `Projects` metadata exist in the `client/public/projects` directory.
- **Attack scenario**: If a referenced file (e.g. `hw5-key-drivers.html`) is deleted, renamed, or fails to upload, the iframe will render a default browser 404 page, which breaks the dark theme and shows a bright white background.
- **Blast radius**: The modal will display a jarring bright white 404 page inside the dark cinematic container.
- **Mitigation**: Add an `onError` or check logic, or serve a custom styled dark 404 page inside the iframe router.

## Stress Test Results

- **Empty / Null URLs** $\rightarrow$ Click Fullscreen $\rightarrow$ Empty Modal displayed $\rightarrow$ **FAIL** (Usability issue).
- **Responsive Viewports** $\rightarrow$ Resize to Mobile (e.g., 375x667) $\rightarrow$ Sidebars are hidden or collapsed via media queries $\rightarrow$ **PASS** (The CSS includes `@media (min-width: 992px)` wrapping the TOC sidebars layout adjustments, which ensures they do not break mobile views).
