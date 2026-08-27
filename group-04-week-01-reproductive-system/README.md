# Reproductive System — Group 4 (Quests, Level 4)

Prepared for **Benjamin**, the only kid at Level 4. This is a **Quests**-format
quest (per the Term 2 Quests Design & Framework Guidelines) — scenario-driven
with real stakes, not a lab-report frame — and, per the framework's ladder
table, a **5-day** quest, not 3. Per the framework's explicit instruction,
"Benjamin's 5 days must not be the same 3-day content stretched thinner" —
this document records exactly where the extra richness comes from.

Core skill target for this level: **Synthesis & Evaluation** — weighing
competing explanations or trade-offs and reaching a defensible judgment.
The entire week is structured so Day 4's case genuinely depends on Days 1–3,
not as a bolt-on activity.

## A note on scope, before anything else

This topic — human reproductive anatomy and physiology — is handled at
strict textbook/clinical rigor throughout: organ systems, gametogenesis,
hormonal cycle, fertilization, pregnancy stages, and birth, at the same
depth as a standard secondary-school biology or A&P curriculum. There is
no relationship, values, or lifestyle content, and no graphic imagery —
diagrams are simple labeled schematic SVGs in the same visual style used
across every other group's quests. This scope was confirmed with the
Riser/parent-facing user directly before this quest was built, given it
involves a real named minor and live-published content.

## The scenario

Benjamin is framed as a **Reproductive Physiology Consultant** on a
week-long rotation at a physiology research clinic. The week builds toward
one real decision he has to defend with evidence on Day 4: comparing two
real fertility-tracking methods (Basal Body Temperature charting vs.
LH-surge test strips) purely on their biological mechanism, timing, and
limitations — a scientific evaluation question, not a values question.

## What makes this genuinely richer than a 3-day quest (framework Section 3)

- **Extensive reading across 2 full days** (Day 1 anatomy, Day 2
  gametogenesis + the full hormonal cycle) before any build begins —
  roughly double the reading depth of the 3-day Discovery/Quests groups.
- **4 embedded videos**, one per reading/case day (CrashCourse Biology
  #34, Khan Academy's Ovarian Cycle, CrashCourse A&P #42 and #43), plus two
  optional deeper-anatomy videos linked (not embedded) on Day 1 — a
  component no other group's quest uses.
- **A self-generated sub-question** (refl-4, Day 2) — Benjamin has to write
  his own unanswered question about hormone timing and then answer it
  himself, rather than only answering questions written for him. This is
  the framework's explicit Level 4 mandate.
- **An explicit trade-off/limitation analysis** (refl-7, Day 4's case) —
  a real, evidence-based judgment between two methods, citing the specific
  underlying mechanism for each, rather than a simple comparison.
- **A teach-it-forward step BEFORE the final presentation** (refl-8, Day
  5) — explaining the entire week's biology to a "new trainee" in his own
  words, which the framework requires specifically for Benjamin ahead of
  presenting, not as an optional extra.
- **Paragraph-length written responses** (refl-2, refl-4, refl-7, refl-8)
  — four of the nine reflection checks require a full paragraph (4–6+
  sentences) rather than a sentence or two, each requiring coverage of
  multiple real terms/structures to pass, enforced by the same
  keyword-group content check used everywhere else, just with more
  required groups per prompt.
- **9 total invisible-evaluation checks plus a 5-item physical build**,
  vs. 4–5 checks and a build used in the 3-day groups.

## Full topic coverage

- Male and female reproductive anatomy: testes, epididymis, vas deferens,
  seminal vesicles, prostate, urethra; ovaries, fallopian tubes, uterus,
  cervix, vagina
- Gametogenesis: spermatogenesis (continuous, ~74 days) vs. oogenesis (all
  eggs present at birth, ~1–2 million dropping to ~300,000–400,000 by
  puberty, only ~300–400 ever ovulated)
- The full hormonal cycle: hypothalamus → GnRH → pituitary → FSH/LH →
  follicular phase → ovulation → luteal phase → menstruation, with real
  average-cycle-length data
- Fertilization: sperm/egg attrition numbers, the block to polyspermy,
  zygote → blastocyst → implantation, hCG, and the real ~6-day fertile
  window (12–24hr egg survival + 3–5 day sperm survival)
- Pregnancy stages by trimester and the three stages of birth
- **History (mandatory):** Falloppio 1561, de Graaf 1672, van Leeuwenhoek
  1677, Pincus/Rock/Chang 1950s–1960 (the Pill), Steptoe & Edwards 1978
  (first IVF birth)
- **Real-world application (mandatory):** fertility medicine/IVF, prenatal
  care, hormonal contraception, ovulation-predictor kits (the direct
  real-world version of Day 4's case), genetic screening, paternity testing

## Invisible evaluation — rotated across all 5 days

1. **Explain-the-error** (refl-1, Day 1) — a flawed anatomy claim about
   the prostate.
2. **Evidence-sourcing / paragraph synthesis** (refl-2, Day 1) — tracing
   both gamete pathways with 4+ named structures.
3. **Explain-the-error, quantitative** (refl-3, Day 2) — a flawed claim
   about gamete counts, corrected with real numbers.
4. **Self-generated sub-question** (refl-4, Day 2) — the Level 4-specific
   mechanism.
5. **Compare-two-cases, quantitative** (refl-5, Day 3) — egg vs. sperm
   survival windows explaining the real fertile window.
6. **Self-check reflection** (refl-6, Day 3) — on the physical build.
7. **Design-choice justification / trade-off analysis** (refl-7, Day 4) —
   the case itself.
8. **Teach-it-forward** (refl-8, Day 5) — the Level 4-specific
   pre-presentation mandate.
9. **Self-check reflection, final** (refl-9, Day 5) — on the whole week
   and the case argument's own weak point.

## The Day 3 build

A real, physical, staged 28-day hormone-cycle timeline (poster strip or
taped sheets, one color per hormone, labeled phases and events), following
the same materials-pool → tear-off-slip → justify-table → build-checklist
→ results structure used across every other group, themed with a
`model3d-stage` rotating through the cycle's four phases. Chosen over a
literal wet-lab experiment because no age-appropriate real experiment
exists for this specific topic; the framework explicitly allows a model
build as the alternative, provided it's staged, sequenced, and requires
real material-justification — which this does.

## Engine changes (local to this folder only)

`js/quest.js`'s `initProgressBar` was generalized from a hardcoded
3-day/2-scored-segment function into one that takes an explicit list of day
definitions (`{ seg, reflIds, includeBuild, buildTotal }`), so it can drive
5 independently-tracked day segments instead of 3. Calling
`initProgressBar(pageKey)` with no second argument still reproduces the
exact original 3-day behavior, so this change is local to Benjamin's copy
of the engine and does not need to be back-ported to any other group's
copy for their pages to keep working. `styles.css` adds a `.video-card` /
`.video-embed-wrap` component (same visual family as `.diagram-card`) and
a `.paragraph` textarea modifier for the four paragraph-length prompts —
both new, additive CSS, nothing removed from the shared component set.

## Verified

Gate (one-tap confirm), materials pool → print slip, model 3D
rotation/pause, all 9 reflection checks (content + writing-check
pipeline) across all 5 days, the 5-item build checklist, and the
generalized 5-segment progress bar (confirmed independently for every
day, including the day-3 build+reflection combination) — tested
end-to-end via headless browser before this was pushed.
