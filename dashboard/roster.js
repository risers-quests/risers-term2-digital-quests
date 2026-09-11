/* Dashboard roster — kid-safe routing + topic-label data only (no staff
   notes, no other kids' private info; this file ships to the public site).
   One entry per kid: which quests they have, where to sync/open each one,
   and which reading section each reflection question maps back to (so a
   Growth Area / Learning Gap item can link straight to the right place to
   revisit). Generated from each kid's own initReflectionChecks(...) config
   (id, reread.anchor, reread.label extracted directly from their own page
   — anchors are never guessed, they're pulled from the exact same reread
   link the kid's own page already uses). The "Plan before you build"
   self-review (empty keyword groups, always passes regardless of content)
   is excluded everywhere it appears — no real signal to show. */
window.DASHBOARD_ROSTER = {
  chris: {
    displayName: 'Chris',
    weeks: [
      {
        key: 'week-01', group: 'group-01', label: 'Quest 1 · Plant & Animal Cells',
        path: '../group-01-week-01-plant-animal-cell/chris/index.html',
        buildTotal: 5,
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
        key: 'week-02', group: 'group-01', label: 'Quest 2 · Atomic Structure & Periodic Table',
        path: '../group-01-week-02-atomic-structure-periodic-table/chris/index.html',
        buildTotal: 5,
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

window.DASHBOARD_ROSTER = window.DASHBOARD_ROSTER || {};
Object.assign(window.DASHBOARD_ROSTER, {
  eva: {
    displayName: 'Eva',
    weeks: [
      {
        key: 'week-01', group: 'group-00', label: 'Quest 1 · Pollination & Seed Dispersal',
        path: '../group-00-week-01-pollination-seed-dispersal/eva/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. Meet the suspects: who pollinates what, and why',
          'refl-6': '1. What pollination actually is',
          'refl-2': '2. Meet the suspects: who pollinates what, and why',
          'refl-7': '2. Meet the suspects: who pollinates what, and why',
          'refl-8': '3. From flower to seed',
          'refl-9': '3. From flower to seed',
          'refl-3': '4. Why a seed can\'t just stay put',
          'refl-10': '4. Why a seed can\'t just stay put',
          'refl-4': '5. Five ways a seed leaves the scene',
          'refl-11': '5. Five ways a seed leaves the scene'
        },
        anchors: {
          '2. Meet the suspects: who pollinates what, and why': 'sec-pollinators',
          '1. What pollination actually is': 'sec-pollination',
          '3. From flower to seed': 'sec-fromflowertoseed',
          '4. Why a seed can\'t just stay put': 'sec-whytravel',
          '5. Five ways a seed leaves the scene': 'sec-dispersal'
        }
      },      {
        key: 'week-02', group: 'group-00', label: 'Quest 2 · Solar System',
        path: '../group-00-week-02-solar-system/eva/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. The eight planets, in order',
          'refl-6': '1. The Sun is a star',
          'refl-2': '2. The eight planets, in order',
          'refl-7': '2. The eight planets, in order',
          'refl-8': '3. Gravity and orbits',
          'refl-9': '3. Gravity and orbits',
          'refl-3': '4. Spinning and days',
          'refl-10': '4. Spinning and days',
          'refl-4': '5. The Moon, asteroids, and comets',
          'refl-11': '5. The Moon, asteroids, and comets'
        },
        anchors: {
          '2. The eight planets, in order': 'sec-planets',
          '1. The Sun is a star': 'sec-sun-star',
          '3. Gravity and orbits': 'sec-orbit-year',
          '4. Spinning and days': 'sec-day-rotation',
          '5. The Moon, asteroids, and comets': 'sec-moon-asteroids'
        }
      }
    ]
  },
  gabby: {
    displayName: 'Gabby',
    weeks: [
      {
        key: 'week-01', group: 'group-00', label: 'Quest 1 · Pollination & Seed Dispersal',
        path: '../group-00-week-01-pollination-seed-dispersal/gabby/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. Who visits which flower, and why',
          'refl-6': '1. What pollination actually is',
          'refl-2': '2. Who visits which flower, and why',
          'refl-7': '2. Who visits which flower, and why',
          'refl-8': '3. From flower to seed — this is where I begin',
          'refl-9': '3. From flower to seed — this is where I begin',
          'refl-3': '4. Why I can\'t just stay put',
          'refl-10': '4. Why I can\'t just stay put',
          'refl-4': '5. Five ways I could make my journey',
          'refl-11': '5. Five ways I could make my journey'
        },
        anchors: {
          '2. Who visits which flower, and why': 'sec-pollinators',
          '1. What pollination actually is': 'sec-pollination',
          '3. From flower to seed — this is where I begin': 'sec-fromflowertoseed',
          '4. Why I can\'t just stay put': 'sec-whytravel',
          '5. Five ways I could make my journey': 'sec-dispersal'
        }
      },      {
        key: 'week-02', group: 'group-00', label: 'Quest 2 · Solar System',
        path: '../group-00-week-02-solar-system/gabby/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. The eight planets, in order',
          'refl-6': '1. The Sun is a star',
          'refl-2': '2. The eight planets, in order',
          'refl-7': '2. The eight planets, in order',
          'refl-8': '3. Gravity and orbits',
          'refl-9': '3. Gravity and orbits',
          'refl-3': '4. Spinning and days',
          'refl-10': '4. Spinning and days',
          'refl-4': '5. The Moon, asteroids, and comets',
          'refl-11': '5. The Moon, asteroids, and comets'
        },
        anchors: {
          '2. The eight planets, in order': 'sec-planets',
          '1. The Sun is a star': 'sec-sun-star',
          '3. Gravity and orbits': 'sec-orbit-year',
          '4. Spinning and days': 'sec-day-rotation',
          '5. The Moon, asteroids, and comets': 'sec-moon-asteroids'
        }
      }
    ]
  },
  elyon: {
    displayName: 'Elyon',
    weeks: [
      {
        key: 'week-01', group: 'group-00', label: 'Quest 1 · Pollination & Seed Dispersal',
        path: '../group-00-week-01-pollination-seed-dispersal/elyon/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. Nature\'s targeted designs: which flower is built for which visitor',
          'refl-6': '1. What pollination actually is',
          'refl-2': '2. Nature\'s targeted designs: which flower is built for which visitor',
          'refl-7': '2. Nature\'s targeted designs: which flower is built for which visitor',
          'refl-8': '3. From flower to seed',
          'refl-9': '3. From flower to seed',
          'refl-3': '4. The design problem every seed has to solve',
          'refl-10': '4. The design problem every seed has to solve',
          'refl-4': '5. Five real mechanisms already engineered by nature',
          'refl-11': '5. Five real mechanisms already engineered by nature'
        },
        anchors: {
          '2. Nature\'s targeted designs: which flower is built for which visitor': 'sec-pollinators',
          '1. What pollination actually is': 'sec-pollination',
          '3. From flower to seed': 'sec-fromflowertoseed',
          '4. The design problem every seed has to solve': 'sec-whytravel',
          '5. Five real mechanisms already engineered by nature': 'sec-dispersal'
        }
      },      {
        key: 'week-02', group: 'group-00', label: 'Quest 2 · Solar System',
        path: '../group-00-week-02-solar-system/elyon/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. The eight planets, in order',
          'refl-6': '1. The Sun is a star',
          'refl-2': '2. The eight planets, in order',
          'refl-7': '2. The eight planets, in order',
          'refl-8': '3. Gravity and orbits',
          'refl-9': '3. Gravity and orbits',
          'refl-3': '4. Spinning and days',
          'refl-10': '4. Spinning and days',
          'refl-4': '5. The Moon, asteroids, and comets',
          'refl-11': '5. The Moon, asteroids, and comets'
        },
        anchors: {
          '2. The eight planets, in order': 'sec-planets',
          '1. The Sun is a star': 'sec-sun-star',
          '3. Gravity and orbits': 'sec-orbit-year',
          '4. Spinning and days': 'sec-day-rotation',
          '5. The Moon, asteroids, and comets': 'sec-moon-asteroids'
        }
      }
    ]
  },
  yokesh: {
    displayName: 'Yokesh',
    weeks: [
      {
        key: 'week-01', group: 'group-01', label: 'Quest 1 · Plant & Animal Cells',
        path: '../group-01-week-01-plant-animal-cell/yokesh/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. What only a plant cell has',
          'refl-6': '1. What every cell has, no exceptions',
          'refl-2': '2. What only a plant cell has',
          'refl-7': '2. What only a plant cell has',
          'refl-3': '3. Why the differences actually matter',
          'refl-8': '3. Why the differences actually matter',
          'refl-4': '2. What only a plant cell has',
          'refl-9': 'Two cities, side by side'
        },
        anchors: {
          '2. What only a plant cell has': 'sec-plantonly',
          '1. What every cell has, no exceptions': 'sec-shared',
          '3. Why the differences actually matter': 'sec-whydiffer',
          'Two cities, side by side': 'sec-comparison'
        }
      },      {
        key: 'week-02', group: 'group-01', label: 'Quest 2 · Atomic Structure & Periodic Table',
        path: '../group-01-week-02-atomic-structure-periodic-table/yokesh/index.html',
        buildTotal: 5,
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
  },
  zach: {
    displayName: 'Zach',
    weeks: [
      {
        key: 'week-01', group: 'group-01', label: 'Quest 1 · Plant & Animal Cells',
        path: '../group-01-week-01-plant-animal-cell/zach/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '2. What only a plant cell has',
          'refl-6': '1. What every cell has, no exceptions',
          'refl-2': '2. What only a plant cell has',
          'refl-7': '2. What only a plant cell has',
          'refl-3': '3. Why the differences actually matter',
          'refl-8': '3. Why the differences actually matter',
          'refl-4': '2. What only a plant cell has',
          'refl-9': 'Two bodies, side by side'
        },
        anchors: {
          '2. What only a plant cell has': 'sec-plantonly',
          '1. What every cell has, no exceptions': 'sec-shared',
          '3. Why the differences actually matter': 'sec-whydiffer',
          'Two bodies, side by side': 'sec-comparison'
        }
      },      {
        key: 'week-02', group: 'group-01', label: 'Quest 2 · Atomic Structure & Periodic Table',
        path: '../group-01-week-02-atomic-structure-periodic-table/zach/index.html',
        buildTotal: 5,
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
  },
  owen: {
    displayName: 'Owen',
    weeks: [
      {
        key: 'week-01', group: 'group-02', label: 'Quest 1 · Skeletal & Muscular Systems',
        path: '../group-02-week-01-skeletal-muscular-systems/owen/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '1. The skeletal system',
          'refl-8': '1. The skeletal system',
          'refl-9': '1. The skeletal system',
          'refl-10': '1. The skeletal system',
          'refl-2': '2. Joints',
          'refl-11': '2. Joints',
          'refl-12': '2. Joints',
          'refl-4': '2. Joints',
          'refl-3': '3. The muscular system',
          'refl-13': '3. The muscular system',
          'refl-14': '3. The muscular system',
          'refl-15': '3. The muscular system',
          'refl-16': '4. Put together, it\'s a real lever',
          'refl-17': '4. Put together, it\'s a real lever',
          'refl-6': '4. Put together, it\'s a real lever',
          'refl-7': '4. Put together, it\'s a real lever',
          'refl-18': '4. Put together, it\'s a real lever'
        },
        anchors: {
          '1. The skeletal system': 'sec-skeleton',
          '2. Joints': 'sec-joints',
          '3. The muscular system': 'sec-muscles',
          '4. Put together, it\'s a real lever': 'sec-lever'
        }
      },      {
        key: 'week-02', group: 'group-02', label: 'Quest 2 · Soil Formation',
        path: '../group-02-week-02-soil-formation/owen/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '1. The four ingredients',
          'refl-8': '1. The four ingredients',
          'refl-9': '1. The four ingredients',
          'refl-10': '1. The four ingredients',
          'refl-2': '2. Horizons',
          'refl-11': '2. Horizons',
          'refl-12': '2. Horizons',
          'refl-3': '3. Soil texture',
          'refl-13': '3. Soil texture',
          'refl-14': '3. Soil texture',
          'refl-15': '3. Soil texture',
          'refl-16': '4. Put together',
          'refl-17': '4. Put together',
          'refl-6': '4. Put together',
          'refl-4': '2. Horizons',
          'refl-7': '4. Put together',
          'refl-18': '4. Put together'
        },
        anchors: {
          '1. The four ingredients': 'sec-composition',
          '2. Horizons': 'sec-horizons',
          '3. Soil texture': 'sec-texture',
          '4. Put together': 'sec-system'
        }
      }
    ]
  },
  pranavi: {
    displayName: 'Pranavi',
    weeks: [
      {
        key: 'week-01', group: 'group-02', label: 'Quest 1 · Skeletal & Muscular Systems',
        path: '../group-02-week-01-skeletal-muscular-systems/pranavi/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '1. The skeletal system',
          'refl-8': '1. The skeletal system',
          'refl-9': '1. The skeletal system',
          'refl-10': '1. The skeletal system',
          'refl-2': '2. Joints',
          'refl-11': '2. Joints',
          'refl-12': '2. Joints',
          'refl-4': '2. Joints',
          'refl-3': '3. The muscular system',
          'refl-13': '3. The muscular system',
          'refl-14': '3. The muscular system',
          'refl-19': '3. The muscular system',
          'refl-16': '4. Put together, it\'s a working pair',
          'refl-17': '4. Put together, it\'s a working pair',
          'refl-6': '4. Put together, it\'s a working pair',
          'refl-7': '4. Put together, it\'s a working pair',
          'refl-18': '4. Put together, it\'s a working pair'
        },
        anchors: {
          '1. The skeletal system': 'sec-skeleton',
          '2. Joints': 'sec-joints',
          '3. The muscular system': 'sec-muscles',
          '4. Put together, it\'s a working pair': 'sec-lever'
        }
      },      {
        key: 'week-02', group: 'group-02', label: 'Quest 2 · Soil Formation',
        path: '../group-02-week-02-soil-formation/pranavi/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': '1. The four ingredients',
          'refl-8': '1. The four ingredients',
          'refl-9': '1. The four ingredients',
          'refl-10': '1. The four ingredients',
          'refl-2': '2. Horizons',
          'refl-11': '2. Horizons',
          'refl-12': '2. Horizons',
          'refl-3': '3. Soil texture',
          'refl-13': '3. Soil texture',
          'refl-14': '3. Soil texture',
          'refl-19': '3. Soil texture',
          'refl-16': '4. Put together',
          'refl-17': '4. Put together',
          'refl-6': '4. Put together',
          'refl-4': '2. Horizons',
          'refl-7': '4. Put together',
          'refl-18': '4. Put together'
        },
        anchors: {
          '1. The four ingredients': 'sec-composition',
          '2. Horizons': 'sec-horizons',
          '3. Soil texture': 'sec-texture',
          '4. Put together': 'sec-system'
        }
      }
    ]
  },
  shalom: {
    displayName: 'Shalom',
    weeks: [
      {
        key: 'week-01', group: 'group-03', label: 'Quest 1 · Immune System',
        path: '../group-03-week-01-immune-system/shalom/index.html',
        buildTotal: 5,
        topics: {
          'refl-6': '1. The threat',
          'refl-7': '1. The threat',
          'refl-8': '1. The threat',
          'refl-9': '1. The threat',
          'refl-2': '2. Line one: barriers',
          'refl-10': '2. Line one: barriers',
          'refl-11': '2. Line one: barriers',
          'refl-12': '2. Line one: barriers',
          'refl-3': '3. Line two: phagocytes',
          'refl-13': '3. Line two: phagocytes',
          'refl-14': '3. Line two: phagocytes',
          'refl-15': '3. Line two: phagocytes',
          'refl-4': '4. Line three: lymphocytes and antibodies',
          'refl-16': '4. Line three: lymphocytes and antibodies',
          'refl-17': '4. Line three: lymphocytes and antibodies',
          'refl-18': '4. Line three: lymphocytes and antibodies',
          'refl-1': '5. Vaccines, immunity & the numbers behind command decisions',
          'refl-19': '5. Vaccines, immunity & the numbers behind command decisions',
          'refl-20': '5. Vaccines, immunity & the numbers behind command decisions',
          'refl-21': '5. Vaccines, immunity & the numbers behind command decisions'
        },
        anchors: {
          '1. The threat': 'sec-pathogens',
          '2. Line one: barriers': 'sec-barriers',
          '3. Line two: phagocytes': 'sec-phagocytes',
          '4. Line three: lymphocytes and antibodies': 'sec-antibodies',
          '5. Vaccines, immunity & the numbers behind command decisions': 'sec-vaccines'
        }
      },      {
        key: 'week-02', group: 'group-03', label: 'Quest 2 · Space & Gravity Concepts',
        path: '../group-03-week-02-space-gravity-concepts/shalom/index.html',
        buildTotal: 5,
        topics: {
          'refl-b1': 'Day 2 build',
          'refl-d1': 'Day 1 · Leg 1',
          'refl-d2': 'Day 1 · Leg 4',
          'refl-d3': 'Day 1'
        },
        anchors: {
          'Day 2 build': 'day2',
          'Day 1 · Leg 1': 'day1',
          'Day 1 · Leg 4': 'day1',
          'Day 1': 'day1'
        }
      }
    ]
  },
  michael: {
    displayName: 'Michael',
    weeks: [
      {
        key: 'week-01', group: 'group-03', label: 'Quest 1 · Immune System',
        path: '../group-03-week-01-immune-system/michael/index.html',
        buildTotal: 5,
        topics: {
          'refl-6': '1. The threat',
          'refl-7': '1. The threat',
          'refl-8': '1. The threat',
          'refl-9': '1. The threat',
          'refl-2': '2. Line one: barriers',
          'refl-10': '2. Line one: barriers',
          'refl-11': '2. Line one: barriers',
          'refl-12': '2. Line one: barriers',
          'refl-3': '3. Line two: phagocytes',
          'refl-13': '3. Line two: phagocytes',
          'refl-14': '3. Line two: phagocytes',
          'refl-15': '3. Line two: phagocytes',
          'refl-4': '4. Line three: lymphocytes and antibodies',
          'refl-16': '4. Line three: lymphocytes and antibodies',
          'refl-17': '4. Line three: lymphocytes and antibodies',
          'refl-18': '4. Line three: lymphocytes and antibodies',
          'refl-1': '5. The real number every budget line depends on',
          'refl-19': '5. The real number every budget line depends on',
          'refl-20': '5. The real number every budget line depends on',
          'refl-21': '5. The real number every budget line depends on'
        },
        anchors: {
          '1. The threat': 'sec-pathogens',
          '2. Line one: barriers': 'sec-barriers',
          '3. Line two: phagocytes': 'sec-phagocytes',
          '4. Line three: lymphocytes and antibodies': 'sec-antibodies',
          '5. The real number every budget line depends on': 'sec-vaccines'
        }
      },      {
        key: 'week-02', group: 'group-03', label: 'Quest 2 · Space & Gravity Concepts',
        path: '../group-03-week-02-space-gravity-concepts/michael/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': 'Part 1 · Mass and weight',
          'refl-1b': 'Part 1 · Mass and weight',
          'refl-2': 'Part 1 · Why a satellite doesn’t just fall',
          'refl-2b': 'Part 1 · Why a satellite doesn’t just fall',
          'refl-3': 'Part 2 · Escape velocity',
          'refl-3b': 'Part 2 · Escape velocity',
          'refl-4': 'Part 2 · Free fall under real gravity',
          'refl-4b': 'Part 2 · Free fall under real gravity',
          'refl-b1': 'Part 4 build',
          'refl-d1': 'Part 3 · Leg 1',
          'refl-d2': 'Part 3 · Leg 4',
          'refl-d3': 'Part 3'
        },
        anchors: {
          'Part 1 · Mass and weight': 'sec-1',
          'Part 1 · Why a satellite doesn’t just fall': 'sec-2',
          'Part 2 · Escape velocity': 'sec-3',
          'Part 2 · Free fall under real gravity': 'sec-4',
          'Part 4 build': 'day4',
          'Part 3 · Leg 1': 'day3',
          'Part 3 · Leg 4': 'day3',
          'Part 3': 'day3'
        }
      }
    ]
  },
  karis: {
    displayName: 'Karis',
    weeks: [
      {
        key: 'week-01', group: 'group-03', label: 'Quest 1 · Immune System',
        path: '../group-03-week-01-immune-system/karis/index.html',
        buildTotal: 5,
        topics: {
          'refl-6': '1. The four kinds of patient you\'ll see',
          'refl-7': '1. The four kinds of patient you\'ll see',
          'refl-8': '1. The four kinds of patient you\'ll see',
          'refl-9': '1. The four kinds of patient you\'ll see',
          'refl-2': '2. Line one: barriers',
          'refl-10': '2. Line one: barriers',
          'refl-11': '2. Line one: barriers',
          'refl-12': '2. Line one: barriers',
          'refl-3': '3. Line two: phagocytes',
          'refl-13': '3. Line two: phagocytes',
          'refl-14': '3. Line two: phagocytes',
          'refl-15': '3. Line two: phagocytes',
          'refl-4': '4. Line three: lymphocytes and antibodies',
          'refl-16': '4. Line three: lymphocytes and antibodies',
          'refl-17': '4. Line three: lymphocytes and antibodies',
          'refl-18': '4. Line three: lymphocytes and antibodies',
          'refl-1': '5. Why the antibiotic decision is the one that actually matters',
          'refl-19': '5. Why the antibiotic decision is the one that actually matters',
          'refl-20': '5. Why the antibiotic decision is the one that actually matters',
          'refl-21': '5. Why the antibiotic decision is the one that actually matters'
        },
        anchors: {
          '1. The four kinds of patient you\'ll see': 'sec-pathogens',
          '2. Line one: barriers': 'sec-barriers',
          '3. Line two: phagocytes': 'sec-phagocytes',
          '4. Line three: lymphocytes and antibodies': 'sec-antibodies',
          '5. Why the antibiotic decision is the one that actually matters': 'sec-vaccines'
        }
      },      {
        key: 'week-02', group: 'group-03', label: 'Quest 2 · Space & Gravity Concepts',
        path: '../group-03-week-02-space-gravity-concepts/karis/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': 'Part 1 · Mass and weight',
          'refl-1b': 'Part 1 · Mass and weight',
          'refl-2': 'Part 1 · Why a satellite doesn’t just fall',
          'refl-2b': 'Part 1 · Why a satellite doesn’t just fall',
          'refl-3': 'Part 2 · Escape velocity',
          'refl-3b': 'Part 2 · Escape velocity',
          'refl-4': 'Part 2 · Free fall under real gravity',
          'refl-4b': 'Part 2 · Free fall under real gravity',
          'refl-b1': 'Part 4 build',
          'refl-d1': 'Part 3 · Leg 1',
          'refl-d2': 'Part 3 · Leg 4',
          'refl-d3': 'Part 3'
        },
        anchors: {
          'Part 1 · Mass and weight': 'sec-1',
          'Part 1 · Why a satellite doesn’t just fall': 'sec-2',
          'Part 2 · Escape velocity': 'sec-3',
          'Part 2 · Free fall under real gravity': 'sec-4',
          'Part 4 build': 'day4',
          'Part 3 · Leg 1': 'day3',
          'Part 3 · Leg 4': 'day3',
          'Part 3': 'day3'
        }
      }
    ]
  },
  benjamin: {
    displayName: 'Benjamin',
    weeks: [
      {
        key: 'week-01', group: 'group-04', label: 'Quest 1 · Circulatory System',
        path: '../group-04-week-01-circulatory-system/benjamin/index.html',
        buildTotal: 6,
        topics: {
          'refl-1': '1. The heart\'s four rooms',
          'refl-2': '2. One-way gates: the valves',
          'refl-9': '3. The pump\'s own conductor',
          'refl-3': '4. Three kinds of road',
          'refl-10': '5. The named routes',
          'refl-4': '6. Double circulation',
          'refl-5': '7. The parallel network: lymph',
          'refl-6': '8. Blood groups: the ABO system',
          'refl-7': '8. Blood groups: the ABO system',
          'refl-8': '9. Know your heart: what\'s worth watching for',
          'refl-12': '6. Double circulation',
          'refl-13': '9. Know your heart: what\'s worth watching for'
        },
        anchors: {
          '1. The heart\'s four rooms': 'sec-chambers',
          '2. One-way gates: the valves': 'sec-valves',
          '3. The pump\'s own conductor': 'sec-pacemaker',
          '4. Three kinds of road': 'sec-vessels',
          '5. The named routes': 'sec-namedvessels',
          '6. Double circulation': 'sec-circulation',
          '7. The parallel network: lymph': 'sec-lymph',
          '8. Blood groups: the ABO system': 'sec-bloodgroups',
          '9. Know your heart: what\'s worth watching for': 'sec-conditions'
        }
      },      {
        key: 'week-02', group: 'group-04', label: 'Quest 2 · Space Physics Connection',
        path: '../group-04-week-02-space-physics-connection/benjamin/index.html',
        buildTotal: 5,
        topics: {
          'refl-1': 'Part 1 · What gravity actually is',
          'refl-1b': 'Part 1 · What gravity actually is',
          'refl-2': 'Part 1 · Why distance matters so much',
          'refl-2b': 'Part 1 · Why distance matters so much',
          'refl-3': 'Part 2 · Newton\'s second law',
          'refl-3b': 'Part 2 · Newton\'s second law',
          'refl-4': 'Part 2 · Orbital velocity',
          'refl-4b': 'Part 2 · Orbital velocity',
          'refl-5': 'Part 3 · Escape velocity',
          'refl-5b': 'Part 3 · Escape velocity',
          'refl-6': 'Part 3 · Free fall under real gravity',
          'refl-6b': 'Part 3 · Free fall under real gravity',
          'refl-b1': 'Part 5 build',
          'refl-d1': 'Part 4 · Leg 1',
          'refl-d2': 'Part 4 · Leg 4',
          'refl-d3': 'Part 4'
        },
        anchors: {
          'Part 1 · What gravity actually is': 'sec-1',
          'Part 1 · Why distance matters so much': 'sec-2',
          'Part 2 · Newton\'s second law': 'sec-3',
          'Part 2 · Orbital velocity': 'sec-4',
          'Part 3 · Escape velocity': 'sec-5',
          'Part 3 · Free fall under real gravity': 'sec-6',
          'Part 5 build': 'day5',
          'Part 4 · Leg 1': 'day4',
          'Part 4 · Leg 4': 'day4',
          'Part 4': 'day4'
        }
      }
    ]
  }
});
