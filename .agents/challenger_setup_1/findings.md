# Findings: Playwright E2E and Stress Testing

We have successfully reviewed, debugged, and extended the E2E test suite in `tests/ux.spec.js`. Below are the detailed findings regarding the website behavior, boundary conditions, and layout stability.

## 1. Initial Test Issues & Fixes
The original Playwright test suite failed on the first test:
- **Root Cause**: The Python post-processing script `inject_theme.py` replaces `#quarto-margin-sidebar` with `#quarto-sidebar-toc-left` to structurally position the TOC on the left. The test was still searching for the old ID `#quarto-margin-sidebar`, which failed with a 15-second timeout.
- **Resolution**: Updated the sidebar locator to search for `#quarto-sidebar-toc-left, #quarto-margin-sidebar`.
- **Layout Adjustments**:
  - The new `.toc-left` sidebar layout has a dynamic width of approximately `223.3px` (corresponding to `14rem` at `16px` base font size) instead of a fixed `250px`. The assertion was made flexible (`200px` to `260px`).
  - The content margin-left is `0px` because the left-TOC layout is positioned using `position: sticky` and standard layout flexbox rather than a hardcoded left margin offsets on `#quarto-content`. The assertion was adjusted to expect `0px`.

## 2. Mobile Viewport Behavior (width = 375px)
We introduced a mobile viewport test case that loads the project view at `375px` width (standard mobile portrait view).
- **Table of Contents Visibility**: In narrow viewports (< 768px), Quarto's built-in styles apply `display: none` to `.toc-left`. The test successfully verified that the Table of Contents element `#quarto-sidebar-toc-left` is hidden (`display: none` and dimensions are 0x0).
- **Layout Overflow**:
  - **Parent Page**: Playwright verified that `document.documentElement.scrollWidth <= window.innerWidth` in the main resume site context. There is **no layout overflow**.
  - **Iframe Document**: Playwright verified that `scrollWidth <= innerWidth` inside the Quarto document iframe. There is **no layout overflow**.

## 3. Project Routing Stability
We added a stress test that loads multiple project routes sequentially:
- **Routes Tested**:
  1. `/projects/key-drivers`
  2. `/projects/poisson-mle`
  3. `/projects/card-krueger`
  4. `/projects/ab-testing`
- **Result**: Client-side routing remains completely stable. The fullscreen modal successfully opens automatically for each project (since they all have embedded HTML report URLs), and the body's overflow is locked (`overflow: hidden`). No navigation errors or route hydration issues occurred.
