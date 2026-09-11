/* My Quests dashboard — a kid-facing home base, separate from the staff
   Feedback page. Shows progress only (percent complete, what's done),
   plus a rule-based "strengths / work on" summary computed straight from
   the same synced answer data the staff portal reads — no facilitator
   commentary, no ratings, nothing qualitative a human wrote about them.
   Fully static: reads directly from the Worker's /sync endpoint (the
   same one every quest page already POSTs progress to), no build step.

   Scoring a single reflection question's synced state:
     'not-started' — kid never reached/attempted it
     'needs-work'  — attempted but not yet correct, needed a facilitator
                     pass, or the writing check flagged something
     'ok'          — passed, but took a few tries or needed to rephrase
                     in their own words (the meaning-check fallback)
     'strong'      — passed clean, on the first try, no flags
   These roll up per reading-section topic to build the strengths/work-on
   lists — a topic is a strength only if EVERY question tied to it was
   strong; it's a "work on" candidate if ANY question tied to it needs
   work, ranked by how many. */
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
    if (!refl.success) return 'needs-work';
    if (refl.contentFlagged || refl.langFlagged) return 'needs-work';
    if (refl.attempts <= 1 && !refl.meaningPassed) return 'strong';
    return 'ok';
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
      if (s === 'strong' || s === 'ok') doneCount++;
    });
    var totalQuestions = topicKeys.length;
    var pct = totalQuestions ? Math.round((doneCount / totalQuestions) * 100) : 0;

    // Roll scores up per topic label.
    var byTopic = {};
    topicKeys.forEach(function (rid) {
      var label = weekCfg.topics[rid];
      if (!byTopic[label]) byTopic[label] = { strong: 0, ok: 0, needsWork: 0, notStarted: 0, total: 0 };
      var t = byTopic[label];
      t.total++;
      if (scores[rid] === 'strong') t.strong++;
      else if (scores[rid] === 'ok') t.ok++;
      else if (scores[rid] === 'needs-work') t.needsWork++;
      else t.notStarted++;
    });

    var strengths = [], workOn = [];
    Object.keys(byTopic).forEach(function (label) {
      var t = byTopic[label];
      if (t.strong === t.total) strengths.push(label);
      else if (t.needsWork > 0) workOn.push({ label: label, count: t.needsWork, anchor: weekCfg.anchors[label] });
    });
    workOn.sort(function (a, b) { return b.count - a.count; });

    var status = 'not-started';
    if (state && state.completed) status = 'completed';
    else if (doneCount > 0 || (state && state.build && Object.keys(state.build).length)) status = 'in-progress';

    return { pct: pct, doneCount: doneCount, totalQuestions: totalQuestions, status: status, strengths: strengths, workOn: workOn };
  }

  function statusBadge(status) {
    if (status === 'completed') return { text: '✅ Completed', cls: 'status-done' };
    if (status === 'in-progress') return { text: '🚧 In progress', cls: 'status-progress' };
    return { text: '⬜ Not started', cls: 'status-new' };
  }

  function renderDashboard(kidKey, roster) {
    var app = document.getElementById('app');
    app.innerHTML = '';

    var header = el('div', 'dash-header');
    header.innerHTML =
      '<h1>Hi, ' + roster.displayName + '! 👋</h1>' +
      '<p class="dash-sub">Here’s where you left off, and what to look at next.</p>';
    app.appendChild(header);

    var questsWrap = el('div', 'dash-section');
    questsWrap.appendChild(el('h2', null, 'Your Quests'));
    var grid = el('div', 'quest-grid');
    questsWrap.appendChild(grid);
    app.appendChild(questsWrap);

    var allStrengths = [];
    var allWorkOn = [];

    var loads = roster.weeks.map(function (weekCfg) {
      return fetchWeekState(weekCfg.group, kidKey, weekCfg.key).then(function (state) {
        var summary = summarizeWeek(weekCfg, state);
        var badge = statusBadge(summary.status);

        var card = el('div', 'quest-card');
        card.innerHTML =
          '<div class="quest-card-top">' +
          '<span class="quest-badge ' + badge.cls + '">' + badge.text + '</span>' +
          '</div>' +
          '<h3>' + weekCfg.label + '</h3>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + summary.pct + '%"></div></div>' +
          '<div class="quest-pct">' + summary.pct + '% complete · ' + summary.doneCount + ' of ' + summary.totalQuestions + ' questions</div>' +
          '<a class="quest-open-btn" href="' + weekCfg.path + '">Open Quest →</a>';
        grid.appendChild(card);

        summary.strengths.forEach(function (label) { allStrengths.push({ label: label, week: weekCfg.label }); });
        summary.workOn.forEach(function (w) {
          allWorkOn.push({ label: w.label, count: w.count, week: weekCfg.label, path: weekCfg.path, anchor: w.anchor });
        });
      });
    });

    Promise.all(loads).then(function () {
      var cols = el('div', 'dash-columns');

      var strengthCol = el('div', 'dash-col');
      strengthCol.appendChild(el('h2', null, '💪 Strengths'));
      if (allStrengths.length) {
        var sList = el('ul', 'summary-list');
        allStrengths.forEach(function (s) {
          sList.appendChild(el('li', null, '<strong>' + s.label + '</strong> <span class="summary-week">' + s.week + '</span>'));
        });
        strengthCol.appendChild(sList);
      } else {
        strengthCol.appendChild(el('p', 'summary-empty', 'Keep going — your strong topics will show up here once you’ve passed a few questions cleanly.'));
      }
      cols.appendChild(strengthCol);

      var workCol = el('div', 'dash-col');
      workCol.appendChild(el('h2', null, '🔍 Work On'));
      if (allWorkOn.length) {
        var wList = el('ul', 'summary-list');
        allWorkOn.forEach(function (w) {
          var link = w.anchor ? w.path + '#' + w.anchor : w.path;
          wList.appendChild(el('li', null,
            '<strong>' + w.label + '</strong> <span class="summary-week">' + w.week + '</span>' +
            '<a class="summary-link" href="' + link + '">Review this section →</a>'));
        });
        workCol.appendChild(wList);
      } else {
        workCol.appendChild(el('p', 'summary-empty', 'Nothing flagged right now — nice work!'));
      }
      cols.appendChild(workCol);

      app.appendChild(cols);
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
