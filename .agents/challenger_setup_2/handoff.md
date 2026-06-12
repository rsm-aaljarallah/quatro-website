# Handoff Report — Challenger 2

## 1. Observation
- **Test Command Output**: The Playwright test command `npx playwright test` failed in the default suite `tests/ux.spec.js` with:
  ```
  Error: expect(locator).toBeVisible() failed
  Locator: locator('div.fixed.z-\\[100\\] iframe').contentFrame().locator('#quarto-margin-sidebar')
  Expected: visible
  Timeout: 15000ms
  Error: element(s) not found
  ```
- **Iframe Layout DOM**: Inside the Quarto static HTML reports (e.g. `client/public/projects/hw5-key-drivers.html`), the sidebar has class/ID:
  ```html
  <div id="quarto-sidebar-toc-left" class="sidebar toc-left">
  ```
  This rewrite is driven by `client/public/projects/inject_theme.py` on line 75:
  ```python
  content = content.replace('id="quarto-margin-sidebar" class="sidebar margin-sidebar"', 'id="quarto-sidebar-toc-left" class="sidebar toc-left"')
  ```
- **Sidebar & Content Computed Styles**: Running a scoped Playwright test to log styles of `#quarto-sidebar-toc-left` and `#quarto-content` yielded:
  - Sidebar: `{ position: 'sticky', left: 'auto', right: 'auto', width: '223.328px', display: 'block', visibility: 'visible', opacity: '1' }`
  - Content: `{ marginLeft: '0px', paddingLeft: '0px', display: 'grid' }`
- **Strict Selector Mode Conflict**: In `ProjectViewer.tsx`, the main content remains mounted under the fullscreen modal backdrop overlay, producing a duplicate "Exit Fullscreen" button text:
  ```
  Error: strict mode violation: locator('button:has-text(\'Exit Fullscreen\')') resolved to 2 elements:
      1) <button class="flex items-center gap-2 text-sm text-[#7A8FA8] hover:text-[#B8C8DC]">…</button>
      2) <button class="absolute top-4 right-4 md:top-6 md:right-6 z-[110] ...">…</button>
  ```
- **Body Scroll Overflow Style**: The body scrolling behavior is controlled by `ProjectViewer.tsx` inside a React effect:
  ```tsx
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
  And when exiting fullscreen, body overflow successfully updates to `"auto"`.

## 2. Logic Chain
1. From the **Iframe Layout DOM** observation, we see that the element ID `#quarto-margin-sidebar` has been replaced globally with `#quarto-sidebar-toc-left` by `inject_theme.py`.
2. Because of this replacement, the default test suite's locator `locator('#quarto-margin-sidebar')` fails to find the element, leading to the observed test failure.
3. From the **Sidebar & Content Computed Styles** observation, the new native Quarto grid layout styles the TOC dynamically (`position: sticky`, `left: auto`, and dynamic width of `223.3px`) and leaves no margin-left (`0px`) on `#quarto-content` because it relies on standard grid positioning.
4. From the **Strict Selector Mode Conflict** observation, because the underlying layout remains in the DOM when fullscreen is active, multiple instances of the "Exit Fullscreen" text button exist, creating a target ambiguity for automated testing and screen-readers.
5. From the **Body Scroll Overflow Style** observation, the React hook correctly locks scrolling with `overflow = "hidden"` on fullscreen toggle, and correctly releases it back to `"auto"` when fullscreen is deactivated.

## 3. Caveats
- No other web viewports or styling combinations were tested beyond Desktop (1280x800) and standard mobile viewports in the test suites.
- It is assumed that `"auto"` is the desired default state for body overflow across the entire site when the modal is closed.

## 4. Conclusion
- **Layout Robustness**: The layout of `/projects` and the fullscreen modal container are robust and responsive. However, leaving the inline viewer in the DOM during fullscreen creates duplicate buttons and element locators.
- **Scroll Restoration**: Exiting fullscreen correctly restores scrolling by updating the body `overflow` style to `"auto"`.
- **Iframe Access**: The iframe shares the same origin and is fully accessible without cross-origin issues. However, the automated test suite (`tests/ux.spec.js`) has outdated layout assertions (`left: 0px`, `width: 250px`, `marginLeft: 280px`) and uses the old `#quarto-margin-sidebar` selector, which is why it fails.

## 5. Verification Method
- **Command to run**:
  1. Create a verification script or test modifying the assertions in `tests/ux.spec.js` to target `#quarto-sidebar-toc-left` and expect dynamic layout styles (e.g. `left: auto`, `marginLeft: 0px`).
  2. Run the test suite: `npx playwright test`
- **Conditions of invalidation**:
  - If the static Quarto HTML files are rebuilt without the `inject_theme.py` script running, the element ID could revert to `#quarto-margin-sidebar`, invalidating the current layout observations.
