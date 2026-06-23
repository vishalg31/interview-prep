import { ImageResponse } from 'next/og'
import {
  ARCHETYPE_LABELS,
  getQuestionBySlug,
  questions,
} from '@/data/questions'
import type { Archetype } from '@/data/types'

export const alt = 'Interview answer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Prerender an image for every answer at build time.
export function generateStaticParams() {
  return questions.map((q) => ({ archetype: q.archetype, slug: q.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ archetype: string; slug: string }>
}) {
  const { archetype, slug } = await params
  const q = getQuestionBySlug(archetype, slug)
  const label = q
    ? ARCHETYPE_LABELS[q.archetype as Archetype]
    : 'Product Interview QnA'
  const prompt = q?.prompt ?? 'Product Interview QnA'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FEFEFC',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#FBBF24', fontSize: 26, fontWeight: 700 }}>
              V
            </span>
          </div>
          <span
            style={{
              fontSize: 24,
              color: '#75716A',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            {label} · Product Interview QnA
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 72, height: 6, background: '#4F46E5' }} />
          <span
            style={{
              marginTop: 28,
              fontSize: 56,
              fontWeight: 700,
              color: '#22201C',
              lineHeight: 1.15,
            }}
          >
            {prompt}
          </span>
        </div>

        <span style={{ fontSize: 22, color: '#75716A' }}>
          A fully-worked answer · interview.vishalbuilds.com
        </span>
      </div>
    ),
    { ...size },
  )
}
