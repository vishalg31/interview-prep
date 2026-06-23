'use client'

export type NarrationMode = 'read' | 'listen'
export type NarrationStatus = 'idle' | 'playing' | 'paused'

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2]

interface Props {
  mode: NarrationMode
  rate: number
  onModeChange: (mode: NarrationMode) => void
  onRateChange: (rate: number) => void
}

export function NarrationControls({
  mode,
  rate,
  onModeChange,
  onRateChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs text-muted">
      {/* Read / Listen toggle. Quiet by design; serves the content. */}
      <div
        role="tablist"
        aria-label="Study mode"
        className="inline-flex rounded-full border border-rule p-0.5"
      >
        {(['read', 'listen'] as NarrationMode[]).map((m) => {
          const active = mode === m
          return (
            <button
              key={m}
              role="tab"
              aria-selected={active}
              onClick={() => onModeChange(m)}
              className={`rounded-full px-3 py-1 uppercase tracking-wider transition-colors ${
                active ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
              }`}
            >
              {m}
            </button>
          )
        })}
      </div>

      {mode === 'listen' && (
        <div className="flex items-center gap-1">
          <span className="mr-1 uppercase tracking-wider">Speed</span>
          {SPEEDS.map((s) => {
            const active = rate === s
            const prominent = s === 1.5 || s === 2
            return (
              <button
                key={s}
                onClick={() => onRateChange(s)}
                aria-pressed={active}
                className={`rounded px-1.5 py-0.5 tabular-nums transition-colors ${
                  active
                    ? 'bg-move/10 text-move'
                    : prominent
                      ? 'text-ink hover:text-move'
                      : 'text-muted hover:text-ink'
                }`}
              >
                {s}×
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
