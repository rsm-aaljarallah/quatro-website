"""
Inject CSS overrides to normalize content widths in the HW3 MLE report.
The issue: Quarto's page-layout-article uses a narrow text column (~700px)
but allows figures/code to be wider (~900px), creating an uneven look.
Fix: Override to make everything the same consistent width.
"""

# CSS to inject - normalizes all content to the same max-width
CSS_OVERRIDE = """
<style type="text/css">
/* === WIDTH NORMALIZATION === */
/* Make the main content area consistent width */
#quarto-content {
  display: block !important;
  max-width: 900px !important;
  margin: 0 auto !important;
  padding: 2rem 2.5rem !important;
}

/* Remove the sidebar TOC on smaller screens and make it float */
#quarto-margin-sidebar {
  position: fixed !important;
  top: 80px !important;
  right: 20px !important;
  width: 200px !important;
  max-height: calc(100vh - 100px) !important;
  overflow-y: auto !important;
  z-index: 100 !important;
  background: var(--surface, #1a2332) !important;
  border-radius: 10px !important;
  padding: 1rem !important;
  border: 1px solid var(--border-card, rgba(255,255,255,0.06)) !important;
}

/* Main content takes full width */
main.content {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* All section content same width */
main.content > section {
  max-width: 100% !important;
  width: 100% !important;
}

/* Code blocks match text width */
.sourceCode, .cell, .cell-output-display {
  max-width: 100% !important;
  width: 100% !important;
}

/* Plotly charts fill available width */
.plotly-graph-div, .js-plotly-plot {
  width: 100% !important;
}

/* Widget containers full width */
.widget-container {
  max-width: 100% !important;
  width: 100% !important;
}

/* Math blocks don't overflow */
.math.display, mjx-container[display="true"] {
  max-width: 100% !important;
  overflow-x: auto !important;
}

/* Callout boxes match content width */
.callout, .guide-box, .key-result {
  max-width: 100% !important;
}

/* Stat row cards */
.stat-row {
  max-width: 100% !important;
}

/* Remove any Quarto grid-column overrides */
.page-columns > * {
  grid-column: unset !important;
}

/* Hide TOC on narrow viewports */
@media (max-width: 1200px) {
  #quarto-margin-sidebar {
    display: none !important;
  }
}

/* On very wide screens, center content better */
@media (min-width: 1400px) {
  #quarto-content {
    max-width: 950px !important;
  }
}
</style>
"""

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Inject before </head>
head_close = html.find('</head>')
if head_close > 0:
    html = html[:head_close] + CSS_OVERRIDE + '\n' + html[head_close:]
    print("✓ Injected width normalization CSS")
else:
    print("✗ Could not find </head>")

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"File size: {len(html)/1024/1024:.1f} MB")
