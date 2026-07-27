import type { Difficulty, Vertical } from '@/data/types'

const VERTICAL_LABELS: Record<Vertical, string> = {
  fintech: 'Fintech',
  marketplace: 'Marketplace',
  ecommerce: 'E-commerce',
  travel: 'Travel',
  'consumer-tech': 'Consumer tech',
  logistics: 'Logistics',
  healthcare: 'Healthcare',
  generic: 'Generic',
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  warmup: 'Warm-up',
  standard: 'Standard',
  senior: 'Senior',
}

const tag =
  'inline-flex items-center font-mono text-[0.6875rem] uppercase tracking-wider'

export function VerticalBadge({ vertical }: { vertical: Vertical }) {
  return (
    <span className={`${tag} rounded-sm bg-panel px-2 py-1 text-muted`}>
      {VERTICAL_LABELS[vertical]}
    </span>
  )
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`${tag} text-muted`}>
      <span
        aria-hidden
        className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-move/70"
      />
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  )
}

export function FrameworkBadge({ framework }: { framework: string }) {
  return (
    <span className={`${tag} text-muted`}>{framework}</span>
  )
}
