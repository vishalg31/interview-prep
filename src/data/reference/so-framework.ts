import type { ReferenceGuide } from '../types'

// Ported from the S&O interview framework guide, then extended into the
// universal method spine for the whole library (segmentation axis, two-layer
// MECE, abandon vs reject, conviction under pushback). S&O cases still link
// here via referenceSlug, but every archetype's canonical answer runs the
// same spine underneath. Rendered on its own page.

export const soFramework: ReferenceGuide = {
  slug: 'so-framework',
  title: 'S&O Framework',
  intro:
    'The method every archetype in this library runs underneath, the S&O cases just make it explicit. Read the cases to learn the pattern; read this the night before any interview to recall it.',
  updatedAt: '2026-07-27',
  sections: [
    {
      num: '01',
      title: 'The universal question framework: COGS+FI',
      body: 'Say it as "cogs plus fi." Use it to check you have covered every dimension before you move to structure. Do not move to your MECE tree until you have ticked all six.',
      cards: [
        {
          label: 'C',
          title: 'Context',
          body: 'What market, product, timeframe? What changed in the business recently?',
        },
        {
          label: 'O',
          title: 'Objective',
          body: 'What does success look like? Stop decline, hit a target, or explore options?',
        },
        {
          label: 'G',
          title: 'Granularity',
          body: 'Where is the problem? Which segment, region, product, cohort, channel?',
        },
        {
          label: 'S',
          title: 'Scale',
          body: 'How big? Magnitude, percent change, baseline, trend direction, sudden or gradual? Sudden means something broke, go diagnose. Gradual or chronic means the easy wins are gone, go optimise instead, these are different archetypes with different playbooks.',
        },
        {
          label: 'F',
          title: 'Funnel',
          body: 'Where in the process is the breakdown? Which step? The funnel IS your MECE structure.',
        },
        {
          label: 'I',
          title: 'Impact',
          body: 'What is the business cost? Revenue, users, efficiency? Quantify the upside of fixing it.',
        },
      ],
    },
    {
      num: '02',
      title: 'MECE structure per category',
      cards: [
        {
          title: 'Process Improvement',
          items: [
            'Value chain: Input to Process to Output',
            'People / Process / Technology',
            'Capacity vs Demand',
            'Upstream cause vs downstream symptom',
          ],
        },
        {
          title: 'Revenue Growth',
          items: [
            'Revenue = Volume x Price',
            'Volume = New users + Existing expansion',
            'Price = ARPU x transaction frequency',
            'By stream: FX, subscriptions, interchange, interest',
          ],
        },
        {
          title: 'Cost Optimisation',
          items: [
            'Profit = Revenue minus Costs',
            'COGS (direct) vs OpEx (indirect)',
            'Fixed vs Variable costs',
            'Unit economics: cost per customer vs revenue per customer',
          ],
        },
        {
          title: 'Expansion',
          items: [
            'Market Attractiveness',
            'Competitive Viability: where is the niche?',
            'Entry Strategy: build / partner / acquire',
            'Financial model: payback period, CAC, ARPU',
          ],
        },
      ],
    },
    {
      num: '03',
      title: 'Decompose, then segment, then MECE the cause',
      body: 'MECE happens twice, not once.',
      cards: [
        {
          title: '1. Decompose the metric into its equation',
          body: 'That is section 02, Revenue = Volume x Price, AOV = items x value-per-item, Profit = Revenue minus Costs.',
        },
        {
          title: '2. Segment to find where it concentrates',
          body: 'What you segment BY has to match the question type, segmenting by the wrong axis hides the answer in an average.',
        },
        {
          title: '3. MECE the causes within that segment',
          body: 'Once you have localised it to one segment, for example trust vs friction vs value-gap.',
        },
      ],
      table: {
        headers: ['Question type', 'Segment by', 'Why'],
        rows: [
          [
            'Diagnostic ("why is X dropping")',
            'Funnel stage, time, or population subset',
            'Finds where the anomaly concentrates, that is what unlocks the real cause',
          ],
          [
            'Feature / design ("design a feature for X")',
            'User type or need',
            'Finds the highest-leverage group to design for',
          ],
          [
            'Growth / strategy ("how do we grow X")',
            'Channel, geography, or lever type (acquisition vs retention vs monetisation)',
            'Finds which growth lever actually has room to move',
          ],
        ],
      },
      callouts: [
        {
          label: 'The most common failure',
          text: 'Decomposing the equation, then jumping straight to causes without segmenting first, and ending up solving for the average instead of the one segment that actually carries the problem.',
        },
      ],
    },
    {
      num: '04',
      title: 'Abandon vs reject: unwilling vs unable',
      body: 'Once you have localised the leak to one stage or segment, one more cut decides everything: did people leave voluntarily, or were they blocked? The two need opposite fixes, and treating one as the other wastes the whole recommendation.',
      cards: [
        {
          label: 'Unwilling',
          title: 'Abandoned',
          body: 'They could have continued but chose not to. A product or motivation problem: reduce friction, build trust, close the value gap.',
        },
        {
          label: 'Unable',
          title: 'Rejected',
          body: 'Blocked by a rule, an eligibility check, or a system limit. A policy or ops problem: change the policy, add an exception path, or design around the constraint.',
        },
      ],
      callouts: [
        {
          label: 'Why it matters',
          text: 'Building more trust for a user who was policy-blocked changes nothing. Loosening a policy for a user who simply was not ready invites the wrong kind of risk. Diagnose which one you have before you propose the fix.',
        },
      ],
    },
    {
      num: '05',
      title: '35-minute time allocation',
      table: {
        headers: ['Phase', 'Time', 'Note'],
        rows: [
          ['Objective', '2 min', 'Restate and confirm before anything else'],
          [
            'Clarifying questions + data extraction',
            '12 min',
            'Spend the most time here',
          ],
          ['MECE structure', '4 min', 'Name your buckets out loud'],
          ['Analysis + root cause', '9 min', 'Rule out fast, deep-dive the suspect'],
          ['Solutions', '6 min', 'Short-term + long-term, specific'],
          ['Close', '2 min', 'Recommendation + success metrics'],
        ],
      },
    },
    {
      num: '06',
      title: 'What is being scored: 6 dimensions',
      body: 'All six must be covered in every answer.',
      table: {
        headers: ['#', 'Dimension', 'Bar'],
        rows: [
          ['1', 'Objective confirmed', 'Always first'],
          ['2', 'Clarifying questions', '12+ minutes'],
          ['3', 'MECE structure', 'Named aloud'],
          ['4', 'Data-driven', 'Facts, not guesses'],
          ['5', 'Solution quality', 'Feasible + creative'],
          ['6', 'Success metrics', 'Always close with them'],
        ],
      },
    },
    {
      num: '07',
      title: 'What fails vs what passes',
      table: {
        headers: ['Fails', 'Passes'],
        rows: [
          [
            '"I think we should improve the customer experience and maybe look at pricing..."',
            '"My recommendation is country-specific document guidance, live in 2 weeks. Based on the math, this recovers 7,000 activations a month."',
          ],
          [
            'Goes silent for 30 seconds, then starts speaking',
            '"Give me 20 seconds to structure this. I am splitting into three MECE buckets: A, B, and C. Starting with A..."',
          ],
          [
            'Jumps to solutions after 2 minutes of questions',
            'Spends 12 minutes on questions, builds MECE from what the interviewer reveals, then proposes solutions grounded in data',
          ],
          [
            '"The problem could be revenue, or maybe costs, or perhaps the market..."',
            '"Root cause one is X, I am confident because of Y. Root cause two is Z, but fixing X first will also resolve Z."',
          ],
          [
            '"We should hire more people, invest in technology, and improve processes."',
            '"Immediate: add document guidance this week, near-zero cost. Month 1: recovery flow. Month 6: vendor renegotiation."',
          ],
        ],
      },
    },
    {
      num: '08',
      title: 'Language that signals structured thinking',
      cards: [
        {
          title: 'To open',
          items: [
            '"Let me confirm the objective..."',
            '"Before I structure, I have a few questions..."',
            '"I want to split this into X MECE buckets..."',
            '"Give me 20 seconds to think through the structure..."',
          ],
        },
        {
          title: 'During questions',
          items: [
            '"Is this concentrated in a specific segment?"',
            '"Walk me through the end-to-end process..."',
            '"What changed in the business at the same time?"',
            '"What would success look like in 90 days?"',
          ],
        },
        {
          title: 'During analysis',
          items: [
            '"The data points toward Bucket B because..."',
            '"Let me rule out Bucket A quickly..."',
            '"The root cause, not the symptom, is..."',
            '"Of these, the highest-leverage cause is..."',
          ],
        },
        {
          title: 'To close',
          items: [
            '"To summarise my recommendation..."',
            '"If I were the decision-maker, I would..."',
            '"To measure success, I would track three metrics..."',
            '"The single most important action is..."',
          ],
        },
      ],
    },
    {
      num: '09',
      title: 'Conviction and falsifiability under pushback',
      body: 'When the interviewer challenges your core bet, the failure mode is folding ("you might be right") or digging in and ignoring the challenge. Every senior answer in this library does the same three things instead.',
      cards: [
        {
          title: '1. Name the competing explanation',
          body: 'State the alternative view honestly, in its strongest form, do not strawman it.',
        },
        {
          title: '2. Say what result would prove each side right',
          body: 'Competing explanations should make different, checkable predictions, not just different opinions.',
        },
        {
          title: '3. Name the exact test, and what would change your mind',
          body: 'One concrete, falsifying result. Conviction plus intellectual honesty is the senior bar, not just conviction.',
        },
      ],
      callouts: [
        {
          label: 'What fails',
          text: '"You might be right" fails. So does repeating your original answer louder.',
        },
        {
          label: 'What passes',
          text: '"Here is the test that tells us which of us is right, and here is the specific result that would change my mind."',
        },
      ],
    },
    {
      num: '10',
      title: 'Quick reference card: read the night before',
      body: 'COGS+FI question checklist, mapped to the five clarifying batches.',
      cards: [
        {
          label: 'C',
          title: 'Context (Batch 1)',
          body: 'Current metric vs before? Sudden or gradual? What changed in the business at the same time?',
        },
        {
          label: 'O',
          title: 'Objective (Batch 2)',
          body: 'What does success look like? Deadline? Stop decline vs reach a new target?',
        },
        {
          label: 'G+F',
          title: 'Granularity + Funnel (Batch 3, most time)',
          body: 'Walk me through the end-to-end process. Which step has the biggest drop-off? Concentrated in one segment, region, channel? Qualitative signal? Company-specific or market-wide?',
        },
        {
          label: 'S',
          title: 'Constraints (Batch 4)',
          body: 'Regulatory, technical, or budget limits? Existing team? Already tried something?',
        },
        {
          label: 'I',
          title: 'Impact (Batch 5)',
          body: 'Current cost of the problem? If fully solved, what does the business gain in money, users, or efficiency?',
        },
      ],
      callouts: [
        {
          label: 'The one rule',
          text: 'Never assume. If you do not know something, ask. If you cannot ask, say: "I am going to assume X, is that reasonable?" That single habit separates candidates who guess from candidates who think.',
        },
        {
          label: 'What they actually want',
          text: 'They want you to think like an owner. Not "here is my analysis" but "here is what I would do, why, who owns it, and how I would know it is working." Be decisive. Hold your view when pushed back on.',
        },
      ],
    },
  ],
}
