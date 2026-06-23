import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: senior (senior bar:
// structure the experience as a MECE value loop and locate the weakness, hold
// the thesis under "users don't care" pushback, tie the fix to a falsifying metric).
// Candidate-led: the candidate picks the product, so the clarify stage is light.

export const productCritiqueQuestions: Question[] = [
  {
    slug: 'product-you-love-and-how-to-improve-it',
    archetype: 'product-critique',
    vertical: 'consumer-tech',
    difficulty: 'senior',
    framework: 'Value loop (discover → consume → keep/build taste → share)',
    prompt: 'Tell me about a product you love, and how you would improve it.',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Pick the product and the lens',
        body: `I'll pick Spotify. A quick check on the lens before I dig in.`,
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Do you want me to critique it as a user-experience and product call, or include the business and strategy angle?',
          },
          {
            speaker: 'interviewer',
            text: 'User and product is fine, but flag business implications where they matter.',
          },
          {
            speaker: 'candidate',
            text: "Good. I'll go deep on one real weakness rather than list ten, and tie the fix to a metric. I'm critiquing the core music experience, not the podcast push.",
          },
        ],
        moveToNotice:
          "I pick one product and one lens, and commit to going deep on a single weakness. A scattershot list of ten nitpicks is the weak version of this answer.",
      },
      {
        heading: 'What it is for, who, and the job',
        body: `Spotify's core job for me: be the effortless soundtrack to my day, and keep me discovering music I'll love without work. Its user is the broad listener who wants both familiarity and novelty at near-zero effort. The genius is that it makes discovery passive, Discover Weekly, autoplay, radio, you find new music without trying.`,
      },
      {
        heading: 'What works, briefly',
        body: `Credit where it's due: passive discovery is best-in-class. Discover Weekly and the daily mixes are uncannily good, autoplay keeps the music going, and the cross-device handoff is seamless. For "play me something good," nothing beats it. I won't dwell here, because the interesting part is where that same strength creates a gap.`,
      },
      {
        heading: 'Structure the experience before critiquing (MECE)',
        body: `Before I pick a weakness, I'll lay the whole experience out as a loop, so the critique is a located judgement, not a cherry-picked gripe. The job for this user runs as a value loop, and these stages are exhaustive of the core music experience: **discover → consume → keep and build taste → share.** I'll grade each and go after the one that is both weakest and highest-leverage:

- **Discover:** best-in-class, as above.
- **Consume:** excellent, seamless playback and cross-device handoff.
- **Keep / build taste:** the weak link, and the one I'll target.
- **Share:** fine, but secondary to the core job.

Discovery being the strongest stage is exactly what makes "keep" the highest-leverage gap: the better the firehose, the more it hurts to let the wins drain.`,
        moveToNotice:
          "I structure the whole experience as a loop and grade every stage before naming the weakness, so it's a located judgement, not a pet gripe. The strongest stage (discover) is precisely what makes the weakest (keep) matter most.",
      },
      {
        heading: 'The biggest weakness, segmented',
        body: `The biggest weakness, for the engaged-but-not-power-user segment: Spotify is excellent at *finding* music and poor at *keeping* what you found. The whole product optimises for the next passive play, not for the loop of "I heard something I loved, help me hold onto it and build my taste."

Concretely: a song plays on autoplay, I love it, and a day later I can't get back to it. Liking a song dumps it into one giant, undifferentiated Liked Songs list. There's no easy "where did I hear this," no lightweight way to organise discoveries into something I'll actually revisit. So discovery is a firehose with a leaky bucket: the platform keeps finding me music and quietly lets the wins drain away.

I'd segment this carefully. Hardcore curators make playlists obsessively and don't feel it; pure lean-back listeners don't care. It bites the large middle: people engaged enough to want to keep what they discover, but not enough to do manual playlist labour.`,
        moveToNotice:
          "I find where the product's biggest strength creates its biggest gap, and name the exact segment it hurts. That's more useful than critiquing something everyone already complains about.",
      },
      {
        heading: 'The improvement, prioritised',
        body: `The fix targets the leaky bucket without adding curation labour:

- **A "recently discovered" memory:** an automatic, browsable history of new-to-you songs you reacted to, played fully, replayed, liked, with where you heard them. Closes the "I can't find that song" gap with zero manual work.
- **One-tap lightweight organisation:** from that memory, save into auto-suggested small collections ("songs like your Tuesday run mix") rather than one giant Liked list.
- **A discovery-retention nudge:** a weekly "keepers from your discoveries" surface, so the wins compound into taste instead of draining.

I'd ship the recently-discovered memory first: it's the smallest piece that tests the core thesis, that engaged listeners want to retain discoveries, and it needs no new content deals or heavy ML.`,
      },
      {
        heading: 'The interviewer pushes back',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "You've picked the one weakness with a tidy fix. But isn't the real reason people don't organise their discoveries simply that they don't care? Spotify's whole bet is lean-back and passive, that's why people chose it. Aren't you bolting active-curation behaviour onto users who went passive precisely to avoid it?",
          },
          {
            speaker: 'candidate',
            text: "It's the risk that would sink this, so I'd answer it on evidence, not taste. First, I'm deliberately not proposing curation labour, that's the trap: the fix is automatic, a memory that records what you already reacted to, with one-tap organisation, so it asks nothing of the lean-back user. Second, the segment's revealed behaviour says they do care, this middle group already likes and replays songs, which is them expressing 'I want to keep this' and then failing to retrieve it. That's unmet intent, not absent intent. Third, the two readings make different predictions and the leading metric separates them within weeks: if the share of discovered songs revisited rises once retrieval is frictionless, the want was real; if revisit rate stays flat even then, you're right, the firehose is what they want, and I kill the feature rather than scale it. So a flat revisit rate is the result that changes my mind, and I'd rather learn it from the leading metric than from a failed launch.",
          },
        ],
        moveToNotice:
          "Challenged that my weakness isn't one users feel, I answer with the fix's design (automatic, not curation labour), the segment's revealed behaviour (they already like and replay), and the leading metric that would falsify the thesis fast.",
      },
      {
        heading: 'Metric to validate',
        body: `I'd validate in layers:

- **Leading:** the share of discovered songs revisited within two weeks, and usage of the new memory surface. A direct read on whether retention-of-discovery is real.
- **Lagging headline:** retention and listening of the target middle segment, are they listening more and staying because their discoveries stick?
- **Guardrails:** it doesn't cannibalise the passive-discovery magic (people still let autoplay run), and it doesn't add clutter that hurts the lean-back experience.`,
      },
      {
        heading: 'Risks, and how I would de-risk',
        body: `Beyond the "do users care" challenge already handled, two more I'd guard against:

**It could clutter a deliberately simple product.** Spotify's strength is effortlessness; a new surface risks adding cognitive load. So it has to be automatic and tucked away, not another tab demanding work.

**Business angle:** retaining discovery deepens engagement, which helps retention and premium value, so it likely aligns with the business. But if it pulled listening away from the algorithmic surfaces Spotify steers and monetises, that's a tension I'd watch.`,
        moveToNotice:
          "Even with the user thesis defended, I protect the thing that makes the product great: the fix must not tax the lean-back simplicity, and I name the one business tension (pulling listening off the surfaces Spotify monetises) worth watching.",
      },
      {
        heading: 'One-line close',
        body: `So: I love Spotify for making discovery effortless, its biggest weakness is that the same design lets discoveries drain away for the engaged middle, I'd fix it with an automatic recently-discovered memory and lightweight one-tap organisation, validate with revisit-rate and segment retention, and hold guardrails so the fix doesn't clutter the lean-back magic that makes the product great.`,
      },
    ],
    finalNotes: [
      'Pick one product and one lens, and commit to depth on a single weakness over a list of nitpicks.',
      'State the product\'s core job and who it is for before critiquing; the critique only makes sense against the job.',
      'Structure the experience as a MECE value loop (discover → consume → keep → share) and grade every stage, so the weakness is a located judgement, not a pet gripe.',
      "Find where the product's biggest strength creates its biggest gap, and name the exact segment it hurts.",
      'Propose a prioritised fix and ship the smallest piece that tests your thesis first.',
      'When challenged that the weakness isn\'t real, answer with the fix\'s design, the segment\'s revealed behaviour, and the leading metric that would falsify your thesis.',
      'Validate with a metric in layers, and flag the business implication even in a user-led critique.',
    ],
  },
]
