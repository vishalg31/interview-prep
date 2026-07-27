// Content type shape for Interview Prep.
// All questions live as typed data (see spec section 2). Components never
// hardcode content; they render these types.

export type Archetype =
  | 'metric-improvement'
  | 'root-cause'
  | 'product-design'
  | 'estimation'
  | 'prioritization'
  | 'product-critique'
  | 'strategy'
  | 'behavioral'
  | 'so-case' // Revolut-style S&O / candidate-led

export type Vertical =
  | 'fintech'
  | 'marketplace'
  | 'ecommerce'
  | 'travel'
  | 'consumer-tech'
  | 'logistics'
  | 'healthcare'
  | 'generic'

export type Difficulty = 'warmup' | 'standard' | 'senior'

export type Speaker = 'candidate' | 'interviewer'

/**
 * A study-layer note attached to a single dialogue turn. Lifted from the S&O
 * framework's three coaching styles. Rendered as a small distinct note under
 * the turn, never narrated.
 *   why   why ask this question / make this move
 *   data  what the revealed number actually means
 *   score what a strong candidate does at this moment
 */
export type AnnotationKind = 'why' | 'data' | 'score'

export interface Annotation {
  kind: AnnotationKind
  text: string
}

/** One turn in a clarifying-question (or any back-and-forth) exchange. */
export interface Exchange {
  speaker: Speaker
  text: string
  /** Optional per-turn study note (why / data / score). Never narrated. */
  annotation?: Annotation
}

/** A simple data table for a stage, e.g. root cause / evidence / priority. */
export interface AnswerTable {
  headers: string[]
  rows: string[][]
}

export interface AnswerSection {
  /** e.g. "Clarify scope", "Segment the users" */
  heading: string
  /**
   * Markdown-capable prose for the stage. Optional: a stage may be a dialogue
   * (exchanges) instead, e.g. the clarifying-questions stage. When both are
   * present, body renders first as a short lead, then the exchanges.
   */
  body?: string
  /**
   * A back-and-forth, e.g. the candidate asking clarifying questions and the
   * interviewer answering. Candidate and interviewer turns render distinctly.
   */
  exchanges?: Exchange[]
  /**
   * A data table for the stage, rendered after body. Not narrated. Used by the
   * S&O cases for the root-cause / evidence / priority breakdown.
   */
  table?: AnswerTable
  /**
   * The study-layer annotation for THIS stage. Optional, not every stage has
   * one. Rendered as a distinct aside beside the stage (see spec 6b), NOT in
   * body. When converting prose answers to data, extract inline
   * "Move to notice:" lines into this field; no duplicate in body.
   */
  moveToNotice?: string
}

export interface Question {
  /** url-safe, unique */
  slug: string
  archetype: Archetype
  vertical: Vertical
  difficulty: Difficulty
  /** the interview question as asked */
  prompt: string
  /** optional setup / company framing */
  context?: string
  /** named framework used (e.g. GAME, RICE) */
  framework?: string
  /**
   * Slug of a reference guide this answer links to (e.g. the S&O framework).
   * Rendered as a "read the method first" banner on the answer page.
   */
  referenceSlug?: string
  /** the worked answer, in stages */
  answer: AnswerSection[]
  /**
   * Quick pointers for the candidate: what to keep in mind while answering and
   * the method to follow. A study layer, rendered as a closing card, not part
   * of the narrated answer.
   */
  finalNotes?: string[]
  relatedSlugs?: string[]
  /** ISO date */
  updatedAt: string
}

// ── Reference guides ───────────────────────────────────────────────────────
// A method guide (e.g. the S&O framework), rendered on its own page, not as a
// Q&A. Cases link to it via Question.referenceSlug. Not narrated.

/** A small card: a labelled tag/letter, a title, and bullets or prose. */
export interface ReferenceCard {
  /** short tag or mono letter, e.g. "C" or "Process Improvement" */
  label?: string
  title?: string
  /** bullet list */
  items?: string[]
  /** or prose instead of bullets */
  body?: string
}

export interface ReferenceCallout {
  label: string
  text: string
}

export interface ReferenceSection {
  /** display number, e.g. "01" */
  num: string
  title: string
  /** optional markdown lead */
  body?: string
  /** optional grid of cards */
  cards?: ReferenceCard[]
  /** optional data table */
  table?: AnswerTable
  /** optional closing callouts */
  callouts?: ReferenceCallout[]
}

export interface ReferenceGuide {
  slug: string
  title: string
  /** one-line summary under the title */
  intro: string
  sections: ReferenceSection[]
  updatedAt: string
}
