"""
Patch the deployed HW3 MLE HTML with all 8 structural/flow fixes:
1. Merge redundant introduction
2. Tighten Section 3 (rename subsections)
3. Add plain-English summaries after math derivations
4. Restructure coefficient interpretation (lead with iscustomer)
5. Fix "What This Establishes" → "Limitations"
6. Reorder summary cards (main finding first)
7. Move stat cards after code output
8. Remove HR between EDA subsections
9. Remove emoji from subsection titles
10. Tighten equidispersion paragraph
"""

import re

with open('/home/ubuntu/upload/HW3_MLE_fixed.html', 'r', encoding='utf-8') as f:
    html = f.read()

changes = 0

# --- Fix #1: Merge redundant introduction ---
# Find the guide-box with "The problem." and the paragraphs that follow
old_intro = '''<strong>The problem.</strong> Blueprinty sells patent-filing software and claims it leads to more approvals. Their data are observational — customers are not randomly assigned — so a raw comparison of patent counts could reflect who buys the software, not what it does. This analysis controls for age and region before drawing any conclusions.'''

new_intro = '''<strong>The problem.</strong> Blueprinty sells patent-filing software and claims it leads to more patent approvals. The cleanest test would be a before-and-after study — but <strong>no such data exist.</strong> Instead, we have a cross-sectional dataset of <strong>1,500 mature engineering firms</strong> recording patents awarded over five years, geographic region, firm age, and whether the firm uses Blueprinty's software. Customers are not randomly assigned, so any raw patent gap could reflect who buys the software rather than what it does. This analysis controls for age and region before drawing conclusions.'''

if old_intro in html:
    html = html.replace(old_intro, new_intro)
    changes += 1
    print(f"✓ Fix #1: Merged redundant introduction")
else:
    print(f"✗ Fix #1: Could not find old intro text")

# Remove the redundant paragraphs after the guide-box
old_paras = '''<p>Blueprinty is a small firm that produces software specifically designed to help engineers draft blueprints for US patent office submissions. Its marketing team wants to argue that companies using Blueprinty's software enjoy higher rates of patent approval.</p>
<p>The cleanest evidence would come from a before-and-after study: observe each firm's patent rate <em>before</em> adopting the software, then <em>after</em>, and compare. <strong>No such data exist.</strong> Instead, Blueprinty has a cross-sectional dataset of <strong>1,500 mature engineering firms</strong> recording patents awarded over five years, geographic region, age since incorporation, and whether the firm uses Blueprinty's software.</p>
<p>Blueprinty's customers are <strong>not selected at random</strong> — firms that buy the software likely differ systematically from those that don't. Any raw patent gap could reflect pre-existing differences rather than the product itself. The analysis below controls for age and region before drawing conclusions.</p>'''

if old_paras in html:
    html = html.replace(old_paras, '')
    changes += 1
    print(f"✓ Fix #1b: Removed redundant paragraphs")
else:
    # Try with slightly different whitespace
    # Search for the three paragraphs individually
    p1 = '<p>Blueprinty is a small firm that produces software specifically designed to help engineers draft blueprints for US patent office submissions. Its marketing team wants to argue that companies using Blueprinty\'s software enjoy higher rates of patent approval.</p>'
    p2_start = '<p>The cleanest evidence would come from a before-and-after study'
    p3_start = '<p>Blueprinty\'s customers are <strong>not selected at random</strong>'
    
    if p1 in html:
        # Find and remove all three paragraphs
        # Remove p1
        html = html.replace(p1, '', 1)
        changes += 1
        print(f"✓ Fix #1b: Removed first redundant paragraph")
    
    # Find p2 (contains "No such data exist")
    p2_pattern = r'<p>The cleanest evidence would come from a before-and-after study.*?</p>'
    match = re.search(p2_pattern, html, re.DOTALL)
    if match:
        html = html[:match.start()] + html[match.end():]
        changes += 1
        print(f"✓ Fix #1c: Removed second redundant paragraph")
    
    # Find p3 (contains "not selected at random")
    p3_pattern = r"<p>Blueprinty.s customers are <strong>not selected at random</strong>.*?</p>"
    # Be careful not to remove the one inside the guide-box
    matches = list(re.finditer(p3_pattern, html, re.DOTALL))
    if len(matches) > 0:
        # Remove the last one (the standalone paragraph, not the guide-box one)
        m = matches[-1]
        html = html[:m.start()] + html[m.end():]
        changes += 1
        print(f"✓ Fix #1d: Removed third redundant paragraph")


