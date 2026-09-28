/* End-of-Term Report — a shareable, parent-safe summary page, one kid per
   link (?kid=chris), distinct from the day-to-day "My Quests" dashboard
   (index.html) and from the staff-only Feedback page (which is explicitly
   marked "do not share with families"). Reads the exact same synced data
   those two already use — no new data collection, no staff notes, no PINs.

   Only shows quests the kid has ACTUALLY completed (state.completed ===
   true, straight from live sync) — a kid can have more quests assigned in
   the roster than they've finished; this report is "what they did," not
   "what's on the roster." A quest still in progress just doesn't appear.

   Per completed quest: completion status, time taken, a Bloom's Taxonomy
   ceiling (only where roster.js's optional `bloom` map exists for that
   week — a quest without one just skips that row rather than showing
   nothing/fake data), a presentation rating (from the same /rating
   endpoint the staff Feedback page's rubric reads/writes), and a link to
   open the quest itself.

   The three closing paragraphs (What went well / what to work on / what's
   next) are auto-drafted from the same underlying signals the staff
   Feedback page already computes (Bloom's ceiling, genuine-pass rate) —
   never a human's typed-in remarks, so there's nothing staff-private
   leaking into a parent-facing page by accident. */
(function () {
  var WORKER_URL = 'https://risers-term2-digital-quests-progress.highergrade.workers.dev';
  var SITE_KEY = 'RsmI8VwuJZ-IIieNmVss5JyChP2nf7y8mVYU5ReJLYM';
  var BLOOM_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
  var TERM_START = 'Aug 31';
  var TERM_END = 'Sep 30';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtTime(ms) {
    if (!ms) return '0m';
    var mins = Math.round(ms / 60000);
    if (mins < 1) return '<1m';
    if (mins < 60) return mins + 'm';
    return Math.floor(mins / 60) + 'h ' + (mins % 60) + 'm';
  }

  // Same rule the staff Feedback page uses: a question counts as genuinely
  // understood if it passed on the kid's own merit, or a facilitator
  // granted a pass specifically because the reasoning was right (not just
  // "close enough, move on").
  function isGenuinePass(r) {
    if (!r) return false;
    if (r.success && !r.contentFlagged) return true;
    if (r.contentFlagged && r.passReasons && r.passReasons.length) {
      var reasons = r.passReasons;
      var logicRight = reasons.indexOf('Logic right') !== -1 || reasons.indexOf('Full pass — everything right') !== -1;
      var logicShaky = reasons.indexOf('Partially right') !== -1 || reasons.indexOf('Logic wrong') !== -1;
      return logicRight && !logicShaky;
    }
    return false;
  }

  function fetchWeekState(group, kid, week) {
    var url = WORKER_URL + '/sync?group=' + encodeURIComponent(group) + '&kid=' + encodeURIComponent(kid) + '&week=' + encodeURIComponent(week);
    return fetch(url, { headers: { 'X-Site-Key': SITE_KEY } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (res) { return (res && res.found) ? res.data.state : null; })
      .catch(function () { return null; });
  }

  function fetchRating(group, kid, week) {
    var url = WORKER_URL + '/rating?group=' + encodeURIComponent(group) + '&kid=' + encodeURIComponent(kid) + '&week=' + encodeURIComponent(week);
    return fetch(url, { headers: { 'X-Site-Key': SITE_KEY } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (res) { return (res && res.found) ? res.data : null; })
      .catch(function () { return null; });
  }

  function scoreBand(total, max) {
    var pct = total / max;
    if (pct >= 0.9) return 'Outstanding';
    if (pct >= 0.7) return 'Solid';
    if (pct >= 0.5) return 'Developing';
    return 'Needs support';
  }

  // Highest Bloom's level the kid has shown solid (>=60%) genuine mastery
  // of, among tagged questions for this quest — same threshold and same
  // "keep overwriting as you climb the ordered list" approach the staff
  // Feedback page uses, so a parent and a facilitator never see two
  // different answers to "how high did they reach" for the same kid.
  function bloomCeiling(bloomMap, reflect) {
    var counts = {};
    BLOOM_LEVELS.forEach(function (l) { counts[l] = { total: 0, hit: 0 }; });
    Object.keys(bloomMap).forEach(function (id) {
      var level = bloomMap[id];
      if (!counts[level]) return;
      counts[level].total++;
      if (isGenuinePass(reflect[id])) counts[level].hit++;
    });
    var ceiling = null;
    BLOOM_LEVELS.forEach(function (l) {
      if (counts[l].total && (counts[l].hit / counts[l].total) >= 0.6) ceiling = l;
    });
    return { counts: counts, ceiling: ceiling };
  }

  function bloomPyramidHtml(bloomInfo) {
    if (!bloomInfo) return '<p class="rep-no-data">Not tracked for this quest yet.</p>';
    var ceilingIdx = bloomInfo.ceiling ? BLOOM_LEVELS.indexOf(bloomInfo.ceiling) : -1;
    var rows = BLOOM_LEVELS.slice().reverse().map(function (level) {
      var idx = BLOOM_LEVELS.indexOf(level);
      var reached = idx <= ceilingIdx;
      var widthPct = 40 + idx * 15; // narrower at the top, like a pyramid
      return '<div class="bloom-tier ' + (reached ? 'reached' : '') + '" style="width:' + widthPct + '%;">' + level + '</div>';
    }).join('');
    return '<div class="bloom-pyramid">' + rows + '</div>' +
      (bloomInfo.ceiling
        ? '<p class="bloom-ceiling-label">Reached <strong>' + bloomInfo.ceiling + '</strong>-level thinking</p>'
        : '<p class="bloom-ceiling-label rep-no-data">Still building toward its first level here.</p>');
  }

  function draftClosingNotes(name, quests) {
    // Aggregate across every shown quest: overall genuine-pass rate, and
    // the single highest Bloom's ceiling reached anywhere this term.
    var totalTagged = 0, totalHit = 0;
    var highestCeilingIdx = -1;
    var anyGrowth = false;
    quests.forEach(function (q) {
      if (!q.bloomInfo) return;
      BLOOM_LEVELS.forEach(function (l) {
        var c = q.bloomInfo.counts[l];
        totalTagged += c.total;
        totalHit += c.hit;
        if (c.total && c.hit < c.total) anyGrowth = true;
      });
      if (q.bloomInfo.ceiling) {
        var idx = BLOOM_LEVELS.indexOf(q.bloomInfo.ceiling);
        if (idx > highestCeilingIdx) highestCeilingIdx = idx;
      }
    });

    var didWell, canImprove, canLearn;
    if (highestCeilingIdx >= 0) {
      var topLevel = BLOOM_LEVELS[highestCeilingIdx];
      var howLabel = topLevel === 'Remember' ? 'recalling what was taught, correctly and consistently'
        : topLevel === 'Understand' ? 'explaining ideas back in ' + name + '’s own words, not just repeating them'
        : topLevel === 'Apply' ? 'taking a rule from the reading and using it on a brand new example'
        : topLevel === 'Analyze' ? 'breaking down cause-and-effect and comparing two things correctly'
        : 'weighing evidence and judging which explanation actually holds up';
      didWell = name + ' worked all the way up to <strong>' + topLevel + '</strong>-level thinking this term — ' + howLabel + '.';
    } else {
      didWell = name + ' is building a real foundation this term, working through each quest’s reading and questions step by step.';
    }

    canImprove = anyGrowth
      ? 'A few questions took more than one attempt before really landing. That’s completely normal for self-paced work — worth a quick, low-pressure look back together at whichever quest section felt trickiest.'
      : 'Nothing stands out as a repeated sticking point right now — ' + name + ' has been getting things right without needing multiple tries.';

    var nextLevel = highestCeilingIdx >= 0 && highestCeilingIdx < BLOOM_LEVELS.length - 1
      ? BLOOM_LEVELS[highestCeilingIdx + 1]
      : 'Evaluate';
    canLearn = 'The next stretch for ' + name + ' is getting comfortable with <strong>' + nextLevel + '</strong>-level questions — the kind that ask "why does this actually work" rather than "what happened," which future quests will keep building toward.';

    return { didWell: didWell, canImprove: canImprove, canLearn: canLearn };
  }

  function renderQuestColumn(q, displayName) {
    var col = el('div', 'rep-quest-col');
    col.appendChild(el('h3', null, q.weekCfg.label));

    var rows = [
      { label: 'Completion Status', html: '<span class="rep-badge rep-badge-done">✅ Completed</span>' },
      { label: 'Time Taken', html: fmtTime(q.timeMs) },
      { label: 'Bloom’s Taxonomy', html: bloomPyramidHtml(q.bloomInfo) },
      {
        label: 'Presentation',
        html: q.rating
          ? '<span class="rep-badge rep-badge-done">' + escapeHtml(scoreBand(
              Object.keys(q.rating.scores || {}).reduce(function (sum, k) { return sum + q.rating.scores[k]; }, 0),
              Object.keys(q.rating.scores || {}).length * 4 || 20
            )) + '</span>'
          : '<span class="rep-no-data">Not yet rated</span>'
      },
      {
        label: 'Build Picture',
        html: q.weekCfg.buildPhoto
          ? '<img class="rep-build-photo" src="' + escapeHtml(q.weekCfg.buildPhoto) + '" alt="' + escapeHtml(displayName + '’s build for ' + q.weekCfg.label) + '" loading="lazy">'
          : '<span class="rep-no-data">No picture yet</span>'
      },
      { label: 'Links', html: '<a class="rep-open-link" href="' + q.weekCfg.path + '">Open Quest →</a>' }
    ];

    rows.forEach(function (r) {
      var row = el('div', 'rep-row');
      row.appendChild(el('div', 'rep-row-label', r.label));
      row.appendChild(el('div', 'rep-row-value', r.html));
      col.appendChild(row);
    });

    return col;
  }

  function render(kidKey, roster) {
    var app = document.getElementById('app');
    app.innerHTML = '<p class="rep-loading">Loading ' + escapeHtml(roster.displayName) + '’s report…</p>';

    var loaders = roster.weeks.map(function (weekCfg) {
      return Promise.all([
        fetchWeekState(weekCfg.group, kidKey, weekCfg.key),
        fetchRating(weekCfg.group, kidKey, weekCfg.key)
      ]).then(function (results) {
        var state = results[0];
        var rating = results[1];
        if (!state || !state.completed) return null; // not actually finished — leave out entirely
        var reflect = state.reflect || {};
        var timeMs = Object.keys(state.dayTime || {}).reduce(function (sum, k) { return sum + (state.dayTime[k] || 0); }, 0);
        var bloomInfo = weekCfg.bloom ? bloomCeiling(weekCfg.bloom, reflect) : null;
        return { weekCfg: weekCfg, timeMs: timeMs, bloomInfo: bloomInfo, rating: rating };
      });
    });

    Promise.all(loaders).then(function (results) {
      var quests = results.filter(Boolean);
      app.innerHTML = '';

      var header = el('div', 'rep-header');
      header.innerHTML =
        '<h1>Hello ' + escapeHtml(roster.displayName) + ', 👋</h1>' +
        '<p class="rep-sub">Here is your Term 2 Quests. You’ve completed <strong>' + quests.length + ' quest' + (quests.length === 1 ? '' : 's') + '</strong> so far this term.</p>' +
        '<p class="rep-note">These quests are self-paced — there’s no single deadline for each one, ' + escapeHtml(roster.displayName) + ' works through them at their own speed between <strong>' + TERM_START + '</strong> and <strong>' + TERM_END + '</strong>.</p>';
      app.appendChild(header);

      if (!quests.length) {
        app.appendChild(el('p', 'rep-empty', 'No quests fully completed yet — check back once ' + escapeHtml(roster.displayName) + ' finishes their first one.'));
        return;
      }

      var table = el('div', 'rep-table');
      quests.forEach(function (q) { table.appendChild(renderQuestColumn(q, roster.displayName)); });
      app.appendChild(table);

      var notes = draftClosingNotes(roster.displayName, quests);
      var notesWrap = el('div', 'rep-notes');
      notesWrap.innerHTML =
        '<div class="rep-note-block"><h4>💪 What you did well</h4><p>' + notes.didWell + '</p></div>' +
        '<div class="rep-note-block"><h4>🌱 What you can do better</h4><p>' + notes.canImprove + '</p></div>' +
        '<div class="rep-note-block"><h4>🧭 What you can learn</h4><p>' + notes.canLearn + '</p></div>';
      app.appendChild(notesWrap);

      app.appendChild(el('p', 'rep-footer-note', 'Note: Term 3 Quests will be different.'));
    });
  }

  function init() {
    var params = new URLSearchParams(window.location.search);
    var kidKey = (params.get('kid') || '').toLowerCase();
    var roster = (window.DASHBOARD_ROSTER || {})[kidKey];
    var app = document.getElementById('app');
    if (!kidKey || !roster) {
      app.innerHTML = '<p class="rep-empty">No report found for this link. Check with your facilitator for the right link.</p>';
      return;
    }
    render(kidKey, roster);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
