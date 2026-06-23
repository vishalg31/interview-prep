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
]
