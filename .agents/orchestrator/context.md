# Project Context: Resume Website UX Analysis

## Tech Stack
- Frontend: Vite, React, Tailwind CSS, Framer Motion, Wouter, Radix UI.
- Package Manager: `pnpm` (based on `pnpm-lock.yaml` and `package.json` packageManager field).
- Server: Local dev server runs via `pnpm dev` or `npm run dev` (hosts on `localhost:5173`).
- Quarto Reports: Static HTML files (e.g. `client/public/projects/hw5-key-drivers.html`) rendered inside an `iframe` component.

## Key UI/UX Specifications to Verify
1. **Fullscreen modal**: Opens automatically upon navigating to `/projects/key-drivers` due to `const [fullscreen, setFullscreen] = useState(!!baseInfo?.url);` in `ProjectViewer.tsx`.
2. **Background**: Modal is dark (`bg-[#050810]`).
3. **Table of Contents (TOC)**: Inside the Quarto iframe, `#quarto-margin-sidebar` (representing the TOC) must be present and visible on the left side of the screen.
4. **Cinematic Dark Mode**: Theme consistency across pages (deep navy, dark backgrounds, high-contrast text, glow accents).

## Active Dev Server Status
- URL: `http://localhost:5173`
- Status: TBD (to be started by subagents)
