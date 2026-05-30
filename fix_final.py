"""
Final fix: Add CSS + JS at end of body that:
1. Hides any dynamically-created TOC/sidebar (display:none)
2. Forces consistent content width
The CSS uses !important and targets elements by role/class that Quarto creates dynamically.
The JS runs on DOMContentLoaded and also with MutationObserver to catch dynamic elements.
"""

INJECTION = """
<style id="layout-override">
/* Hide any dynamically-created TOC sidebar */
nav[role="doc-toc"],
nav.toc-active,
.sidebar.margin-sidebar,
#quarto-margin-sidebar,
#quarto-sidebar,
#quarto-sidebar-toc-left,
[id*="quarto-margin"],
[id*="quarto-sidebar"] {
  display: none !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  left: -9999px !important;
}

/* Force single-column layout */
#quarto-content {
  display: block !important;
  max-width: 880px !important;
  margin: 0 auto !important;
  padding: 2.5rem 2rem !important;
  grid-template-columns: none !important;
}

main.content {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  grid-column: unset !important;
}

/* All content blocks full width */
main.content section,
main.content p,
main.content ul,
main.content ol,
main.content figure,
main.content .cell,
main.content .cell-output,
main.content .cell-output-display,
main.content pre,
main.content .sourceCode,
main.content .callout,
main.content .widget-container,
main.content .stat-row,
main.content .summary-grid,
main.content .guide-box,
main.content .key-result,
main.content blockquote,
main.content hr,
main.content table {
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
  grid-column: unset !important;
}
</style>

<script id="layout-fix-js">
(function() {
  function killTOC() {
    // Remove any TOC nav elements
    document.querySelectorAll('nav[role="doc-toc"], nav.toc-active, #quarto-margin-sidebar, #quarto-sidebar').forEach(function(el) {
      el.remove();
    });
    // Fix the content container
    var qc = document.getElementById('quarto-content');
    if (qc) {
      qc.style.display = 'block';
      qc.style.maxWidth = '880px';
      qc.style.margin = '0 auto';
      qc.style.padding = '2.5rem 2rem';
    }
  }

  // Run immediately
  killTOC();

  // Run after DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    killTOC();
    // Also watch for dynamically added elements
    var observer = new MutationObserver(function(mutations) {
      killTOC();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Stop observing after 5 seconds to avoid performance issues
    setTimeout(function() { observer.disconnect(); }, 5000);
  });

  // Also run with delays
  setTimeout(killTOC, 100);
  setTimeout(killTOC, 500);
  setTimeout(killTOC, 1000);
  setTimeout(killTOC, 2000);
})();
</script>
"""

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove any previous fix attempts
import re
# Remove old style id="width-fix" or id="layout-override"
for marker in ['<style id="width-fix">', '<style id="layout-override">', '<script id="width-fix-js">', '<script id="layout-fix-js">']:
    if marker in html:
        start = html.find(marker)
        tag_type = 'style' if 'style' in marker else 'script'
        end = html.find(f'</{tag_type}>', start) + len(f'</{tag_type}>')
        html = html[:start] + html[end:]
        print(f"Removed old: {marker}")

# Inject before </body>
body_close = html.rfind('</body>')
if body_close > 0:
    html = html[:body_close] + INJECTION + '\n' + html[body_close:]
    print("Injected layout override CSS + JS before </body>")
else:
    print("ERROR: Could not find </body>")

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"File size: {len(html)/1024/1024:.1f} MB")
