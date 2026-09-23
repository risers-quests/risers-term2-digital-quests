# Reading Levels & Content Standards — Read Before Building or Editing Any Kid's Quest Content

This is the standing reference for reading-level assignments and the content
rules that came out of building/fixing Quest 3. Check this file before
writing or editing prose, questions, or calc-quest content for any kid,
including ones not listed yet — the rules below apply to them too the first
time their content gets a reading-level pass.

## Standing process rules (ask/do these every time, not just once)

1. **Always confirm the reading level before enhancing any kid's Quest 2 or
   Quest 3 content.** Don't assume or carry over a grade from a different
   kid or quest, ask what grade applies. Once set, that grade applies
   across *everything* on the page, main paragraphs, question prompts,
   callout labels, headers, placeholders, table cells, cover copy, all of
   it, not just the reading prose (see "What counts as in scope" below).
2. **Any new reflection/callout question added while enhancing a quest
   needs the same real check Quest 3 has**, a local keyword-group check
   first, then a remote LLM meaning-check fallback (`initReflectionChecks`
   / `checkMeaningRemote` in quest.js) if the keywords don't match. Don't
   ship a plain free-text box with no check wired to it going forward.

## Reading level roster (as of this session)

| Kid | Group | Quest | Reading level | Notes |
|---|---|---|---|---|
| Owen | 2 (Digestive System) | Quest 3 | Grade 6 | Also gets the "teach then test" principle applied to his quiz game (see CPA note below) |
| Pranavi | 2 (Digestive System) | Quest 3 | Grade 5 | Set earlier in the project; not yet re-verified against the question-text standard below |
| Yokesh | 1 (Climate Zones) | Quest 3 | Grade 4 | Set earlier in the project; not yet re-verified against the question-text standard below |
| Zach | 1 (Climate Zones) | Quest 3 | Grade 4 | Set earlier in the project; not yet re-verified against the question-text standard below |
| Zach | 1 (Atomic Structure) | Quest 2 | Grade 4 | Fully verified against the standard below (em-dashes, labels, questions) |
| Chris | 1 (Climate Zones) | Quest 3 | Not set | Standard/ungraded register — ask before assuming a grade |
| Shalom | 3 (Hydrocarbons etc.) | Quest 3 | Grade 6 | Not yet re-verified against the question-text standard below |
| Shalom | 3 (Space & Gravity) | Quest 2 | Grade 6 + CPA | Fully verified; Mission Lumen-1's 6 stages rewritten with CPA scaffolding. The Part 4 build was changed twice: first trimmed to 3 steps/1 planet, then (per explicit follow-up feedback that the build itself, not the text, was too complicated) replaced entirely, no more stretching fabric across a frame, now just rolling a marble around the inside of a bowl/funnel, which already has the right curved shape. Same "curved space bends the marble's path into an orbit" concept, much less fine-motor construction. Michael's and Karis's own Quest 2 copies of the same mission and build were deliberately left untouched, only Shalom's was in scope |
| Michael | 3 (Hydrocarbons etc.) | Quest 3 | Grade 7 + CPA | See CPA note below, his calc-quest is the harder/full-length version |
| Karis | 3 (Hydrocarbons etc.) | Quest 3 | Grade 6 + CPA | Deliberately simpler/shorter calc-quest than Michael's |
| Benjamin | 4 (Advanced Weather) | Quest 3 | Grade 7 + CPA | Deliberately the hardest calc-quest and hardest quiz game, per his "Advanced" persona |
| Eva | 0 (Materials/Solar System) | Quest 2 & 3 | No persona, very simple (roughly grade 1) | Not yet explicitly re-graded; still the original "roughly grade 1" baseline |
| Gabby | 0 (Solar System) | Quest 2 | Grade 2 (CPA n/a, no calc-quest on this page) | Bumped up from the earlier ~grade-1 baseline; picked grade 2 (the lower end of the "grade 2 or 3" range given) since it's already very simple and simple is safe, flag if grade 3 was actually intended |
| Elyon | 0 (Solar System) | Quest 2 | Grade 2 (CPA n/a, no calc-quest on this page) | Same as Gabby, same reasoning |
| Gabby, Elyon | 0 (Materials) | Quest 3 | No persona, very simple (roughly grade 1) | Not yet re-graded to match their new Quest 2 grade-2 level, flag if Quest 3 should be bumped too |

