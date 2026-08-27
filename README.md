# Risers Term 2 Digital Quests

Public content repo for Term 2's digital quests, across all groups and weeks.
Each week's quest lives in its own folder, named `group-<NN>-week-<NN>-<topic>`.
No kid's saved answers live in this repo — see the naming convention below
for where that data actually goes.

## Structure

```
group-03-week-01-immune-system/   Group 3 (Shalom, Michael, Karis) — Week 1, Immune System
```

Each week's folder is a self-contained static site (its own `index.html`,
`css/`, `js/`) — see that folder's own README for details specific to that
quest.

## Naming convention

`group-<NN>-week-<NN>-<short-topic-slug>`

- `group` — matches the Level/Group numbering from the Term 2 Topic Coverage
  docs (Group 0 = Level 0, ... Group 4 = Level 4).
- `week` — sequential within that group, starting at 1.
- topic slug — a short, lowercase, hyphenated version of that week's subject.

## No build step

Plain HTML/CSS/JS per quest folder, same as each individual quest inside it.
Open any week's `index.html` directly, serve the repo locally
(`python3 -m http.server`), or enable GitHub Pages.
