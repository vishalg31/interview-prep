import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getReferenceBySlug, referenceGuides } from '@/data/reference'
import type { ReferenceCard, ReferenceSection } from '@/data/types'
import { ReadingProgress } from '@/components/ReadingProgress'

interface Params {
  slug: string
}

export function generateStaticParams() {
  return referenceGuides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getReferenceBySlug(slug)
  if (!guide) return {}
  const url = `/reference/${guide.slug}`
  return {
    title: guide.title,
    description: guide.intro,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${guide.title} · Product Interview Q&A`,
      description: guide.intro,
      url,
    },
  }
}

function Card({ card }: { card: ReferenceCard }) {
  return (
    <div className="rounded-lg border border-rule bg-panel/40 px-5 py-4">
      {card.label && (
        <p className="font-mono text-sm font-semibold uppercase tracking-wider text-move">
          {card.label}
        </p>
      )}
      {card.title && (
        <h3 className="mt-1 font-display text-base font-semibold tracking-tight text-ink">
          {card.title}
        </h3>
      )}
      {card.body && (
        <p className="mt-2 font-body text-[0.9375rem] leading-relaxed text-muted">
          {card.body}
        </p>
      )}
      {card.items && (
        <ul className="mt-2 space-y-1.5">
          {card.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 font-body text-[0.9375rem] leading-relaxed text-ink"
            >
              <span aria-hidden className="text-muted">
                &rarr;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Section({ section }: { section: ReferenceSection }) {
  return (
    <section className="mt-14">
      <div className="flex items-baseline gap-3 border-b border-rule pb-3">
        <span aria-hidden className="font-mono text-sm tabular-nums text-muted">
          {section.num}
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          {section.title}
        </h2>
      </div>

      {section.body && (
        <div className="prose-answer mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {section.body}
          </ReactMarkdown>
        </div>
      )}

      {section.cards && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {section.cards.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>
      )}

      {section.table && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left font-body text-[0.9375rem]">
            <thead>
              <tr className="border-b border-ink/20">
                {section.table.headers.map((h, i) => (
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
              {section.table.rows.map((row, i) => (
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
      )}

      {section.callouts && (
        <div className="mt-5 space-y-3">
          {section.callouts.map((c, i) => (
            <div
              key={i}
              className="rounded-r border-l-2 border-move bg-move-bg px-4 py-3"
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-move-ink">
                {c.label}
              </p>
              <p className="mt-1.5 font-body text-[1rem] leading-relaxed text-ink">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default async function ReferencePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const guide = getReferenceBySlug(slug)
  if (!guide) notFound()

  return (
    <>
      <ReadingProgress />
      <main className="mx-auto max-w-[52rem] px-6 py-16 sm:py-24">
      <nav className="mb-10 font-mono text-xs uppercase tracking-wider text-muted">
        <Link href="/" className="hover:text-ink">
          Product Interview Q&A
        </Link>
        <span aria-hidden className="px-2 text-rule">
          /
        </span>
        <span className="text-ink">Reference</span>
      </nav>

      <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
        Method guide
      </p>
      <h1 className="mt-2 font-display text-[1.75rem] font-semibold leading-snug tracking-tight text-ink sm:text-[2.125rem]">
        {guide.title}
      </h1>
      <p className="mt-3 max-w-[40rem] font-body text-base italic text-muted">
        {guide.intro}
      </p>

      {guide.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
      </main>
    </>
  )
}
