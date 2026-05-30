"""
Deduplicate Plotly.js from the HTML file.
There are 5 identical copies of plotly.js v3.5.0 (4.8MB each = 24MB total).
Keep only the first one and remove the rest.
"""

import re

with open('/home/ubuntu/upload/HW3_MLE_patched.html', 'r', encoding='utf-8') as f:
    html = f.read()

print(f"Original size: {len(html):,} chars ({len(html)/1024/1024:.1f} MB)")

# Find all occurrences of the plotly.js script
plotly_marker = '* plotly.js v3.5.0'
occurrences = []
pos = 0
while True:
    idx = html.find(plotly_marker, pos)
    if idx < 0:
        break
    # Find the <script> tag that contains this
    script_start = html.rfind('<script', max(0, idx - 200), idx)
    script_end = html.find('</script>', idx) + 9
    occurrences.append((script_start, script_end))
    pos = script_end

print(f"Found {len(occurrences)} copies of plotly.js")

if len(occurrences) > 1:
    # Keep the first occurrence, remove the rest (in reverse order to preserve indices)
    for start, end in reversed(occurrences[1:]):
        # Replace with a comment noting it was deduplicated
        html = html[:start] + '<!-- plotly.js already loaded above -->' + html[end:]
    
    print(f"Removed {len(occurrences) - 1} duplicate copies")
    print(f"New size: {len(html):,} chars ({len(html)/1024/1024:.1f} MB)")
    
    # Verify plotly is still present
    assert plotly_marker in html, "ERROR: Plotly.js was completely removed!"
    assert html.count(plotly_marker) == 1, f"ERROR: Expected 1 copy, found {html.count(plotly_marker)}"
    
    # Also check that the Plotly chart data scripts are still there
    chart_scripts = html.count('window.PLOTLYENV')
    print(f"Plotly chart data scripts remaining: {chart_scripts}")
    
    with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\nFinal HTML written to: HW3_MLE_final.html")
    print(f"Final size: {len(html)/1024/1024:.1f} MB")
else:
    print("Only one copy found, nothing to deduplicate")
