import { ImageResponse } from 'next/og'

// Default social card for the site (landing, list pages, reference, fallback).
export const alt = 'Product Strategy Interview QnA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
            Interview QnA · by Vishal Builds
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 72, height: 6, background: '#4F46E5' }} />
          <span
            style={{
              marginTop: 28,
              fontSize: 68,
              fontWeight: 700,
              color: '#22201C',
              lineHeight: 1.1,
            }}
          >
            Product Strategy Interview QnA
          </span>
          <span style={{ marginTop: 20, fontSize: 30, color: '#75716A' }}>
            Worked PM and strategy answers that show the thinking, not the
            framework.
          </span>
        </div>

        <span style={{ fontSize: 22, color: '#75716A' }}>
          interview.vishalbuilds.com
        </span>
      </div>
    ),
    { ...size },
  )
}
