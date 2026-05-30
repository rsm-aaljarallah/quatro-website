# Width Issues Observed in HW3 MLE Report

## Key Observations:
1. The main content area uses Quarto's default layout which has a narrower text column (~700px) but allows figures/charts to break out wider (~900px)
2. The Plotly charts extend to full container width (~900px)
3. The text paragraphs are constrained to a narrower column (~700px)
4. The code blocks appear to be the same width as charts (~900px)
5. The "guide-box" / callout boxes match the text width
6. The interactive widget area (Poisson Explorer) has a large empty space below the controls - the canvas area seems to not be rendering

## The "wide then narrow" issue:
- Charts/figures span ~900px (full column)
- Text paragraphs are ~700px (Quarto's body text width)
- This creates a visual "narrowing" effect when going from a chart to text
- The Table of Contents sidebar on the right also pushes the main content left

## Fix approach:
- Override Quarto's default column widths to make everything consistent
- Set body text, code blocks, charts, and callouts all to the same max-width
- Remove or reduce the TOC sidebar width to give more room
- Ensure the interactive widgets render at full width
