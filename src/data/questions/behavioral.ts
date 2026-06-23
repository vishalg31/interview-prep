import type { Question } from '../types'

// Authored per interview-answer-writing-skill.md. Difficulty: senior.
// STAR, mostly prose. Senior bar for behavioral is not MECE; it is a probing
// interviewer follow-up (debt + stakeholder trust) handled with ownership, plus
// an honest reflection. Drawn from the demand-forecasting Model Boost.

export const behavioralQuestions: Question[] = [
  {
    slug: 'tell-me-about-shipping-under-ambiguity',
    archetype: 'behavioral',
    vertical: 'logistics',
    difficulty: 'senior',
    prompt: 'Tell me about a time you shipped something under ambiguity.',
    framework: 'STAR',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Situation',
        body: `I owned the demand-forecasting model for a logistics support operation. It predicts hourly contact volume so workforce planning can staff the right number of agents each day. About six months after launch, the forecasts started drifting: we were consistently under-predicting, and staffing was running short on the busiest days.

The ambiguity was that no one could say why. Several things had changed at once, volumes were climbing, the business was running promotions, and the model hadn't been retrained since it went live. Wrong outputs, no confirmed cause.`,
      },
      {
        heading: 'Task',
        body: `My job was to get forecast accuracy back to a usable level, fast. Staffing decisions were being made off these numbers every week, so every week of drift was real understaffing on peak days.

The hard part: the clean fix, a full retrain on fresh data, wasn't available in the timeframe. The retraining pipeline wasn't production-ready and would have taken weeks. So I had to act under genuine ambiguity: a broken output, no confirmed root cause, and no clean lever to pull.`,
        moveToNotice:
          'I frame the ambiguity precisely, wrong output, unknown cause, no clean fix available, rather than just saying "it was unclear". Naming the exact shape of the uncertainty is what sets up the decision I made.',
      },
      {
        heading: 'Action: separate what I was sure of from what I was not',
        body: `I started by separating what changed from what was always weak. Instead of staring at the blended average error, I pulled the error apart by day and by day-of-week. A pattern fell out: the misses weren't random. Volume had ramped roughly 65% since the training period, and the model was stuck near training-era levels, and the gap was worst on specific weekdays, Thursdays and Fridays, where real volume had grown most.

That told me two things. One, the core problem was structural, the world had moved past the model's training data, not a bug to hunt. Two, the error had a stable shape: it tracked day of week. Which meant I could correct it without fully understanding every driver of the surge.`,
        moveToNotice:
          'The unlock was decomposing the error by day-of-week instead of trusting the average. The stable shape it revealed is what let me act safely without a full diagnosis. This mirrors the root-cause move: separate what changed from what was always weak.',
      },
      {
        heading: 'Action: ship a reversible stopgap, keep the real fix moving',
        body: `The "right" answer, retrain, wasn't available in time. So I made a call: ship a lightweight correction layer rather than wait for certainty.

I built a day-of-week scale factor: a multiplier computed from a recent trailing window that nudged each day's raw prediction toward where actual volume had been landing, clipped to a sane range so it couldn't overcorrect. It rode on top of the existing model instead of replacing it, and it sat behind a config toggle so we could roll it back instantly if it misbehaved.

I was explicit with my manager and the ops team that this was a deliberate stopgap, not the final answer, and I set the bar up front: it had to close most of the gap and not make any single day worse. And we kept the proper retrain moving in parallel as the real fix.`,
      },
      {
        heading: 'Result',
        body: `It worked. Over the first five weeks in production, across about 78,000 contacts, weighted error dropped from roughly 40% to 24%. The worst days improved most: Friday went from about 41% error to 24%, and Thursday moved almost as much. Staffing stopped running systematically short on the peak days.

And because it was a thin, toggle-able layer rather than a rebuild, I shipped it in days, not the weeks a retrain would have taken, and we still landed the proper retrain later as the durable fix.`,
      },
      {
        heading: 'The interviewer probes the decision',
        exchanges: [
          {
            speaker: 'interviewer',
            text: "Be honest, a manual scale-factor bolted on a model you admit you couldn't fully explain is a hack, and it's technical debt. And how did you get ops and your manager to bet staffing on a number like that?",
          },
          {
            speaker: 'candidate',
            text: "Both fair, and I'd take them separately. On the debt: it was debt taken on deliberately, not a hack I dressed up as a fix. I time-boxed it, clipped it so it couldn't overcorrect, put it behind a toggle for instant rollback, and kept the proper retrain moving in parallel, so it had a defined payoff and a defined exit. That's the difference between a bridge and a leak. On trust: I didn't ask anyone to believe a black box. I showed them the stable day-of-week shape in the error, agreed the success bar with them up front, close most of the gap and make no single day worse, and committed to rolling it back the moment it breached that bar. People will act on a number they can't fully derive if they can see the evidence behind it and know exactly when you'll pull it. If it had made any day worse, the toggle came out, and that was agreed before we shipped, not after.",
          },
        ],
        moveToNotice:
          "Probed on judgment and on stakeholder trust, I own the tradeoff instead of defending it: deliberate, time-boxed debt with a clip, a toggle, an agreed success bar, and a parallel real fix. Trust came from showing the evidence and pre-agreeing the rollback, not from authority.",
      },
      {
        heading: 'Reflection',
        body: `What I took from it: under ambiguity the instinct is to wait for certainty, the full diagnosis, the clean fix. The unlock was separating the parts I was sure of from the parts I wasn't. I couldn't explain every driver of the surge, but I could see the error had a stable, day-of-week shape, and that was enough to act on safely and reversibly.

I'd do the same again: find the part of the problem you can be confident about, ship a reversible fix that addresses it, and keep the proper solution moving in parallel. The one thing I'd do earlier is the accuracy monitoring that eventually caught the drift, we found it later than we should have, and that's the change that would have made the whole episode smaller.`,
        moveToNotice:
          'The reflection is honest and specific, the monitoring gap I would close, not a humble-brag. A real "what I would do differently" is what separates a strong behavioral answer from a rehearsed one.',
      },
    ],
    finalNotes: [
      'Pick a story with genuine ambiguity (unknown cause, no clean fix), not just a hard project; the prompt is testing how you act without certainty.',
      'Use STAR, and keep the Action the longest part. The interviewer is buying the decisions you made, not the backstory.',
      'Say "I", not "we". Own the specific call you made and the tradeoff you accepted.',
      'Quantify the result with real numbers (here, ~40% to 24% error, shipped in days), and tie it back to the stakes you set up.',
      'Expect a follow-up probe (was it just tech debt? how did people trust it?). Own the tradeoff: deliberate, time-boxed, reversible, with an agreed success bar, not a defence.',
      'The move under ambiguity: isolate the part you are sure of, ship a reversible fix for it, and keep the proper solution moving in parallel.',
      'Close with an honest, specific reflection, what you would do differently, not a disguised brag.',
    ],
  },
]
