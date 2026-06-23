'use client'

import { useRef, useState } from 'react'
import type { NarrationStatus } from './NarrationControls'

interface Props {
  status: NarrationStatus
  progress: number // 0..1 across the whole answer
  label: string // current position, e.g. "Stage 03 / 07"
  onTogglePlay: () => void
  onStop: () => void
  onSeek: (fraction: number) => void // jump to a fraction and play from there
}

export function ListenBar({
  status,
  progress,
  label,
  onTogglePlay,
  onStop,
  onSeek,
}: Props) {
  const playing = status === 'playing'
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrub, setScrub] = useState<number | null>(null)

  // While dragging, show the scrub position; otherwise follow playback.
  const shown = scrub ?? progress

  const fractionFromX = (clientX: number) => {
    const el = trackRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setScrub(fractionFromX(e.clientX))
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (scrub !== null) setScrub(fractionFromX(e.clientX))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (scrub !== null) {
      onSeek(fractionFromX(e.clientX))
      setScrub(null)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 0.05
    let next: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = shown + step
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = shown - step
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = 1
    if (next !== null) {
      e.preventDefault()
      onSeek(Math.min(Math.max(next, 0), 1))
    }
  }

  const pct = Math.round(shown * 100)

  return (
    <div className="sticky top-0 z-50 -mx-6 mb-10 border-b border-rule bg-paper/90 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          onClick={onTogglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-move hover:text-move"
        >
          <span aria-hidden className="text-[0.7rem] leading-none">
            {playing ? '❙❙' : '▶'}
          </span>
        </button>

        {/* Draggable play-time bar. Position in the answer, not seconds, since
            the Web Speech API does not expose audio duration. */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek through the answer"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
          className="group relative flex-1 cursor-pointer touch-none select-none py-2"
        >
          <div className="h-1 overflow-hidden rounded-full bg-rule">
            <div
              className="h-full rounded-full bg-move transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* Thumb: visible on hover, focus, or while scrubbing. */}
          <span
            aria-hidden
            className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-move bg-paper transition-opacity ${
              scrub !== null
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'
            }`}
            style={{ left: `${pct}%` }}
          />
        </div>

        <span className="hidden shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider text-muted tabular-nums sm:inline">
          {label}
        </span>

        <button
          onClick={onStop}
          disabled={status === 'idle'}
          className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider text-muted transition-colors hover:text-ink disabled:opacity-40"
        >
          Stop
        </button>
      </div>
    </div>
  )
}
