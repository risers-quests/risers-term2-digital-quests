/* My Quests dashboard — a kid-facing home base, separate from the staff
   Feedback page. Shows progress only (percent complete, what's done),
   plus a rule-based per-week summary computed straight from the same
   synced answer data the staff portal reads — no facilitator commentary,
   no ratings, nothing qualitative a human wrote about them. Fully static:
   reads directly from the Worker's /sync endpoint (the same one every
   quest page already POSTs progress to), no build step.

   Scoring a single reflection question's synced state:
     'not-started' — kid never reached/attempted it. Excluded from every
                     bucket below — it's neither a strength nor a gap,
                     just not reached yet, and the progress bar/count
                     already shows that plainly.
     'gap'         — ATTEMPTED, but the check never actually confirmed
                     understanding: either they never got it right on
                     their own, or a facilitator had to manually override
                     the check (state.contentFlagged) to move them past
                     it. Either way, nothing here verified they get it.
     'growth'      — ATTEMPTED and genuinely succeeded through the real
                     check — but it took a few tries, or they had to
                     rephrase in their own words (the meaning-check
                     fallback), or the writing itself got flagged. Real
                     understanding shown, just with some friction.
     'strong'      — passed clean, on the first try, no flags.
   These roll up per reading-section topic into three per-week buckets —
   deliberately NOT called "weaknesses": these are self-paced quests, so
   "struggled but got there" and "attempted but still doesn't show
   understanding" are different, non-judgmental states, not one bucket:
     Strengths     — every attempted question tied to that topic was
                     strong (untouched questions don't disqualify it —
                     what's been done so far was clean).
     Growth Areas  — no gap-tier question in this topic, but at least one
                     'growth'-tier question — real success, took effort.
     Learning Gaps — at least one question tied to this topic was
                     attempted without the check ever confirming they
                     understood it. This is the one that actually needs
                     another look, ranked by how many.
   Priority when a topic has a mix: any Learning Gap outranks a Growth
   Area, which outranks calling it a pure Strength. A topic with nothing
   but not-started questions doesn't appear in any bucket. */
