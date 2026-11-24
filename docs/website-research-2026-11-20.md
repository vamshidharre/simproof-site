# SimProof website research and design decisions

Reviewed 20 November 2026. Scope: the live public site, its local source, primary UX guidance, and upstream GitHub skills. This is product and interface research, not independent verification of the private simulation engine, a market-size study, or customer comprehension testing.

## What SimProof is

The [public homepage](https://simproof.netlify.app/) and [engineering page](https://simproof.netlify.app/engineers.html), together with the existing synthetic examples in `app.js`, describe an offline checking and reporting tool for engineering simulations. It reads study files, applies deterministic rules, reports pass/warning/failure/skipped outcomes, and preserves evidence identifying source files and locations. Its value is making simulation review repeatable and making findings inspectable.

The intended customers are small hardware startups and engineering consultancies, based on the founder's supplied instructions. Their likely first questions are: Does this work with my solver? What mistakes does it find? What does a report look like? What do I have to send? What happens to confidential files? These are design hypotheses, not interview findings.

The engineering page distinguishes Ansys Mechanical/MAPDL support from early Abaqus, Nastran and CalculiX readers that have not yet been validated on real solver output. The new homepage repeats this distinction instead of presenting four equivalent supported integrations. The existing site mentions 32 checks; the redesign leaves detailed inventory on the engineering page because a count alone says little about a visitor's particular study.

Evidence tracing demonstrates where a number came from. It does not establish that the physical model is valid or that a design is safe. [NAFEMS' V&V introduction](https://www.nafems.org/blog/posts/verification-validation-an-introduction/) and [Ansys' V&V explanation](https://ansyshelp.ansys.com/public/Views/Secured/corp/v251/en/dem_vm/verification-validation.html) distinguish numerical assurance from comparison with physical reality. This supports careful positioning: a tool assisting engineering review. The new copy explicitly says an engineer still needs to judge the model and design.

## Existing website assessment

The previous homepage opened with an evocative warning but used several large scroll chapters before demonstrating the actual output. It included a chapter rail, floating code, a particle field, custom scroll easing and multiple decorative interactions. Those devices increased reading distance and competed with the explanation. They were particularly hard to justify for visitors deciding whether to share an engineering study.

The strongest existing material was already concrete: a pulsed thermal load sampled when off, an unsupported mesh component, near-zero vibration frequencies and a balanced cantilever. The redesign foregrounds the thermal example, makes the input-to-finding relationship visible together, and retains the other cases as concise examples. No new numerical product evidence was invented.

The prior README incorrectly described mailto-only form submission. The actual code posts to Netlify Forms. Documentation now reflects the implementation and separates local tests from production delivery.

## Sources and selected skills

Selection criteria: relevance to buildless HTML/CSS/JS; readable upstream instructions; complementary coverage; identifiable licence; no required paid account, unavailable server, or new framework; no execution of downloaded code. Search-result popularity was not treated as proof of quality.

| Source | What it contributes | Decision |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Subject-specific visual direction, typography, copy, restraint and critique | Installed in shared global hub; Apache-2.0 licence included in skill |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Structured accessibility, interaction, responsive layout and form guidance; local reference data | Installed in shared global hub; MIT licence saved; read references/data without executing its downloaded scripts |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Review of focus, semantics, forms, motion and layout | Read latest upstream command as review guidance; did not install another global skill because repository-level licence was not established in this review |
| [Google Labs Stitch skills](https://github.com/google-labs-code/stitch-skills) | Stitch design generation and conversion workflows | Researched; not installed. README requires Stitch MCP, which is not connected here. Project states it is not an officially supported Google product |
| [Impeccable](https://github.com/pbakaus/impeccable) | Design vocabulary and iterative refinement | Considered; not installed because it overlaps the selected frontend-design guidance |
| Existing design-inspiration, design-ux and karpathy-guidelines | Reference selection, independent heuristic audit and bounded implementation | Reused rather than duplicating |

The new skills live at `C:/Users/vamsh/ai-skills/frontend-design` and `C:/Users/vamsh/ai-skills/ui-ux-pro-max`. The normal sync script copied them to Codex, Claude Code and Antigravity. Both include `SOURCE.txt` recording the source and upstream HEAD at review. Those hashes document the review context; the installer fetched main, so this is not a cryptographically pinned installation. Bundled third-party scripts were not executed. `LOCAL_NOTES.md` records that restriction for UI UX Pro Max. Three sync warnings concerned existing edits to youtube-thumbnail; those copies were preserved. Newly installed skills become available to future turns through the global catalogue.

## UX and visual rationale

[Google web.dev responsive design](https://web.dev/learn/design) and [accessibility guidance](https://web.dev/learn/design/accessibility) informed responsive composition, text alternatives and status labels that do not rely on colour. [Nielsen Norman Group homepage guidance](https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/) supports early explanation and concrete examples; its [heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) provide the review framework. [Unsection](https://www.unsection.com/) informed section-first browsing: short navigation, an explanatory hero and distinct evidence and contact sections. No gallery branding, copy or artwork was copied.

The visual system uses white and cool blue surfaces, dark blue text, a restrained action blue and semantic red/amber/green. Manrope supplies a consistent typographic voice; system fonts remain available if Google Fonts fails. The existing evidence-bracket logo stays. An original SVG mesh is labelled illustration, avoiding the implication that a decorative graphic is actual simulation output.

Page progression:

1. Say what SimProof does and who the free pilot is for.
2. Clarify solver scope without implying equal reader maturity.
3. Show a synthetic problem and finding side by side.
4. Reveal source details on request.
5. Explain the file/check/evidence workflow.
6. Answer practical objections in native accessible disclosures.
7. Request a study description, not confidential attachments.

The free check is the primary action; exploring an example is the secondary action. Mobile navigation uses a labelled Menu button with expanded state and Escape handling. Without JavaScript, navigation and content remain visible. Native scrolling replaces wheel interception. There are no autoplay particle loops, hover-dependent content or third-party tracking scripts added.

The redesign preserves the existing pilot terms: NDA first, offline checks, files deleted within 7 days, and a 20-minute review call. These are existing business commitments, not independently audited operational practices.

## Validation and limits

Desktop and mobile rendered screenshots were inspected. A separate reviewer used the rendered default homepage, mobile page and expanded evidence screenshot. It found joined mobile heading words and truncated dropdown selections. Both were corrected and re-rendered; the reviewer confirmed no remaining major issues. Its minor chart-label finding was addressed with an additional readable mobile text summary. This heuristic review does not establish real visitor comprehension.

Local checks covered JavaScript syntax, HTTP responses, local file/anchor destinations, horizontal overflow at desktop and narrow mobile widths, source disclosure, navigation and email validation. A test submission to the local Python server deliberately encountered its unsupported POST response: the form displayed recovery information, kept the entered email and re-enabled the submit button. No production form request was sent. Successful Netlify receipt, notification delivery and post-deployment behaviour remain unverified.

## Best next research

Before claiming that anyone understands the site easily, ask several intended customers to view the page briefly and answer: What does SimProof do? Who is it for? What would you receive? What would you click next? Record misunderstandings before explaining the product. This task did not contact anyone.

The most useful future evidence would be an approved, anonymised pilot report and customer feedback. Add them only with explicit permission and verified claims. Avoid fabricated customer logos, success metrics, guaranteed error detection or unqualified validation language.

Publication requires founder approval because pushing this repository's main branch changes the public Netlify site. No push or deployment was performed.

## Independent heuristic review record

| Heuristic | Finding after corrections | Severity | Action |
| --- | --- | --- | --- |
| Status visibility | Pass/Review/Fail labelled; local failure feedback observed | Production success pending | Verify Netlify receipt only with authorisation |
| Real-world language | Early explanation and concrete thermal example | No major finding | Real visitor comprehension still untested |
| Control and freedom | Disclosure collapses; mobile menu closes with Escape | No major finding | Keyboard behaviour verified locally |
| Consistency | Joined mobile heading words corrected and re-rendered | Resolved major | Literal whitespace retained around line breaks |
| Error prevention | No study-file upload in initial form; email validation focuses field | No major finding | Keep initial request descriptive |
| Recognition | Mobile select values now visible in stacked rows | Resolved major | Full-width mobile fields |
| Efficiency | Direct pilot and example routes | No major finding | Native links and scrolling retained |
| Minimalism | Restrained illustration and hierarchy; chart labels small on mobile | Minor addressed | Added readable mobile text summary |
| Error recovery | Local failure message, retained input and retry available | No major finding | Production success remains untested |
| Help and documentation | Contextual FAQ and working technical links | No major finding | Local destinations checked |

Final manual checks: 1280px desktop, 390px and 320px mobile without horizontal overflow; technical page checked on mobile; no browser console errors reported on the final homepage. Syntax checks and git diff whitespace check passed. The preview server is stopped after QA; start it using README instructions to revisit the site.

## Motion revision requested by founder

The founder requested a more animated experience after reviewing the published redesign. The local revision adds a dark engineering viewport, a deforming illustrative mesh, a moving node field behind the hero, an inspection sweep and small evidence-flow highlights. Motion references were browsed at https://60fps.design/; the implementation and geometry are original and use no third-party animation library.

A labelled native range control adjusts illustrative deformation and works by keyboard. A pause/play button freezes automatic motion, including CSS flow accents. The animation starts paused for reduced-motion preferences, tracks preference changes, and suspends its requestAnimationFrame loop while the hero is offscreen or the document hidden. Canvas resolution is capped at device pixel ratio 2 and animation drawing targets about 30fps. Pointer movement adjusts the viewing angle without intercepting scrolling or touch navigation. The static SVG remains the fallback if scripts or canvas are unavailable.

Verification: JavaScript syntax and whitespace checks; desktop and 390px screenshots; no horizontal overflow; ArrowRight changed slider and output from 60% to 61%; screenshots differed during playback and were identical across separate captures while paused. Reduced-motion handling was reviewed in code, not tested by changing the operating-system setting. Existing form handler unchanged. This revision has not been published.
