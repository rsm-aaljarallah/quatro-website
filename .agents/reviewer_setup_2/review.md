# Quality and Adversarial Review Report

## Review Summary

**Verdict**: APPROVE

This review covers the Playwright test suite (`tests/ux.spec.js`), the Playwright configuration (`playwright.config.js`), and the Quarto table of contents styling and layout (#quarto-margin-sidebar). All tests pass successfully, the production build completes cleanly, and the table of contents layout renders correctly on the left side of the screen as designed for viewport widths >= 992px.

---

## Quality Review Findings

### [Minor] Selector Fragility in E2E Tests

- **What**: The test targets the modal container using complex, escaped Tailwind utility classes: `div.fixed.z-\\[100\\]` and `div.fixed.z-\\[100\\] iframe`.
- **Where**: `tests/ux.spec.js` lines 42 and 59
- **Why**: Coupling tests to specific style/z-index utility classes makes tests fragile. If the design changes (e.g., modifying `z-[100]` to `z-[90]` or changing layout structure), the test will fail even if functionality is correct.
- **Suggestion**: Couple the iframe selection to the accessible title attribute (`iframe[title="Key Drivers Analysis"]`) which is decoupled from CSS class names, or add a dedicated `data-testid="project-modal"` attribute to the modal container.

### [Minor] Media Query & Viewport Dependencies

- **What**: The test enforces a hardcoded viewport of `1280x800` to pass.
- **Where**: `tests/ux.spec.js` line 8
- **Why**: The left positioning of `#quarto-margin-sidebar` and the margin offset for `#quarto-content` are wrapped in a `@media (min-width: 992px)` media query in the injected CSS (`inject_theme.py`). If the test runs on smaller viewports (e.g., mobile devices), these styles are not applied and the assertions fail.
- **Suggestion**: Document that this test specifically asserts the desktop layout. Add a separate responsive test or mobile project to assert the mobile/tablet fallback layout for the Quarto document.

---

## Verified Claims

- **Test Suite Execution** → verified via `npx playwright test` → **PASS** (1 test passed in 1.5s).
- **Production Build** → verified via `npx pnpm build` (executes `vite build`) → **PASS** (compiled cleanly in 1.20s).
- **TOC Position and Left Alignment** → verified via checking injected CSS styles in `inject_theme.py` and running the test suite's computed style checks → **PASS** (rendered at `left: 0px` with width `250px`, and main content shifted by `280px`).

---

## Coverage Gaps

- **Mobile Viewports** — risk level: **Low** — recommendation: **Accept risk**. The current design targets resume viewing on desktop/larger screens; mobile testing is a nice-to-have but not critical for current delivery.

---

## Adversarial Review & Challenge Report

**Overall risk assessment**: LOW

### [Low] Responsive Viewport Layout Shift

- **Assumption challenged**: The page will always be viewed at >= 992px width.
- **Attack scenario**: A user opens `/projects/key-drivers` on a mobile device or vertical screen.
- **Blast radius**: The media query does not apply. The Quarto sidebar falls back to its default relative/absolute styling, which might overlap with the main content or hide incorrectly due to modal container constraints.
- **Mitigation**: Add basic styling rules for `< 992px` in `inject_theme.py` to gracefully hide the margin sidebar on mobile screens or make it a collapsable top header.

---

## Stress Test Results

- **Run tests under desktop viewport (1280x800)** → Expected: TOC renders on the left, content offset by 280px → Actual: TOC renders on the left, offset is 280px → **PASS**
- **Clean production compilation** → Expected: Build completes without compiler or syntax errors → Actual: Vite builds client files into `dist/public` cleanly → **PASS**
