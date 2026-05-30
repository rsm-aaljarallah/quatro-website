"""
Patch the deployed HW3 MLE HTML with structural/flow fixes.
Uses only exact string replacements (no greedy regex on content).
"""

import re

with open('/home/ubuntu/upload/HW3_MLE_fixed.html', 'r', encoding='utf-8') as f:
    html = f.read()

original_len = len(html)
changes = 0

# --- Fix #1: Update the guide-box intro text ---
old_intro = 'Blueprinty sells patent-filing software and claims it leads to more approvals. Their data are observational — customers are not randomly assigned — so a raw comparison of patent counts could reflect who buys the software, not what it does. This analysis controls for age and region before drawing any conclusions.'
new_intro = 'Blueprinty sells patent-filing software and claims it leads to more patent approvals. The cleanest test would be a before-and-after study — but <strong>no such data exist.</strong> Instead, we have a cross-sectional dataset of <strong>1,500 mature engineering firms</strong> recording patents awarded over five years, geographic region, firm age, and whether the firm uses Blueprinty\u2019s software. Customers are not randomly assigned, so any raw patent gap could reflect who buys the software rather than what it does. This analysis controls for age and region before drawing conclusions.'

if old_intro in html:
    html = html.replace(old_intro, new_intro, 1)
    changes += 1
    print("✓ Fix #1a: Updated guide-box intro")
else:
    print("✗ Fix #1a: Could not find old intro")

# Remove the three standalone paragraphs after the guide-box
# Paragraph 1: "Blueprinty is a small firm..."
p1_start = '<p>Blueprinty is a small firm that produces software specifically designed'
p1_end_marker = 'higher rates of patent approval.</p>'
if p1_start in html:
    idx = html.find(p1_start)
    end_idx = html.find(p1_end_marker, idx)
    if end_idx > 0:
        end_idx += len(p1_end_marker)
        html = html[:idx] + html[end_idx:]
        changes += 1
        print("✓ Fix #1b: Removed paragraph 1")

# Paragraph 2: "The cleanest evidence..."
p2_start = '<p>The cleanest evidence would come from a before-and-after study'
p2_end_marker = 'whether the firm uses Blueprinty'
if p2_start in html:
    idx = html.find(p2_start)
    # Find the closing </p> after this paragraph
    end_idx = html.find('</p>', idx)
    if end_idx > 0:
        end_idx += 4
        html = html[:idx] + html[end_idx:]
        changes += 1
        print("✓ Fix #1c: Removed paragraph 2")

# Paragraph 3: "Blueprinty's customers are not selected at random"
p3_start = '<p>Blueprinty'
p3_marker = 'not selected at random'
# Find this specific paragraph (not the guide-box text)
search_from = html.find('section-label">02 / EDA')  # search before EDA section
if search_from < 0:
    search_from = 0
# Search backwards from EDA for this paragraph
segment = html[:search_from]
p3_idx = segment.rfind(p3_start)
if p3_idx > 0 and p3_marker in html[p3_idx:p3_idx+300]:
    end_idx = html.find('</p>', p3_idx)
    if end_idx > 0:
        end_idx += 4
        html = html[:p3_idx] + html[end_idx:]
        changes += 1
        print("✓ Fix #1d: Removed paragraph 3")

# --- Fix #9: Remove emoji from subsection titles ---
replacements_9 = [
    ('🎛️ Interactive Poisson Explorer', 'Interactive Poisson Explorer'),
    ('🎬 Animated Log-Likelihood Curve', 'Visualising Concavity'),
    ('🎬 Counterfactual Distribution — Animated', 'Counterfactual Distribution'),
]
for old, new in replacements_9:
    if old in html:
        html = html.replace(old, new)
        changes += 1
        print(f"✓ Fix #9: '{old[:30]}...' → '{new}'")

# Also fix TOC links
html = html.replace('animated-log-likelihood-curve', 'visualising-concavity')
html = html.replace('counterfactual-distribution--animated', 'counterfactual-distribution')

# --- Fix #2a: Rename "Numerical MLE via sp.optimize" ---
if 'Numerical MLE via <code>sp.optimize</code>' in html:
    html = html.replace('Numerical MLE via <code>sp.optimize</code>', 'Numerical Verification')
    changes += 1
    print("✓ Fix #2a: Renamed numerical MLE subsection")

