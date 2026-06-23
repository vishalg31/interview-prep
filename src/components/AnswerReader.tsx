'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Annotation, AnswerTable, Question } from '@/data/types'
import { sectionSpeech } from '@/lib/text'
import {
  NarrationControls,
  type NarrationMode,
  type NarrationStatus,
} from './NarrationControls'
import { ListenBar } from './ListenBar'

// A per-turn study note (why / data / score). A study layer, never narrated.
const ANNOTATION_META: Record<Annotation['kind'], { label: string }> = {
  why: { label: 'Why ask this' },
  data: { label: 'What it means' },
  score: { label: 'Strong candidate' },
}

function AnnotationNote({ annotation }: { annotation: Annotation }) {
  const { label } = ANNOTATION_META[annotation.kind]
  return (
    <div className="mt-2 border-l-2 border-rule pl-3">
      <p className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-0.5 font-body text-[0.9375rem] leading-relaxed text-muted">
        {annotation.text}
      </p>
    </div>
  )
}

// A data table for a stage (e.g. root cause / evidence / priority). Not narrated.
function StageTable({ table }: { table: AnswerTable }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full border-collapse text-left font-body text-[0.9375rem]">
        <thead>
          <tr className="border-b border-ink/20">
            {table.headers.map((h, i) => (
              <th
                key={i}
                className="py-2 pr-4 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-b border-rule align-top">
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 pr-4 leading-relaxed text-ink">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// One narration "unit" per highlightable block: the prompt (index 0), then
// each answer stage (index 1..n). Moves are a study layer and are not narrated.
interface SpeechItem {
  unit: number
  text: string
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

// The reading column stays at a comfortable measure; on desktop the moves sit
// in the margin to its right, so the page fills the width without long lines.
const COLUMN = 'lg:grid lg:grid-cols-[minmax(0,46rem)_minmax(0,1fr)] lg:gap-x-12'
const READING = 'lg:max-w-[46rem]'

export function AnswerReader({
  question,
  referenceLink,
}: {
  question: Question
  referenceLink?: { slug: string; title: string }
}) {
  const [mode, setMode] = useState<NarrationMode>('read')
  const [status, setStatus] = useState<NarrationStatus>('idle')
  const [rate, setRate] = useState(1.5) // brisk default; study listening
  const [current, setCurrent] = useState(-1) // highlighted unit, -1 = none
  const [progress, setProgress] = useState(0) // 0..1 across the whole answer
  const [supported, setSupported] = useState(false)

  const currentRef = useRef(-1)
  const indexRef = useRef(-1) // current absolute sentence index, for seek/rate
  const setUnit = (u: number) => {
    currentRef.current = u
    setCurrent(u)
  }

  // Flat sentence-level queue, tagged by unit. Splitting into sentences avoids
  // the browsers that truncate a single long utterance.
  const queue = useMemo<SpeechItem[]>(() => {
    const items: SpeechItem[] = []
    splitSentences(question.prompt).forEach((t) => items.push({ unit: 0, text: t }))
    question.answer.forEach((section, i) => {
      splitSentences(sectionSpeech(section)).forEach((t) =>
        items.push({ unit: i + 1, text: t }),
      )
    })
    return items
  }, [question])

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Stop narration whenever the component unmounts.
  useEffect(() => () => cancel(), [cancel])

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    return voices.find((v) => v.lang.toLowerCase().startsWith('en')) ?? null
  }

  const speakFromIndex = useCallback(
    (startIndex: number, atRate: number) => {
      cancel()
      if (queue.length === 0) return
      const voice = pickVoice()
      const startPos = Math.min(Math.max(startIndex, 0), queue.length - 1)
      const items = queue.slice(startPos)
      setStatus('playing')
      items.forEach((it, idx) => {
        const u = new SpeechSynthesisUtterance(it.text)
        u.rate = atRate
        if (voice) u.voice = voice
        const absolute = startPos + idx
        u.onstart = () => {
          setUnit(it.unit)
          indexRef.current = absolute
          setProgress((absolute + 1) / queue.length)
        }
        if (idx === items.length - 1) {
          u.onend = () => {
            setStatus('idle')
            setUnit(-1)
            indexRef.current = -1
            setProgress(1)
          }
        }
        window.speechSynthesis.speak(u)
      })
    },
    [cancel, queue],
  )

  const onTogglePlay = useCallback(() => {
    if (!supported) return
    if (status === 'playing') {
      window.speechSynthesis.pause()
      setStatus('paused')
    } else if (status === 'paused') {
      window.speechSynthesis.resume()
      setStatus('playing')
    } else {
      speakFromIndex(0, rate)
    }
  }, [supported, status, rate, speakFromIndex])

  const onStop = useCallback(() => {
    cancel()
    setStatus('idle')
    setUnit(-1)
    indexRef.current = -1
    setProgress(0)
  }, [cancel])

  const onRateChange = useCallback(
    (next: number) => {
      setRate(next)
      // Re-speak from the current sentence so the new speed takes effect now.
      if (status === 'playing' || status === 'paused') {
        speakFromIndex(indexRef.current >= 0 ? indexRef.current : 0, next)
      }
    },
    [status, speakFromIndex],
  )

  // Seek to a fraction (0..1) of the answer and play from there.
  const onSeek = useCallback(
    (fraction: number) => {
      if (!supported || queue.length === 0) return
      const idx = Math.round(fraction * (queue.length - 1))
      speakFromIndex(idx, rate)
    },
    [supported, queue.length, rate, speakFromIndex],
  )

  const onModeChange = useCallback(
    (next: NarrationMode) => {
      setMode(next)
      if (next === 'read') {
        cancel()
        setStatus('idle')
        setUnit(-1)
        indexRef.current = -1
        setProgress(0)
      }
    },
    [cancel],
  )

  const listening = mode === 'listen'
  const reference = referenceLink

  const total = question.answer.length
  const positionLabel =
    current === 0
      ? 'Prompt'
      : current > 0
        ? `Stage ${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
        : 'Ready'

  return (
    <div>
      {supported && listening && (
        <ListenBar
          status={status}
          progress={progress}
          label={positionLabel}
          onTogglePlay={onTogglePlay}
          onStop={onStop}
          onSeek={onSeek}
        />
      )}

      {/* Header content stays at the reading measure, left-aligned. */}
      <div className={READING}>
        {/* The prompt is the hero. The eye lands here first. */}
        <h1
          className={`font-display text-[1.75rem] font-semibold leading-snug tracking-tight sm:text-[2.125rem] ${
            listening && current === 0 ? 'text-move' : 'text-ink'
          }`}
        >
          {question.prompt}
        </h1>

        {question.context && (
          <p className="mt-3 font-body text-base italic text-muted">
            {question.context}
          </p>
        )}

        {supported && (
          <div className="mt-7 border-y border-rule py-3">
            <NarrationControls
              mode={mode}
              rate={rate}
              onModeChange={onModeChange}
              onRateChange={onRateChange}
            />
          </div>
        )}

        {reference && (
          <Link
            href={`/reference/${reference.slug}`}
            className="mt-6 flex items-center gap-3 rounded-md border border-rule bg-panel/60 px-4 py-3 transition-colors hover:border-move"
          >
            <span aria-hidden className="font-mono text-base text-move">
              &rarr;
            </span>
            <span className="font-body text-[0.9375rem] leading-snug text-ink">
              New to these cases? Read the method first:{' '}
              <span className="font-medium text-move">{reference.title}</span>
            </span>
          </Link>
        )}
      </div>

      <div className="mt-10 space-y-10">
        {question.answer.map((section, i) => {
          const active = listening && current === i + 1
          return (
            <section
              key={i}
              aria-current={active ? 'true' : undefined}
              className={`${COLUMN} -ml-4 border-l-2 pl-4 transition-colors sm:-ml-6 sm:pl-6 ${
                active ? 'border-move' : 'border-transparent'
              }`}
            >
              {/* Column 1: the stage itself. */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="font-mono text-sm tabular-nums text-muted"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {section.heading}
                  </h2>
                </div>

                {section.body && (
                  <div className="prose-answer mt-3">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {section.body}
                    </ReactMarkdown>
                  </div>
                )}

                {section.exchanges && (
                  <div className="mt-5 space-y-4">
                    {section.exchanges.map((ex, j) =>
                      ex.speaker === 'interviewer' ? (
                        <div key={j}>
                          <div className="rounded-r-md border-l-2 border-quote-border bg-quote-bg px-4 py-3">
                            <p className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
                              Interviewer
                            </p>
                            <p className="mt-1 font-body text-[1.0625rem] leading-relaxed text-ink">
                              {ex.text}
                            </p>
                          </div>
                          {ex.annotation && (
                            <AnnotationNote annotation={ex.annotation} />
                          )}
                        </div>
                      ) : (
                        <div key={j}>
                          <p className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
                            Candidate
                          </p>
                          <p className="prose-answer mt-1">{ex.text}</p>
                          {ex.annotation && (
                            <AnnotationNote annotation={ex.annotation} />
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}

                {section.table && <StageTable table={section.table} />}
              </div>

              {/* Column 2 (desktop margin): the move. Below the stage on mobile. */}
              {section.moveToNotice && (
                <aside className="mt-5 rounded-r border-l-2 border-move bg-move-bg px-4 py-3 lg:mt-1 lg:max-w-[18rem] lg:border-l-0 lg:bg-transparent lg:px-0 lg:py-0">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-move-ink">
                    The move
                  </p>
                  <p className="mt-1.5 font-body text-[1rem] leading-relaxed text-ink lg:text-muted">
                    {section.moveToNotice}
                  </p>
                </aside>
              )}
            </section>
          )
        })}
      </div>

      {/* Closing study card: quick pointers and method for the candidate. */}
      {question.finalNotes && question.finalNotes.length > 0 && (
        <div className={`mt-16 ${READING}`}>
          <div className="rounded-lg border border-rule bg-panel/60 px-5 py-5 sm:px-6 sm:py-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
              For the candidate
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
              Keep in mind
            </h2>
            <ul className="mt-4 space-y-3">
              {question.finalNotes.map((note, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-body text-[1.0625rem] leading-relaxed text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
