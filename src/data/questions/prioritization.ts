import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: senior (senior bar:
// explicit weighted-scoring framework + a scoring table, defend the cut under
// stakeholder pushback, sequence the uncertain bet behind a cheap pilot).

export const prioritizationQuestions: Question[] = [
  {
    slug: 'three-features-one-quarter-pick-and-defend',
    archetype: 'prioritization',
    vertical: 'ecommerce',
    difficulty: 'senior',
    framework: 'Weighted scoring (RICE-adapted: Impact, Confidence, Effort/time-to-impact, Durability)',
    prompt:
      "You've got three features and one quarter of engineering capacity. Pick which to build, and defend it.",
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Clarify the goal, the options, and the constraint',
        body: `Before I pick, I need the goal the quarter is serving and what the three features actually are.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: "What's the company goal this quarter? Growth, retention, margin? Prioritisation is meaningless without the objective it serves.",
          },
          {
            speaker: 'interviewer',
            text: "We're a mid-size fashion ecommerce app. The goal this quarter is improving repeat purchase rate. Retention is the priority.",
          },
          {
            speaker: 'candidate',
            text: "Good, so I'll judge features by their effect on getting existing buyers to come back, not on new-user acquisition. What are the three options?",
          },
          {
            speaker: 'interviewer',
            text: 'One: a personalised recommendations feed. Two: faster, cheaper returns. Three: a loyalty and rewards programme.',
          },
          {
            speaker: 'candidate',
            text: 'And the constraint is one quarter of capacity total, so realistically one big feature or two small ones, and partial scoping is allowed?',
          },
          {
            speaker: 'interviewer',
            text: 'One big or two small. Partial scoping is fine.',
          },
        ],
        moveToNotice:
          "I anchor on the quarter's actual goal, retention, before touching the options. The same three features rank completely differently under growth versus retention, so the objective is the real input.",
      },
      {
        heading: 'Criteria and weighting (make the framework explicit)',
        body: `I'll prioritise on an explicit weighted score rather than a gut ranking, a RICE-style scorecard adapted to a retention goal. Reach is roughly common across the three (they all touch existing buyers), so the criteria that discriminate are:

- **Impact on repeat purchase** (weighted highest): how directly does it bring an existing buyer back?
- **Confidence:** do we have evidence it works, or is it a guess?
- **Effort and time-to-impact:** can it ship and show effect inside the quarter?
- **Durability:** a one-time bump, or a compounding effect?

Impact and time-to-impact carry the most weight here, because the goal is retention and the clock is one quarter. Stating the weights out loud is what makes the pick defensible rather than a preference: I'm choosing the highest impact × confidence per unit effort that fits the timebox.`,
      },
      {
        heading: 'Evaluate the options against the scorecard',
        body: `Scoring each against the weighted criteria:`,
        table: {
          headers: [
            'Option',
            'Impact on repeat purchase',
            'Confidence',
            'Effort / time-to-impact',
            'Durability',
            'Verdict',
          ],
          rows: [
            [
              'Faster, cheaper returns',
              'High (fit is uncertain in fashion; easy returns lower the risk of rebuying)',
              'High (well-evidenced category lever)',
              'Moderate, ships this quarter',
              'Compounding',
              'Build now',
            ],
            [
              'Personalised recommendations',
              'Medium-high but uncertain without good data',
              'Lower (needs tuning to work)',
              'High, slow to mature',
              'Compounding',
              'Pilot only',
            ],
            [
              'Loyalty / rewards programme',
              'Medium-high',
              'Medium (easy to reward inevitable buyers)',
              'Highest build, slow to prove',
              'Durable but margin-risky',
              'Defer',
            ],
          ],
        },
      },
      {
        heading: 'Pick and sequence',
        body: `My pick: **build faster, cheaper returns this quarter, and scope a small recommendations pilot alongside it if capacity allows.**

Returns wins because in fashion it's the most direct, best-evidenced retention lever, and it ships and shows effect inside the quarter. It's the highest impact-times-confidence over effort.

If there's room for a "two small" split, I'd add a narrow recommendations pilot, a "buy it again" and "complete the look" row, to start gathering the data a fuller rec system would need later. That sequences the uncertain, data-hungry bet behind a cheap learning step instead of betting the quarter on it.`,
        moveToNotice:
          "I don't just pick, I sequence. The uncertain, data-hungry option goes behind a cheap pilot, so I'm learning toward the next bet rather than gambling a whole quarter on a guess.",
      },
      {
        heading: 'What I would deprioritise, and why',
        body: `I'd **deprioritise the loyalty programme this quarter**, and say why clearly: it's the biggest build, the slowest to prove real (versus rewarding inevitable repeat buyers), and the easiest to get wrong in a way that quietly erodes margin.

It may well be the right Q2 bet once returns has lifted the base and the rec pilot has produced data. But committing a whole quarter of capacity to it now is high-cost, slow-feedback, and expensive to unwind. Prioritisation means naming that out loud, not just championing the winner.`,
        moveToNotice:
          "I defend the cut as hard as the pick. Saying why loyalty is wrong for THIS quarter, cost, slow feedback, margin risk, is the real prioritisation; ranking the winner is the easy half.",
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "The CEO is adamant the loyalty programme is the retention play, every competitor has one, and you're proposing to spend the quarter making it cheaper for people to send stock back. Returns is a cost centre, not a growth lever. Defend not building loyalty.",
          },
          {
            speaker: 'candidate',
            text: "I'd hold the line, and I'd separate the goal from the mechanism. Loyalty and returns chase the same goal, repeat purchase; the question is only which moves it fastest and most certainly inside one quarter. On the scorecard loyalty loses on two axes that matter most right now: confidence, because a discount-led programme often just pays people who would have returned anyway, so it can post a number while creating no incremental retention; and time-to-impact, because it's the biggest build and the slowest to prove real. Returns isn't a cost centre in fashion, it's the rebuy-risk lever: people don't reorder when they fear being stuck with the wrong fit, so the returns experience is a retention lever wearing a cost-centre costume, and the guardrails keep abuse and margin in check. Where I'd give ground is sequencing, not the call: loyalty is a strong Q2 bet once returns has lifted the base and the rec pilot has produced the data to target rewards at the right cohort instead of spraying discounts. And the thing that would change my mind this quarter is evidence the binding constraint isn't fit-risk at all, if returns barely moves repeat purchase in the first weeks, loyalty rises immediately.",
          },
        ],
        moveToNotice:
          "Under direct stakeholder pressure I don't cave to the HiPPO and don't dismiss it. I re-anchor on the shared goal, beat the favoured option on the explicit criteria (confidence and time-to-impact), reframe \"cost centre\" correctly, and concede sequencing while naming what evidence would actually flip the decision.",
      },
      {
        heading: 'Measure it',
        body: `I'd measure the returns bet in layers:

- **Leading** (weeks): return-initiation-to-completion time, and the share of returners who place another order within 30 days. Fast signal the easier-returns thesis holds.
- **Lagging headline:** repeat purchase rate and repeat revenue per customer over the quarter, the goal itself.
- **Guardrails:** return rate and returns cost don't blow out (easier returns can invite abuse), and margin per order stays healthy.`,
      },
      {
        heading: 'Risks, and how I would de-risk',
        body: `Pressure-testing the pick:

**Easier returns could raise abuse and cost.** Cheaper returns can invite wardrobing, buy, wear, return. So returns cost and return rate are guardrails, and I'd watch for abuse patterns, not just the retention upside.

**The pilot could split focus.** A "two small" plan risks doing both half-well. If capacity is tight, I'd ship returns fully first and add the pilot only if it doesn't slow returns down.

**Returns might not be the binding constraint.** If repeat purchase doesn't move even with great returns, the real blocker is elsewhere, price or assortment, and the rec and loyalty bets rise. The pilot's data is exactly what helps me see that early.`,
        moveToNotice:
          "I pressure-test the winner, return abuse, split focus, a wrong root cause, so I'm defending a bet with its failure modes in view, not a pet feature.",
      },
      {
        heading: 'One-line close',
        body: `So: against a retention goal, I'd build faster, cheaper returns this quarter as the most direct, best-evidenced lever that fits the timebox, run a small recommendations pilot to seed the next bet, deprioritise loyalty as too big and slow to prove now, and hold guardrails on returns cost and margin so I don't buy retention at the price of the unit economics.`,
      },
    ],
    finalNotes: [
      'Anchor on the quarter\'s real goal first; the same options rank differently under growth vs retention vs margin.',
      'Use an explicit weighted scorecard (RICE-adapted) and show the table; stating the weights is what makes the pick defensible rather than a preference.',
      'Pick on impact-times-confidence over effort, and respect the timebox: it must show effect this quarter.',
      'Defend the cut as hard as the pick. Naming why the loser is wrong for now IS the prioritisation.',
      'When a senior stakeholder pushes their favourite, re-anchor on the shared goal and beat their option on the explicit criteria; concede sequencing, not the call, and name what evidence would flip it.',
      'Sequence uncertain, data-hungry bets behind a cheap learning step instead of betting the quarter on them.',
      'Measure in layers and guardrail the obvious abuse (here, easier returns inviting return abuse).',
    ],
  },
]
