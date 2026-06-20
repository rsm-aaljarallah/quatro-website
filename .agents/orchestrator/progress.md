## Current Status
Last visited: 2026-06-12T17:01:00Z

## Iteration Status
Current iteration: 8 / 32

- [x] Setup and Explore
- [x] Implement Automated Test Script & Run
- [x] Verify and Audit UX/UI layout
- [x] Generate Final Report

## Retrospective & Process Improvements
1. **Dynamic IDs**: Re-running build-time styling hooks or preprocessing scripts (like `inject_theme.py`) can alter target DOM element IDs (e.g. from `#quarto-margin-sidebar` to `#quarto-sidebar-toc-left`). Tests should be constructed with multi-selector support (`#quarto-sidebar-toc-left, #quarto-margin-sidebar`) to prevent structural regression failures.
2. **Robust Layout Assertions**: Testing layout alignments is more reliable using relative bounding boxes (`contentX >= sidebarX + sidebarWidth`) rather than hardcoded pixel assertions (`left: 0px`, `width: 250px`, `marginLeft: 280px`), since modern responsive stylesheets leverage sticky flows and custom margins.
3. **Strict Mode Selector Conflicts**: Ensure that modal content overlays hide or unmount underlying views. In `ProjectViewer.tsx`, duplicate elements with identical text labels existed in both parent layouts and fullscreen overlay layout contexts, which causes Playwright strict-mode locator errors unless scoped tightly (e.g. `page.locator('div.fixed.z-[100] button')`).