(function () {
  var WORKER_URL = 'https://risers-term2-digital-quests-progress.highergrade.workers.dev';
  var KID_KEY = 'imm-l3-kid';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function scoreReflect(refl) {
    if (!refl || (refl.attempts === 0 && !refl.text)) return 'not-started';
    if (!refl.success || refl.contentFlagged) return 'gap';
    if (refl.attempts <= 1 && !refl.langFlagged && !refl.meaningPassed) return 'strong';
    return 'growth';
  }

  function fetchWeekState(group, kid, week) {
    var url = WORKER_URL + '/sync?group=' + encodeURIComponent(group) + '&kid=' + encodeURIComponent(kid) + '&week=' + encodeURIComponent(week);
    return fetch(url)
      .then(function (r) { return r.ok ? r.json() : { found: false }; })
      .then(function (res) { return res && res.found ? res.data.state : null; })
      .catch(function () { return null; });
  }

  function summarizeWeek(weekCfg, state) {
    var topicKeys = Object.keys(weekCfg.topics);
    var reflect = (state && state.reflect) || {};
    var scores = {};
    var doneCount = 0;
    topicKeys.forEach(function (rid) {
      var s = scoreReflect(reflect[rid]);
      scores[rid] = s;
      if (s === 'strong' || s === 'growth') doneCount++;
    });
    var totalQuestions = topicKeys.length;
    var pct = totalQuestions ? Math.round((doneCount / totalQuestions) * 100) : 0;

    // Roll scores up per topic label.
    var byTopic = {};
    topicKeys.forEach(function (rid) {
      var label = weekCfg.topics[rid];
      if (!byTopic[label]) byTopic[label] = { strong: 0, growth: 0, gap: 0, notStarted: 0, total: 0 };
      var t = byTopic[label];
      t.total++;
      if (scores[rid] === 'strong') t.strong++;
      else if (scores[rid] === 'growth') t.growth++;
      else if (scores[rid] === 'gap') t.gap++;
      else t.notStarted++;
    });

    var strengths = [], growthAreas = [], learningGaps = [];
    Object.keys(byTopic).forEach(function (label) {
      var t = byTopic[label];
      if (t.gap > 0) {
        learningGaps.push({ label: label, count: t.gap, anchor: weekCfg.anchors[label] });
      } else if (t.growth > 0) {
        growthAreas.push({ label: label, count: t.growth, anchor: weekCfg.anchors[label] });
      } else if (t.strong > 0) {
        strengths.push(label);
      }
      // else: nothing in this topic has been attempted at all — no
      // callout either way, the progress bar already shows that.
    });
    learningGaps.sort(function (a, b) { return b.count - a.count; });
    growthAreas.sort(function (a, b) { return b.count - a.count; });

    var status = 'not-started';
    if (state && state.completed) status = 'completed';
    else if (doneCount > 0 || (state && state.build && Object.keys(state.build).length)) status = 'in-progress';

    return {
      pct: pct, doneCount: doneCount, totalQuestions: totalQuestions, status: status,
      strengths: strengths, growthAreas: growthAreas, learningGaps: learningGaps
    };
  }

  function statusBadge(status) {
    if (status === 'completed') return { text: '✅ Completed', cls: 'status-done' };
    if (status === 'in-progress') return { text: '🚧 In progress', cls: 'status-progress' };
    return { text: '⬜ Not started', cls: 'status-new' };
  }

  function renderSummaryColumn(icon, title, items, emptyText, renderItem) {
    var col = el('div', 'dash-col');
    col.appendChild(el('h4', null, icon + ' ' + title));
    if (items.length) {
      var list = el('ul', 'summary-list');
      items.forEach(function (item) { list.appendChild(el('li', null, renderItem(item))); });
      col.appendChild(list);
    } else {
      col.appendChild(el('p', 'summary-empty', emptyText));
    }
    return col;
  }

  function renderWeekBlock(weekCfg, summary) {
    var badge = statusBadge(summary.status);
    var block = el('div', 'week-block');

    var card = el('div', 'quest-card');
    card.innerHTML =
      '<div class="quest-card-top">' +
      '<span class="quest-badge ' + badge.cls + '">' + badge.text + '</span>' +
      '</div>' +
      '<h3>' + weekCfg.label + '</h3>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + summary.pct + '%"></div></div>' +
      '<div class="quest-pct">' + summary.pct + '% complete · ' + summary.doneCount + ' of ' + summary.totalQuestions + ' questions</div>' +
      '<a class="quest-open-btn" href="' + weekCfg.path + '">Open Quest →</a>';
    block.appendChild(card);

    var cols = el('div', 'dash-columns');
    cols.appendChild(renderSummaryColumn(
      '💪', 'Strengths', summary.strengths,
      'Keep going — your strong topics will show up here once you’ve passed a few questions cleanly.',
      function (label) { return '<strong>' + label + '</strong>'; }
    ));
    cols.appendChild(renderSummaryColumn(
      '🌱', 'Growth Areas', summary.growthAreas,
      'Nothing flagged right now.',
      function (w) {
        var link = w.anchor ? weekCfg.path + '#' + w.anchor : weekCfg.path;
        return '<strong>' + w.label + '</strong><a class="summary-link" href="' + link + '">Review this section →</a>';
      }
    ));
    cols.appendChild(renderSummaryColumn(
      '🧭', 'Learning Gaps', summary.learningGaps,
      'Nothing here yet — this fills in if a question doesn’t quite land after an attempt.',
      function (g) {
        var link = g.anchor ? weekCfg.path + '#' + g.anchor : weekCfg.path;
        return '<strong>' + g.label + '</strong><a class="summary-link" href="' + link + '">Go over this section again →</a>';
      }
    ));
    block.appendChild(cols);

    return block;
  }

  function renderDashboard(kidKey, roster) {
    var app = document.getElementById('app');
    app.innerHTML = '';

    var header = el('div', 'dash-header');
    header.innerHTML =
      '<h1>Hi, ' + roster.displayName + '! 👋</h1>' +
      '<p class="dash-sub">Here’s where you left off, and what to look at next.</p>';
    app.appendChild(header);

    app.appendChild(el('h2', 'dash-section-title', 'Your Quests'));
    var weeksWrap = el('div', 'dash-section');
    app.appendChild(weeksWrap);

    var loaders = roster.weeks.map(function (weekCfg) {
      return fetchWeekState(weekCfg.group, kidKey, weekCfg.key).then(function (state) {
        return { weekCfg: weekCfg, summary: summarizeWeek(weekCfg, state) };
      });
    });

    Promise.all(loaders).then(function (results) {
      results.forEach(function (r) {
        weeksWrap.appendChild(renderWeekBlock(r.weekCfg, r.summary));
      });
    });
  }

  function showGate(roster) {
    var app = document.getElementById('app');
    app.innerHTML = '';
    var gate = el('div', 'name-gate');
    gate.innerHTML =
      '<h1>My Quests</h1>' +
      '<p>Type your name to see your quests.</p>' +
      '<input type="text" id="gate-name-input" placeholder="Your name" autocomplete="off">' +
      '<button type="button" class="btn btn-primary" id="gate-go-btn">Go →</button>' +
      '<div class="gate-msg" id="gate-msg"></div>';
    app.appendChild(gate);

    var input = document.getElementById('gate-name-input');
    var msg = document.getElementById('gate-msg');
    function tryEnter() {
      var name = (input.value || '').trim().toLowerCase();
      if (!name) return;
      if (!roster[name]) {
        msg.textContent = 'Hmm, that name isn’t set up yet — check with your facilitator.';
        return;
      }
      try { localStorage.setItem(KID_KEY, name); } catch (e) {}
      renderDashboard(name, roster[name]);
    }
    document.getElementById('gate-go-btn').addEventListener('click', tryEnter);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryEnter(); });
    input.focus();
  }

  function init() {
    var roster = window.DASHBOARD_ROSTER || {};
    var kid = null;
    try { kid = (localStorage.getItem(KID_KEY) || '').toLowerCase(); } catch (e) {}
    if (kid && roster[kid]) {
      renderDashboard(kid, roster[kid]);
    } else {
      showGate(roster);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