# --- Fix #9: Remove emoji from subsection titles ---
# 🎛️ Interactive Poisson Explorer
html = html.replace('🎛️ Interactive Poisson Explorer', 'Interactive Poisson Explorer')
html = html.replace('🎛️ Interactive Poisson Explorer', 'Interactive Poisson Explorer')
# 🎬 Animated Log-Likelihood Curve
html = html.replace('🎬 Animated Log-Likelihood Curve', 'Visualising Concavity')
html = html.replace('🎬 Animated Log-Likelihood Curve', 'Visualising Concavity')
# 🎬 Counterfactual Distribution — Animated
html = html.replace('🎬 Counterfactual Distribution — Animated', 'Counterfactual Distribution')
html = html.replace('🎬 Counterfactual Distribution — Animated', 'Counterfactual Distribution')
print(f"✓ Fix #9: Removed emoji from subsection titles")
changes += 1

# --- Fix #2: Rename "Numerical MLE via sp.optimize" ---
html = html.replace('Numerical MLE via <code>sp.optimize</code>', 'Numerical Verification')
html = html.replace('Numerical MLE via sp.optimize', 'Numerical Verification')
print(f"✓ Fix #2: Renamed numerical MLE subsection")
changes += 1

# --- Fix #10: Replace guide-box before explorer with simpler text ---
old_explorer_guide = '''<strong>Drag the slider.</strong> Watch the Poisson distribution shift as λ changes. The log-likelihood value shows how well that λ explains the observed patent data. The value that maximises it is the MLE.'''
new_explorer_text = '''Drag the slider below to watch the Poisson distribution shift as λ changes. The log-likelihood tracks how well each λ explains the data — the value that maximises it is the MLE.'''

if old_explorer_guide in html:
    # Find the entire guide-box containing this text and replace with simple paragraph
    # The guide-box starts before and ends after
    idx = html.find(old_explorer_guide)
    # Search backwards for the guide-box div start
    search_start = max(0, idx - 500)
    guide_start_pattern = r'<div class="guide-box">'
    segment = html[search_start:idx]
    last_guide = segment.rfind('<div class="guide-box">')
    if last_guide >= 0:
        guide_box_start = search_start + last_guide
        # Find the closing divs (guide-box has nested divs)
        # Count from guide_box_start
        after_text = html[idx + len(old_explorer_guide):]
        # Find the closing sequence: </div>\n</div>\n</div>
        close_pattern = r'</div>\s*</div>\s*</div>'
        close_match = re.search(close_pattern, after_text)
        if close_match:
            guide_box_end = idx + len(old_explorer_guide) + close_match.end()
            html = html[:guide_box_start] + f'<p>{new_explorer_text}</p>' + html[guide_box_end:]
            changes += 1
            print(f"✓ Fix #10: Replaced explorer guide-box with simple paragraph")
        else:
            print(f"✗ Fix #10: Could not find closing divs")
    else:
        print(f"✗ Fix #10: Could not find guide-box start")
else:
    print(f"✗ Fix #10: Could not find explorer guide text")

# --- Fix #3: Add plain-English summary after score function ---
score_anchor = 'This is the GLM analog of the OLS normal equations'
if score_anchor in html:
    idx = html.find(score_anchor)
    # Find the end of the paragraph containing this
    end_p = html.find('</p>', idx)
    if end_p > 0:
        insert_point = end_p + 4  # after </p>
        plain_english = '\n<blockquote>\n<p><strong>In plain terms:</strong> at the MLE, the model\'s prediction errors (actual − predicted) are uncorrelated with every predictor. If any predictor could still "explain" the residuals, the optimizer hasn\'t converged yet.</p>\n</blockquote>\n'
        html = html[:insert_point] + plain_english + html[insert_point:]
        changes += 1
        print(f"✓ Fix #3a: Added plain-English summary after score function")
