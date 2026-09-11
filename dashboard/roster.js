/* Dashboard roster — kid-safe routing + topic-label data only (no staff
   notes, no other kids' private info; this file ships to the public site).
   One entry per kid: which quests they have, where to sync/open each one,
   and which reading section each reflection question maps back to (so a
   "work on" item can link straight to the right place to re-read).

   PROTOTYPE: only Chris is populated right now, to validate the whole
   dashboard end to end before generating the rest of the roster. */
window.DASHBOARD_ROSTER = {
  chris: {
    displayName: 'Chris',
    weeks: [
      {
        key: 'week-01', group: 'group-01', label: 'Week 1 · Plant & Animal Cells',
        path: '../group-01-week-01-plant-animal-cell/chris/index.html',
        topics: {
          'refl-6': '1. The family resemblance',
          'refl-1': '2. The identifying marks',
          'refl-2': '2. The identifying marks',
          'refl-7': '2. The identifying marks',
          'refl-4': '2. The identifying marks',
          'refl-3': '3. Why the identifying marks even exist',
          'refl-8': '3. Why the identifying marks even exist',
          'refl-9': 'Twin A vs. Twin B, side by side'
        },
        anchors: {
          '1. The family resemblance': 'sec-shared',
          '2. The identifying marks': 'sec-plantonly',
          '3. Why the identifying marks even exist': 'sec-whydiffer',
          'Twin A vs. Twin B, side by side': 'sec-comparison'
        }
      },
      {
        key: 'week-02', group: 'group-01', label: 'Week 2 · Atomic Structure & Periodic Table',
        path: '../group-01-week-02-atomic-structure-periodic-table/chris/index.html',
        topics: {
          'refl-6': '1. The three particles every atom is built from',
          'refl-2': '2. What makes one element different',
          'refl-7': '2. What makes one element different',
          'refl-1': '2. What makes one element different',
          'refl-3': '3. Why particles sit where they do',
          'refl-8': '3. Why particles sit where they do',
          'refl-4': 'Reading the periodic table',
          'refl-9': 'Reading the periodic table'
        },
        anchors: {
          '1. The three particles every atom is built from': 'sec-particles',
          '2. What makes one element different': 'sec-identity',
          '3. Why particles sit where they do': 'sec-structure',
          'Reading the periodic table': 'sec-periodic'
        }
      }
    ]
  }
};
