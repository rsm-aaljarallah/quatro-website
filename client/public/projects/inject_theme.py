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

/* TOC on the Left */
@media (min-width: 992px) {
    div.page-columns {
        display: block !important;
        padding-left: 0 !important;
        margin-left: 0 !important;
    }
    #quarto-margin-sidebar {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: 250px !important;
        height: 100vh !important;
        padding: 40px 20px !important;
        border-right: 1px solid rgba(232,237,245,0.1) !important;
        background: #0A0E1A !important;
        overflow-y: auto !important;
        z-index: 1000 !important;
        grid-column: none !important;
    }
    #quarto-content {
        margin-left: 280px !important;
        max-width: calc(100% - 300px) !important;
        padding-top: 40px !important;
    }
    .toc-title {
        color: #F0F4F8 !important;
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 12px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important;
        margin-bottom: 20px !important;
    }
    .toc-actions, .toc-active {
        color: #B8C8DC !important;
        font-weight: bold !important;
    }
    nav[role="doc-toc"] ul {
        padding-left: 0 !important;
        list-style: none !important;
    }
    nav[role="doc-toc"] ul li a {
        color: #5A7A9A !important;
        display: block !important;
        padding: 5px 0 !important;
        font-size: 14px !important;
    }
    nav[role="doc-toc"] ul li a.active, nav[role="doc-toc"] ul li a:hover {
        color: #F0F4F8 !important;
    }
}
</style>
"""

html_files = glob.glob('*.html')
for f in html_files:
    content = open(f).read()
    # Remove old injected CSS if any
    content = re.sub(r'<style>\s*/\* Force Quarto TOC.*?</style>', '', content, flags=re.DOTALL)
    content = re.sub(r'<style>\s*/\* Dark Mode Override.*?</style>', '', content, flags=re.DOTALL)
    
    if '</head>' in content:
        content = content.replace('</head>', css + '\n</head>')
        open(f, 'w').write(content)
        print(f"Injected dark theme & TOC left into {f}")
