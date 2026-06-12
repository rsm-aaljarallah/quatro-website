# Verification Findings — Challenger 2

**Overall Verification Status**: PASS with test-suite misalignment notes.

## 1. Layout Robustness of Projects List and Fullscreen Modal
- **Projects List (`/projects`)**:
  - Robust grid structure (`md:grid-cols-2 gap-6 max-w-5xl mx-auto`) containing 8 projects in total plus 1 full-width featured project at the top.
  - The list is highly responsive, adapting gracefully to different screen sizes.
  - Hover animations via `framer-motion` are clean and do not cause layout shifts.
- **Fullscreen Modal Container**:
  - Styled with responsive insets (`inset-4 md:inset-8 lg:inset-12 z-[100] rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.9)] bg-[#050810]`).
  - Utilizes a backdrop overlay (`z-[90] bg-[#050810]/80 backdrop-blur-xl`) to dim background content.
  - **Identified Risk/Issue**: The main content underneath is not unmounted or hidden when `fullscreen` is active. This causes two buttons containing the text "Exit Fullscreen" to exist concurrently in the DOM: one in the inline viewer (hidden underneath) and one in the modal (visible). This leads to a strict locator violation in standard testing environments unless targeted explicitly (e.g. using `div.fixed.z-\\[100\\] button`). It could also cause keyboard focus or accessibility issues.

## 2. Body Scroll Restoration on "Exit Fullscreen"
- **Implementation**:
  - `ProjectViewer.tsx` manages overflow dynamically inside a React `useEffect` hook:
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
- **Verification**:
  - Empirically verified through automated Playwright testing.
  - On navigating to a project viewer, `document.body.style.overflow` is successfully set to `"hidden"`.
  - Upon clicking the modal's "Exit Fullscreen" button, the modal closes, and `document.body.style.overflow` is successfully updated to `"auto"`.
  - The cleanup hook also ensures the style resets on component unmount, preventing scroll lock leaks when navigating away.

## 3. Iframe Cross-Origin Access and Content Integrity
- **CORS / Cross-Origin Integrity**:
  - The iframe points to same-origin relative URLs (`/projects/*.html`), which are served from the public folder of the local development server (port 3000).
  - This ensures that there are **no cross-origin restrictions**. The parent frame and the automated tests can inspect, manipulate, or access the iframe's internal DOM.
- **TOC Sidebar Layout Misalignment**:
  - During verification, the original test suite (`tests/ux.spec.js`) failed because it expects `#quarto-margin-sidebar` to have `left: 0px`, `width: 250px`, and `#quarto-content` to have `marginLeft: 280px`.
  - However, the script `inject_theme.py` re-styled all Quarto outputs. It replaced `id="quarto-margin-sidebar"` with `id="quarto-sidebar-toc-left"` and class `.margin-sidebar` with `.toc-left`.
  - Under the new layout configuration:
    - Sidebar styles are `position: sticky; left: auto; right: auto; width: 223.328px; display: block;`
    - Content styles are `marginLeft: 0px; paddingLeft: 0px; display: grid;`
  - While this layout is visually correct and responsive, the test suite (`tests/ux.spec.js`) asserts outdated layout dimensions and element IDs, leading to failures on verification runs.
