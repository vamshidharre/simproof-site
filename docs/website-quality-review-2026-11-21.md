# SimProof alignment, motion and accuracy review

Reviewed 21 November 2026. This supplements the original website research. Scope: both website pages, their code, synthetic example data already present in the site, primary design guidance and rendered desktop/mobile output. It does not independently validate the private simulation engine or certify the design of a customer model.

## What was wrong and what changed

The desktop right-hand panel contained a notice with an inherited one-degree CSS rotation. This remained after the outer panel was straightened. Browser computed styles confirmed the residual rotation matrix. The two hero columns also started at different heights because they were vertically centred.

Both rotations are removed at source. The hero columns now share a top alignment, verified at 153 CSS pixels from the viewport top in the desktop test. The panel title, mesh controls, finding notice and footer use one panel gutter. Header labels align on a baseline at wide sizes and stack neatly on narrow panels. The mesh viewport is more compact, panel shadows are lighter, and the moving background fades away behind the main text. Motion remains inside the illustration; the frame and text stay stationary.

The form previously truncated long selected values. Both pages now use full-width select rows and shorter visible labels, preserving the original submitted option values and CTA preselection. Both pages retain the requested removal of the copyright line.

The technical page now has a proper first-level heading, calls its check descriptions categories rather than implying the grouped list enumerates all 32 checks, and states that only relevant checks apply. Its explanation of a pass is scoped to the check performed. Displayed file fingerprints are identified as SHA-256 prefixes because the demo stores 16-character prefixes. Source-view scrolling now respects reduced-motion preferences.

## Research and application

- [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) explains why ongoing automatically moving content needs a user control. The hero retains an explicit pause/play button that freezes the canvas and evidence-flow accents. Motion starts paused when reduced motion is requested. Preference changes, hidden documents and an offscreen hero are handled in code. This was not a complete WCAG conformance audit.
- [Google web.dev: high-performance animation](https://web.dev/articles/animations-guide) recommends avoiding layout-triggering CSS animation. The small CSS effects use transforms/opacity. The original canvas renderer is separately bounded to approximately 30 draws per second, with pixel density capped at 2. It is suspended when not visible. No performance score or device-wide frame-rate guarantee is claimed.
- [Google responsive design accessibility](https://web.dev/learn/design/accessibility) informed semantic labels, readable text and status words alongside colours. Selected text/background pairs were calculated at 5.85:1 for body copy, 6.13:1 for button text, and 7.81:1 or higher for the tested panel labels. These are selected pair calculations, not an exhaustive contrast audit.
- [Nielsen Norman Group usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) informed task clarity, visible state and recovery. A separate reviewer inspected full rendered pages, not just the CSS. It found the select truncation; re-rendering confirmed the fix, with no remaining major issue apparent in the screenshots. This is expert heuristic review, not customer testing.
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md) provided a code review checklist for focus, controls, forms, reduced motion and responsive content. No extra framework, animation dependency or tracking script was introduced.
- [NAFEMS V&V introduction](https://www.nafems.org/blog/posts/verification-validation-an-introduction/) supports distinguishing evidence tracing/checking from physical validation. The website continues to present SimProof as support for engineering judgement, with no design approval or guaranteed detection claim.

## Product accuracy checks

The product description remains grounded in the existing [public engineering page](https://simproof.netlify.app/engineers.html) and local site examples. Ansys Mechanical/MAPDL is distinguished from early Abaqus, Nastran and CalculiX readers. The mesh is explicitly an interactive illustration, not solver output. No client data is used.

The synthetic heat example was recalculated by trapezoidal integration of the existing piecewise-linear table over 0 to 0.012 seconds: average 33.333333333333336 mW/mm², peak 80 mW/mm², and zero at the solve time. Its displayed rounded values are consistent. The support, modal and force-balance examples remain sourced from the site's existing synthetic descriptions; their engine runs were not repeated.

The published source's 32-check inventory, validation labels, report formats and offline capability are existing product claims. This website-only review did not independently establish their current status in the private engine. The NDA, seven-day deletion and review-call terms are existing business commitments, not an operational audit.

## Verification evidence

- Panel and notice computed transforms are `none`; both desktop hero columns have equal top coordinates.
- No page or panel-footer horizontal overflow at 320, 390, 768, 1024 and 1440 CSS-pixel viewport widths.
- Native select choices remain visible after layout and label changes.
- Invalid email displays an inline error, marks the field invalid and focuses it.
- Selecting E8 in the technical demo updates the evidence panel and identifies the SHA-256 prefix.
- JavaScript syntax, diff whitespace, local asset/anchor destinations, unique IDs, one h1 per page, image attributes and visible field labels checked.
- Browser homepage console reported no errors during the final review.
- Earlier motion tests confirmed changing images during playback and identical images while paused; keyboard input updates the load/output. Reduced-motion handling is reviewed in code, not claimed as an OS-level test.

Production form receipt and notification delivery remain untested. Google Fonts are external optional requests with local fallbacks. No publication was performed during this revision; founder approval is still required before pushing main. Real customer comprehension, all-device performance and complete accessibility conformance remain unproven.
