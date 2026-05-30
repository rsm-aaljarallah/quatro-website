import re

with open('/home/ubuntu/abdullah-resume/client/public/projects/hw3-mle.html', 'r') as f:
    content = f.read()

# 1. Remove the Quarto Bootstrap CSS link (the URL-encoded one)
content = re.sub(r'<link[^>]*id="quarto-bootstrap"[^>]*>', '', content)

# 2. Remove all data:text/css links since we're overriding everything
content = re.sub(r'<link[^>]*href="data:text/css[^"]*"[^>]*>', '', content)

# 3. Add a comprehensive body-level style at the very top of body
body_wrapper_style = '''<style id="nuclear-width-fix">
body {
  max-width: 880px !important;
  margin: 0 auto !important;
  padding: 2.5rem 2rem !important;
  overflow-x: hidden !important;
}
body * {
  max-width: 100% !important;
  box-sizing: border-box !important;
}
#quarto-content,
#quarto-content.page-layout-article,
main.content,
.page-columns {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  grid-template-columns: unset !important;
}
nav[role="doc-toc"],
#quarto-margin-sidebar,
#quarto-sidebar,
.sidebar,
.margin-sidebar {
  display: none !important;
}
.math.display {
  overflow-x: auto !important;
}
pre, code {
  overflow-x: auto !important;
}
</style>
'''

content = content.replace('<body', body_wrapper_style + '\n<body', 1)

with open('/home/ubuntu/abdullah-resume/client/public/projects/hw3-mle.html', 'w') as f:
    f.write(content)

print("Done! Removed Bootstrap CSS links and added nuclear width fix")
print(f"File size: {len(content) / 1024 / 1024:.1f} MB")