Anyone not in this table has never had an explicit reading level assigned —
their content defaults to the site's standard/ungraded register. Don't
assume a grade for them; ask.

## What counts as "in scope" for a reading-level pass

A reading-level pass is not done until **every** kid-facing string on the
page has been checked, not just the main paragraphs. Confirmed gap (found
and fixed this session): an earlier pass only touched the `<p>` paragraphs
under each `<h3>` and left "trade-off" (and similar words) sitting untouched
in callout labels, question prompts, table headers, and textarea
placeholders — because those weren't checked at all. Check all of these:

- Main expository `<p>` paragraphs under each `<h3>`
- Reflection/callout question prompts (the `<p>` inside `.callout` divs)
- Callout labels (`.callout-label` spans)
- Textarea `placeholder` attributes
- `<h1>`/`<h2>`/`<h3>` headers and `.day-kicker` text
- Table headers and table cell content
- Cover section: `<h1>`, `.subtitle`, the `.framing` paragraph
- `.day-sub` intro lines
- Day 3/4 presentation `.hook-box` and `.prep-form` text
- Any diagram/image captions or `.diagram-sub` text
- **Anything added after the reading-level pass already ran** — content added later (a new diagram, a new build section, a new game) needs the same check applied to it specifically; it does not inherit the earlier pass automatically. Confirmed gap: an alkane-diagram caption added after Michael/Karis's em-dash cleanup still had an em-dash in it, and Owen's cover/title/hook-box still described his old build after the build itself was replaced.

## Vocabulary rule

Avoid abstract, low-frequency, non-technical words even when they only
appear in a question, a label, or a placeholder — not just in reading prose.
Confirmed examples already fixed: "trade-off" (→ "catch"), "regenerate"
(→ "grow back"), "timescale" (→ "speed" / "how long it really takes"),
"distinct" (→ "different"), "structural difference" (→ "difference in how
they work"), "genuinely" (→ "really").

This does **not** apply to actual science/technical terms the page teaches
and defines (e.g. "non-renewable resource", "villi", "peristalsis",
"Saffir-Simpson scale") — those are expected vocabulary once the reading
has introduced them, and are also usually in the glossary drawer.

## Punctuation rule

No em-dashes (—) anywhere in kid-facing text, for any kid, not just the
four this was fixed for so far. Kids don't recognize the symbol. Use:
- A comma, where the em-dash was joining a short aside or clause.
- A middot (`·`), for title/label separators — matches the site's existing
  convention (e.g. `Day 1 · Systems Briefing`).

## CPA (Concrete-Pictorial-Abstract) standard for calculation content

Applies to any calc-quest/numeric mission (Mission Refinery-1, Mission
Barrel-Check, Mission Storm Track are the current examples). Every stage's
briefing must:
1. **Concrete** — show the relationship worked on an easy example with
   different numbers than the actual question.
2. **Pictorial** — show a simple visual pattern of that relationship.
3. **Abstract** — state the formula in words and symbols.
4. **The question itself** must state every number/fact it needs in plain
   words, directly, with nothing left for the kid to infer from a name, a
   unit conversion, or a prior stage — even when a stage deliberately
   chains off a previous stage's answer (state the previous answer's value
   again in the new stage's setup, don't assume they remember it).

Difficulty is tuned by grade level, not by loosening this structure: Karis's
mission is shorter and uses only single-step whole-number math; Michael's
is standard-length with some two-step/chained stages; Benjamin's is longer
with more chaining and real reference scales (Saffir-Simpson, Enhanced
Fujita) baked into the briefings. The CPA structure itself stays the same
across all three.

## Games standard

"Add a game" for a kid means a genuinely distinct interaction mechanic, not
just more content inside an existing one. A calc-quest mission with 8
questions is one game. A match-the-term game is a different game. A
multiple-choice scenario quiz (`initQuizGame`, used for Owen and Benjamin)
is a third, distinct mechanic. If a kid is asked to have "games" (plural),
that means multiple distinct mechanics, not one mechanic with more content.