# --- Fix #2b: Tighten equidispersion paragraph ---
old_equi = 'the variance in patent counts exceeds the Poisson mean by about 50%. This is common in real count data (e.g., unobserved firm heterogeneity inflates variance). We proceed with Poisson regression because it is the required model for this analysis, but we note that a negative binomial model or quasi-Poisson standard error correction would be more appropriate in a production setting. We revisit this after fitting the regression.'
new_equi = 'variance exceeds the mean by about 50%, which is common in real count data. We proceed with Poisson regression (the required model) but revisit this after fitting the full model.'
if old_equi in html:
    html = html.replace(old_equi, new_equi, 1)
    changes += 1
    print("✓ Fix #2b: Tightened equidispersion paragraph")

# --- Fix #2c: Rename "Age Curve Visualizer" and add transition ---
if 'Age Curve Visualizer' in html:
    html = html.replace('Age Curve Visualizer', 'Age Curve')
    # Find the heading and add transition text after it
    age_heading_pattern = r'(id="age-curve"[^>]*>Age Curve</h[0-9]>)'
    match = re.search(age_heading_pattern, html)
    if match:
        insert_point = match.end()
        transition = '\n<p>The concave age profile and the constant multiplicative software effect are easier to see visually:</p>'
        html = html[:insert_point] + transition + html[insert_point:]
    changes += 1
    print("✓ Fix #2c: Renamed Age Curve + added transition")

# --- Fix #10: Replace explorer guide-box with simple paragraph ---
explorer_guide_text = 'Drag the slider.</strong> Watch the Poisson distribution shift as λ changes. The log-likelihood value shows how well that λ explains the observed patent data. The value that maximises it is the MLE.'
if explorer_guide_text in html:
    # Find the guide-box containing this text
    idx = html.find(explorer_guide_text)
    # Search backwards for <div class="guide-box">
    search_back = html[max(0, idx-500):idx]
    gb_offset = search_back.rfind('guide-box')
    if gb_offset >= 0:
        # Find the actual <div that contains guide-box
        div_start = search_back.rfind('<div', 0, gb_offset)
        if div_start >= 0:
            actual_start = max(0, idx-500) + div_start
            # Now find the end: count 3 closing </div> tags after the text
            after = html[idx + len(explorer_guide_text):]
            # Find closing pattern for guide-box (3 nested divs)
            close_count = 0
            pos = 0
            while close_count < 3 and pos < len(after):
                next_close = after.find('</div>', pos)
                if next_close < 0:
                    break
                close_count += 1
                pos = next_close + 6
            if close_count == 3:
                actual_end = idx + len(explorer_guide_text) + pos
                replacement = '<p>Drag the slider below to watch the Poisson distribution shift as λ changes. The log-likelihood tracks how well each λ explains the data — the value that maximises it is the MLE.</p>'
                html = html[:actual_start] + replacement + html[actual_end:]
                changes += 1
                print("✓ Fix #10: Replaced explorer guide-box with simple paragraph")
            else:
                print("✗ Fix #10: Could not find 3 closing divs")
    else:
        print("✗ Fix #10: Could not find guide-box class")
else:
    print("✗ Fix #10: Could not find explorer guide text")

# --- Fix #3a: Add plain-English summary after score function ---
score_anchor = 'This is the GLM analog of the OLS normal equations'
if score_anchor in html:
    idx = html.find(score_anchor)
    end_p = html.find('</p>', idx)
    if end_p > 0:
        insert_point = end_p + 4
        plain_english = '\n<blockquote>\n<p><strong>In plain terms:</strong> at the MLE, the model\u2019s prediction errors (actual \u2212 predicted) are uncorrelated with every predictor. If any predictor could still \u201cexplain\u201d the residuals, the optimizer hasn\u2019t converged yet.</p>\n</blockquote>'
        html = html[:insert_point] + plain_english + html[insert_point:]
        changes += 1
        print("✓ Fix #3a: Added plain-English after score function")
else:
    print("✗ Fix #3a: Could not find score anchor")

# --- Fix #3b: Add plain-English summary after Hessian ---
hessian_anchor = 'the diagonal weights are the conditional variances'
if hessian_anchor in html:
    idx = html.find(hessian_anchor)
    end_p = html.find('</p>', idx)
    if end_p > 0:
        insert_point = end_p + 4
        plain_english_h = '\n<blockquote>\n<p><strong>In plain terms:</strong> the Hessian tells us how sharply the log-likelihood curves around the MLE. A sharper curve means more information in the data, which translates to smaller standard errors. The formula X\u2019\u0174X weights each observation by its predicted count \u2014 firms with higher \u03bb\u0302\u1d62 contribute more information.</p>\n</blockquote>'
        html = html[:insert_point] + plain_english_h + html[insert_point:]
        changes += 1
        print("✓ Fix #3b: Added plain-English after Hessian")
