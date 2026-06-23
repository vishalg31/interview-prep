import type { ReferenceGuide } from '../types'
import { soFramework } from './so-framework'

// All reference guides. Adding one = a data file + a line here.
export const referenceGuides: ReferenceGuide[] = [soFramework]

export function getReferenceBySlug(slug: string): ReferenceGuide | undefined {
  return referenceGuides.find((g) => g.slug === slug)
}