else:
    print(f"✗ Fix #3a: Could not find score function anchor")

# --- Fix #3: Add plain-English summary after Hessian ---
hessian_anchor = 'the diagonal weights are the conditional variances'
if hessian_anchor in html:
    idx = html.find(hessian_anchor)
    end_p = html.find('</p>', idx)
    if end_p > 0:
        insert_point = end_p + 4
        plain_english_h = '\n<blockquote>\n<p><strong>In plain terms:</strong> the Hessian tells us how sharply the log-likelihood curves around the MLE. A sharper curve means more information in the data, which translates to smaller standard errors. The formula X\'ŴX weights each observation by its predicted count — firms with higher λ̂ᵢ contribute more information.</p>\n</blockquote>\n'
        html = html[:insert_point] + plain_english_h + html[insert_point:]
        changes += 1
        print(f"✓ Fix #3b: Added plain-English summary after Hessian")
else:
    print(f"✗ Fix #3b: Could not find Hessian anchor")

# --- Fix #4: Restructure coefficient interpretation ---
# Find "Working through each predictor:" and replace the structure
old_coeff_start = 'Working through each predictor:'
if old_coeff_start in html:
    idx = html.find(old_coeff_start)
    # Find the paragraph/section start
    p_start = html.rfind('<p>', max(0, idx - 50), idx)
    if p_start < 0:
        p_start = idx
    
    # Find the takeaway box that ends this section
    takeaway_text = 'The iscustomer effect survives controlling for age and region'
    takeaway_idx = html.find(takeaway_text, idx)
    if takeaway_idx > 0:
        # Find the end of the takeaway div
        takeaway_end = html.find('</div>', takeaway_idx)
        if takeaway_end > 0:
            # Check if there's another closing div for the takeaway container
            next_close = html.find('</div>', takeaway_end + 6)
            
            # Build the new content
            new_coeff_section = '''<h4>The Key Result: Software Effect</h4>
<p>The coefficient on <strong>iscustomer</strong> is the central finding. With β̂<sub>cust</sub> = 0.2076 (SE = 0.0309, z = 6.72), the Wald test rejects H₀: β<sub>cust</sub> = 0 at any conventional level (two-tailed p-value below 10⁻¹⁰). Exponentiating:</p>
<p class="math display">e<sup>0.2076</sup> ≈ 1.2307 ⟹ <strong>23.1% higher expected patent count</strong></p>
<p><strong>95% confidence interval for the rate ratio</strong> (using β̂ ± 1.96·SE on the log scale, then exponentiating):</p>
<p class="math display">[e<sup>0.1470</sup>, e<sup>0.2681</sup>] = [1.1584, 1.3075] ⟹ [15.8%, 30.8% premium]</p>
<div class="takeaway">
The iscustomer effect survives controlling for age and region. The 95% CI [1.158, 1.308] excludes 1.0 (no effect) entirely. Even after correcting for overdispersion (z ≈ 5.7), the effect remains highly significant.
</div>
<h4>Control Variables</h4>
<p>The remaining predictors serve as controls — they are not the focus but are necessary to isolate the software effect:</p>
<ul>
<li><strong>Intercept (−0.452):</strong> Log expected patent count for a South-region, non-customer firm at age = 0. Anchors the model.</li>
<li><strong>Age (0.1486) + Age² (−0.00297):</strong> A concave (inverted-U) profile peaking at ~25 years. Expected patents rise as firms mature, then level off.</li>
<li><strong>Region effects (all negative vs. South):</strong> After controlling for age and customer status, all regions patent at slightly <em>lower</em> rates than South. The Northeast's raw advantage disappears once we account for its disproportionate share of Blueprinty customers. All regional coefficients are small (within 8% of South).</li>
</ul>'''
            
            # We need to find the exact boundaries. Let's find from "Working through" to end of takeaway
            # The takeaway div structure is: <div class="takeaway">...</div>
            # Find the start of the takeaway div
            takeaway_div_start = html.rfind('<div class="takeaway">', idx, takeaway_idx)
            if takeaway_div_start < 0:
                takeaway_div_start = html.rfind('class="takeaway"', idx, takeaway_idx)
                if takeaway_div_start > 0:
                    takeaway_div_start = html.rfind('<', max(0, takeaway_div_start - 50), takeaway_div_start)
            
            # Find end of takeaway div
            if takeaway_div_start > 0:
                # Find the </div> after the takeaway content
                t_end = html.find('</div>', takeaway_idx)
                if t_end > 0:
                    section_end = t_end + 6
                    html = html[:p_start] + new_coeff_section + html[section_end:]
                    changes += 1
                    print(f"✓ Fix #4: Restructured coefficient interpretation")
                else:
                    print(f"✗ Fix #4: Could not find takeaway end div")
            else:
                print(f"✗ Fix #4: Could not find takeaway div start")
    else:
        print(f"✗ Fix #4: Could not find takeaway text")
