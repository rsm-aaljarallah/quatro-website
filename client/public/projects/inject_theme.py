import glob
import re

css = """
<style>
/* Dark Mode Override */
html, body, .quarto-container, main, div, p, span, li, h1, h2, h3, h4, h5, h6, table, th, td {
    background-color: transparent !important;
    color: inherit;
}
body {
    background-color: #050810 !important;
    color: #B8C8DC !important;
    font-family: 'Lato', sans-serif !important;
}
h1, h2, h3, h4, h5, h6, .title {
    color: #F0F4F8 !important;
    font-family: 'Playfair Display', serif !important;
}
a {
    color: #4A6A8A !important;
    text-decoration: none !important;
}
a:hover {
    color: #B8C8DC !important;
}
.sourceCode, pre, code {
    background-color: rgba(10,14,26,0.8) !important;
    color: #a8b8c8 !important;
    border: 1px solid rgba(232,237,245,0.1) !important;
}
table {
    border-color: rgba(232,237,245,0.1) !important;
}
th, td {
    border-color: rgba(232,237,245,0.1) !important;
}
/* Plotly backgrounds */
.js-plotly-plot .plotly .bg {
    fill: #050810 !important;
}
/* Custom TOC Styling */
#TOC {
    background: rgba(10, 14, 26, 0.5) !important;
    border-radius: 12px;
    padding: 20px !important;
    border: 1px solid rgba(232, 237, 245, 0.05);
}
.toc-title {
    color: #F0F4F8 !important;
    font-family: 'JetBrains Mono', monospace !important;
    font-size: 12px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
}
nav[role="doc-toc"] ul li a {
    color: #5A7A9A !important;
}
nav[role="doc-toc"] ul li a.active, nav[role="doc-toc"] ul li a:hover {
    color: #22d3ee !important;
}
</style>
"""

html_files = glob.glob('*.html')
for f in html_files:
    content = open(f).read()
    
    # 1. Remove old injected CSS if any
    content = re.sub(r'<style>\s*/\* Force Quarto TOC.*?</style>', '', content, flags=re.DOTALL)
    content = re.sub(r'<style>\s*/\* Dark Mode Override.*?</style>', '', content, flags=re.DOTALL)
    
    # 2. Structurally enforce native toc-left layout on ALL html files
    content = content.replace('class="page-columns page-rows-contents page-layout-article"', 'class="page-columns page-rows-contents page-layout-article toc-left"')
    content = content.replace('id="quarto-margin-sidebar" class="sidebar margin-sidebar"', 'id="quarto-sidebar-toc-left" class="sidebar toc-left"')
    
    # Inject new CSS
    if '</head>' in content:
        content = content.replace('</head>', css + '\n</head>')
        open(f, 'w').write(content)
        print(f"Fixed layout and injected theme into {f}")
