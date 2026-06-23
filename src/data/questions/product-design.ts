import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: senior (senior bar:
// decompose the habit into a MECE funnel before designing, CIRCLES as the
// scaffold, hold the user choice under pushback, name the metric-gaming risk).

export const productDesignQuestions: Question[] = [
  {
    slug: 'design-product-to-help-people-read-more',
    archetype: 'product-design',
    vertical: 'consumer-tech',
    difficulty: 'senior',
    framework: 'CIRCLES (Comprehend, Identify the user, Report needs, Cut/prioritise, List solutions, Evaluate, Summarise)',
    prompt: 'Design a product to help people read more.',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Clarify the user and the goal',
        body: `"Read more" could be a dozen products, so I want to pin who this is for and what success looks like before I design.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Are we designing for a specific platform or company, or is this greenfield? And is there a business goal behind it, or is it a pure user-good product?',
          },
          {
            speaker: 'interviewer',
            text: 'Greenfield. Treat it as a consumer product that should sustain itself eventually, but start from the user.',
          },
          {
            speaker: 'candidate',
            text: "Then I'll optimise for a genuine reading habit, not vanity engagement, and keep one eye on a model that could work later. I also need to define read more.",
          },
          {
            speaker: 'candidate',
            text: 'When we say read more, do we mean more books, more long-form generally, or just more time reading anything? And read more than they do now, or get non-readers to start?',
          },
          {
            speaker: 'interviewer',
            text: "Take it as people who want to read more books but aren't managing to. Help them actually do it.",
          },
          {
            speaker: 'candidate',
            text: "Good, that's the sharpest version: people with the intent to read books who keep failing to. That's a motivation-and-habit problem more than an access problem, which shapes everything.",
          },
        ],
        moveToNotice:
          "I turn a vague \"read more\" into one specific user with one specific failure: people who intend to read books but don't. Designing for everyone would get me a worse product than designing for them.",
      },
      {
        heading: 'Pick the user and the job to be done',
        body: `So my user is the aspiring-but-stalled reader: they buy books, save articles, mean to read, and don't. I'd narrow to them rather than serve hardcore readers (already well served) or non-readers (who don't want this).

The job to be done: help me turn my intention to read into a sustained habit, in the gaps I actually have.`,
      },
      {
        heading: 'Structure the habit as a funnel (MECE)',
        body: `Before I design anything, I'll decompose where the intention actually dies, so I'm not guessing at features. Reading is a habit funnel, and the intention has to survive every transition: **choose a book → start a session → sustain attention through it → come back tomorrow.** A stalled reader falls out at exactly one of those transitions, which makes the funnel a mutually-exclusive, collectively-exhaustive map of the problem.

Mapping the real failure modes onto it:

- **Choose** (commitment of choosing): a book is a ten-hour bet chosen half-blind, so picking feels costly and they stall before starting.
- **Start** (time and attention): reading competes with phones and streaming and feels like it needs a long block, so the session never begins.
- **Sustain / return** (momentum): they start, drop it for a week, lose the thread, and never come back. No streak, no nudge, no accountability.

The next move is to decide which transition loses the most readers, because that is where a product actually changes behaviour.`,
        moveToNotice:
          "I decompose the habit into a funnel before naming a single feature. That turns a vague \"help people read\" into a MECE map of where intention dies, and forces me to design for the transition that loses the most readers, not the one that's fun to build.",
      },
      {
        heading: 'Prioritise the needs',
        body: `I can't fix all three at once, so I'd rank them by what blocks the habit most:

1. **Momentum and accountability** is the biggest lever. The habit dies between sessions, not during them. Fix this and the rest matter less.
2. **Fitting into small time pockets** is second. If reading only works in hour-long blocks, it won't survive a normal day.
3. **Lowering the commitment of choosing** is third. Useful, but people who already buy books have chosen; they just don't continue.

So I'd design primarily around momentum, with time-pocket fit close behind.`,
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "You've built this whole thing around momentum for the aspiring reader. But be honest, a lot of these people don't actually want to read, they want to have read. They like owning books and the identity, not the act. Aren't you designing for a user who will never show up, however good your streak is?",
          },
          {
            speaker: 'candidate',
            text: "It's the sharpest challenge to this product, and I'd answer it with revealed behaviour and a test, not belief. First, this user doesn't just buy books, they start them and save articles, which is intent expressed in actions; the identity-only buyer is real but a different segment I've explicitly not designed for. Second, the two stories make opposite predictions, and my MVP is built to separate them cheaply: if the where-you-left-off recap and tiny daily goals lift sessions-started and finished-books, the want was real and just needed scaffolding; if people set a goal and still never open the book, you're right, the want is hollow and no habit mechanic saves it. Third, that's exactly why my headline is finished books and active reading weeks, not installs or streak-opens, the vanity metrics an identity-buyer would flatter. So the result that changes my mind is goals set but sessions never started, and I'd rather see that in week three than scale past it.",
          },
        ],
        moveToNotice:
          "The hardest version of this prompt is \"your user doesn't really want this.\" I meet it with revealed behaviour (they start books, not just buy them), a metric the identity-buyer can't game (finished books, not installs), and the exact signal that would prove the premise wrong.",
      },
      {
        heading: 'Solution concepts',
        body: `Concepts that attack momentum and time-fit:

- **A daily reading streak with tiny, achievable goals** (ten minutes or ten pages), with reminders timed to the user's dead pockets: commute, before bed. Habit mechanics that work elsewhere, pointed at books.
- **Pick up exactly where you left off, with a one-line recap** of what happened last, so a week's gap doesn't kill the book. This directly fixes the lose-the-thread death.
- **Light accountability:** a friend, a small group, or a public commitment, since accountability sustains habits better than willpower.
- **Flexible format:** let a session be text or audio for the same book, so a commute counts as reading. Meet people where their minutes actually are.`,
      },
      {
        heading: 'MVP, and what I would cut',
        body: `For a first version I'd ship the smallest thing that tests the core bet, that momentum mechanics make stalled readers read more:

**In the MVP:** import or pick a book, a daily goal, a streak, smart reminders, and the where-you-left-off recap. That's the habit loop, end to end.

**What I'd cut for v1:** light accountability (powerful, but heavy to build and it needs social density to work) and audio/text switching (a real content and licensing lift). Both are fast-follows if the core loop retains.

I'd cut them not because they're bad, but because the one thing I must learn first is whether the streak-and-recap loop changes behaviour. Adding social before I know that just muddies the read.`,
        moveToNotice:
          "I scope the MVP around the single riskiest assumption, the habit loop, and cut even good features that don't test it. An MVP that includes everything teaches nothing.",
      },
      {
        heading: 'Success metrics',
        body: `I'd measure whether we're building a habit, not just installs:

- **Leading indicators** (days): the share of users who set a goal and read on day 1, and 7-day streak rate. Early signal the loop is catching.
- **Lagging headline** (the real outcome): books finished per user per quarter, and weeks active reading. That is "reading more" made measurable.
- **Guardrails:** we're not driving shallow streak-gaming (opening the app for ten seconds to keep a streak), and reminders aren't tipping into nagging and uninstalls.`,
      },
      {
        heading: 'Risks, and how I would de-risk',
        body: `Pressure-testing the bet:

**Streaks can become the goal instead of reading.** People might protect a streak without actually reading. So I'd define the goal as engaged reading time, not app-opens, and watch for shallow sessions.

**Reminders can backfire.** Habit nudges are a thin line from nagging; if they drive uninstalls, the cure is worse than the disease. I'd cap frequency and let users set their own pockets.

**The premise itself could be wrong.** Maybe stalled readers don't want to read more, they want to feel like readers. If finished-books doesn't move even when streaks do, that's my signal the product is serving the wrong need, and I'd rethink rather than scale.`,
        moveToNotice:
          "I name the failure mode specific to habit products, gaming the metric, and I'd rather catch a streak number that doesn't mean real reading than celebrate it.",
      },
      {
        heading: 'One-line close',
        body: `So: I'd design for the aspiring-but-stalled reader, target the habit-killing gap between sessions first, ship a tight loop of daily goals, streaks, smart reminders and a where-you-left-off recap, measure finished books and active weeks with guardrails against streak-gaming, and treat social and audio as fast-follows once the core loop proves it changes behaviour.`,
      },
    ],
    finalNotes: [
      'Turn "design a product" into one specific user with one specific unmet job before designing anything.',
      'Decompose the behaviour into a MECE funnel (choose → start → sustain → return) before naming features; intention dies at exactly one transition, so design for that one.',
      'Rank the needs and build for the biggest blocker first, not all of them at once.',
      'Scope the MVP around the single riskiest assumption; cut even good features that do not test it.',
      'Under the "your user doesn\'t really want this" pushback, answer with revealed behaviour, a metric the doubter\'s user can\'t game, and the signal that would prove the premise wrong.',
      'Measure the real behaviour (books finished, active weeks), not vanity (installs, app-opens), and name the metric-gaming failure mode so the metric resists it.',
      'Keep a business model in the corner of your eye even on a user-first design.',
    ],
  },
]
