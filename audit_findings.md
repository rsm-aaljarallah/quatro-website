# HW3 MLE Report — Shape & Flow Audit

## Overall Assessment
The code is solid and the math is correct. The main issues are about **narrative flow**, **visual hierarchy**, and **section pacing**. The report reads more like a textbook chapter than a polished case study — it front-loads theory before the reader has a reason to care, and some sections are dense walls of text that could be broken up.

## Issues Found (Shape & Flow)

### 1. INTRODUCTION IS REDUNDANT
- Lines 82-96: The guide-box says "The problem" and then the paragraph below repeats almost the same thing in different words.
- The phrase "controls for age and region before drawing any conclusions" appears in BOTH the guide-box AND the final paragraph of the intro.
- **Fix:** Merge into one tight paragraph. The guide-box should be the ONLY intro — it's punchy and sufficient. Remove the redundant paragraph or fold its unique details (1,500 firms, cross-sectional) into the guide-box.

### 2. SECTION 3 (Simple Poisson Model) IS TOO LONG AND FRONT-LOADED
- This section runs from line 219 to line 500 — nearly 280 lines before the reader gets to the actual regression model.
- It includes: Poisson justification, likelihood derivation, log-likelihood derivation, code, interactive explorer, analytical MLE derivation (score function, second-order condition), animated log-likelihood, numerical MLE, equidispersion check.
- The interactive explorer and animated log-likelihood are cool but they slow the narrative. The reader already knows λ̂ = Ȳ from the math — the animation is pedagogical filler at this point.
- **Fix:** Tighten this section. The interactive explorer + animated curve could be collapsed into a single "Explore" subsection. The equidispersion check could be a brief callout rather than a full subsection.

### 3. MATH DERIVATIONS ARE DENSE AND UNBROKEN
- The Hessian derivation (lines 634-652) is a wall of math with no visual break. Same for the score function derivation (lines 590-594).
- **Fix:** Add brief "plain English" summaries after each derivation block. Use the guide-box or takeaway pattern more consistently.

### 4. COEFFICIENT INTERPRETATION SECTION COULD USE BETTER VISUAL HIERARCHY
- Lines 773-793: The bullet list works but the iscustomer interpretation (the most important finding) is buried as the last bullet in a list of 4.
- **Fix:** Pull the iscustomer result OUT of the bullet list and give it its own highlighted subsection or stat-card treatment. The intercept and region effects are secondary — they can stay as bullets.

### 5. THE "WHAT THIS ESTABLISHES" SECTION (lines 938-950) REPEATS THE TAKEAWAY
- The three caveats are good, but the opening sentence ("The estimate is consistent with Blueprinty's marketing claim...") repeats what was just said in the coefficient interpretation section.
- **Fix:** Cut the opening sentence and lead directly with the caveats. Or restructure as a "Limitations" subsection.

### 6. SUMMARY CARDS ARE GOOD BUT COULD BE BETTER ORDERED
- The 6 summary cards cover: Count Data, MLE, Regression, SE, Counterfactual, Causation.
- The ordering follows the report structure, which is fine, but the most important takeaway (Counterfactual Effect + Causation caveat) is buried at the end.
- **Fix:** Consider leading with the main finding card, then the methodology cards.

### 7. STAT-ROW CARDS (lines 836-853) APPEAR BEFORE THE COUNTERFACTUAL CODE
- The stat cards show +0.79, 23.1%, 15.8-30.8%, 1500 — but they appear BEFORE the code that computes them. This is confusing for a reader following the code.
- **Fix:** Move the stat cards AFTER the code output, or at least after the print statements that show the computation.

### 8. HORIZONTAL RULES (---) ARE INCONSISTENT
- Some sections have `---` dividers, others don't. The dividers between Introduction→EDA→Simple Model→Regression→Counterfactual→Summary are inconsistent.
- **Fix:** Either use `---` between ALL major sections or none.

### 9. SUBSECTION TITLES USE MIXED EMOJI CONVENTIONS
- "🎛️ Interactive Poisson Explorer" and "🎬 Animated Log-Likelihood Curve" use emoji, but other subsections don't.
- **Fix:** Either use emoji for ALL subsection titles or none. The current mix looks inconsistent.

### 10. THE GUIDE-BOX PATTERN IS OVERUSED
- There are 4 guide-boxes (intro, Poisson justification, regression extension, counterfactual). The first two are very close together in the reading flow.
- **Fix:** The Poisson justification guide-box (lines 224-229) could be a simpler callout or folded into the section text.

## Recommended Priority Order
1. Fix #1 (redundant intro) — quick win
2. Fix #4 (iscustomer visual hierarchy) — biggest impact on reader takeaway
3. Fix #7 (stat cards placement) — logical flow
4. Fix #2 (Section 3 length) — tighten pacing
5. Fix #9 (emoji consistency) — polish
6. Fix #8 (HR consistency) — polish
7. Fix #3 (math summaries) — readability
8. Fix #5 (repeated conclusion) — tightening
9. Fix #6 (summary card order) — minor
10. Fix #10 (guide-box frequency) — minor
