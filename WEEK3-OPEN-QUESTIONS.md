# Week 3 (Quest 3) — Open Questions Log

Started while building all 12 kids' Quest 3 content in the background, per
instruction to keep building and hold questions until asked. Every
placeholder or judgment call made without confirmation is logged here.
Nothing below blocks the build — each item has a stated default/assumption
that was actually used, so the quests are playable end-to-end; these are
just the calls worth double-checking.

## Cross-cutting assumptions (apply to all 5 new quests)

1. **Reading levels carried forward.** Owen=grade 6, Pranavi=grade 5,
   Yokesh=grade 4, Zach=grade 4, Shalom=grade 6 (all explicitly set this
   session). Everyone else (Chris, Karis, Michael, Benjamin, Eva, Elyon,
   Gabby) has never had an explicit grade set — their Quest 3 content
   defaults to the same "standard" register as their existing Quest 1/2
   pages. Flag if any of these should actually be a specific grade.
2. **Day-labeling convention.** Used "Day 1 / Day 2 / Day 3" (matching the
   Quest 2 template) rather than Week 1's self-paced "Part 1/2/3"
   relabeling. Worth revisiting given quests are meant to be self-paced.
3. **New kid lenses/personas invented for this topic** (not previously
   established) — each is noted in its own section below. All follow the
   house style (a role/job framing consistent with Atom City Planner,
   Soil Systems Engineer, etc.) but were not run past you first.
4. **Facilitator PIN** reused as-is (`1234`, site-wide) — no new question
   there.
5. **Dashboard label format** — used "Quest 3 · <Topic>" per the existing
   Week→Quest rename, consistent with Quest 1/Quest 2 labels.
6. **Video embeds** — only used real, specific YouTube video IDs found via
   search and confirmed relevant. Anywhere a genuinely good match wasn't
   found, a clearly marked placeholder block was left instead of a guessed
   or fabricated ID — see each group's section below for which.

## Group 2 — Digestive System (Owen, Pranavi) — ✅ built, merged, pushed

- **Personas:** Owen = "Gut Engineer" (grade 6), Pranavi = "Gut Systems
  Engineer" (grade 5) — each ties to their Week 2 instinct (Owen measures
  one artifact; Pranavi times two side by side). Lens colors: Owen amber,
  Pranavi red — both new, distinct from Week 2's teal/purple.
- **Builds:** Owen — a real scaled rope/string model of the digestive tract,
  measured against real approximate organ lengths (stomach ~25–30cm, small
  intestine ~6m, large intestine ~1.5m, ~9m total — flagged as commonly-cited
  classroom approximations, not one precise citation, since real GI length
  varies by source/measurement method). Pranavi — a timed crushed-vs-chewed
  cracker breakdown comparison (mechanical-only vs. mechanical+chemical
  digestion). **Flagged by the build itself:** this timed-cracker test is
  the agent's own adaptation of the well-documented "cracker taste test"
  classroom demo into a timed version to fit Pranavi's comparison/timing
  lens — not independently piloted, worth a facilitator sanity-check before
  kids run it.
- **Videos — all 3 real, confirmed via search, no placeholders:**
  `ZBZWgrfZFbU` (Dr. Binocs digestive system), `SD8kLAD1jnA`
  (mechanical/chemical overview), `JLzX_KSrxDc` (badgut.org absorption
  journey), reused across both kids.
- **Reflections:** 16 shared ids (Owen + Pranavi both), Pranavi has one
  extra lens-specific `refl-17` — verified independently 1:1 against config
  on both pages (16/16 and 17/17, no orphans).
- **History (4 real, search-verified milestones):** Spallanzani (1780s,
  gastric juice is chemical), Prout (1824, identified HCl in gastric
  juice), Beaumont (1822–1833, St. Martin fistula experiments), Pavlov
  (1904 Nobel Prize).

## Group 1 — Climate Zones (Chris, Yokesh, Zach) — ✅ built, merged, pushed