else:
    print(f"✗ Fix #4: Could not find 'Working through each predictor'")

# --- Fix #5: "What This Establishes" → "Limitations" ---
old_establishes = 'What This Establishes'
if old_establishes in html:
    html = html.replace(old_establishes, 'Limitations')
    changes += 1
    print(f"✓ Fix #5a: Renamed section to 'Limitations'")

# Remove the redundant opening sentence
old_sentence = 'The estimate is consistent with Blueprinty\'s marketing claim: after adjusting for firm age and geographic region, customers patent at a meaningfully higher rate, and the 95% confidence interval for the rate premium runs from 15.8% to 30.8%, excluding zero entirely.'
new_sentence = 'The result is consistent with Blueprinty\'s marketing claim. However, because this is an <strong>observational study</strong>, three caveats prevent a causal interpretation:'

if old_sentence in html:
    # Find the old sentence and the "However" that follows
    idx = html.find(old_sentence)
    # Find "However, because this is an"
    however_text = 'However, because this is an <strong>observational study</strong>'
    however_idx = html.find(however_text, idx)
    if however_idx > 0:
        # Replace from old_sentence start to end of "three caveats apply:"
        old_end_text = 'three caveats apply:'
        old_end_idx = html.find(old_end_text, however_idx)
        if old_end_idx > 0:
            end_of_old = old_end_idx + len(old_end_text)
            # Find the <p> that contains the old sentence
            p_start = html.rfind('<p>', max(0, idx - 20), idx)
            if p_start >= 0:
                html = html[:p_start] + '<p>' + new_sentence + '</p>' + html[end_of_old:]
                changes += 1
                print(f"✓ Fix #5b: Replaced redundant opening with direct lead-in")
            else:
                html = html[:idx] + new_sentence + html[end_of_old:]
                changes += 1
                print(f"✓ Fix #5b: Replaced redundant opening (no <p> found)")
else:
    print(f"✗ Fix #5b: Could not find old establishing sentence")

# --- Fix #6: Reorder summary cards ---
# Find the summary-grid div and reorder its children
summary_grid_start = html.find('<div class="summary-grid">')
if summary_grid_start >= 0:
    summary_grid_end = html.find('</div>\n</div>', summary_grid_start + 100)
    if summary_grid_end < 0:
        # Try different closing pattern
        # Count nested divs
        pos = summary_grid_start + len('<div class="summary-grid">')
        depth = 1
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
                    summary_grid_end = next_close + 6
                    break
                pos = next_close + 6
    else:
        summary_grid_end += len('</div>\n</div>')
    
    if summary_grid_end > summary_grid_start:
        # Extract all summary cards
        grid_content = html[summary_grid_start:summary_grid_end]
        cards = re.findall(r'<div class="summary-card">.*?</div>\s*</div>', grid_content, re.DOTALL)
        
        if len(cards) >= 5:
            # Find the counterfactual card and causation card
            counterfactual_card = None
            causation_card = None
            other_cards = []
            
            for card in cards:
                if 'Counterfactual Effect' in card:
                    counterfactual_card = card
                elif 'Correlation' in card and 'Causation' in card:
                    causation_card = card
                else:
                    other_cards.append(card)
            
            if counterfactual_card and causation_card:
                # Create new main finding card
                main_finding_card = '''<div class="summary-card">
<div class="card-icon">🔄</div>
<h5>Main Finding: +23% Patent Premium</h5>
<p>Blueprinty customers patent at 23.1% higher rates (95% CI: 15.8–30.8%) after controlling for firm age and region. This translates to ~0.79 additional patents per firm over five years.</p>
</div>'''
                
                # Reorder: main finding, causation caveat, then the rest
                new_grid = '<div class="summary-grid">\n' + main_finding_card + '\n' + causation_card + '\n' + '\n'.join(other_cards) + '\n</div>'
                html = html[:summary_grid_start] + new_grid + html[summary_grid_end:]
                changes += 1
                print(f"✓ Fix #6: Reordered summary cards (main finding first)")
            else:
                print(f"✗ Fix #6: Could not identify counterfactual/causation cards")
        else:
            print(f"✗ Fix #6: Found only {len(cards)} cards")