## Diagrams standard

When a diagram represents something with a real, recognizable shape (an
organ, a molecule, a piece of anatomy), it needs to actually look like that
thing, not just be numbered labels/dots placed on a generic outline. Confirmed
gap: Owen's first digestive-system diagram was numbered circles on a plain
oval and didn't read as a digestive system at all; it was rebuilt with real
organ shapes (a stomach pouch, a liver wedge, coiled intestines, the colon
drawn as a frame around the small intestine) matching a real reference
image's layout. If the user provides a reference image, match its actual
shapes and layout, not just its general idea.

## Anti-copying standard

Every reflection/reading-check textarea, on every new quest built going
forward, needs both of these (see `initReflectionChecks` for the pattern,
first added to Quest 2/3 2026-09-22):

1. **Block drag-and-drop, not just clipboard events.** The `copy`/`cut`/
   `paste` block alone doesn't stop a kid from selecting text elsewhere on
   the page and dragging it into the box, `drop` is a separate browser
   event. Always block all four: `['copy', 'cut', 'paste', 'drop']`, same
   "please type your own answer" message.
2. **Verbatim-copy guard**, catches an answer transcribed by hand straight
   from the reading (no technical bypass involved, so the drag/paste block
   doesn't touch this case). Every reflection config with a `reread.anchor`
   gets checked: pull the actual passage text following that heading (up
   to the next `<h2>`/`<h3>`), and if any run of 8+ consecutive words in
   the submitted answer matches it verbatim (after lowercasing/stripping
   punctuation), reject it before the keyword/LLM checks even run, a
   copied sentence would trivially pass those since it obviously contains
   the right words. Short technical phrases (2-4 words) don't trip this;
   a transcribed sentence does. Helper functions: `normalizeWords`,
   `sectionText`, `checkVerbatimCopy`, defined right after
   `checkKeywordGroups` in quest.js.

Both were retrofitted onto existing Quest 2/3 pages for: Eva, Gabby, Elyon,
Yokesh, Zach, Chris, Owen, Pranavi, Shalom, Karis, Michael (incidental,
shares a file with Shalom/Karis). Not yet applied: Benjamin (Quest 2 or 3),
and Quest 1 across the board (Quest 1 predates the LLM-check pattern
entirely, see the LLM section above). Build both into any new quest.js
from the start rather than retrofitting later.

## Facilitator answer-review standard

The auto-check (keyword or LLM) can be fooled by a required word showing
up inside a negation — e.g. a kid writes "not the same" and the keyword
"same" still matches, so it gets marked right when the actual claim is
wrong. Auto-checks can't be trusted as the only evaluation, so every
reflection answer also gets a second, human layer: a facilitator-only
review control, added 2026-09-23, first built for Week 3.

- Two independent choices per answer, both button-choice only, no free
  text: **Right / Wrong** (overrides the auto-verdict) and **answer
  clarity** — Clear / Not clear enough / Vague.
- Rendered only in Facilitator View (`?fac=1`) and only once the kid has
  already clicked "Complete My Quest" — a kid never sees this UI, and it
  doesn't appear before there's something finished to review.
- Saved into the same per-reflect-item localStorage blob `collectSyncState`
  already reads (`state.facReview = { correct, clarity }`), so it syncs
  automatically through the existing cross-device sync — no new storage
  key, no worker changes needed. Facilitator-mode edits normally never
  push (so just opening a kid's page to check on them can't create a
  synced record); this uses a narrow `pushNow(true)` bypass exposed as
  `window.__questForcePush`, fired only when the facilitator actually
  clicks a review button.
- Implementation lives in `initReflectionChecks` in quest.js (styles:
  `.fac-review*` in styles.css) — same pattern, one block, applies to
  every reflect textarea on the page automatically.

Applied to all 5 Week 3 quest.js/styles.css files (group-00 through
group-04) 2026-09-23. Not yet applied to Week 1, Week 2, or Week 4 —
extend the same pattern to those if/when asked.
