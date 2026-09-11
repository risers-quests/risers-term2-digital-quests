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
  var SITE_KEY = 'RsmI8VwuJZ-IIieNmVss5JyChP2nf7y8mVYU5ReJLYM';
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

  // Returns { ok, state }. ok:false means the fetch itself failed or the
  // Worker rejected it (wrong/missing site key, network error, etc.) — a
  // real problem, NOT the same as ok:true/state:null, which means the
  // Worker was reached fine and genuinely has no synced record yet (kid
  // hasn't started). Conflating those two was the original bug here: a
  // failed fetch silently rendered identically to "not started."
  function fetchWeekState(group, kid, week) {
    var url = WORKER_URL + '/sync?group=' + encodeURIComponent(group) + '&kid=' + encodeURIComponent(kid) + '&week=' + encodeURIComponent(week);
    return fetch(url, { headers: { 'X-Site-Key': SITE_KEY } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('http ' + r.status)); })
      .then(function (res) { return { ok: true, state: (res && res.found) ? res.data.state : null }; })
      .catch(function () { return { ok: false, state: null }; });
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

  // Deliberately doesn't reuse the word "complete" here — that word is
  // reserved for the verified-questions percentage below it. This badge
  // is a different signal: did they reach the end of the quest at all,
  // regardless of whether every question along the way was verified.
  // Using "complete" for both was exactly what read as contradictory
  // ("Completed" next to "70% complete").
  function statusBadge(status) {
    if (status === 'completed') return { text: '🏁 Finished Quest', cls: 'status-done' };
    if (status === 'in-progress') return { text: '🚧 In Progress', cls: 'status-progress' };
    return { text: '⬜ Not Started', cls: 'status-new' };
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

  function renderWeekBlock(weekCfg, summary, loadOk) {
    var block = el('div', 'week-block');

    if (!loadOk) {
      // The Worker request itself failed (network hiccup, site-key
      // rejected, etc.) — NOT the same as a genuine "not started" record,
      // and must never be shown as one. Say so plainly instead of quietly
      // rendering 0%/Not started, which would misrepresent real progress
      // as if it never happened.
      var errCard = el('div', 'quest-card load-error');
      errCard.innerHTML =
        '<h3>' + weekCfg.label + '</h3>' +
        '<p class="load-error-msg">⚠️ Couldn’t load your progress for this quest right now. ' +
        'Your work is safe — this is just a loading hiccup. Try refreshing the page.</p>' +
        '<a class="quest-open-btn" href="' + weekCfg.path + '">Open Quest →</a>';
      block.appendChild(errCard);
      return block;
    }

    var badge = statusBadge(summary.status);

    var card = el('div', 'quest-card');
    card.innerHTML =
      '<div class="quest-card-top">' +
      '<span class="quest-badge ' + badge.cls + '">' + badge.text + '</span>' +
      '</div>' +
      '<h3>' + weekCfg.label + '</h3>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + summary.pct + '%"></div></div>' +
      '<div class="quest-pct">' + summary.pct + '% verified · ' + summary.doneCount + ' of ' + summary.totalQuestions + ' questions confirmed</div>' +
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
      '<a href="#" id="logout-link" class="switch-kid-link">Log out</a>' +
      '<h1>Hi, ' + roster.displayName + '! 👋</h1>' +
      '<p class="dash-sub">Here’s where you left off, and what to look at next.</p>';
    app.appendChild(header);

    document.getElementById('logout-link').addEventListener('click', function (e) {
      e.preventDefault();
      try { localStorage.removeItem(KID_KEY); } catch (err) {}
      init();
    });

    app.appendChild(el('h2', 'dash-section-title', 'Your Quests'));
    var weeksWrap = el('div', 'dash-section');
    app.appendChild(weeksWrap);

    var loaders = roster.weeks.map(function (weekCfg) {
      return fetchWeekState(weekCfg.group, kidKey, weekCfg.key).then(function (result) {
        return { weekCfg: weekCfg, loadOk: result.ok, summary: summarizeWeek(weekCfg, result.state) };
      });
    });

    Promise.all(loaders).then(function (results) {
      results.forEach(function (r) {
        weeksWrap.appendChild(renderWeekBlock(r.weekCfg, r.summary, r.loadOk));
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