else:
    print(f"✗ Fix #6: Could not find summary-grid")

# --- Fix #8: Remove HR between EDA subsections ---
# The HR is between the "A raw mean difference exists" takeaway and "Confounders: Region and Age"
hr_anchor = 'A raw mean difference exists'
if hr_anchor in html:
    idx = html.find(hr_anchor)
    # Find the next <hr> after the takeaway
    after_takeaway = html.find('</div>', idx)  # end of takeaway div
    if after_takeaway > 0:
        hr_idx = html.find('<hr', after_takeaway)
        confounders_idx = html.find('Confounders', after_takeaway)
        if hr_idx > 0 and confounders_idx > 0 and hr_idx < confounders_idx:
            # Remove the <hr> (could be <hr> or <hr/> or <hr />)
            hr_end = html.find('>', hr_idx) + 1
            html = html[:hr_idx] + html[hr_end:]
            changes += 1
            print(f"✓ Fix #8: Removed HR between EDA subsections")
        else:
            print(f"✗ Fix #8: HR not found between takeaway and Confounders")
else:
    print(f"✗ Fix #8: Could not find HR anchor")

# --- Fix #2b: Tighten equidispersion paragraph ---
old_equi = 'the variance in patent counts exceeds the Poisson mean by about 50%. This is common in real count data (e.g., unobserved firm heterogeneity inflates variance). We proceed with Poisson regression because it is the required model for this analysis, but we note that a negative binomial model or quasi-Poisson standard error correction would be more appropriate in a production setting. We revisit this after fitting the regression.'
new_equi = 'variance exceeds the mean by about 50%, which is common in real count data. We proceed with Poisson regression (the required model) but revisit this after fitting the full model.'

if old_equi in html:
    html = html.replace(old_equi, new_equi)
    changes += 1
    print(f"✓ Fix #2b: Tightened equidispersion paragraph")
else:
    print(f"✗ Fix #2b: Could not find equidispersion paragraph")

# --- Fix #2c: Add transition before Age Curve ---
old_age_title = '>Age Curve Visualizer<'
new_age_title = '>Age Curve<'
if old_age_title in html:
    html = html.replace(old_age_title, new_age_title)
    # Add transition sentence
    age_curve_heading = html.find(new_age_title)
    if age_curve_heading > 0:
        # Find the end of the heading tag
        heading_end = html.find('>', age_curve_heading + len(new_age_title))
        # Find the next element after the heading
        next_tag = html.find('<', heading_end + 1)
        if next_tag > 0:
            transition = '<p>The concave age profile and the constant multiplicative software effect are easier to see visually:</p>\n'
            html = html[:next_tag] + transition + html[next_tag:]
            changes += 1
            print(f"✓ Fix #2c: Added transition before Age Curve")
    else:
        print(f"✗ Fix #2c: Could not find age curve heading position")
else:
    print(f"✗ Fix #2c: Could not find 'Age Curve Visualizer' title")

print(f"\n{'='*50}")
print(f"Total changes applied: {changes}")
print(f"{'='*50}")

# Write the patched HTML
output_path = '/home/ubuntu/upload/HW3_MLE_patched.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nPatched HTML written to: {output_path}")
print(f"File size: {len(html) / 1024 / 1024:.1f} MB")
