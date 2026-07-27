import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: senior.
// Senior bar: name an exhaustive MECE tree BEFORE hunting the event, prune it
// with time-location + segmentation, hold the call under interviewer pushback,
// fix in two horizons, measure in layers. No leaf unturned.

export const rootCauseQuestions: Question[] = [
  {
    slug: 'diagnose-active-seller-drop',
    archetype: 'root-cause',
    vertical: 'marketplace',
    difficulty: 'senior',
    referenceSlug: 'so-framework',
    prompt:
      'Weekly active sellers on our marketplace dropped 20% in a month. Diagnose what is going on.',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Clarify the metric and the shape of the drop',
        body: `A 20% drop is big, so before I hypothesise I want to be precise about what dropped and when.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'First, how do we define a weekly active seller: someone who logs in, someone with a live listing, or someone who actually makes a sale that week?',
          },
          {
            speaker: 'interviewer',
            text: 'A seller with at least one transaction in the week.',
          },
          {
            speaker: 'candidate',
            text: "So this is active selling, not just presence. That points me at either fewer sellers able to sell, or the same sellers selling less, rather than a login problem.",
          },
          {
            speaker: 'candidate',
            text: 'And is the 20% a sudden step down or a gradual slide across the month?',
          },
          {
            speaker: 'interviewer',
            text: 'It stepped down over about a week, then stayed flat at the lower level.',
          },
          {
            speaker: 'candidate',
            text: "A step change is a strong signal. A gradual slide usually means something slow like churn or seasonality; a sharp step in a week usually means something specific changed, a release, a policy, a pricing change, or an external shock. I'll hunt for an event.",
          },
        ],
        moveToNotice:
          "A step change and a gradual slide are different diagnoses. Establishing the shape of the drop before hypothesising tells me whether to hunt for an event or a trend.",
      },
      {
        heading: 'Structure the space before hunting (MECE)',
        body: `Before I chase the obvious suspect, I'll lay out the whole space so I cannot tunnel on the first lead. A marketplace's active sellers are a function of supply and demand, and the metric itself can mislead, so I split it three ways and only then start pruning.

**0. Is the drop even real?** Rule this out first, it is cheap and people skip it:

- The metric definition or instrumentation changed
- A bot, fraud, or duplicate-account purge removed "sellers"
- A calendar or seasonality effect, a holiday week or a month-boundary artifact

**Then, if it is real:** weekly active sellers = newly activated + retained and reactivated existing − churned. A drop means inflow fell or outflow rose. The "why" is mutually exclusive across four branches:

1. **Supply, sellers cannot sell** (internal): a new gate or blocker (verification, KYC, policy) stops them mid-flow; listings hidden or de-ranked by a release; payments, payouts, or onboarding broken.
2. **Supply, sellers will not sell** (internal): a fee, pricing, or commission change made it uneconomic; a policy change they reject.
3. **Demand, sellers get no orders** so they fall below the one-transaction bar: buyer traffic or conversion dropped, a demand-side release, a search or paid-channel loss.
4. **External shock**: a competitor poaching sellers or undercutting fees; a macro, regulatory, or payments-provider outage.

That is collectively exhaustive, a 20% step has to sit in one of these boxes. Now I prune it fast: locate the drop in time, then segment to see which box lights up.`,
        moveToNotice:
          "Naming the exhaustive tree before chasing the timeline is the senior move. It proves I am being collectively exhaustive, not pattern-matching to the first suspect, and it turns the later segmentation into a deliberate pruning of a known space rather than a fishing trip.",
      },
      {
        heading: 'Locate it in time',
        body: `I want to pin the drop to a date and see what moved alongside it.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Can I get the daily active-seller count across the month, plus a list of releases, pricing or policy changes, and anything ops-side that shipped in that window?',
          },
          {
            speaker: 'interviewer',
            text: 'The step lines up with the Tuesday we rolled out a new seller-verification requirement. No pricing changes.',
          },
          {
            speaker: 'candidate',
            text: "That is a strong lead, but correlation in time is not proof, and a verification change could hurt in more than one way. I'll treat it as the prime suspect and still check the data before I believe it.",
          },
        ],
      },
      {
        heading: 'Segment to localise it',
        body: `Before I blame verification, I want to see exactly who dropped.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Can we split the decline by new versus established sellers, by category, by geography, and by whether a seller hit the verification flow or not?',
          },
          {
            speaker: 'interviewer',
            text: "It is almost entirely sellers who registered before the change and had not yet verified. New sellers are fine. No category or geo concentration.",
          },
          {
            speaker: 'candidate',
            text: "That localises it cleanly. Established, previously-active sellers got gated by a new step they had not completed, and a chunk of them dropped rather than finish it. It is not a demand problem and not category-specific. It is a friction wall we put in front of our own active supply.",
          },
        ],
        moveToNotice:
          "I segment before I accept the obvious suspect. The split turns \"verification probably did it\" into \"verification gated already-active sellers,\" which is a different and more fixable problem.",
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "You're leaning hard on the verification gate. But we've required verification before, new sellers are completely fine, and this category is always soft this time of year. Why isn't this just seasonality plus normal churn?",
          },
          {
            speaker: 'candidate',
            text: "Fair challenge, and three independent signals rule that out. One, shape: seasonality is a gradual slide, this was a step over a week that then held flat, which is an event signature, not a season. Two, segmentation: the loss sits entirely in previously-active sellers who hit the gate and had not verified; new sellers and every other cohort are flat, whereas seasonality and broad churn would hit everyone, not one gated cohort. Three, timing: the step lands on the exact day the requirement shipped. Any one of those alone could be coincidence; all three lining up is not. Where I will give ground is proof, not direction: I would confirm with a control cohort that was not gated. If they did not drop, seasonality is dead as an explanation. If they did, I am wrong and I reopen the tree.",
          },
        ],
        moveToNotice:
          "Under pressure I don't retreat to \"you might be right.\" I marshal three independent signals, shape, segmentation, and timing, then name the single test (a non-gated control) that would actually falsify the call. Holding a view with evidence while stating what would change your mind is the senior bar.",
      },
      {
        heading: 'Hypotheses: hold a short set, do not tunnel',
        body: `Even with a prime suspect, I'd keep a short hypothesis set so I don't tunnel on the first lead:

**Most likely (internal, fits the data):** the verification gate blocks previously-active sellers mid-flow. They cannot transact until they verify, and the flow is hard, slow, or badly communicated, so they stall or leave.

**Worth ruling out (internal):** the change broke something adjacent, for example verified sellers' listings got hidden by a bug, or the emails announcing the requirement never sent.

**Worth ruling out (external):** a coincident shock such as a competitor promo or a payments outage. The clean internal segmentation makes this unlikely, but a 20% drop earns one look.`,
      },
      {
        heading: 'How I would confirm before acting',
        body: `To confirm the leading hypothesis rather than assume it:

- **Funnel the verification flow:** of gated sellers, how many start it, complete it, and resume selling. A large start-to-complete drop confirms friction.
- **Talk to ten dropped sellers:** did they understand what to do, try and fail, or just give up? A fast qualitative read on which it is.
- **Check the boring failure modes:** did the verification emails actually deliver? Is the flow broken on a common phone or browser?
- **Find a control:** any cohort or region that has not been gated yet, as a natural comparison.`,
      },
      {
        heading: 'Fix the bleed and the process behind it',
        body: `Assuming friction is confirmed, the fix has two horizons:

**Stop the bleeding now.** Let already-active sellers keep selling during a grace period while they verify, instead of hard-gating them. Shorten the flow, add clear in-app prompts and reminders, and offer help on the stuck steps. This recovers supply we already had.

**Prevent recurrence.** Never ship a gate to active users without a migration plan and a grace period, and roll changes like this to a small percentage first while watching the active-seller metric before going wide. The deeper failure here was process: a policy change shipped to everyone at once with no ramp.`,
        moveToNotice:
          "The fix is not just \"undo verification.\" I separate stopping the bleeding from preventing recurrence, and name the process gap that let a blunt change hit live supply.",
      },
      {
        heading: 'Measure the recovery',
        body: `I'd track the fix the same way I'd track any change, in three layers:

- **Leading indicators** (within days): the verification-flow start-to-complete rate, and the share of gated, previously-active sellers who resume a transaction within seven days of the grace period and reminders. These tell me fast whether sellers are coming back.
- **Lagging headline** (the outcome): weekly active sellers climbing back toward the pre-change baseline, and how much of the lost 20% we actually recover.
- **Guardrails** (must stay intact): fraud and chargeback rate and any compliance incidents during the grace period, plus new-seller verification completion staying healthy, so the fix doesn't trade one problem for another.`,
      },
      {
        heading: 'Risks in the call, and how I would de-risk the fix',
        body: `Two things could make me wrong, and I'd guard against both:

**The verification timing could be a coincidence.** Something else may have shipped that same Tuesday. That's exactly why I'd confirm with the verification funnel and a control cohort before committing, not lean on the date alignment alone.

**The grace-period fix could reintroduce the risk verification was meant to remove.** Verification exists for a reason, usually fraud or compliance. Letting unverified sellers keep transacting indefinitely could expose us, so I'd time-box the grace period, cap how much an unverified seller can transact in it, and treat it as a bridge while we make verification easier, not a permanent hole.`,
        moveToNotice:
          "I name what would prove me wrong, and I check that my own fix doesn't quietly recreate the problem the verification gate was there to solve.",
      },
      {
        heading: 'One-line close',
        body: `So: the 20% step lines up with a verification gate, the decline sits entirely in previously-active, unverified sellers with no demand or category signal, I'd confirm it with the verification funnel and a few seller conversations, then stop the bleeding with a time-boxed, capped grace period and a smoother flow, and prevent recurrence by ramping changes like this gradually behind the active-seller metric.`,
      },
    ],
    finalNotes: [
      'Establish the shape of the drop (sudden step vs gradual slide) before hypothesising; it tells you whether to hunt an event or a trend.',
      'Name an exhaustive MECE tree before chasing the timeline: first "is it real?" (measurement), then inflow vs outflow, then supply / demand / external. It proves you are exhaustive, not pattern-matching.',
      'Locate the drop in time and line it up against releases, pricing, policy, and external events, then segment to see which MECE branch lights up.',
      'Segment to localise who dropped before accepting the obvious cause. Correlation in time is not proof.',
      'Under pushback, hold the call with independent signals (shape, segmentation, timing) and name the one test that would falsify it. Do not retreat to "you might be right."',
      'Confirm with a funnel, a few user conversations, and the boring failure modes (delivery, device breakage) before acting.',
      'Fix in two horizons: stop the bleeding now, and fix the process that let it happen.',
    ],
  },
  {
    slug: 'diagnose-flipkart-return-rate-rise',
    archetype: 'root-cause',
    vertical: 'ecommerce',
    difficulty: 'senior',
    prompt:
      'Return rate on Flipkart has gone up. How would you diagnose and improve it?',
    framework: 'Is-it-real? → mix vs within-segment → reason-code MECE',
    referenceSlug: 'so-framework',
    updatedAt: '2026-06-24',
    relatedSlugs: ['diagnose-active-seller-drop'],
    answer: [
      {
        heading: 'Clarify the metric and the shape of the rise',
        body: `A return rate moving is only meaningful once I know exactly what's being counted, so let me pin the definition and the shape before I hypothesise.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'How are we defining return rate: returns initiated or completed returns, over delivered orders, and is it measured by order or by unit?',
          },
          {
            speaker: 'interviewer',
            text: 'Completed returns over delivered orders, monthly, by order.',
          },
          {
            speaker: 'candidate',
            text: "So it's realised returns, not just requests, and a per-order rate. Good to know, because a category that ships many units per order could skew a per-unit view but not this one. How big is the move, and was it a sudden step or a gradual climb?",
          },
          {
            speaker: 'interviewer',
            text: 'It went from about 12% to about 17% over roughly three weeks, then held flat at the higher level.',
          },
          {
            speaker: 'candidate',
            text: "Five points on a 12% base is a 40% relative jump, that's large. And a step that holds is an event signature, not a slow drift. Seasonality or gradual mix creep would slope; this stepped and stayed. So I'll hunt for something specific that changed in that window, a policy, a category push, a listing or logistics change, rather than a season.",
          },
        ],
        moveToNotice:
          'Establishing the shape, a step versus a slope, before hypothesising tells me whether to hunt an event or a trend.',
      },
      {
        heading: 'Structure the space before hunting (MECE)',
        body: `Before I chase the obvious suspect, I'll lay out the whole space so I don't tunnel.

**0. Is the rise even real?** Cheapest to rule out first:

- **Definition / instrumentation:** the return window was extended so more orders become return-eligible, reason codes or the return flow changed, or we started counting differently.
- **Denominator:** if orders *fell*, the rate rises mechanically even with flat absolute returns.
- **Mix shift:** order composition tilted toward structurally high-return categories. Fashion returns at 25 to 40%, electronics and BGM far lower, so a shift toward fashion lifts the blended rate on its own.
- **Seasonality / calendar:** a post-sale return wave (a Big Billion Days hangover), festive returns.

**Then, if it's real,** a return is a gap between what the buyer expected or needed and what they got. Why any return happens is MECE by origin:

1. **Purchase-time expectation gap (listing):** misleading images, wrong size chart, inaccurate specs, inflated reviews, counterfeit → reason codes "not as described", "size/fit", "quality".
2. **Fulfilment / condition (in transit):** damaged, defective on arrival, wrong item, missing parts, late → "damaged", "wrong item".
3. **Buyer behaviour:** bracketing (order several sizes, keep one), buyer's remorse or "changed mind", COD refusal at the door, serial or abusive returners, or a new low-intent buyer cohort.
4. **Policy / external:** a relaxed returns policy (free or extended returns) that changed behaviour, a competitor, or a promo that pulled in deal-seekers.

That is collectively exhaustive: a return is triggered at purchase, in transit, by the buyer, or by a policy or mix change. Now I prune, locate it in time, then segment by reason code, category, buyer cohort, seller and logistics lane.`,
        moveToNotice:
          'Naming the exhaustive tree, and "is it real?" first, before chasing the timeline is the senior move. It proves I am being collectively exhaustive, not pattern-matching to the first suspect.',
      },
      {
        heading: 'Locate it in time',
        body: `I want to pin the rise to a date and see what moved alongside it.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Can I get weekly return rate across the window, plus a log of what shipped: policy changes, category pushes, sale events, app or listing releases, and any logistics or 3PL change?',
          },
          {
            speaker: 'interviewer',
            text: 'The step lines up with a free-returns rollout on fashion, we waived return fees and extended the window to 30 days on apparel. A Big Billion Days sale ended about two weeks before the step began. No logistics change.',
          },
          {
            speaker: 'candidate',
            text: "Free returns on fashion is a strong lead, and it can hurt two ways at once: it grows fashion's share of orders, and it lowers the bar to return within fashion. But the recent sale is a confound I have to separate, correlation in time isn't proof. Prime suspect, still verify.",
          },
        ],
      },
      {
        heading: 'Segment to localise it',
        body: `Before I blame the policy, I want to see exactly which returns rose.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Can we split the rise by category, by return reason code, new versus existing buyers, COD versus prepaid, seller type and region, and crucially separate how much is fashion’s share rising versus fashion’s own rate rising?',
          },
          {
            speaker: 'interviewer',
            text: 'Almost entirely fashion. Within fashion the dominant reason code is "size/fit", then "changed mind". Non-fashion is flat. And it is both: fashion’s share of orders rose, and the within-fashion return rate also rose. It concentrates in buyers who used the free-returns option. COD is slightly higher but not the driver.',
          },
          {
            speaker: 'candidate',
            text: "That localises it cleanly, and it's two effects from one cause. Mix: free returns pulled more fashion orders, and fashion structurally returns more, so the blended rate climbs even if nothing else changed. Within-segment: free returns also changed behaviour inside fashion, bracketing on size and low-friction \"changed mind\" pushing fashion's own rate up. It's not damage and not a logistics lane, it's an expectation-and-behaviour problem in fashion, amplified by policy.",
          },
        ],
        moveToNotice:
          "I split mix from within-segment, a Simpson's-paradox guard, before accepting the cause. The reason codes then map straight onto the MECE tree.",
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "You're pinning this on free returns. But we just ran Big Billion Days, sales always see a return spike afterwards, and fashion always returns more anyway. Why isn't this just the post-sale wave plus normal fashion mix?",
          },
          {
            speaker: 'candidate',
            text: "Fair challenge, and three independent signals rule that out. One, shape and persistence: a post-sale wave spikes then decays inside the return window, this stepped up and held flat for weeks after the sale window closed, that's a regime change, not a decaying wave. Two, segmentation: the rise is in fashion's own rate, not only its share, a post-sale-plus-mix story would show as mix and across the categories that were actually on sale, but non-fashion is flat and fashion's rate itself moved. Three, timing: the step lands on the free-returns rollout date, not on the sale. Any one could be coincidence; all three lining up isn't. Where I'll give ground is proof, not direction: I'd confirm with a control, fashion sub-categories or regions not yet migrated to free returns. If their rate didn't move, the post-sale and mix story is dead. If it did, I'm wrong and I reopen the tree.",
          },
        ],
        moveToNotice:
          'Under pressure I marshal three independent signals, shape, segmentation and timing, rather than retreat, then name the single test (a non-migrated control) that would actually falsify the call.',
      },
      {
        heading: 'Hypotheses: hold a short set, do not tunnel',
        body: `Even with a prime suspect, I'd keep a short hypothesis set:

**Most likely (policy-induced, fits the data):** free returns on fashion both shifted mix toward fashion and, within fashion, lowered the cost of returning, enabling bracketing on size and casual "changed mind". The underlying enabler is weak size/fit guidance, buyers can't get size right first time, so free returns turn that into bracketing.

**Worth ruling out (listing / quality):** if "not as described" or "quality" were also rising, that's a seller-quality or counterfeit problem, not fit. The data says size/fit dominates, so this is secondary, but check.

**Worth ruling out (external / abuse):** serial returners exploiting free returns, or a competitor. The clean within-fashion size/fit signal makes broad abuse unlikely, but a five-point jump earns one look at the repeat-returner tail.`,
      },
      {
        heading: 'How I would confirm before acting',
        body: `To confirm the leading hypothesis rather than assume it:

- **Reason-code and bracketing funnel:** the size/fit share of fashion returns over time, and a bracketing signal, baskets with two or more sizes of the same style, and the keep-one-return-the-rest rate.
- **Control cohort:** sub-categories or regions not yet on free returns, compare the rate trend. This is the falsifying test from the pushback.
- **Buyer conversations and returned-item condition:** are size/fit returns genuine fit misses (bad size charts) or habitual bracketing? Are returned units even resalable?
- **Boring failure modes:** did a release break or hide size-chart data? Did a reason-code taxonomy change inflate "size/fit"?`,
      },
      {
        heading: 'Fix at the source, and shape the policy',
        body: `Two horizons, and I'd lead with the durable fix, not a policy clamp.

**Reduce returns at the source (cut the expectation gap).**
- *Size/fit, the dominant reason:* better size charts, on-model measurements, fit predictors that learn from a buyer's past *kept* sizes, verified fit reviews, and standardised brand sizing. This attacks the biggest reason code directly.
- *Listing quality:* accurate images and specs, and penalise sellers with high "not as described" return rates.

**Shape behaviour without nuking a buyer-friendly promise.**
- Free returns very likely lifts fashion conversion and GMV, that's the trade we made on purpose. So I would **not** blanket-reverse it. Instead target the abusive tail: cap free returns per buyer per period, add gentle friction or a fee only for serial returners, and flag bracketing patterns.
- Make first-time-right good enough that bracketing isn't needed.

**Prevent recurrence.** Never ship a returns-policy change without a return-rate guardrail and a staged rollout, and model the mix and behaviour effect before going wide.

**What I would not do.** I wouldn't just reverse free returns to make the metric look good. Return rate is a means; the goal is profitable, return-adjusted GMV and retention. Killing free returns could cut returns *and* cut fashion conversion and repeat purchase, losing more than it saves.`,
        moveToNotice:
          'I attack the expectation gap at the source rather than only the policy, and I refuse to optimise the return-rate number at the expense of GMV and retention.',
      },
      {
        heading: 'Measure the recovery',
        body: `I'd track the fix in three layers:

- **Leading indicators** (days to weeks): fashion size/fit reason-code share, bracketing rate, first-time-right (kept-on-first-order) rate, and adoption of the new size tools.
- **Lagging headline** (the outcome): blended return rate easing back toward baseline, *decomposed* into mix versus within-segment so I know which lever worked, plus return-adjusted contribution per fashion order.
- **Guardrails** (must stay intact): fashion conversion and GMV (didn't kill the goose), returns-experience CSAT, fashion-buyer repeat purchase and retention, reverse-logistics cost, and refund-fraud rate.`,
      },
      {
        heading: 'Risks in the call, and how I would de-risk the fix',
        body: `Two things could make me wrong, and I'd guard against both:

**The free-returns read could be confounded by the sale.** That's exactly why the control cohort and the mix-versus-within-segment decomposition come *before* any policy change, not after.

**The fix could overcorrect.** Friction or fees on returns can depress fashion conversion and retention, trading a metric win for a GMV loss. So I'd target only the abusive tail, lead with the sizing fixes, treat any return friction as a time-boxed scalpel, and watch the conversion and retention guardrails the whole way.`,
        moveToNotice:
          "I name what would prove me wrong, and I check that my own fix doesn't quietly cost more GMV than the returns it saves.",
      },
      {
        heading: 'One-line close',
        body: `So: the rise is a real five-point step concentrated in fashion, driven by a free-returns rollout that both shifted mix toward fashion and lifted within-fashion size/fit returns through bracketing. I'd confirm it with a non-migrated control cohort and the reason-code funnel, then fix at the source with sizing and listing quality plus targeted friction on the serial-returner tail, rather than killing a policy that lifts GMV, and I'd guard conversion, retention and return-adjusted contribution so I don't win the return-rate metric and lose the business.`,
      },
    ],
    finalNotes: [
      'Pin the definition and the shape (step vs slope) before hypothesising; a step that holds is an event, not a season.',
      'Run "is it real?" first, definition, denominator, mix, before assuming behaviour changed.',
      "Split mix from within-segment (a Simpson's guard); a blended-rate move can be pure composition.",
      'Map return reason codes onto the MECE tree, they localise the cause fast.',
      'Under pushback, separate the policy signal from the post-sale wave with shape, segmentation and timing, and name the control cohort that would falsify it.',
      "Fix the expectation gap at the source; don't optimise return rate by killing a policy that drives GMV and retention.",
    ],
  },
]
