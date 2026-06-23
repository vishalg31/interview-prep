import type { MetadataRoute } from 'next'
import {
  getOrderedPopulatedArchetypes,
  getOrderedQuestions,
} from '@/data/questions'
import { referenceGuides } from '@/data/reference'

const BASE = 'https://interview.vishalbuilds.com'

// Derived from the data, so new answers appear in the sitemap automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const home: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ]

  const lists = getOrderedPopulatedArchetypes().map((a) => ({
    url: `${BASE}/${a}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const answers = getOrderedQuestions().map((q) => ({
    url: `${BASE}/${q.archetype}/${q.slug}`,
    lastModified: new Date(q.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const refs = referenceGuides.map((g) => ({
    url: `${BASE}/reference/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...home, ...lists, ...answers, ...refs]
}
