import type { Question } from '../types'

// Canonical worked example for the skill. Difficulty: senior (senior bar:
// decompose the metric into a MECE stage-rate tree before optimising, name the
// framework, hold the bet under interviewer pushback, pressure-test the fix).
// Discovery stages are candidate/interviewer dialogue; analysis is prose.

export const metricImprovementQuestions: Question[] = [
  {
    slug: 'improve-neobank-onboarding-conversion',
    archetype: 'metric-improvement',
    vertical: 'fintech',
    difficulty: 'senior',
    framework: 'GAME (Goal Clarity, Audience Segmentation, Map Levers, Execute & Prioritise)',
    prompt:
      "You're a PM at a neobank. Onboarding conversion has plateaued. How would you improve it?",
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Clarify before I solve',
        body: `Before I touch levers, three things change the entire approach, so I'll ask rather than assume.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'First, what counts as onboarding here? App-install through to account-opened, or account-opened through to the first funded transaction?',
          },
          {
            speaker: 'interviewer',
            text: 'Account-opened through to the first funded transaction.',
          },
          {
            speaker: 'candidate',
            text: "Good. That's the stretch where a neobank actually makes or loses money, so a plateau there is worth real effort. I'll focus on sign-up start → first funded account.",
          },
          {
            speaker: 'candidate',
            text: 'Second, where is conversion sitting now, and has it always been there, or did it drop to this level?',
          },
          {
            speaker: 'interviewer',
            text: "It's hovered around 35 to 40% for the last couple of quarters.",
          },
          {
            speaker: 'candidate',
            text: "So it's chronic, not a sudden regression. A sudden drop would send me to diagnose what broke; a long-standing plateau tells me the easy leaks are fixed and growth has flattened. I'll treat this as an optimisation problem.",
          },
          {
            speaker: 'candidate',
            text: "Last, are there constraints I should treat as fixed: a regulatory KYC step I can't remove, or a timeline?",
          },
          {
            speaker: 'interviewer',
            text: 'KYC is regulatory, it stays. You have a quarter.',
          },
          {
            speaker: 'candidate',
            text: "Useful. So I can't solve this by cutting the compliance gate, the job is to lift funding without touching KYC, and one quarter rules out anything that needs a long rebuild.",
          },
        ],
        moveToNotice:
          "I ask before I assume. Scope, whether the plateau is chronic, and the hard constraints each change the approach, so I settle all three before committing to a direction.",
      },
      {
        heading: 'Goal clarity: what are we actually optimising?',
        body: `Before I optimise anything, I want to agree what a good conversion actually is.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: `Do we count an account the moment it's funded, or only if it's still active after a month?`,
          },
          {
            speaker: 'interviewer',
            text: `Only if it's still active. We've seen people fund once and then go quiet.`,
          },
          {
            speaker: 'candidate',
            text: `Then raw conversion is the wrong target. My real objective is the rate of sign-up starts that become funded, retained, low-risk accounts: funded-at-30-days as the headline, with fraud and chargeback rate and D30 retention as guardrails. That stops me winning the metric by dropping KYC friction and converting fraudsters, which would flatter the number and hurt the business.`,
          },
        ],
      },
      {
        heading: 'Structure the funnel before optimising (MECE)',
        body: `Conversion is not one number, it is a product of stage-rates: start sign-up → clear KYC → fund the account → first transaction. Every user who fails to convert is lost at exactly one of those stages, so the funnel itself is my mutually-exclusive, collectively-exhaustive backbone. I find the leaking stage, then decompose the causes at that stage.

I'll read it on three orthogonal axes, because the blended number hides the problem:

- **Stage:** which step bleeds the most? That is where a fix can actually move the metric.
- **Segment:** new-to-banking versus switchers, very different trust and familiarity.
- **Failure type:** did they abandon, a product and motivation problem, or get rejected, a policy and eligibility problem? Those need opposite fixes.

That gives me a grid of stage × segment × failure-type. The next move is to read the data and find the one cell carrying the loss, not to start naming features.`,
        moveToNotice:
          "Decompose the metric into its stage-rates before optimising. Conversion is a product, not a number, so the funnel is a ready-made MECE tree, and the abandon-versus-reject cut decides whether I'm even solving a product problem or a policy one.",
      },
      {
        heading: 'Segment: where exactly is the drop-off?',
        body: `Now I read that grid against the data, because a single conversion number hides where the problem actually is.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: `Can I see stage-by-stage drop-off across start sign-up → identity/KYC → fund the account → first transaction? And can we cut it two ways: new-to-banking versus switchers, and whether people abandoned or were rejected?`,
          },
          {
            speaker: 'interviewer',
            text: `KYC completion is healthy. The big drop is at funding: about 45% of users who clear KYC never fund. It's concentrated in new-to-banking users, and they're abandoning, not getting rejected.`,
          },
          {
            speaker: 'candidate',
            text: `That reframes the whole problem. It's not that onboarding is leaky everywhere; it's that people who've cleared the hard part won't put money in. I'd point everything at one stage for one segment: funding abandonment among new-to-banking users.`,
          },
        ],
        moveToNotice:
          "I'm refusing to optimise the average. The whole game is finding the one segment-stage that matters, because that's where a fix actually moves the number.",
      },
      {
        heading: "Map the levers: why won't they fund?",
        body: `Now the second MECE layer, the causes at the leaking stage. For an abandonment problem the reasons are exhaustively one of three buckets, and I'd generate hypotheses across all three rather than jumping to a feature:

**Trust / motivation.** A new-to-banking user has cleared KYC but has no reason to move real money into an app they don't trust yet. There's no proof it works before they're asked to commit cash, and "what if my money gets stuck" is a real fear for someone using a bank like this for the first time.

**Friction.** Funding might require a bank transfer with manual IFSC and account entry, a cooling-off period, or a minimum amount. Each is a reason to defer to "I'll do it later," and later never comes. For a new-to-banking user, even a two-minute transfer with unfamiliar fields is enough to stall.

**Value gap.** Nothing happens before funding. The product is inert until money is in, so there's no aha-moment pulling them across the line, no reason funding feels urgent today rather than next week.

Given the segmentation, friction and motivation are the live buckets: these users chose us and cleared KYC, then stalled at the money step. The value gap is real, but I'd treat it as secondary.`,
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "You're about to bet a whole quarter on funding friction for new-to-banking users. But maybe they're simply not ready to put real money into a neobank they've used for five minutes, and no number of instant-UPI buttons changes that. Convince me you're not about to ship a feature that moves nothing.",
          },
          {
            speaker: 'candidate',
            text: "Reasonable worry, and it's exactly why I instrument the bet rather than place it blind. Three things. One, the segmentation already rules out the simplest not-ready story: these users chose us, cleared a hard KYC step, then abandoned rather than got rejected, which is high intent stalling at the money step, not absent intent. Two, friction and readiness make different, fast-readable predictions: if instant low-minimum funding lifts the funding-step completion rate within the first couple of weeks, friction was real; if completion stays flat, you're right that it's readiness, and the fix is the pre-funding value moment, not more funding rails. Three, that is exactly why funding-step completion is my leading indicator and the value moment is queued as step two, the week-four read tells me which world I'm in. So I'm not betting the quarter on one belief, I'm running the cheapest experiment that separates the two, and a flat funding-completion rate despite frictionless funding is the result that would change my mind.",
          },
        ],
        moveToNotice:
          "Challenged on the core bet, I neither fold nor dig in. I show the two competing explanations (friction versus readiness) make different, fast-readable predictions, that I've sequenced the cheapest test to tell them apart, and I name the exact result that would prove me wrong.",
      },
      {
        heading: "Solutions, and what I'd deprioritise",
        body: `From those buckets, the candidate solutions, judged on impact against effort:

- **Lower the funding ask (friction).** Let users fund as little as ₹100 instead of a high minimum, and add instant funding via UPI or card so there's no multi-day transfer wait. Attacks the most direct cause. High impact, low effort.
- **Create value before funding (value gap).** Let the user see their virtual card, set a savings goal, or preview a feature before the funding gate, so funding unlocks something they already want. Medium impact, medium effort.
- **Build trust mid-funnel (motivation).** Social proof, deposit-protection messaging, and a "fund ₹100 to try it, withdraw anytime" framing that lowers the perceived stakes. Medium impact, low effort.
- **Re-engage the abandoners.** A well-timed nudge, not spam, with a concrete reason to come back and finish. Low-to-medium impact, low effort, and it recovers people we've already paid to acquire.

What I'd explicitly **deprioritise**: a full onboarding redesign. It's tempting and it photographs well in a deck, but it's high-effort, slow, and the data says the problem is one specific gate, not the whole flow. With only a quarter, rebuilding everything to fix one stage is how you spend the time and move nothing. I'd also leave KYC alone: it's regulatory, and it's not where the abandonment is.`,
        moveToNotice:
          "I'm naming what I'd NOT do and why. Prioritisation is only real if you'll cut the attractive-but-wrong option, and say why the constraint makes it wrong.",
      },
      {
        heading: 'Sequence & measure',
        body: `I'd sequence by impact-over-effort and by learning value, inside the one quarter:

1. **Weeks 1 to 3: ship instant UPI funding and the low minimum, A/B against control.** Cheapest, attacks the biggest leak, fast to ship. It's the bet most likely to move the number, so it goes first and behind a clean experiment.
2. **Weeks 4 to 8: add a pre-funding value moment** (virtual card preview), again A/B'd. If funding-friction alone doesn't close the gap, this addresses the motivation half. The week-4 read on step 1 tells me how hard to push here.
3. **Weeks 8 onward: layer trust messaging and the re-engagement nudge** as fast follows, since they're cheap and additive.

Then I'd measure in three layers, so I get an early read without fooling myself:

- **Leading indicators** (move within days): funding-step completion rate, time-to-first-funding, and the share funding via instant UPI. These tell me fast whether the fix is landing, well before conversion can.
- **Lagging headline** (the outcome that matters): first-funded-account conversion and funded-at-30-days. Slower to read, but it's the number we're moving.
- **Guardrails** (must stay flat or better): fraud and chargeback rate, and D30 retention.

If the leading indicators move but the headline doesn't, my funnel map was wrong, and I'd re-segment rather than ship more.`,
      },
      {
        heading: 'Risks, and how I would de-risk',
        body: `Before I commit, I'd pressure-test the top fix rather than present it as free:

**It could invite fraud.** A ₹100 minimum on instant rails is exactly what a fraud ring likes. So I'd pair it with velocity and device checks and watch the fraud guardrail inside the A/B, not just conversion. If fraud climbs, the win is fake.

**It could move funding but not retention.** Converting someone with a ₹100 deposit doesn't mean they stay. That's why funded-at-30-days, not first-funding, is the headline; if these users churn by day 30, the fix is hollow and I'd rethink the offer rather than scale it.

**The test could be underpowered.** If funding-abandoners are a modest slice of weekly traffic, I'd size the experiment up front and predefine the minimum detectable effect, so I don't read noise as a result.`,
        moveToNotice:
          "I pressure-test my own recommendation before selling it, naming how it could backfire and how I'd catch it, instead of presenting the fix as risk-free.",
      },
      {
        heading: 'One-line close',
        body: `So: I'd resist optimising the average, isolate the funding-abandonment leak for new-to-banking users, ship instant low-minimum funding first as the cheapest high-impact move inside the quarter, protect fraud and retention as guardrails, and pressure-test the fix so I don't win the metric and lose the business.`,
      },
    ],
    finalNotes: [
      'Clarify the funnel boundary, whether the plateau is chronic, and the hard constraints before solving. A sudden drop is a root-cause question, not this one.',
      'State the real objective and its guardrails up front, so you can\'t "win" the metric by degrading quality.',
      'Decompose the metric into its stage-rates first: conversion is a product, not a number, so the funnel is a ready-made MECE tree. Find the leaking stage, then MECE the causes at that stage (motivation / friction / value).',
      'Segment to find the one stage-and-segment doing most of the damage, and split abandon vs reject; resist optimising the average.',
      'Prioritise by impact-over-effort, sequence inside the real constraint, and say out loud what you would NOT do and why.',
      'Under pushback on the core bet, show the competing explanations make different fast-readable predictions, sequence the cheapest test that separates them, and name what would change your mind.',
      'Pressure-test your top fix: name how it could backfire (fraud, hollow conversion, an underpowered test) and how you would catch it.',
      'Close on metrics in layers: leading indicators for fast signal, the lagging headline you are moving, and guardrails that must not break.',
    ],
  },
  {
    slug: 'improve-blinkit-average-order-value',
    archetype: 'metric-improvement',
    vertical: 'ecommerce',
    difficulty: 'senior',
    framework: 'AOV decomposition (items per basket × value per item) + impact/effort',
    prompt: 'How would you improve the average order value of Blinkit?',
    context:
      'Blinkit is a quick-commerce grocery service: dark stores and ten-minute delivery, where each order carries a roughly fixed fulfilment cost, so AOV drives contribution per order.',
    updatedAt: '2026-06-23',
    answer: [
      {
        heading: 'Clarify scope and constraints',
        body: `Before I touch any lever, three things change the whole approach, so I'll ask rather than assume.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'First, which AOV: gross cart value, or net of discounts and coupons? Second, which market and store type, mature metro dark stores or newly launched ones? Third, what can I touch in the horizon, just software and merchandising, or new categories and capex?',
          },
          {
            speaker: 'interviewer',
            text: 'Use gross AOV as the headline but you own net too. Assume mature metro dark stores. Horizon is two quarters, software and merchandising only, no new dark-store capex.',
          },
          {
            speaker: 'candidate',
            text: "Good, that rules in the levers I'd reach for first anyway and rules out \"just stock higher-ticket categories everywhere,\" which needs capex and assortment changes I don't have.",
          },
        ],
        moveToNotice:
          'I separate gross from net AOV up front because the cheapest way to fake an AOV win is a discount-funded threshold, which lifts the gross number and quietly destroys margin. Naming net as a tracked metric closes that escape hatch before I start.',
      },
      {
        heading: 'Agree the real objective and the guardrails',
        body: `I want to be explicit that AOV is a means, not the end, and anchor on contribution rather than vanity GMV.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Each order carries a roughly fixed fulfilment cost: picking plus last-mile rider plus packaging. Can you give me rough numbers so I anchor on contribution?',
          },
          {
            speaker: 'interviewer',
            text: 'Fulfilment is about ₹55 an order. Gross margin on the basket is around 23%. AOV today is roughly ₹620.',
          },
          {
            speaker: 'candidate',
            text: "So a ₹620 order throws off about ₹143 of gross margin, minus ₹55 fulfilment, around ₹88 contribution. A ₹300 top-up throws off ₹69 minus ₹55, just ₹14. That's the whole game: fulfilment is fixed per order, so AOV is what turns a delivered order from break-even into contribution. So the real objective is contribution margin per customer per month, which is AOV × order frequency × margin rate minus fulfilment, and the hard guardrail is: I will not win AOV by killing order frequency or retention.",
          },
          {
            speaker: 'interviewer',
            text: 'Agreed: optimise contribution, protect frequency.',
          },
        ],
        moveToNotice:
          'I reframed the metric to contribution per customer per month because optimising AOV alone invites a minimum-order-value that tanks frequency. Stating the guardrail now is what stops me proposing the obvious-but-wrong lever later.',
      },
      {
        heading: 'Structure the space before optimising (MECE)',
        body: `I'll lay out the whole space first, then prune. Arithmetically, **AOV = (number of items in the basket) × (average value per item)**. That gives an exhaustive tree of where AOV can come from:

1. **More items per basket.** *Breadth*: add a category the shopper isn't buying today (groceries, then personal care, household, snacks). *Depth*: more units of what they already buy (2 instead of 1, a larger pack).
2. **Higher value per item.** *Premiumisation*: trade up within a category to branded or premium SKUs, or push higher-margin private label. *Mix shift*: tilt the basket toward higher-ticket categories (electronics, appliances, large packs).
3. **New high-value occasions.** Capture order types that barely happen on Blinkit today: the planned weekly stock-up, party and festive orders, the high-ticket one-off. This is net-new basket, not reshaping an existing one.

Lever 1 is the safest because it adds value without touching the convenience promise. Lever 2 is real but rank-and-merchandising-led. Lever 3 is the biggest prize and the riskiest, because it can collide with the franchise. I'll let the data say which is live.`,
        moveToNotice:
          'I name the full decomposition before chasing the obvious "add a free-delivery threshold" answer, so every branch is on the table. The arithmetic identity is what makes the tree MECE rather than a list of tactics.',
      },
      {
        heading: 'Segment to where AOV actually leaks',
        body: `Average AOV hides the real picture, so I read it by occasion and by customer type.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Can you split orders by occasion, top-up versus planned shop, with the AOV and share of each? And the same split for new versus habitual customers.',
          },
          {
            speaker: 'interviewer',
            text: 'Top-up orders, one to four items, are about 55% of orders at roughly ₹290 AOV. Planned shops, ten-plus items, are about 15% of orders at ₹950. The rest sit in between. Habitual users skew heavily to top-ups; new users do more exploratory mid-size baskets.',
          },
          {
            speaker: 'candidate',
            text: "That's the key tension. Blinkit's growth runs on habitual users doing small, frequent, ten-minute top-ups, and that behaviour is exactly what pulls AOV down. So I don't want to make every order bigger, because the small top-up is the moat. Two distinct moves fall out instead. One, on the high-frequency top-ups, add attach without adding friction: lift them from three items to four, not three to twelve. Two, win the planned weekly shop, which at ₹950 mostly happens on BigBasket or offline today, as a net-new occasion rather than by inflating top-ups.",
          },
        ],
        moveToNotice:
          'I refused to optimise the average. Segmenting by occasion reveals that the AOV drag and the core growth engine are the same behaviour, so the answer is two targeted plays, not one blunt push.',
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "Isn't pushing AOV going to break the ten-minute convenience promise that is your entire moat? People come to Blinkit precisely for the small, fast order.",
          },
          {
            speaker: 'candidate',
            text: "It would, if I raised the floor on small orders, and that's exactly the lever I'm refusing. Neither of my two plays touches the top-up experience. The attach play adds optional items to a basket the customer already chose, at checkout, one tap; ignore it and the order is unchanged and just as fast. The planned-shop play targets an occasion that doesn't happen on Blinkit today, so there's nothing to degrade. The thing that would prove me wrong is clear: if the treated cohorts show order frequency falling, or the planned-shop push cannibalises top-up frequency instead of adding new GMV, I'm wrong and I roll it back. So my single falsifying test is orders-per-customer-per-month in a hold-out, not AOV. If AOV climbs and frequency holds, I'm right; if frequency dips, the moat argument wins and I stop.",
          },
        ],
        moveToNotice:
          "I held the call by getting specific about which lever I'm not pulling, then named the exact metric that would falsify me. Conviction plus the falsifying test is the senior move; \"you might be right\" would have failed here.",
      },
      {
        heading: 'Map the levers, then which the data makes live',
        body: `Putting the tree against the segments, the live levers are:

- **Checkout attach (more items, top-up orders).** "Frequently bought together," "people also added," and last-aisle impulse SKUs (chocolate, batteries, gum) surfaced at checkout, personalised from the customer's own order history. Pure software, zero impact on speed.
- **Per-segment free-delivery thresholds (more items).** "Add ₹70 more to unlock free delivery," with the threshold set dynamically just above each segment's natural basket, not a flat high number. Tracked on net AOV so it isn't a disguised discount.
- **Multi-buy and pack-size merchandising (depth + value per item).** Surface larger packs and "2 for ₹X" combos on staples a customer reorders.
- **One-tap reorder and replenishment (new occasion).** "Your usual" rebuilds a full planned basket in one tap; "running low on milk?" nudges bring the weekly stock-up onto Blinkit.
- **High-ticket and premium merchandising (value per item, new occasion).** Rank premium and private-label SKUs higher for cohorts that have shown willingness to pay, and merchandise electronics and large packs to planned-shop occasions, not to top-ups.`,
      },
      {
        heading: "Solutions, and what I'd deprioritise",
        body: `Judged on impact against effort:

**Do first (high impact, low effort, fully reversible):**
1. **Personalised checkout attach.** Software-only, lifts items-per-basket directly, no friction. The single safest lever, so it ships first.
2. **Dynamic per-segment free-delivery threshold.** A classic, strong AOV lever, as long as it's set per segment and watched on net margin, not gross GMV.

**Do next (medium effort):**
3. **One-tap reorder and replenishment reminders**, to rebuild the planned weekly shop as a new occasion.
4. **Premium and private-label ranking** for willing cohorts, which lifts value-per-item and margin together.

**Later (structural):**
5. **High-ticket category merchandising** to planned-shop cohorts only.

What I'd explicitly **deprioritise**: a hard minimum order value. It's the bluntest AOV lever and it attacks frequency and the convenience moat head-on, the exact guardrail I set. Equally, sitewide discounting to inflate carts: that buys gross AOV at negative contribution, the opposite of the objective.`,
        moveToNotice:
          'I sequence by impact-over-effort and cut the minimum-order-value out loud, because the prioritisation is only real if I name the attractive-but-wrong lever and say why it fails the guardrail.',
      },
      {
        heading: 'Sequence and measure',
        body: `Sequence: ship attach and the dynamic threshold first (software, fast, reversible), then one-tap reorder, then high-ticket merchandising, with premium ranking in parallel since it's also software. Every change goes out as a cohort experiment against a hold-out.

Then measure in three layers, so I get an early read without fooling myself:

- **Leading indicators** (move within days): checkout attach rate, items per basket, share of orders crossing the free-delivery threshold, cross-category rate.
- **Lagging headline** (the outcome that matters): AOV gross and net of discount, and the real north star, contribution margin per order and per customer per month.
- **Guardrails** (must stay flat or better): orders per customer per month, 30- and 90-day retention, delivery-time SLA (the convenience promise), and return/cancellation rate on high-ticket items.

If items-per-basket moves but contribution per customer doesn't, the gain was discount-funded or it cost me frequency, and I'd re-cut rather than scale.`,
      },
      {
        heading: 'Risks, and how I would de-risk',
        body: `Before I commit, I'd pressure-test the top fix rather than present it as free:

**Attach and thresholds suppress small, frequent orders, so frequency falls.** This is the main risk and it threatens the moat directly. De-risk: hold-out cohorts, frequency as the hard kill-metric, and per-segment thresholds rather than a flat floor.

**Threshold nudges are really discounts, so net AOV and margin don't move.** De-risk: judge on net AOV and contribution, never gross GMV.

**High-ticket pushes raise returns and tie up rider capacity.** De-risk: cap by cohort, watch return rate and contribution per order.

**The planned-shop push just shifts a basket the customer would've placed anyway, moving GMV around at higher delivery cost.** De-risk: an incrementality test that counts only net-new GMV.`,
        moveToNotice:
          'I pressure-test my own recommendation before selling it, naming how each lever could backfire and the exact guardrail that catches it, instead of presenting the fix as risk-free.',
      },
      {
        heading: 'One-line close',
        body: `So: the biggest, safest win is frictionless personalised attach plus per-segment free-delivery thresholds to lift items-per-basket on the orders we already get, paired with one-tap reorder to bring the planned weekly shop onto Blinkit as a new occasion. I'd measure it on contribution margin per customer, not raw AOV, and hold order frequency as the kill-switch, so I never trade the ten-minute convenience moat for a vanity number.`,
      },
    ],
    finalNotes: [
      'Reframe AOV to contribution per customer per month before you solve; AOV alone invites a minimum-order-value that kills frequency.',
      'Decompose AOV as items-per-basket × value-per-item first, so every lever is on the table before you reach for a threshold.',
      'Segment by occasion: for q-commerce the small top-up is both the AOV drag and the core moat, so don\'t fight it, add attach to it and win the planned shop separately.',
      'Lead with software-only, reversible levers (attach, dynamic thresholds) and run everything against a hold-out cohort.',
      'Under the "you\'ll break the convenience moat" pushback, name the lever you are refusing and the single metric (order frequency) that would falsify you.',
      'Track net AOV and margin, never gross GMV, so a "win" isn\'t just a disguised discount.',
      'Close on layered metrics with order frequency and delivery SLA as hard guardrails.',
    ],
  },
]