else:
    print("✗ Fix #3b: Could not find Hessian anchor")

# --- Fix #4: Restructure coefficient interpretation ---
coeff_anchor = '<p>Working through each predictor:</p>'
if coeff_anchor in html:
    coeff_start = html.find(coeff_anchor)
    
    # Find the takeaway div that ends this section
    takeaway_marker = 'The iscustomer effect survives controlling for age and region'
    takeaway_idx = html.find(takeaway_marker, coeff_start)
    
    if takeaway_idx > 0:
        # Find the end of the takeaway div
        takeaway_end = html.find('</div>', takeaway_idx)
        if takeaway_end > 0:
            section_end = takeaway_end + 6
            
            new_coeff = '''<h4>The Key Result: Software Effect</h4>
<p>The coefficient on <strong>iscustomer</strong> is the central finding. With \u03b2\u0302<sub>cust</sub> = 0.2076 (SE = 0.0309, z = 6.72), the Wald test rejects H\u2080: \u03b2<sub>cust</sub> = 0 at any conventional level (two-tailed p-value below 10\u207b\u00b9\u2070). Exponentiating:</p>
<p style="text-align:center; font-size:1.1em; margin:1em 0;"><em>e</em><sup>0.2076</sup> \u2248 1.2307 \u27f9 <strong>23.1% higher expected patent count</strong></p>
<p><strong>95% confidence interval for the rate ratio</strong> (using \u03b2\u0302 \u00b1 1.96\u00b7SE on the log scale, then exponentiating):</p>
<p style="text-align:center; margin:1em 0;">[<em>e</em><sup>0.1470</sup>, <em>e</em><sup>0.2681</sup>] = [1.1584, 1.3075] \u27f9 [15.8%, 30.8% premium]</p>
<div class="takeaway">
The iscustomer effect survives controlling for age and region. The 95% CI [1.158, 1.308] excludes 1.0 (no effect) entirely. Even after correcting for overdispersion (z \u2248 5.7), the effect remains highly significant.
</div>
<h4>Control Variables</h4>
<p>The remaining predictors serve as controls \u2014 they are not the focus but are necessary to isolate the software effect:</p>
<ul>
<li><strong>Intercept (\u22120.452):</strong> Log expected patent count for a South-region, non-customer firm at age = 0. Anchors the model.</li>
<li><strong>Age (0.1486) + Age\u00b2 (\u22120.00297):</strong> A concave (inverted-U) profile peaking at ~25 years. Expected patents rise as firms mature, then level off.</li>
<li><strong>Region effects (all negative vs. South):</strong> After controlling for age and customer status, all regions patent at slightly <em>lower</em> rates than South. The Northeast\u2019s raw advantage disappears once we account for its disproportionate share of Blueprinty customers. All regional coefficients are small (within 8% of South).</li>
</ul>'''
            
            html = html[:coeff_start] + new_coeff + html[section_end:]
            changes += 1
            print("✓ Fix #4: Restructured coefficient interpretation")
    else:
        print("✗ Fix #4: Could not find takeaway marker")
else:
    print("✗ Fix #4: Could not find 'Working through each predictor'")

# --- Fix #5: "What This Establishes" → "Limitations" ---
if 'What This Establishes' in html:
    html = html.replace('What This Establishes', 'Limitations')
    html = html.replace('what-this-establishes', 'limitations')
    changes += 1
    print("✓ Fix #5a: Renamed to 'Limitations'")

# Replace the redundant opening sentence
old_establishes_text = 'The estimate is consistent with Blueprinty'
if old_establishes_text in html:
    idx = html.find(old_establishes_text)
    # Find the <p> start
    p_start = html.rfind('<p>', max(0, idx-20), idx)
    # Find the </p> end
    p_end = html.find('</p>', idx)
    if p_start >= 0 and p_end > 0:
        p_end += 4
        new_text = '<p>The result is consistent with Blueprinty\u2019s marketing claim. However, because this is an <strong>observational study</strong>, three caveats prevent a causal interpretation:</p>'
        html = html[:p_start] + new_text + html[p_end:]
        # Also remove the "However, because..." paragraph that follows
        however_start = html.find('<p>However, because this is an <strong>observational study</strong>', p_start + len(new_text))
        if however_start > 0 and however_start < p_start + len(new_text) + 200:
            however_end = html.find('</p>', however_start)
            if however_end > 0:
                html = html[:however_start] + html[however_end + 4:]
        changes += 1
        print("✓ Fix #5b: Replaced redundant opening")