- **Personas, carrying forward each kid's established persona type:** Chris
  = "Climate Detective" (standard register), Yokesh = "Climate City
  Planner" (grade 4), Zach = "Climate Body Connector" (grade 4, body's own
  temperature/hydration regulation compared to climate zones). Lens
  colors: Chris amber, Yokesh teal, Zach blue — new, distinct from Week 2's
  magenta/slate/rose.
- **Shared structure**: all 3 share 4 `sec-` concepts and 8 `refl-`
  ids (`refl-1,2,3,4,6,7,8,9`) with identical keyword logic — only
  prose/framing/build differ per lens, matching the Week 2 pattern.
  Verified independently: 8/8 on each page, no orphans.
- **Builds, genuinely different per kid:** Chris — a sun-angle evidence
  rig; Yokesh — an equator-to-pole zoning-strip model; Zach — a
  body/Earth-regulation matching build. Each converges on a "identify this
  mystery location's climate zone" step for Day 3.
- **Videos — 2 real, search-verified, embedded:** `Kp7ZhvJXrMc` ("Climate
  Zones for Kids"), `SDfc8SBYNnM` ("Why is Equator Hot but Poles are
  Cold?"). **One placeholder left** — an ocean-currents-topic video the
  agent could not confidently verify, marked with `.video-placeholder`
  rather than guessed. Still needs a real video picked.
- **History (verified via multiple independent sources, one caveat):**
  Humboldt's 1817 isotherm map, Köppen's 1884 sketch → 1900/1918
  classification → 1936 Köppen-Geiger map. Caveat: Humboldt's date/claim
  was corroborated via secondary sources only, not his original 1817
  paper directly — well-corroborated but not primary-source-verified.

## Group 3 — Hydrocarbons + Plastics + Fossils (Shalom, Karis, Michael) — ✅ built, merged, pushed

- **Confirmed structural change**: all three kids now share the *same*
  reading-based structure (unlike Quest 2, where Shalom ran a calc-quest
  mission while Karis/Michael ran a reading+build quest) — this topic is
  chemistry/earth-science, not physics-calculation-driven, so the split
  didn't make sense to carry forward. This was a real, deliberate choice
  made without asking first — worth confirming it's the right call for
  this trio going forward.
- **Personas:** Shalom = "Resource Mission Director", Michael = "Energy
  Resource Analyst", Karis = "Materials & Fuel Analyst" — all standard
  reading register. Colors: kept each kid's existing red/teal/blue accent
  from their Quest 1/2 pages rather than picking new ones, since every
  other kid on the site keeps one consistent personal color across their
  own quests. Flagged as a deliberate choice, not an oversight — worth
  confirming this is the preferred approach (vs. every other group
  getting a fresh color for the new topic).
- **Shared across all 3:** identical `sec-1..sec-4` content and identical
  `refl-1,2,3,4,6,7,8,9,10,11` ids/keyword-groups (11 total, `refl-5`
  deliberately skipped — confirmed absent on all 3 pages — since
  `quest.js`'s progress bar special-cases `#refl-5` as a Day-2 self-review
  flag). Verified independently: 11/11 on each page, no orphans.
- **Distinct builds:** Shalom — a layered burial model of fossil-fuel
  formation (organic layer → sediment → pressure, measured in cm);
  Michael — real ball-and-stick hydrocarbon molecule models (methane CH₄
  + butane/octane, atoms counted, formulas logged); Karis — real household
  plastic items sorted by resin ID code (1–7), cross-checked against real
  local recycling rules. All hands-on and household-safe.
- **Videos — 3 real, search-verified, no placeholders:** `1UE3hZ7cOP0`
  (AumSum Kids, hydrocarbons), `JasIvS7oYw4` (Fossil Fuels for Kids),
  `sIuUcJ72wWY` (From Crude Oil to Plastic, 2024). Same playback caveat as
  every other group — sandbox can't play YouTube, so confidence is at the
  search-result-title level, worth a facilitator spot-check.
- **Facts deliberately left hedged/unstated rather than guessed:** exact
  global recycling-rate percentage, precise oil/gas formation timescale
  (kept as "millions of years"), coal's exact elemental composition (kept
  qualitative), Carboniferous Period used only as an approximate ~300 mya
  anchor.

