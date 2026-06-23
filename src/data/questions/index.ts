import type { Archetype, Question } from '../types'
import { metricImprovementQuestions } from './metric-improvement'
import { rootCauseQuestions } from './root-cause'
import { estimationQuestions } from './estimation'
import { productDesignQuestions } from './product-design'
import { prioritizationQuestions } from './prioritization'
import { productCritiqueQuestions } from './product-critique'
import { strategyQuestions } from './strategy'
import { behavioralQuestions } from './behavioral'
import { soCaseQuestions } from './so-case'

// All questions, typed. Adding content later = adding a data file + a line here,
// never touching components.
export const questions: Question[] = [
  ...metricImprovementQuestions,
  ...rootCauseQuestions,
  ...estimationQuestions,
  ...productDesignQuestions,
  ...prioritizationQuestions,
  ...productCritiqueQuestions,
  ...strategyQuestions,
  ...behavioralQuestions,
  ...soCaseQuestions,
]

// Fail fast at build/dev time if two questions share a route (archetype + slug).
// A duplicate would silently shadow a page, so we surface it immediately.
const _routes = new Set<string>()
for (const _q of questions) {
  const _key = `${_q.archetype}/${_q.slug}`
  if (_routes.has(_key)) {
    throw new Error(
      `Duplicate question route "/${_key}". Slugs must be unique within an archetype.`,
    )
  }
  _routes.add(_key)
}

// Human-readable labels for each archetype (used in nav, badges, page titles).
export const ARCHETYPE_LABELS: Record<Archetype, string> = {
  'metric-improvement': 'Metric improvement',
  'root-cause': 'Root cause',
  'product-design': 'Product design',
  estimation: 'Estimation',
  prioritization: 'Prioritization',
  'product-critique': 'Product critique',
  strategy: 'Strategy',
  behavioral: 'Behavioral',
  'so-case': 'S&O case',
}

// One-line description of what each archetype tests (landing + list pages).
export const ARCHETYPE_BLURBS: Record<Archetype, string> = {
  'metric-improvement':
    'A metric has stalled. Decompose the funnel, isolate the leak, pick the lever.',
  'root-cause':
    'Something dropped. Structure the space, then diagnose what changed before fixing.',
  'product-design':
    'Design for one real user with one unmet job, not for everyone.',
  estimation:
    'Size a number from first principles. Structure before arithmetic.',
  prioritization:
    'Limited capacity, competing options. Pick, sequence, and defend the cut.',
  'product-critique':
    'Take a product apart against its job, and fix the one weakness that matters.',
  strategy:
    'A big market or business call. Take a position and name what would change it.',
  behavioral:
    'A real story of a decision under pressure, owned end to end.',
  'so-case':
    'Candidate-led S&O cases: extract the data, structure with MECE, recommend.',
}

// Display order for nav, the landing, and list pages.
export const ARCHETYPE_ORDER: Archetype[] = [
  'metric-improvement',
  'root-cause',
  'product-design',
  'estimation',
  'prioritization',
  'product-critique',
  'strategy',
  'behavioral',
  'so-case',
]

// Populated archetypes, in display order.
export function getOrderedPopulatedArchetypes(): Archetype[] {
  const populated = new Set(getPopulatedArchetypes())
  return ARCHETYPE_ORDER.filter((a) => populated.has(a))
}

// All questions in a stable reading order: by archetype display order, then by
// their order within each archetype. Used for prev/next navigation.
export function getOrderedQuestions(): Question[] {
  return getOrderedPopulatedArchetypes().flatMap((a) =>
    getQuestionsByArchetype(a),
  )
}

// The questions immediately before and after a given one in reading order.
export function getAdjacentQuestions(
  archetype: string,
  slug: string,
): { prev?: Question; next?: Question } {
  const ordered = getOrderedQuestions()
  const i = ordered.findIndex(
    (q) => q.archetype === archetype && q.slug === slug,
  )
  if (i === -1) return {}
  return {
    prev: i > 0 ? ordered[i - 1] : undefined,
    next: i < ordered.length - 1 ? ordered[i + 1] : undefined,
  }
}

export function getQuestionBySlug(
  archetype: string,
  slug: string,
): Question | undefined {
  return questions.find(
    (q) => q.archetype === archetype && q.slug === slug,
  )
}

export function getQuestionsByArchetype(archetype: string): Question[] {
  return questions.filter((q) => q.archetype === archetype)
}

// Every archetype that currently has at least one published answer.
export function getPopulatedArchetypes(): Archetype[] {
  return Array.from(new Set(questions.map((q) => q.archetype)))
}