# --- Fix #6: Reorder summary cards ---
# Find the summary-grid and extract cards
sg_start_marker = '<div class="summary-grid">'
sg_start = html.find(sg_start_marker)
if sg_start >= 0:
    # Find all summary-card divs within the grid
    # Parse carefully by counting div depth
    pos = sg_start + len(sg_start_marker)
    depth = 1
    sg_end = -1
    while depth > 0 and pos < len(html):
        next_open = html.find('<div', pos)
        next_close = html.find('</div>', pos)
        if next_close < 0:
            break
        if next_open >= 0 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                sg_end = next_close + 6
                break
            pos = next_close + 6
    
    if sg_end > 0:
        grid_html = html[sg_start:sg_end]
        # Extract individual cards
        card_pattern = r'<div class="summary-card">(.*?)</div>\s*</div>'
        card_matches = list(re.finditer(card_pattern, grid_html, re.DOTALL))
        
        if len(card_matches) >= 5:
            cards = []
            for m in card_matches:
                cards.append('<div class="summary-card">' + m.group(1) + '</div>\n</div>')
            
            # Identify cards by content
            counterfactual_idx = None
            causation_idx = None
            for i, card in enumerate(cards):
                if 'Counterfactual' in card:
                    counterfactual_idx = i
                elif 'Causation' in card:
                    causation_idx = i
            
            if counterfactual_idx is not None and causation_idx is not None:
                # Create new main finding card to replace counterfactual
                main_card = '''<div class="summary-card">
<div class="card-icon">\ud83d\udd04</div>
<h5>Main Finding: +23% Patent Premium</h5>
<p>Blueprinty customers patent at 23.1% higher rates (95% CI: 15.8\u201330.8%) after controlling for firm age and region. This translates to ~0.79 additional patents per firm over five years.</p>
</div>
</div>'''
                # Reorder: main finding first, causation second, then the rest
                new_cards = [main_card]
                new_cards.append(cards[causation_idx])
                for i, card in enumerate(cards):
                    if i != counterfactual_idx and i != causation_idx:
                        new_cards.append(card)
                
                new_grid = '<div class="summary-grid">\n' + '\n'.join(new_cards) + '\n</div>'
                html = html[:sg_start] + new_grid + html[sg_end:]
                changes += 1
                print(f"✓ Fix #6: Reordered summary cards ({len(cards)} cards found)")
            else:
                print(f"✗ Fix #6: Could not identify key cards (cf={counterfactual_idx}, caus={causation_idx})")
        else:
            print(f"✗ Fix #6: Found only {len(card_matches)} cards")
    else:
        print("✗ Fix #6: Could not find grid end")
else:
    print("✗ Fix #6: Could not find summary-grid")

# --- Fix #8: Remove HR between EDA subsections ---
# Find the takeaway "A raw mean difference exists" and remove the <hr> after it
raw_mean_anchor = 'A raw mean difference exists'
if raw_mean_anchor in html:
    idx = html.find(raw_mean_anchor)
    # Find the end of the takeaway div
    div_end = html.find('</div>', idx)
    if div_end > 0:
        # Look for <hr in the next 200 chars
        segment = html[div_end:div_end+200]
        hr_match = re.search(r'<hr\s*/?>', segment)
        if hr_match:
            hr_start = div_end + hr_match.start()
            hr_end = div_end + hr_match.end()
            html = html[:hr_start] + html[hr_end:]
            changes += 1
            print("✓ Fix #8: Removed HR between EDA subsections")
        else:
            print("✗ Fix #8: No <hr> found after takeaway")
else:
    print("✗ Fix #8: Could not find raw mean anchor")

# --- Verify integrity ---
final_len = len(html)
print(f"\n{'='*50}")
print(f"Total changes applied: {changes}")
print(f"Original size: {original_len:,} chars")
print(f"Final size:    {final_len:,} chars")
print(f"Difference:    {final_len - original_len:,} chars")
print(f"{'='*50}")

# Sanity checks
assert 'section-label">04 / Regression Model' in html, "MISSING: Regression section!"
assert 'section-label">05 / Counterfactual' in html, "MISSING: Counterfactual section!"
assert 'section-label">06 / What We Learned' in html, "MISSING: Summary section!"
assert 'stat-card' in html, "MISSING: Stat cards!"
assert html.count('plotly') > 30, f"LOW plotly count: {html.count('plotly')}"
print("\n✓ All sanity checks passed!")

output_path = '/home/ubuntu/upload/HW3_MLE_patched.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"\nPatched HTML written to: {output_path}")
print(f"File size: {len(html) / 1024 / 1024:.1f} MB")
