# Handoff Report - Explorer 1 Setup Investigation

## 1. Observation

During my investigation of the Vite portfolio website's structure, routing, modal logic, Table of Contents styling, and E2E verification strategy, I observed the following:

* **Package Manager Configuration**:
  * In `package.json`, line 90:
    ```json
    "packageManager": "pnpm@10.4.1+sha512..."
    ```
  * In `package.json`, line 7:
    ```json
    "dev": "vite --host"
    ```
  * In `/Users/aj/git/vn-docker/Martketing Analytics/Websites/Build a Modern Tech-Oriented Resume Website/` there exists a `pnpm-lock.yaml` file.

* **Client Routes**:
  * In `client/src/App.tsx`, lines 103–104:
    ```tsx
    <Route path={"/projects"} component={Projects} />
    <Route path={"/projects/:slug"} component={ProjectViewer} />
    ```

* **Fullscreen Modal Auto-Opening Logic**:
  * In `client/src/pages/ProjectViewer.tsx`, line 28:
    ```typescript
    const [fullscreen, setFullscreen] = useState(!!baseInfo?.url);
    ```
  * In `client/src/pages/ProjectViewer.tsx`, lines 39–48:
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

* **Table of Contents (TOC) Left Alignment**:
  * In `client/public/projects/inject_theme.py`, lines 50–67:
    ```css
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
    ```

---

## 2. Logic Chain

1. **Package Manager and Dev Server Run command**:
   * Since `package.json` explicitly states `pnpm` under `"packageManager"` and a `pnpm-lock.yaml` is present, the website's dependency structure relies on `pnpm`.
   * Since the `"dev"` script in `package.json` executes `vite --host` (which starts the Vite development server), executing `pnpm dev` starts the local development server on port `3000` (per port settings in `vite.config.ts`).

2. **Routing and Fullscreen Modal Initialization**:
   * Navigating to `/projects/:slug` mounts the `ProjectViewer` component.
   * If a project slug resolves to a metadata entry that contains a valid `url` (e.g. `baseInfo?.url` exists), the React state `fullscreen` is initialized to `true` (as `!!baseInfo?.url` evaluates to true).
   * Setting `fullscreen` to `true` locks the parent page scroll (applying `overflow: hidden` to `document.body` via a `useEffect` hook) and mounts the fullscreen modal container which renders the Quarto document in an iframe.
   * If a project's `url` is null, `fullscreen` initializes to `false`, page scrolling remains standard (`overflow: auto`), and fallback layout (inline summary / "Web View Not Available" prompt) renders.

3. **TOC Left Alignment**:
   * Quarto places its Table of Contents inside a container labeled `#quarto-margin-sidebar`.
   * The utility script `inject_theme.py` runs over the Quarto HTML assets. It injects a style block containing responsive overrides when screen width is `>= 992px`.
   * This override assigns `#quarto-margin-sidebar` a fixed layout (`position: fixed !important`, `left: 0 !important`) aligning it to the absolute left margin. It offsets the main `#quarto-content` container by `280px` (`margin-left: 280px !important`) to clear it.

4. **Playwright Verification Strategy**:
   * Because the Quarto reports are embedded in an iframe inside the modal, E2E tests must transition their selector scope into the iframe's DOM context (e.g. using `frameLocator`).
   * Because the left-alignment styles are responsive and depend on `@media (min-width: 992px)`, the E2E script must explicitly resize the test viewport to a desktop size (e.g. `1280x800`) to correctly assert left placement properties.

---

## 3. Caveats

* **Local Dev Execution**: The investigation was conducted strictly via read-only file audits. Running `pnpm dev` was not executed on the system to verify active runtime console errors.
* **Responsive Breakpoints**: At viewports narrower than `992px`, the left-alignment styling is overridden or hidden. The test suite must ensure viewport configurations are controlled.

---

## 4. Conclusion

The Vite portfolio is structured as a client-side Vite + React app, built with `pnpm`, running locally on port `3000` via `pnpm dev`. It utilizes `wouter` for routing, routing slugs to `ProjectViewer` which auto-opens files with defined URLs in a scroll-locked fullscreen iframe. The custom injected styles successfully position the Quarto Table of Contents sidebar (`#quarto-margin-sidebar`) to the absolute left of the screen context. E2E verification of these features requires a Playwright script that resizes the viewport to a desktop size, traverses the iframe boundary, and inspects the computed CSS values and bounding boxes of the sidebar and content wrappers.

---

## 5. Verification Method

To independently verify the observations and logic:

1. **Verify Dev Server**:
   Execute `pnpm dev` in the project root directory. Verify that the server launches successfully on `http://localhost:3000`.

2. **Inspect HTML files**:
   Open `/client/public/projects/ab-testing.html` and verify the injected `<style>` block contains the `#quarto-margin-sidebar` overrides at line 50.

3. **Verify Routing & Modal Logic**:
   * Navigate to `http://localhost:3000/projects/ab-testing`.
   * Verify that the fullscreen modal is loaded, body has styling `overflow: hidden`, and an iframe with `src="/projects/ab-testing.html"` is visible.
   * Click "Exit Fullscreen" and verify that body style reverts to `overflow: auto`.

4. **Verify Left Alignment**:
   * Set the viewport size in Chrome DevTools to a width greater than `992px` (e.g., standard desktop).
   * Inside the iframe, inspect the `#quarto-margin-sidebar` element.
   * Verify that its computed style shows `position: fixed` and `left: 0px`.
   * Inspect `#quarto-content` and verify that `margin-left` is `280px`.
