import type { Question } from '../types'

// Ported from the S&O interview framework, candidate-led / UCAT-style. Content
// reused as-is, not rewritten. Per-turn annotations (why / data / score) and the
// root-cause tables come straight from the source. Each case links to the shared
// method guide via referenceSlug. See interview-answer-writing-skill.md section
// on candidate-led problem-solving cases.

export const soCaseQuestions: Question[] = [
  {
    slug: 'n26-onboarding-completion-decline',
    archetype: 'so-case',
    vertical: 'fintech',
    difficulty: 'standard',
    framework: 'COGS+FI / MECE',
    referenceSlug: 'so-framework',
    prompt:
      'At N26, our customer onboarding completion rate has been declining. What would you do?',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Confirm the objective',
        exchanges: [
          {
            speaker: 'candidate',
            text: "Before I dive in, let me confirm I understand the objective. You've mentioned that N26's customer onboarding completion rate is declining, so customers who start the process are not finishing it. My goal is to diagnose where and why the drop-off is happening, identify root causes, and propose solutions that are feasible, creative, and cover both short and long term. Is that the right framing, and are we focused on retail customers or business customers?",
            annotation: {
              kind: 'score',
              text: "You've restated the problem, shown you understand the business implication (lost activated users), and asked a smart scope-clarifying question. Most candidates skip this entirely.",
            },
          },
          {
            speaker: 'interviewer',
            text: "Yes, that's correct. Retail customers. You can proceed.",
          },
        ],
      },
      {
        heading: 'Clarifying questions, five batches',
        body: 'Spend the most time here. Extract the funnel, the segmentation, and the data before structuring anything.',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Batch 1, scale and timing. What is the current onboarding completion rate and what was it before the decline? And is this a sudden drop or a gradual trend over months?',
            annotation: {
              kind: 'why',
              text: 'Magnitude tells you urgency. Sudden = an event trigger (product change, new vendor). Gradual = structural drift.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Dropped from 72% to 54% over 4 months. Gradual decline.',
            annotation: {
              kind: 'data',
              text: '18 percentage points over 4 months. Gradual = structural. Write it down.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 2, the funnel. Could you walk me through each step end to end, for example app download, registration, KYC, document upload, activation? And do you have data on which step has the biggest drop-off?',
            annotation: {
              kind: 'why',
              text: 'The funnel steps become your MECE buckets. The drop-off location is your primary suspect bucket. This single question often reveals the root-cause direction.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Funnel: App Download, Registration, KYC and identity verification, Document Upload, Account Activated. The biggest drop-off is at KYC, about 35% of users who reach it do not complete it.',
            annotation: {
              kind: 'data',
              text: 'KYC is the primary suspect. 35% abandonment at that specific step. The MECE structure now has its heavy bucket.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 3, segmentation. One, is the KYC drop-off uniform across all geographies or concentrated in specific markets? Two, is there a difference between mobile and desktop users? Three, has the KYC process itself changed in the last 4 months, a new vendor, new document requirements, or a regulatory update?',
            annotation: {
              kind: 'why',
              text: 'Segmentation is the fastest path to root cause. One market = a local issue. All markets = a product issue. A process change that coincides with the drop is the smoking gun.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Higher drop-off in newer markets, Eastern Europe and LatAm. Mobile and desktop similar. A new KYC vendor was introduced 5 months ago for these markets, with stricter document requirements.',
            annotation: {
              kind: 'data',
              text: 'New vendor 5 months ago, decline started 4 months ago. A one-month lag is a timeline correlation. This is almost certainly the smoking gun.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 4, qualitative signal. Do we have data on why users abandon KYC, support tickets, exit surveys, app reviews? What is the average time users spend on KYC before abandoning? And how many of those who abandon come back within 7 days?',
            annotation: {
              kind: 'why',
              text: 'Qualitative data tells you WHY (document confusion, technical error, frustration). Time-on-step tells you if users are trying or immediately bouncing. Return rate tells you if recovery is possible.',
            },
          },
          {
            speaker: 'interviewer',
            text: "Support tickets show users don't know which documents are accepted and are submitting the wrong types. Average time before abandonment: 4 minutes. Only 15% return within 7 days.",
            annotation: {
              kind: 'data',
              text: 'Document-type confusion is a UX and communication failure. 4 minutes means users are trying but hitting a wall. 85% permanent loss means high urgency.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 5, impact and constraints. One, how many users start onboarding each month, and what would recovering to 72% mean in additional activated users? Two, are there regulatory constraints on simplifying KYC, or is the UX flexible? Three, is there an existing squad working on onboarding?',
            annotation: {
              kind: 'why',
              text: 'Quantified impact lets you frame solution value. Regulatory constraints define the solution boundary. Squad availability shapes timelines.',
            },
          },
          {
            speaker: 'interviewer',
            text: '50,000 users start monthly. Restoring to 72% is about 9,000 additional activations a month. We cannot remove verification steps but the UX is flexible. The existing onboarding squad is currently occupied.',
            annotation: {
              kind: 'data',
              text: '9,000 users a month at stake. No regulatory blocker for UX changes. A squad exists but is occupied, so the first solutions must be low-resource.',
            },
          },
        ],
      },
      {
        heading: 'Structure the problem, MECE',
        body: `Let me lay out my structure. Onboarding is a process, so I'll use a value-chain split. Bucket A, Pre-KYC: acquisition quality and registration friction. Bucket B, the KYC process itself, the step with 35% abandonment, my primary suspect. Bucket C, Post-KYC recovery: what happens to users who abandon. I'll spend most time on Bucket B since the data points there strongly.

- **A. Pre-KYC** (low risk)
  - Acquisition quality, are the right users entering the funnel?
  - Registration friction, steps, load time, UX
- **B. KYC process** (primary suspect)
  - Document guidance, do users know what is accepted?
  - Vendor performance, rejection UX, processing time
  - Error messaging, are rejections clearly explained?
- **C. Post-KYC recovery** (amplifier)
  - Re-engagement, push and email after abandonment
  - Save-and-resume, can users pick up where they left off?`,
        moveToNotice:
          'Name your buckets and your lead hypothesis out loud before any analysis. Stating the structure first signals structured thinking, not just data collection.',
      },
      {
        heading: 'Analysis and root cause',
        body: `Bucket A, Pre-KYC: 50,000 users a month are still entering the funnel, so acquisition volume has not dropped and registration is not the issue. Low risk, moving on.

Bucket B, KYC: this is where the problem lives. 35% abandonment, and users spend 4 minutes before quitting, so they are trying, not bouncing. Support tickets confirm they are submitting the wrong document types. The new vendor arrived 5 months ago, the decline started 4 months ago, and that one-month lag is the smoking gun: the vendor brought stricter rules that were never communicated to users in the product.

Bucket C, recovery: 85% of abandoners never return, and there is almost no recovery mechanism today. This amplifies Bucket B, every abandoned user is permanently lost.`,
        table: {
          headers: ['Root cause', 'Evidence', 'Priority'],
          rows: [
            [
              'Document guidance gap in the UI',
              'Support tickets, 4-minute abandonment, wrong uploads',
              'Highest',
            ],
            [
              'KYC vendor UX friction',
              'New vendor 5 months ago, stricter rules, poor rejection messaging',
              'Medium',
            ],
            [
              'No recovery mechanism',
              '85% permanent abandonment, no re-engagement',
              'Medium',
            ],
          ],
        },
      },
      {
        heading: 'Solutions, feasible and creative',
        body: `Bucket B is the priority, so I sequence the fixes from cheapest and fastest outward.

**Immediate, 0 to 2 weeks, near-zero cost: country-specific document guide.** Add a dynamic checklist at KYC entry showing exactly which documents are accepted per country, with inline examples. No backend work, a content and UI change only.

**Short-term, 2 to 8 weeks, low cost: KYC recovery flow plus save-and-resume.** Trigger a push and email one hour after abandonment, "You're almost there, here's exactly what you need," and let users resume instead of restarting. Recovers an estimated 20% of the 9,000 lost users a month.

**Long-term, 2 to 6 months, medium cost: vendor SLA plus alternative verification.** Renegotiate the vendor SLA to include clear rejection-messaging standards, and pilot video-selfie verification for lower-risk markets as an alternative to document upload.

**One creative solution: a proactive KYC assist trigger.** If a user is on the KYC screen for more than 90 seconds without completing, surface "Having trouble? Our team can help right now." It prevents abandonment before it happens, needs no regulatory change, uses existing support infrastructure, and can be A/B tested in two weeks.`,
      },
      {
        heading: 'Measure success',
        body: `I'd measure in layers:

- **Leading indicator, week 2: wrong-document submission rate.** Target down 30%. Tells you the guidance fix is working before the completion rate moves.
- **Primary KPI, month 3: KYC completion rate.** 54% back to 68% in 90 days, about 7,000 additional activations a month.
- **Long-term health, month 6: new-market onboarding parity.** Eastern Europe and LatAm within 5 points of established markets.
- **Guardrail, ongoing: KYC fraud rate.** Must not increase, this confirms we have not compromised regulatory integrity.`,
      },
      {
        heading: 'Bottom line',
        body: `N26's onboarding decline is not a volume problem, 50,000 users still enter monthly. It is process friction at KYC, driven by poor document guidance and a new vendor whose rejection UX causes 85% permanent loss. Add country-specific document guidance this week at near-zero cost, build a recovery flow in month one, renegotiate the vendor SLA by month six. This recovers about 7,000 activations a month and builds a scalable onboarding model for every new market N26 enters.`,
      },
    ],
  },

  {
    slug: 'monzo-revenue-growth-slowdown',
    archetype: 'so-case',
    vertical: 'fintech',
    difficulty: 'standard',
    framework: 'COGS+FI / MECE',
    referenceSlug: 'so-framework',
    prompt:
      'Revenue at Monzo has been growing slower than expected this quarter. What would you do?',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Confirm the objective',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Let me confirm the objective. Revenue growth has slowed this quarter relative to expectations. Is the goal to diagnose why growth slowed and fix it, or to identify new growth levers to accelerate beyond previous rates? And are we talking about total revenue or a specific revenue stream? That will sharpen my analysis significantly.',
            annotation: {
              kind: 'score',
              text: 'Distinguishing "fix the slowdown" from "find new growth," and "total versus specific revenue," shows you think in precision, not generalities.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Total revenue growth has slowed. The goal is to diagnose the cause and propose ways to return to and exceed previous growth rates.',
          },
        ],
      },
      {
        heading: 'Clarifying questions, five batches',
        body: 'Revenue equals volume times price. Ask which side is breaking and where in the funnel.',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Batch 1, scale and timing. What was the expected growth rate versus actual this quarter? Has this deteriorated gradually or suddenly? And did anything change in the business around the same time, a product update, pricing change, or new competitor launch?',
            annotation: {
              kind: 'why',
              text: 'Magnitude of shortfall tells you urgency. Event correlation surfaces root-cause candidates before you have done any analysis.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Expected 20% quarter-on-quarter growth, achieved 11%. Gradual slowdown over 3 months. A major competitor launched a fee-free FX product two months ago.',
            annotation: {
              kind: 'data',
              text: '9-point shortfall, gradual. A competitor launched fee-free FX 2 months ago, a strong external signal. Note it, but do not jump to it yet.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 2, decomposition. Revenue equals volume times price, so I want to split both. On volume, has the number of active customers grown as expected? On price, has ARPU changed, are users transacting less often, in smaller amounts, or on lower-margin features? And which revenue stream is underperforming, FX, subscriptions, interchange, crypto, or interest income?',
            annotation: {
              kind: 'why',
              text: 'Revenue equals volume times price is your primary MECE split for any revenue problem. Decomposing into streams isolates the problem to one bucket rather than the whole P&L.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Customer numbers are growing on track. The problem is ARPU, average revenue per user has dropped 18% quarter on quarter. FX revenue is down significantly. Subscriptions and interchange are stable.',
            annotation: {
              kind: 'data',
              text: 'Volume is fine, this is a price problem, specifically FX. ARPU down 18%. With a competitor launching fee-free FX, this is almost certainly a competitive pricing response.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 3, funnel and segmentation. On the FX drop, is this a frequency problem, fewer FX transactions, or a value problem, smaller amounts or lower margins? And is the drop uniform across segments, new versus existing, free versus paid, high-frequency versus occasional traders?',
            annotation: {
              kind: 'why',
              text: 'Frequency versus value tells you if users are churning the behaviour or just paying less per transaction. Cohort segmentation tells you if this is an acquisition or a retention problem.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Frequency is down, users are making fewer FX transactions. Most pronounced among free-tier users and occasional traders. Heavy users and Premium subscribers are largely unaffected.',
            annotation: {
              kind: 'data',
              text: 'A frequency problem, not value. Free-tier and occasional users are the most price-sensitive segment, exactly the users a fee-free FX offer would attract.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 4, competitive context. Do we have data on whether users who reduced FX activity are also using the competitor? Any churn-risk signal? And is the fee-free offer unlimited or capped, a sustainable threat or a promotional tactic?',
            annotation: {
              kind: 'why',
              text: 'Whether the threat is structural or promotional changes the response entirely. A promotion calls for a short-term counter; a structural shift calls for a product repositioning.',
            },
          },
          {
            speaker: 'interviewer',
            text: "No direct data on competitor usage. Retention of casual users has dropped 8% quarter on quarter. The competitor's offer has a monthly cap of 500 pounds, above which fees apply.",
            annotation: {
              kind: 'data',
              text: 'The competitor offer is capped at 500 pounds a month, so heavy users who exceed it are safe. The at-risk segment is casual users doing small FX transactions, a very specific, addressable segment.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 5, impact and constraints. What is the revenue impact of the ARPU decline per month in absolute terms? Are there constraints on pricing changes, contractual, regulatory, or policy? And what is the cost of acquiring a new user versus retaining an existing one?',
            annotation: {
              kind: 'why',
              text: 'CAC versus retention cost shows commercial sophistication. Retention is almost always cheaper, but knowing the ratio shapes solution priority.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'The ARPU decline is about 4 million pounds of revenue loss per quarter. No regulatory constraint on FX pricing. CAC is roughly 5 times the monthly revenue of retaining an existing active user.',
            annotation: {
              kind: 'data',
              text: '4 million pounds a quarter at stake. Retention is 5 times cheaper than acquisition, so every solution should prioritise retaining the at-risk casual segment over replacing it.',
            },
          },
        ],
      },
      {
        heading: 'Structure the problem, MECE',
        body: `Revenue equals volume times price. Volume is on track, so this is a price and ARPU problem, specifically in FX. I'll structure across three buckets. Bucket A, pricing competitiveness: is our FX pricing driving users to competitors? Bucket B, product and feature gaps: is the FX product less compelling than alternatives? Bucket C, retention and re-engagement: are we doing enough to keep casual users active? Bucket A is the primary suspect given the competitor timing.

- **A. Pricing competitiveness** (primary suspect)
  - FX spread versus competitor
  - Free-tier FX allowance, is it competitive?
  - Price sensitivity of the casual segment
- **B. Product and feature gaps**
  - FX UX versus competitor, speed, transparency, limits
  - Missing features casual users value
- **C. Retention and re-engagement**
  - Churn signals in the casual segment
  - Re-activation of dormant FX users
  - Upgrade path from free to paid tiers`,
      },
      {
        heading: 'Analysis and root cause',
        body: `Bucket A, pricing: the competitor offers fee-free FX up to 500 pounds a month. Monzo's free tier has a 1,000-pound fee-free limit, actually more generous. But the competitor's "fee-free" marketing creates a perception problem, casual users do not know our limit is higher. This is a communication and positioning failure, not a pricing failure.

Bucket B, product: no evidence of a feature gap. Heavy users are unaffected, and a real product issue would show across all segments.

Bucket C, retention: 8% quarterly churn of casual users is significant, and with CAC at 5 times monthly retention cost this cohort is worth defending hard. The root cause is perception, casual users think Monzo is more expensive when, for their usage level, it is not.`,
        table: {
          headers: ['Root cause', 'Evidence', 'Priority'],
          rows: [
            [
              'Perception gap, users do not know the free limit is higher',
              'Competitor fee-free narrative, casual users reducing FX',
              'Highest',
            ],
            [
              'No proactive retention for the at-risk casual segment',
              '8% quarterly churn, no re-engagement programme',
              'Medium',
            ],
            [
              'Upgrade path from free to paid is unclear',
              'Plus and Premium users unaffected and stickier, but low conversion',
              'Medium',
            ],
          ],
        },
      },
      {
        heading: 'Solutions, feasible and creative',
        body: `**Immediate, 0 to 2 weeks, near-zero cost: FX allowance visibility campaign.** In-app notification and push to all free-tier users, "Did you know you get 1,000 pounds a month fee-free FX, double what the competitor offers." No product change, a pure communication fix for a perception problem.

**Short-term, 1 to 2 months, low cost: at-risk segment re-engagement.** Identify casual users whose FX frequency dropped more than 50% in the last 8 weeks and trigger a personalised nudge, "You haven't converted in a while, here's your remaining free FX allowance this month." Targets the exact cohort before it fully churns.

**Long-term, 3 to 6 months, medium cost: casual-to-Plus upgrade flow.** Build a clear upgrade journey that shows the value gap between free and Plus at moments of friction, when users approach their FX limit. If 5% of 500,000 casual users upgrade, that is significant incremental revenue at near-zero CAC.

**One creative angle: an FX savings counter.** Show users how much they have saved versus traditional bank rates, "You saved 47 pounds in FX fees this month with Monzo." It turns the pricing advantage into a visible, shareable number that competitors cannot easily replicate, since they do not have the same fee differential. Zero cost, high retention signal.`,
      },
      {
        heading: 'Measure success',
        body: `Measured in layers:

- **Leading indicator, week 2: FX transaction frequency for the casual cohort.** Stabilise it within 2 weeks of the campaign, a signal before ARPU moves.
- **Primary KPI, month 3: ARPU recovery.** Back to baseline, about 4 million pounds a quarter recovered.
- **Long-term health, month 6: casual-user retention rate.** 8% quarterly churn down to below 3%, confirming a structural fix, not just a messaging patch.
- **Guardrail, ongoing: free-to-paid upgrade rate.** Must not decline, the upgrade path should improve as casual users see value, not feel pushed.`,
      },
      {
        heading: 'Bottom line',
        body: `Monzo's revenue slowdown is not a product problem or a pricing problem, it is a perception problem. Casual users think Monzo is more expensive than a competitor that is actually offering less. The fix is fast and cheap: communicate the advantage you already have, then build the retention and upgrade mechanics to turn casual users into sticky Plus subscribers. 4 million pounds a quarter is recoverable without a single pricing change.`,
      },
    ],
  },

  {
    slug: 'nubank-cost-optimisation',
    archetype: 'so-case',
    vertical: 'fintech',
    difficulty: 'standard',
    framework: 'COGS+FI / MECE',
    referenceSlug: 'so-framework',
    prompt:
      "Nubank's operational costs have been increasing faster than revenue. How would you approach this?",
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Confirm the objective',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Let me restate the objective. Operational costs are growing faster than revenue, so margins are compressing. My goal is to diagnose which cost categories are driving this, find the root causes, and recommend ways to reduce or control costs without disrupting what works. Before I structure this, are we trying to hit a specific margin target, or to understand the drivers first and then set targets?',
            annotation: {
              kind: 'score',
              text: 'Distinguishing "diagnose and understand" from "hit a specific target" shapes how prescriptive your solutions need to be. Shows executive maturity.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Understand the drivers first, then propose solutions to reverse the trend.',
          },
        ],
      },
      {
        heading: 'Clarifying questions, five batches',
        body: 'Cost equals COGS plus OpEx. Decompose both and find where costs are growing faster than they should.',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Batch 1, scale and timing. What is the current cost-to-revenue ratio versus 12 months ago? Is the increase sudden or gradual? And did anything change in the business at the same time, headcount expansion, new-market entry, a product launch, or a vendor change?',
            annotation: {
              kind: 'why',
              text: 'Cost-to-revenue ratio is the clean metric. A business-event correlation points to root cause before any analysis.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Cost-to-revenue was 65% a year ago, now 82%. Gradual increase over 9 months. Nubank expanded into 5 new markets and headcount grew 45% in that period.',
            annotation: {
              kind: 'data',
              text: '17-point increase, gradual. Two coinciding events: 5 new markets and 45% headcount growth. Both are likely contributors, now decompose which is bigger.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 2, decomposition. I want to split costs into COGS, the direct cost of delivering the product per customer, and OpEx, the overhead to run the business. Which is growing faster? And within each, what are the biggest line items, people, infrastructure, acquisition, compliance?',
            annotation: {
              kind: 'why',
              text: 'COGS versus OpEx is the fundamental MECE split for any cost problem. Growing COGS means delivery is getting more expensive per unit; growing OpEx means overhead is scaling faster than revenue. Very different solutions.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Both are growing but OpEx faster. People costs are the biggest driver, 60% of the total cost base. Customer support costs have doubled. Compliance and legal have grown three times in the new markets.',
            annotation: {
              kind: 'data',
              text: 'OpEx is primary. People are 60% of the base, support doubled, compliance tripled. New markets brought compliance costs that were not modelled before launch, a classic expansion cost surprise.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 3, segmentation. On support costs doubling, is that a higher ticket rate per customer or just more customers? Are tickets disproportionately from new markets or existing ones? And on compliance, are the costs one-time setup or recurring?',
            annotation: {
              kind: 'why',
              text: 'Tickets per customer versus absolute volume tells you product quality versus scale. One-time versus recurring compliance cost changes the solution: you wait out one-time, you fix recurring.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Support ticket rate per customer is up 40%, not just volume. New markets drive 65% of the additional tickets. Compliance costs are roughly 40% one-time and 60% recurring, mainly local regulatory reporting.',
            annotation: {
              kind: 'data',
              text: 'A 40% higher ticket rate is a product or process issue in new markets, not just scale. 60% recurring compliance is a structural cost. These are the two root causes to target.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 4, unit economics. What is the cost per customer in new markets versus established ones? And do we have a payback-period model for the expansion, how long until each new market is revenue-positive? I want to know if this is investment, temporary, or structural, permanent.',
            annotation: {
              kind: 'why',
              text: 'Investment versus structural cost is critical. Investment-phase costs are acceptable and should be time-bounded; structural costs must be engineered down permanently.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Cost per customer in new markets is 2.3 times established markets. No formal payback model exists. Expansion was driven by growth targets, not unit economics.',
            annotation: {
              kind: 'data',
              text: '2.3 times cost per customer is very high, and no payback model means expansion was not properly modelled. This is a strategic process gap as much as a cost problem.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 5, constraints and impact. Are there constraints on headcount reduction, local employment law or hiring commitments? And what is the cost of not acting, if costs continue at this rate, when does the business hit a margin floor that forces external action?',
            annotation: {
              kind: 'why',
              text: 'Employment-law constraints decide whether headcount reduction is even viable short-term. The cost of inaction frames urgency without being alarmist.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'No major employment-law constraints. At the current trajectory margins compress to single digits within 6 months. Leadership is treating this as high priority.',
            annotation: {
              kind: 'data',
              text: 'A 6-month runway, high priority. Solutions must be fast-acting, short-term wins are essential, not just long-term restructuring.',
            },
          },
        ],
      },
      {
        heading: 'Structure the problem, MECE',
        body: `Profit equals revenue minus costs, and revenue is growing, so this is a cost-structure problem. Three buckets. Bucket A, direct delivery costs: cost per customer, support, infrastructure. Bucket B, expansion overhead: compliance, legal, local operations driven by new markets. Bucket C, organisational efficiency: headcount-to-revenue and automation. Buckets B and C are the primary suspects.

- **A. Direct delivery costs (COGS)**
  - Support ticket rate per customer, a product-quality issue?
  - Infrastructure cost per transaction
- **B. Expansion overhead** (primary suspect)
  - Compliance and regulatory reporting, 60% recurring
  - New-market setup costs not yet amortised
  - No unit-economics model for new markets
- **C. Organisational efficiency** (primary suspect)
  - Headcount grew 45%, faster than revenue
  - Support automation, self-serve deflection rate
  - Process duplication across markets`,
      },
      {
        heading: 'Analysis and root cause',
        body: `Bucket A, direct costs: the 40% higher ticket rate in new markets is a product issue, not just volume. New-market users hit more friction, language, document types, local payment methods, and escalate to support. That is a solvable product problem, not a permanent structural cost.

Bucket B, expansion overhead: compliance is 60% recurring and local regulatory reporting is non-negotiable. But with no payback model, some of these 5 markets may never reach cost-positive at current scale. This is the most important strategic finding, cost was incurred without validating revenue potential.

Bucket C, organisational efficiency: 45% headcount growth has outpaced revenue, much of it support roles concentrated in new-market operations. A significant share of support volume is deflectable through automation, established markets likely run on lower support-to-customer ratios.`,
        table: {
          headers: ['Root cause', 'Evidence', 'Priority'],
          rows: [
            [
              'Product friction in new markets driving a high support rate',
              '40% higher ticket rate, 65% from new markets',
              'Highest',
            ],
            [
              'Expansion without a unit-economics model',
              '2.3 times cost per customer, no payback period, some markets may be structurally unprofitable',
              'Highest',
            ],
            [
              'Low support automation, manual handling of deflectable tickets',
              'Support costs doubled, automation opportunity exists',
              'Medium',
            ],
          ],
        },
      },
      {
        heading: 'Solutions, feasible and creative',
        body: `**Immediate, 0 to 4 weeks, low cost: support deflection via self-serve.** Build localised FAQs and in-app guided flows for the top 10 ticket types in new markets, targeting 30% deflection. Each percentage point of deflection cuts the support headcount requirement by about 0.5 FTE at scale.

**Short-term, 1 to 3 months, zero cost, analytical: new-market unit-economics audit.** Build a payback-period model for each of the 5 markets, identifying which are on a path to unit-economics-positive and which are not. For markets with no viable path, consider pausing active investment while maintaining presence.

**Long-term, 3 to 6 months, medium cost: shared services plus compliance automation.** Centralise compliance reporting across new markets into a shared-services function and automate report generation where rules allow. Eliminates duplicated compliance headcount across 5 markets running parallel teams.

**One creative process fix: a unit-economics gate on future expansion.** Before any new-market launch, require a payback-period model and a cost-per-customer projection against established-market benchmarks. It prevents the problem recurring and costs nothing, it is a process change, not a product change.`,
      },
      {
        heading: 'Measure success',
        body: `Measured in layers:

- **Leading indicator, week 4: support-ticket deflection rate.** 25 to 30% deflection in new markets within 4 weeks of the self-serve launch.
- **Primary KPI, month 3: cost-to-revenue ratio.** 82% down to below 72% in 90 days, reversing the trend and buying runway.
- **Long-term health, month 6: cost per customer, new versus established.** New-market ratio falls from 2.3 times to below 1.5 times established markets.
- **Guardrail, ongoing: customer-satisfaction score.** Must not decline, cost reduction should not come at the expense of service quality.`,
      },
      {
        heading: 'Bottom line',
        body: `Nubank's cost problem is not a spending problem, it is an expansion-without-unit-economics problem. Five markets were entered without validating whether they would ever be cost-positive. The immediate fix is support deflection, cheap, fast, and aimed at the highest-cost symptom. The strategic fix is a market-by-market audit plus a permanent unit-economics gate on future expansion. Done right, this reverses the cost-to-revenue trend within 90 days and prevents the same mistake in the next 5 markets.`,
      },
    ],
  },

  {
    slug: 'revolut-india-market-entry',
    archetype: 'so-case',
    vertical: 'fintech',
    difficulty: 'standard',
    framework: 'COGS+FI / MECE',
    referenceSlug: 'so-framework',
    prompt:
      'Revolut is considering entering a new market. How would you evaluate this?',
    updatedAt: '2026-06-22',
    answer: [
      {
        heading: 'Confirm the objective',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Before I structure this, let me confirm the objective. Revolut is considering a new market and wants to know how to evaluate whether to do it. Is this a specific market already identified, or the question of which market to enter next? And what is the primary goal, revenue growth, geographic diversification, or pre-empting a competitor? That shapes whether I focus on opportunity validation or market selection.',
            annotation: {
              kind: 'score',
              text: 'Distinguishing "should we enter Market X" from "which market should we enter" is a sharp scope question. It shows you will not waste 40 minutes solving the wrong problem.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'The market is India. The goal is revenue growth. Revolut is preparing to launch its consumer product there.',
          },
        ],
      },
      {
        heading: 'Clarifying questions, five batches',
        body: 'Market attractiveness, competitive landscape, product fit, regulatory reality, and the financial model.',
        exchanges: [
          {
            speaker: 'candidate',
            text: 'Batch 1, organic signal and current state. First, does Revolut have existing Indian users today, even without a local product? That tells us whether there is organic demand. Second, is this a decision of whether to enter or how to enter? Third, what is the budget and the expected timeline to first revenue?',
            annotation: {
              kind: 'why',
              text: 'Organic signal is the most powerful demand proof, customers pulled the product before being pushed. "Whether to enter" versus "how to enter" completely changes the framework you apply.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Revolut has about 50,000 Indian users organically, mostly NRIs and tech workers. The decision is how to enter, not whether. Budget is 20 million pounds. Timeline: first customers within 12 months.',
            annotation: {
              kind: 'data',
              text: '50,000 organic users confirms the demand signal. "How to enter" means skip the viability debate and go straight to strategy. 20 million pounds, 12 months, write these down.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 2, market structure. What is digital-payments penetration today, and which segments are well-served versus underserved? And what is the regulatory situation, does Revolut have or need a full banking licence, a payments licence, or can it operate as a prepaid-instrument issuer? That defines which features are available at launch.',
            annotation: {
              kind: 'why',
              text: 'Regulatory reality defines the product surface. Without a full banking licence, Revolut cannot offer savings accounts, credit, or insured deposits, which shapes the competitive positioning.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Digital payments are highly penetrated, UPI processes over 10 billion transactions a month. Revolut has a prepaid-payment-instrument licence only, no full banking licence yet, so it cannot offer savings accounts or credit at launch.',
            annotation: {
              kind: 'data',
              text: 'UPI dominates domestic payments, do not compete there. A prepaid licence only means a limited product. The niche must work within these constraints, international transfers or premium multi-currency are the natural plays.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 3, competitive landscape. Who dominates across segments today, domestic payments, international transfers, and neobanking? And where are they weakest, what does Revolut do better than any of them for a specific segment?',
            annotation: {
              kind: 'why',
              text: 'You never enter a market broadly, you enter a niche where incumbents are weakest and you are strongest. Identifying the gap before proposing strategy shows competitive sophistication.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Domestic payments: PhonePe, Google Pay, and Paytm dominate via UPI, very hard to displace. International transfers: Wise is present but expensive for the India corridor. Neobanking: Fi, Jupiter, and Niyo exist but focus on savings and are weak on international. Traditional banks are weak on UX and international FX.',
            annotation: {
              kind: 'data',
              text: 'Clear gap: international transfers and multi-currency for Indians who work abroad, travel, or deal with foreign employers. Wise is the competitor but expensive, so Revolut\'s pricing advantage applies directly.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 4, target segment and product fit. The 50,000 organic users, do we know what they use Revolut for, international transfers, travel spending, holding foreign currency? And how large is the addressable segment, how many Indians regularly move money internationally or hold multi-currency accounts?',
            annotation: {
              kind: 'why',
              text: 'The organic users reveal the beachhead segment without any market research. If they use it for international transfers, that IS the product-market-fit signal.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Organic users are primarily NRIs sending money to family in India, and Indian tech workers receiving USD or GBP salary. The addressable segment is about 3 million Indians who regularly transact internationally. Long-term target: 150 million users.',
            annotation: {
              kind: 'data',
              text: 'Beachhead 3 million international transactors, long-term 150 million. A classic expand-from-niche-to-mass playbook. NRIs and tech workers are high ARPU, lower CAC, and natural referrers.',
            },
          },
          {
            speaker: 'candidate',
            text: 'Batch 5, constraints and risk. One, what are the biggest risks to this entry, regulatory, competitive, or operational? Two, is a partnership route available to accelerate time-to-market, or must Revolut build all the infrastructure itself?',
            annotation: {
              kind: 'why',
              text: 'The risk question surfaces what can go wrong before you commit. The partnership-versus-build question directly shapes the entry-strategy recommendation.',
            },
          },
          {
            speaker: 'interviewer',
            text: 'Biggest risks: the full banking-licence timeline is uncertain, possibly 3 years or more; RBI requirements are stringent; and UPI integration is mandatory for adoption. A partnership with an Indian payment aggregator is available and would accelerate UPI access. Building independently takes 12 to 18 months longer.',
            annotation: {
              kind: 'data',
              text: 'Partnership is the clear accelerant. The full banking licence is long-dated, plan around it, not for it. UPI integration via a partner is table stakes for adoption.',
            },
          },
        ],
      },
      {
        heading: 'Structure the problem, MECE',
        body: `For a market-entry decision I'll structure across three dimensions. Bucket A, market attractiveness: is India worth entering and what is the revenue potential? Bucket B, competitive viability: where can Revolut win given the constraints? Bucket C, entry strategy: the optimal route to market. Given the "how to enter" framing, I'll spend most time on Buckets B and C.

- **A. Market attractiveness**
  - TAM: 1.4 billion population, 3 million international transactors as the beachhead
  - Digital payments highly penetrated via UPI, good for adoption speed
  - Regulatory: prepaid licence secured, full banking licence long-dated
- **B. Competitive viability** (where Revolut wins)
  - International transfers: Wise is expensive, banks are slow
  - Multi-currency accounts: no strong incumbent for NRIs and tech workers
  - UX and app quality: superior to domestic neobanks on international features
- **C. Entry strategy**
  - Beachhead: NRIs and international tech workers, 3 million addressable
  - Partnership versus build for UPI and local compliance
  - Phase 1 product: international transfers and multi-currency only`,
      },
      {
        heading: 'Analysis',
        body: `Bucket A, the market is clearly attractive. 1.4 billion population, high digital-payments penetration so adoption infrastructure exists, and a growing tech workforce receiving foreign currency. The prepaid-licence constraint limits the product at launch but not the beachhead, NRIs and tech workers do not need savings or credit for their primary use case.

Bucket B, the competitive window is specific: international transfers and multi-currency. A typical remittance to India via Wise costs 1.5 to 2% in fees, which Revolut can undercut significantly. Domestic neobanks like Fi and Jupiter focus on rupee savings and are not competing here, and traditional banks are slow and expensive on FX.

Bucket C, the entry strategy is partnership-first. Partnering with an Indian payment aggregator for UPI cuts 12 to 18 months off the timeline at a fraction of the 20 million-pound budget versus building independently. The 50,000 organic users are the launch cohort, activate them first and use them as the referral engine.`,
        table: {
          headers: ['Decision factor', 'Assessment', 'Signal'],
          rows: [
            ['Market size', '3 million beachhead, 150 million long-term target', 'Large'],
            [
              "Revolut's product advantage",
              'International transfers and multi-currency, a clear gap versus incumbents',
              'Differentiated',
            ],
            [
              'Regulatory constraints',
              'Prepaid licence only, no savings or credit at launch',
              'Limits product',
            ],
            [
              'Entry route',
              'Partnership available, cuts 12 to 18 months versus build',
              'Fast path exists',
            ],
            [
              'Competitive threat',
              'Wise present but expensive, no strong multi-currency neobank',
              'Window open',
            ],
          ],
        },
      },
      {
        heading: 'Solutions, the entry strategy',
        body: `**Phase 1, 0 to 6 months, first customers in 6 months: partner launch, activate organic users.** Partner with a payment aggregator for UPI access. Activate the 50,000 organic users as the launch cohort with a referral programme. Product scope: international transfers and multi-currency only. Budget about 6 million pounds on partnership, compliance, and localisation.

**Phase 2, 6 to 18 months, revenue-positive by month 18: NRI and tech-worker expansion.** Scale the referral programme among NRI communities in the UK, US, and UAE. Add salary-account features for tech workers receiving USD or GBP. Target 500,000 active users. Budget about 8 million pounds on growth and product.

**Phase 3, 18 months and beyond, long-term 150 million target: full banking licence and mass market.** File for the full banking licence once Phase 2 cash flows validate the market, unlocking savings accounts, debit cards with rewards, and credit. Hold the remaining roughly 6 million pounds for licensing and compliance buildout.

**One creative angle: position Revolut India as "the account for Indians who earn or spend in foreign currency."** It is unclaimed positioning, every other neobank says "save smarter in rupees." It turns the prepaid-licence limitation into a feature, a focused, premium product for a specific high-value segment. Zero extra cost, just a positioning decision.`,
      },
      {
        heading: 'Measure success',
        body: `Measured in layers:

- **Leading indicator, month 3: organic-user activation rate.** 30% of the 50,000 organic users activate within 3 months of local launch, validating demand before spending acquisition budget.
- **Primary KPI, month 12: active users and revenue run rate.** 300,000 active users and a 5 million-pound ARR run rate by the end of year one, confirming the beachhead works.
- **Long-term health, year 3: unit-economics payback period.** The Indian market reaches CAC payback within 18 months per cohort, validating scalability.
- **Guardrail, ongoing: regulatory-compliance score.** Zero RBI violations. One breach in India can suspend the licence, this is non-negotiable.`,
      },
      {
        heading: 'Bottom line',
        body: `Enter India via partnership, not from scratch. The 50,000 organic users are your proof of concept, they pulled the product before it existed locally. The niche is specific: Indians who earn, spend, or send money internationally. Domestic payments is a war Revolut cannot win against UPI, so do not fight it. Own the international corridor, scale through NRI referral networks, and file for the full banking licence once the unit economics are validated. 20 million pounds is enough to reach revenue-positive on the beachhead before making the bigger bet.`,
      },
    ],
  },
]
