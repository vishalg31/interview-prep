import type { AnswerSection } from '@/data/types'

// Turn a markdown body into plain text for the Web Speech narrator, so the
// TTS engine reads words, not asterisks and dashes.
export function toSpeech(markdown: string): string {
  return markdown
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/^\s*[-*]\s+/gm, '') // bullet markers
    .replace(/^\s*\d+\.\s+/gm, '') // ordered markers
    .replace(/→/g, ' to ') // flow arrows read naturally
    .replace(/\n{2,}/g, '. ') // paragraph breaks become pauses
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

// The full spoken text for one stage: heading, optional lead, then each
// dialogue turn. Interviewer turns are framed so a listener can tell the
// voices apart. Moves are a study layer and are never narrated.
export function sectionSpeech(section: AnswerSection): string {
  const parts: string[] = [section.heading]
  if (section.body) parts.push(toSpeech(section.body))
  section.exchanges?.forEach((ex) => {
    const t = toSpeech(ex.text)
    parts.push(ex.speaker === 'interviewer' ? `The interviewer says, ${t}` : t)
  })
  return parts.join('. ')
}
