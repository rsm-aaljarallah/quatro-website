# UX Verification & Challenger Report

## Overview
This report documents the verification of the sequential project route loading tests, modal behaviors, scroll locking, and iframe path correctness for the Resume Website UX project. All verification was performed programmatically via Playwright end-to-end tests and static code inspection.

---

## 1. Test Execution Results
The Playwright test suite in `tests/ux.spec.js` was executed via `npx playwright test`. 

**Command Run:**
```bash
npx playwright test
```

**Result:**
- **Status:** PASS
- **Total Tests:** 3
- **Passed Tests:** 3
- **Duration:** 3.3 seconds

### Test Coverage Detail:
1. **Viewport, Dark Theme, & Quarto Layout Constraints (`ux.spec.js` Line 4):**
   - Resizes viewport to desktop (1280x800).
   - Validates that the homepage background matches deep cinematic dark style colors (`#0A0E1A`, `#080C18`, or `#050810`).
   - Validates that the `/projects` background is dark.
   - Navigates to `/projects/key-drivers` and verifies the fullscreen modal opens automatically.
   - Verifies body scroll-locking is active (`overflow: hidden`).
   - Asserts the modal background color is deep dark (`#050810`).
   - Verifies the iframe loads the Quarto report.
   - Confirms that the Table of Contents sidebar (`#quarto-sidebar-toc-left` or `#quarto-margin-sidebar`) is visible inside the iframe.
   - Verifies the document content does not overlap the sidebar.
   - Verifies that exiting fullscreen (clicking "Exit Fullscreen") hides the modal and restores scrolling (`overflow: auto`).

2. **Mobile Viewport Toc Collapse & Overflow Prevention (`ux.spec.js` Line 108):**
   - Sets viewport to a narrow mobile width (375x800).
   - Verifies that the Table of Contents sidebar in the Quarto report is collapsed/hidden (`display: none`).
   - Validates that no horizontal layout overflow exists in the parent page or within the iframe (`scrollWidth <= innerWidth`).

3. **Sequential Route Verification (`ux.spec.js` Line 158):**
   - Iterates through the project routes sequentially:
     - `/projects/key-drivers`
     - `/projects/poisson-mle`
     - `/projects/card-krueger`
     - `/projects/ab-testing`
   - Verifies that for every route:
     - The fullscreen modal opens successfully (`div.fixed.z-[100]` is visible).
     - The embedded iframe is visible.
     - Body scrolling locks successfully (`overflow: hidden`).

---

## 2. Modal Behavior & Scroll Locking Implementation Review

### Code Location: `client/src/pages/ProjectViewer.tsx`
- **Modal Toggle:** Controlled by the React `fullscreen` state, initialized based on the presence of a project URL:
  ```typescript
  const [fullscreen, setFullscreen] = useState(!!baseInfo?.url);
  ```
- **Scroll Lock Hook:**
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
  *Analysis:* This implementation is clean and properly locks the scroll of the outer viewport by setting `overflow: hidden` on `document.body`. Returning a cleanup function ensures that the body overflow style is reset when the component unmounts, preventing scroll-lock leaks.
- **Modal Component:** Uses Framer Motion's `AnimatePresence` and `motion.div` with class `fixed inset-4 md:inset-8 lg:inset-12 z-[100]`.

---

## 3. Iframe Path Correctness
The `Projects` definition file (`client/src/pages/Projects.tsx`) defines the following paths for academic projects:

| Project Slug | Mapped `url` (in code) | Verified File Exist in `client/public` |
| --- | --- | --- |
| `ab-testing` | `/projects/ab-testing.html` | ✅ `client/public/projects/ab-testing.html` |
| `card-krueger` | `/projects/hw2.html` | ✅ `client/public/projects/hw2.html` |
| `poisson-mle` | `/projects/hw3-mle.html` | ✅ `client/public/projects/hw3-mle.html` |
| `maxdiff` | `/projects/hw4-maxdiff.html` | ✅ `client/public/projects/hw4-maxdiff.html` |
| `key-drivers` | `/projects/hw5-key-drivers.html` | ✅ `client/public/projects/hw5-key-drivers.html` |

*Analysis:* Since the root of the Vite build is `client/` and static assets are located inside `client/public/`, files located in `client/public/projects/` will be served directly at `http://localhost:3000/projects/...`. Therefore, the paths specified in `Projects.tsx` correctly resolve to the static Quarto reports when rendered in the iframe.

---

## 4. Anomalies & Findings (Adversarial Review)

### Finding 1: TypeScript Compiler Errors
During type-checking with `npm run check` (`tsc --noEmit`), the compiler failed with exit code 1.
- **Error in `client/src/components/ProjectsSection.tsx`:**
  - Type assignment issues on Framer Motion `Variants`. Specifically, properties like `hover` inside local variant definitions are incompatible with index signatures due to transition `type: string` not matching `AnimationGeneratorType`.
- **Error in `client/src/pages/ProjectViewer.tsx`:**
  - Missing the mandatory `number` property inside the matched project object in `ProjectViewer.tsx` (the type definition expects `number` for some project types but it was omitted).
  
*Note:* These TypeScript compiler errors do not block the development server or prevent Playwright from running the tests successfully, but they could block a strict CI build/production deploy. Per Challenger constraints, we did not modify this code to fix the type errors.
