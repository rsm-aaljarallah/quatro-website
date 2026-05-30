"""
Fix the layout by directly modifying the HTML structure:
1. Remove the entire TOC sidebar div
2. Remove 'page-columns page-rows-contents' classes from #quarto-content
3. Add a simple inline style to #quarto-content for single-column layout
"""
import re

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'r', encoding='utf-8') as f:
    html = f.read()

original_len = len(html)

# 1. Remove the JS width fix we added (no longer needed)
js_marker = '<script id="width-fix-js">'
if js_marker in html:
    start = html.find(js_marker)
    end = html.find('</script>', start) + 9
    html = html[:start] + html[end:]
    print("1. Removed old JS width fix")

# 2. Remove the entire #quarto-margin-sidebar div
# It starts with: <div id="quarto-margin-sidebar" class="sidebar margin-sidebar">
# and ends with the closing </div> after the </nav> inside it
sidebar_start = html.find('<div id="quarto-margin-sidebar"')
if sidebar_start > 0:
    # Find the matching closing tag - the sidebar contains a <nav> with nested <ul>/<li>
    # We need to count div nesting
    depth = 0
    i = sidebar_start
    while i < len(html):
        if html[i:i+4] == '<div':
            depth += 1
        elif html[i:i+6] == '</div>':
            depth -= 1
            if depth == 0:
                sidebar_end = i + 6
                break
        i += 1
    
    html = html[:sidebar_start] + html[sidebar_end:]
    print(f"2. Removed TOC sidebar ({sidebar_end - sidebar_start} chars)")
else:
    print("2. WARNING: Could not find sidebar")

# 3. Replace the page-columns class on #quarto-content
old_class = 'class="page-columns page-rows-contents page-layout-article"'
new_class = 'class="page-layout-article" style="display:block;max-width:880px;margin:0 auto;padding:2.5rem 2rem;"'
if old_class in html:
    html = html.replace(old_class, new_class)
    print("3. Replaced page-columns class with inline style")
else:
    print("3. WARNING: Could not find page-columns class")

# 4. Also find and fix main.content to be full width
main_tag = '<main class="content"'
if main_tag in html:
    html = html.replace(main_tag, '<main class="content" style="max-width:100%;width:100%;margin:0;padding:0;"')
    print("4. Added inline style to main.content")

# 5. Find the Quarto JS that manages page-columns layout and neutralize it
# Look for the script that references "page-full" or "page-columns" 
quarto_js_match = re.search(r'el\.classList\.remove\("page-full",\s*"page-columns"\)', html)
if quarto_js_match:
    print(f"5. Found Quarto layout JS at position {quarto_js_match.start()}")
    # Don't remove it - it might break other things. The class removal should be enough.

with open('/home/ubuntu/upload/HW3_MLE_final.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nFile size: {original_len/1024/1024:.1f} MB -> {len(html)/1024/1024:.1f} MB")
print("Done!")
