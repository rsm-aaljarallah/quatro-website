"""
Slim the HW3 MLE HTML by:
1. Replacing the 5 duplicate copies of plotly.js (~4.7MB each) with a single CDN <script> tag
2. Deduplicating MathJax (appears 5 times)
3. Keeping all chart data and user code intact
"""
import re

with open('/home/ubuntu/upload/HW3_MLE_fixed.html', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original size: {len(content):,} bytes ({len(content)//1024//1024}MB)")

# ── 1. Replace ALL embedded plotly.js blocks with a single CDN reference ──────
# Plotly is embedded as <script>/** plotly.js v3.5.0 ... */</script>
plotly_pattern = re.compile(
    r'<script>\s*/\*\*\s*\n\* plotly\.js v[\d.]+.*?</script>',
    re.DOTALL
)

plotly_cdn = '<script src="https://cdn.plot.ly/plotly-3.5.0.min.js"></script>'

matches = plotly_pattern.findall(content)
print(f"Found {len(matches)} embedded Plotly copies")

# Replace first occurrence with CDN tag, remove the rest
first = True
def replace_plotly(m):
    global first
    if first:
        first = False
        return plotly_cdn
    return ''

content = plotly_pattern.sub(replace_plotly, content)

# ── 2. Deduplicate MathJax (keep first, remove duplicates) ────────────────────
mathjax_pattern = re.compile(
    r'<script>\s*/\*\s*\n \*  /MathJax\.js.*?</script>',
    re.DOTALL
)
mj_matches = mathjax_pattern.findall(content)
print(f"Found {len(mj_matches)} embedded MathJax copies")

first_mj = True
def replace_mathjax(m):
    global first_mj
    if first_mj:
        first_mj = False
        return m.group(0)
    return ''

content = mathjax_pattern.sub(replace_mathjax, content)

# ── 3. Write output ────────────────────────────────────────────────────────────
out_path = '/home/ubuntu/upload/HW3_MLE_slim.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Slimmed size:  {len(content):,} bytes ({len(content)//1024//1024}MB)")
print(f"Saved to: {out_path}")

# Verify Plotly CDN tag is present
if plotly_cdn in content:
    print("✓ Plotly CDN tag present")
remaining_plotly = len(re.findall(r'plotly\.js v[\d.]+', content))
print(f"✓ Remaining plotly.js copies: {remaining_plotly} (should be 0 inline)")
