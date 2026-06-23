import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: senior.
// First senior answer, and the worked example of the senior tier: a mid-answer
// interviewer pushback, an explicit bet with what would change it, second-order
// effects across the org, 4-5 moves.

export const strategyQuestions: Question[] = [
  {
    slug: 'should-an-ota-enter-the-experiences-market',
    archetype: 'strategy',
    vertical: 'travel',
    difficulty: 'senior',
    prompt:
      'Should an online travel agency enter the experiences and activities market?',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Clarify the decision and the objective',
        body: `This is a "should we enter a new market" call, so before I argue either way I want to pin down who we are, what we're really trying to achieve, and what "enter" is allowed to mean.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: "What kind of OTA are we, flights-led, hotels-led, or full-stack? And what's the strategic goal behind looking at this, revenue growth, margin, or frequency and retention?",
          },
          {
            speaker: 'interviewer',
            text: "We're a hotels-led OTA at Booking scale. The goal is lifetime value and frequency. Customers book us once or twice a year for a hotel, and we want more of their trip.",
          },
          {
            speaker: 'candidate',
            text: 'And by "enter" do we mean build a marketplace ourselves, acquire an existing player, or partner and aggregate someone else\'s inventory? Is all of that on the table?',
          },
          {
            speaker: 'interviewer',
            text: "All of it. I want your call on whether to enter at all, and if yes, how.",
          },
          {
            speaker: 'candidate',
            text: "Last thing: is this a defensive must-have, or a real growth bet we'd fund properly? And how capital-disciplined are we?",
          },
          {
            speaker: 'interviewer',
            text: "Treat it as a real growth bet, but capital-disciplined.",
          },
        ],
        moveToNotice:
          'I separate "should we enter" from "how we\'d enter", and anchor on the stated objective, frequency and LTV. Experiences is only worth doing if it deepens the core relationship, so that goal is the lens for everything that follows.',
      },
      {
        heading: 'Frame the market and why now',
        body: `Experiences and activities, tours, attractions, things-to-do, is a large, highly fragmented, mostly-offline market. Most activities are still booked in-destination: cash at a kiosk, the hotel desk, or not pre-booked at all. Online penetration is low, unlike flights and hotels, which are mature and consolidated.

So structurally it's a big category early in its shift online, and it attaches to a trip we already own. That "why now for us" matters more than the market size: we already have the customer at the highest-intent moment, they've booked a specific city for specific dates. That's the best possible context to sell a thing to do, and the acquisition cost is effectively zero because we already paid it for the hotel. A standalone activities player has to buy that customer cold. That attach context is our unfair advantage.`,
        moveToNotice:
          "I lead with our specific structural advantage (we already own the customer at the moment of highest intent), not generic market-size enthusiasm. Strategy questions are won on \"why us, why now\", not TAM.",
      },
      {
        heading: 'The case for, and the case against',
        body: `**For:**

- **Frequency and LTV, the actual goal.** Hotels get booked once or twice a year; activities are booked several times per trip and on impulse. More touchpoints, more reasons to open the app, higher LTV per customer.
- **Margin.** Activities carry much higher take rates (20 to 30%) than hotels (10 to 15%), so even modest GMV is margin-accretive.
- **Defence.** Airbnb, Google, and the activities pure-plays are all moving to own the whole trip. If we don't attach experiences, someone else owns that slice of our customer's trip and starts pulling the relationship away.

**Against:**

- **Supply is the hard part.** It's fragmented, offline, local operators, no APIs, perishable inventory. This is feet-on-the-street operations, a very different muscle from hotel contracting.
- **Brand risk.** A bad tour reflects on us more than a bad hotel does, more variance, smaller operators, and we'd be lending our trusted brand to it.
- **Distraction.** It could pull focus from the core hotels business that funds everything.`,
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "Booking and Expedia already have activities, and it's a rounding error for them. Why would this be any different for us?",
          },
          {
            speaker: 'candidate',
            text: "Fair challenge, and it should sharpen the recommendation rather than kill it. The reason it's been a rounding error isn't that the demand isn't there, it's that it's been bolted on as a separate tab no one visits, with thin, un-curated supply. The bet isn't \"add an activities tab\". It's \"make the in-destination experience a first-class, contextual part of the trip we already booked\", surfaced at the right moment in the trip timeline. If all we'd do is replicate a neglected tab, then I agree it stays a rounding error and we shouldn't bother. So the precedent is evidence about how prior entrants executed, not about whether the demand exists. It means: enter only if we'll do it as a core, integrated experience.",
          },
        ],
        moveToNotice:
          "I take the pushback as real and let it tighten the bet instead of defending my original framing. Reading the \"rounding error\" precedent as a statement about execution, not demand, is the senior move; crumbling or hand-waving is the junior one.",
      },
      {
        heading: 'The uncertainties that actually decide it',
        body: `Stripping it down, two questions decide this, and neither is "is the market big":

1. **Supply density.** Can we access enough quality, bookable inventory in our top destination cities to make attach work? Without supply, the unfair advantage is worthless.
2. **Attach behaviour.** Will customers actually book an activity through us at the hotel-booking moment, or do they genuinely decide in-destination?

I don't need to resolve these with a strategy memo. I need a cheap read on attach rate and supply density in a few markets before committing real capital. That requirement is what dictates how we enter.`,
      },
      {
        heading: 'Recommendation: enter, but sequence the bet',
        body: `My recommendation: **yes, enter, but as an integrated, partner-led pilot first, not a build-from-scratch and not a big acquisition.**

- **Phase 1, prove attach.** Partner with or aggregate an existing supply marketplace to get instant inventory in our top 10 destination cities, and integrate it into the post-booking flow and trip timeline, not a separate tab. Low capital, fast, and it tests the only thing that matters first: do our customers attach?
- **Phase 2, own what's worth owning.** If attach proves out, invest in owned supply and curation in the destinations where attach and margin are highest, where the operational cost is justified.
- **Phase 3, only then consider buying.** An acquisition gets considered once we've proven attach and know which supply matters. Buying fragmented supply before proving demand is the expensive mistake.

The explicit bet: **customers will attach experiences to a hotel booking if it's contextual and trustworthy.** What would change my mind: weak attach in the partner pilot despite clean integration. That's the signal that the demand decides in-destination and our moment isn't the right one, and I'd stop before Phase 2.`,
        moveToNotice:
          "I take a clear position and name exactly what evidence would reverse it. \"Enter via a pilot, and weak attach is what stops me\" is a decision; \"it depends\" is not. Sequencing the cheap learning (attach) before the expensive commitment (owning supply) is the spine of the recommendation.",
      },
      {
        heading: 'Measure it, in layers',
        body: `I'd judge the pilot on:

- **Leading** (weeks): attach rate, the share of hotel bookings that add an activity, and activity view rate in the post-booking flow. A direct read on the core thesis.
- **Lagging headline:** incremental GMV and margin from activities, and the real prize, repeat-booking rate and LTV of customers who attach versus those who don't. Frequency and LTV were the goal, so that comparison is the scoreboard.
- **Guardrails:** activity quality, refund and complaint rates stay inside a band so the brand isn't damaged; the core hotel NPS and conversion don't dip from the added flow; partner economics stay margin-positive after support cost.`,
      },
      {
        heading: 'Second-order effects and risks',
        body: `Three I'd watch beyond the feature itself:

**Brand contagion.** A bad experience hurts the trusted hotel brand, not just the activity. Mitigate with curation, reviews, and frictionless refunds, and start with vetted partner supply rather than the long tail.

**Channel dependence.** Leaning on a partner aggregator means we don't own the supply or the full margin, and we may be feeding a future competitor our demand data. Acceptable for a pilot, and exactly why Phase 2 builds owned supply where it matters, not a forever-dependency.

**Org distraction.** This needs its own team and P&L, not a side project on the hotels roadmap. If it lives as a tab someone owns part-time, it becomes the neglected tab I just criticised. The structure is part of the bet.`,
        moveToNotice:
          "I name effects across the org, brand, partner power balance, team structure, not just within the product. Second-order thinking (the partner pilot's success could entrench a competitor) is what the senior version of this answer adds.",
      },
      {
        heading: 'One-line close',
        body: `So: yes, enter, because experiences attaches to a trip we already own at near-zero acquisition cost, carries higher margin, and drives the frequency and LTV that is the actual goal, but enter as an integrated, partner-led pilot in our top cities, prove customer attach before buying any supply, and resource it as a first-class part of the trip with its own team, not another neglected tab. The bet is attach; weak attach in the pilot is what would stop me.`,
      },
    ],
    finalNotes: [
      'Separate "should we enter" from "how we\'d enter", and anchor the whole answer on the real objective (here, frequency and LTV).',
      'Win strategy questions on "why us, why now", the specific structural advantage, not on market size or TAM.',
      'Take a clear position and state exactly what evidence would change your mind. "It depends" is not an answer.',
      'When the interviewer pushes back, let it sharpen your bet; read a precedent as a statement about execution, not about whether demand exists.',
      'Sequence the cheap learning (a pilot that tests the riskiest assumption) before the expensive commitment (building or buying).',
      'Name second-order effects across the org, brand, partner power, team structure, and measure in layers with brand guardrails.',
    ],
  },
]
