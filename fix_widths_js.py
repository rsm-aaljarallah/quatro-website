"""
Fix width inconsistencies using JavaScript injection.
CSS overrides failed because Quarto's data:URI stylesheet has higher specificity.
This script injects JS that runs after DOM load to forcibly set inline styles.
"""

JS_FIX = """
<script id="width-fix-js">
(function() {
  function fixLayout() {
    // 1. Kill the grid on #quarto-content
    var qc = document.getElementById('quarto-content');
    if (qc) {
      qc.style.cssText = 'display:block!important;max-width:880px!important;margin:0 auto!important;padding:2.5rem 2rem!important;';
      qc.classList.remove('page-columns', 'page-rows-contents');
    }

    // 2. Hide the TOC sidebar
    var sidebar = document.getElementById('quarto-margin-sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }

    // 3. Make main.content full width
    var main = document.querySelector('main.content');
    if (main) {
      main.style.cssText = 'display:block!important;max-width:100%!important;width:100%!important;margin:0!important;padding:0!important;';
    }

    // 4. Make all sections full width
    var sections = document.querySelectorAll('main.content > section, main.content > section > section');
    sections.forEach(function(s) {
      s.style.maxWidth = '100%';
      s.style.width = '100%';
    });

    // 5. Make all paragraphs, lists, and block elements full width
    var blocks = document.querySelectorAll('main.content p, main.content ul, main.content ol, main.content blockquote, main.content .callout, main.content figure, main.content .cell, main.content .sourceCode, main.content pre, main.content hr, main.content table, main.content .widget-container, main.content .stat-row, main.content .summary-grid, main.content .guide-box, main.content .key-result');
    blocks.forEach(function(el) {
      el.style.maxWidth = '100%';
      el.style.width = '100%';
      el.style.boxSizing = 'border-box';
    });

    // 6. Fix any grid-column assignments
    var gridItems = document.querySelectorAll('[style*="grid-column"]');
    gridItems.forEach(function(el) {
      el.style.gridColumn = 'unset';
    });
  }

  // Run immediately
  fixLayout();

  // Also run after a short delay (in case Quarto JS re-applies styles)
  setTimeout(fixLayout, 100);
  setTimeout(fixLayout, 500);
  setTimeout(fixLayout, 1500);

  // And on DOMContentLoaded if not already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixLayout);
  }
})();
</script>
"""

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the old CSS-only fix if present
css_marker = '<style id="width-fix">'
if css_marker in html:
    start = html.find(css_marker)
    end = html.find('</style>', start) + 8
    html = html[:start] + html[end:]
    print("Removed old CSS-only width fix")

# Inject JS before </body>
body_close = html.rfind('</body>')
if body_close > 0:
    html = html[:body_close] + JS_FIX + '\n' + html[body_close:]
    print("Injected JavaScript width fix before </body>")
else:
    print("ERROR: Could not find </body>")

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"File size: {len(html)/1024/1024:.1f} MB")
