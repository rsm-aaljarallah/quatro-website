"""
Fix width inconsistencies in HW3 MLE report by injecting CSS at the END of the body.
This ensures our styles load LAST and override Quarto's grid layout.
Also removes the previous head-injected CSS to avoid conflicts.
"""

# The CSS override - placed at end of body for maximum priority
CSS_FIX = """
<style id="width-fix">
/* ═══════════════════════════════════════════════════════════════
   WIDTH FIX — injected at end of body to override Quarto grid
   ═══════════════════════════════════════════════════════════════ */

/* Kill the CSS Grid layout on the main container */
body #quarto-content.page-columns.page-rows-contents.page-layout-article {
  display: block !important;
  max-width: 880px !important;
  margin: 0 auto !important;
  padding: 2.5rem 2rem !important;
}

/* Hide the TOC sidebar — it takes space and causes asymmetry */
body #quarto-margin-sidebar.sidebar.margin-sidebar {
  display: none !important;
}

/* Main content fills the container */
body main.content {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* All sections — full width */
body main.content > section,
body main.content > section > section {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
}

/* Every direct child of sections — full width */
body main.content section > * {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Paragraphs specifically */
body main.content p {
  max-width: 100% !important;
  width: 100% !important;
}

/* Lists */
body main.content ul,
body main.content ol {
  max-width: 100% !important;
}

/* Code cells and outputs */
body .cell,
body .cell-output,
body .cell-output-display,
body .sourceCode,
body pre {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Plotly charts */
body .plotly-graph-div,
body .js-plotly-plot {
  width: 100% !important;
  max-width: 100% !important;
}

/* Figures */
body .quarto-figure,
body .quarto-figure-center,
body figure {
  max-width: 100% !important;
  width: 100% !important;
}

/* Callouts and custom boxes */
body .callout,
body .guide-box,
body .key-result,
body .callout-note {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Widget containers */
body .widget-container {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Stat row */
body .stat-row {
  max-width: 100% !important;
  width: 100% !important;
}

/* Summary grid */
body .summary-grid {
  max-width: 100% !important;
  width: 100% !important;
}

/* Math displays */
body .math.display,
body mjx-container[display="true"] {
  max-width: 100% !important;
  overflow-x: auto !important;
}

/* Figure captions */
body figcaption {
  max-width: 100% !important;
}

/* Horizontal rules */
body main.content hr {
  max-width: 100% !important;
  width: 100% !important;
}

/* Tables */
body main.content table {
  max-width: 100% !important;
  width: 100% !important;
}

/* Blockquotes */
body main.content blockquote {
  max-width: 100% !important;
  width: 100% !important;
}

/* Remove any leftover grid-column assignments */
body .page-columns > *,
body [class*="column-"] {
  grid-column: 1 / -1 !important;
}
</style>
"""

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the old v2 CSS override from the head
old_marker = '/* === WIDTH NORMALIZATION v2 === */'
if old_marker in html:
    style_start = html.rfind('<style', 0, html.find(old_marker))
    style_end = html.find('</style>', html.find(old_marker)) + 8
    html = html[:style_start] + html[style_end:]
    print("Removed old v2 CSS from head")

# Also remove v1 if still present
old_marker_v1 = '/* === WIDTH NORMALIZATION === */'
if old_marker_v1 in html:
    style_start = html.rfind('<style', 0, html.find(old_marker_v1))
    style_end = html.find('</style>', html.find(old_marker_v1)) + 8
    html = html[:style_start] + html[style_end:]
    print("Removed old v1 CSS from head")

# Inject new CSS right before </body>
body_close = html.rfind('</body>')
if body_close > 0:
    html = html[:body_close] + CSS_FIX + '\n' + html[body_close:]
    print("Injected width-fix CSS before </body>")
else:
    print("ERROR: Could not find </body>")

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"File size: {len(html)/1024/1024:.1f} MB")
