import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: warmup.
// Warmup: one clarifying exchange, structure-first, sanity-check, fewer moves.
// Senior-bar touch kept light here: the decomposition identity and the MECE
// intensity segmentation are named explicitly; no forced pushback on a warmup.

export const estimationQuestions: Question[] = [
  {
    slug: 'upi-transactions-per-day-india',
    archetype: 'estimation',
    vertical: 'generic',
    difficulty: 'warmup',
    prompt: 'How many UPI transactions happen in India per day?',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Clarify the scope',
        body: `A quick scope check before I start multiplying.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Are we counting all UPI transactions including person-to-person transfers, or just merchant payments? And per day on an average day, not a festival peak?',
          },
          {
            speaker: 'interviewer',
            text: 'All UPI, P2P and merchant. An average day.',
          },
          {
            speaker: 'candidate',
            text: "Good. P2P is the bulk of UPI volume, so including it changes the answer a lot. I'll build it bottom-up from users and their daily usage, and keep round numbers so the arithmetic stays clean.",
          },
        ],
        moveToNotice:
          "I confirm scope before estimating. P2P-versus-merchant roughly triples the answer, so that one clarification is worth more than any later precision.",
      },
      {
        heading: 'Choose an approach and name the structure',
        body: `I'll go bottom-up. The structure is a simple identity: **transactions per day = active UPI users × transactions per user per day.** Bottom-up beats top-down here because I have a decent feel for per-person behaviour, and the identity makes every assumption visible and easy to challenge.

I won't use a single blended rate for the second term, that hides the truth. I'll segment users into intensity bands that are mutually exclusive and collectively exhaustive, so every active user falls in exactly one band and the bands sum back to the whole population.`,
        moveToNotice:
          "I write the estimate as an explicit identity and refuse a single blended rate, segmenting usage into MECE intensity bands instead. A bottom-up estimate is only as honest as the structure under it.",
      },
      {
        heading: 'Build the structure and plug in numbers',
        body: `**Population.** India is about 1.4 billion people, of whom roughly 600 million have smartphones. Adoption among smartphone owners is high, so I'll assume about 300 million active UPI users. That sits comfortably against the widely-quoted "300 million-plus UPI users" figure.

**Usage per user, in MECE intensity bands** (every active user is in exactly one):

- **Heavy** (pay for everything by QR, send money often): ~100 million doing ~5 transactions a day.
- **Regular** (a few payments a day): ~150 million doing ~2 a day.
- **Light** (occasional): ~50 million doing ~0.5 a day.

**Multiply and add:**

1. Heavy: 100M × 5 = 500M
2. Regular: 150M × 2 = 300M
3. Light: 50M × 0.5 = 25M

That totals about **825 million transactions a day**, so call it roughly 800 million to 1 billion.`,
      },
      {
        heading: 'Sanity-check and sensitivity',
        body: `**Sanity check.** That is about 25 billion a month, which matches the order of magnitude of the real published monthly figures (in the low tens of billions). So the estimate is in the right ballpark, which is what an estimate is for.

**What swings it most.** The answer is most sensitive to two assumptions: the active-user count and the heavy-user rate. If heavy users do 7 a day instead of 5, the total jumps by 200 million. So with more time I'd tighten those two first, not the light-user tail, which barely moves the result.`,
        moveToNotice:
          "I sanity-check against a known anchor, then say which assumption the answer is most sensitive to. An estimate without a sense of its own error bars is not finished.",
      },
      {
        heading: 'One-line close',
        body: `So: roughly 800 million to 1 billion UPI transactions a day, built from about 300 million active users at a blended two-to-three transactions each, driven mostly by heavy P2P-and-merchant users. I'm confident on the order of magnitude; the numbers I'd most want to verify are the active-user count and the heavy-user rate.`,
      },
    ],
    finalNotes: [
      'Confirm scope first (here, P2P vs merchant). The biggest estimation error is usually a scope misread, not arithmetic.',
      'Write the estimate as an explicit identity (users × transactions per user), then pick bottom-up when you have a feel for per-person behaviour.',
      'Refuse a single blended rate: segment into MECE intensity bands so every unit is counted once and the bands sum to the whole.',
      'Keep numbers round so the arithmetic stays clean and checkable out loud.',
      'Sanity-check against a known anchor, and name the assumption the answer is most sensitive to.',
    ],
  },
]
