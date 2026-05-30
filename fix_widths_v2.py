"""
Fix width inconsistencies in the HW3 MLE report.
Quarto's page-layout-article uses a CSS grid with:
- A narrow body column for text (~700px)
- A wider column for figures
- A margin sidebar for TOC

This script replaces the CSS override with a more aggressive one that:
1. Removes the grid layout entirely
2. Makes everything flow as a single column at consistent width
3. Floats the TOC as a fixed sidebar
"""

CSS_OVERRIDE = """
<style type="text/css">
/* === WIDTH NORMALIZATION v2 === */
/* Kill Quarto's grid layout entirely */
#quarto-content.page-columns {
  display: block !important;
  max-width: 860px !important;
  margin: 0 auto !important;
  padding: 2rem 2rem !important;
}

/* Float the TOC as a fixed panel */
#quarto-margin-sidebar {
  position: fixed !important;
  top: 70px !important;
  right: 24px !important;
  width: 190px !important;
  max-height: calc(100vh - 90px) !important;
  overflow-y: auto !important;
  z-index: 100 !important;
  background: var(--surface, #1a2332) !important;
  border-radius: 10px !important;
  padding: 0.8rem 1rem !important;
  border: 1px solid var(--border-card, rgba(255,255,255,0.06)) !important;
  font-size: 0.82rem !important;
}

/* Main content fills the block container */
main.content, #quarto-document-content {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}

/* All child elements of main content - same width */
main.content > section,
main.content > section > *,
main.content > section > section > * {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

/* Paragraphs - ensure they fill the container */
main.content p {
  max-width: 100% !important;
}

/* Code blocks */
.sourceCode, pre, .cell, .cell-output, .cell-output-display {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Plotly charts */
.plotly-graph-div, .js-plotly-plot {
  width: 100% !important;
  max-width: 100% !important;
}

/* Widget containers */
.widget-container {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Math blocks */
.math.display, mjx-container[display="true"] {
  max-width: 100% !important;
  overflow-x: auto !important;
}

/* Callout boxes */
.callout, .guide-box, .key-result, .callout-note {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

/* Stat cards */
.stat-row {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

/* Figure captions */
figcaption, .figure-caption {
  max-width: 100% !important;
}

/* Quarto figure containers */
.quarto-figure, .quarto-figure-center {
  max-width: 100% !important;
  width: 100% !important;
}

/* Summary grid */
.summary-grid {
  max-width: 100% !important;
}

/* Remove any grid-column assignments from Quarto */
.page-columns > *,
.page-columns > main > *,
.page-columns > main > section > * {
  grid-column: unset !important;
}

/* Hide TOC on narrow viewports (e.g., iframe) */
@media (max-width: 1100px) {
  #quarto-margin-sidebar {
    display: none !important;
  }
  #quarto-content.page-columns {
    max-width: 100% !important;
    padding: 1.5rem !important;
  }
}
</style>
"""

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the old CSS override (v1)
old_start = html.find('/* === WIDTH NORMALIZATION === */')
if old_start > 0:
    # Find the style tag containing it
    style_start = html.rfind('<style', 0, old_start)
    style_end = html.find('</style>', old_start) + 8
    html = html[:style_start] + html[style_end:]
    print("✓ Removed old width normalization CSS")

# Inject new CSS before </head>
head_close = html.find('</head>')
if head_close > 0:
    html = html[:head_close] + CSS_OVERRIDE + '\n' + html[head_close:]
    print("✓ Injected width normalization CSS v2")
else:
    print("✗ Could not find </head>")

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"File size: {len(html)/1024/1024:.1f} MB")