## Group 4 — Advanced Weather Systems (Benjamin) — ✅ built, merged, pushed

- **Persona:** "Atmospheric Circulation Forecaster" — deliberately calls back to
  his Week 1 circulatory-system framing (pressure differences drive both blood
  flow and air flow; "a falling barometer reading is the atmosphere's version
  of a weak pulse").
- **Build:** a real working barometer (balloon membrane over a jar + straw
  pointer + index-card scale), read and logged over time — ties directly to
  the low-pressure-system content.
- **Videos — all 3 real, confirmed via search, no placeholders needed:**
  `5Cnx5Bzctas` (weather fronts), `_cUbV-zPDr8` (how hurricanes form, Nat
  Geo), `pSajNLBH7cA` (tornadoes 101, Nat Geo). Caveat: confirmed by search
  metadata (title/channel/topic) only — the sandbox can't play video, so
  worth a quick facilitator spot-check before this goes live.
- **15 reflection questions**, ids verified 1:1 against `initReflectionChecks`
  independently (not just by the agent's own claim). Includes real numeric
  content: Saffir-Simpson scale (Category 4 = 130–156 mph), Enhanced Fujita
  scale (EF4 ≈ 166–200 mph).
- **Simplifications flagged by the build itself** (see
  `group-04-week-03-advanced-weather-systems/BUILD-NOTES.md` for the full
  list): the front-symbol SVG diagram is a stylized simplification, not
  meteorologically precise at small scale; occluded fronts are explained
  using the standard simplified cold-type description only, without the
  cold-type vs. warm-type occlusion distinction.

## Group 0 — Materials in Everyday Life (Eva, Elyon, Gabby) — ✅ built, merged, pushed

- **Confirmed no-persona convention held**: independently verified zero
  `lens-pill` elements across all 3 pages, matching the established
  Week 2 pattern for this trio. Correctly used group-00's own `quest.js`
  variant (2032 lines, not the 1828-line generic one other groups use —
  group-00 has extra built-in features like the 2-watch video lock),
  copied byte-identical, confirmed independently.
- **Shared build (all 3 kids, one build this time — a deliberate departure
  from Week 2 where each kid had a different build):** test 5+ household
  objects across the 5 material types (wood/metal/plastic/glass/fabric)
  for hard/soft, bendy/stiff, see-through/not, floats/sinks, logged in a
  table.
- **10 reflections, byte-identical config across all 3 kids** — verified
  independently (10/10 on each page, no orphans).
- **Videos — 3 real, search-verified IDs, not independently played
  (sandbox blocks youtube.com egress) so flagged for a spot-check:**
  `0aUUuJ3LRUE` ("Properties of Materials | Science for Kids"),
  `JCKSMsbpn1Y` ("Materials for Kids..."), `Fex-wvrOZf4` ("Recycling for
  Kids..."). Drop-in alternates suggested in BUILD-NOTES.md if any turns
  out blocked/unavailable.
- **History (3 real, search-verified milestones):** Bronze Age (c. 3300
  BCE), Bakelite/Baekeland (1907, first fully synthetic plastic), first
  Earth Day (1970) as the spark for the US recycling movement — the
  Earth-Day→recycling link is flagged as a simplification appropriate for
  the age group, not a precise causal claim.
- **End-to-end Playwright run on Eva's page**: answered all 10 reflections
  with real prose, all passed first try, Day 1 hit 10/10, Day 2 unlocked,
  all 5 build-checklist items completed, match game + glossary rendered,
  "Complete My Quest" unlocked — zero JS errors.

## Integration (staff portal + dashboard)
_(filled in once wiring is complete)_
