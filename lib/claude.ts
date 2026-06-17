import Anthropic from '@anthropic-ai/sdk'
import type { Question } from '@/types'

const client = new Anthropic()

const SECTION_COUNTS = { english: 75, math: 60, reading: 40 }

const PROMPTS: Record<'english' | 'math' | 'reading', string> = {
  english: `Generate an ACT English section. It must have exactly 5 passages with 15 questions each (75 questions total).
Questions should test grammar, punctuation, sentence structure, and rhetorical skills on the passage text.
Return a JSON array of 75 objects with this exact shape (no other text, no markdown fences):
{ "id": number, "passage": "full passage text — questions 1-15 share passage 1, 16-30 share passage 2, etc.", "prompt": "question text", "choices": { "A": "...", "B": "...", "C": "...", "D": "..." }, "answer": "A" | "B" | "C" | "D" }`,

  math: `Generate an ACT Math section with exactly 60 questions covering pre-algebra, elementary algebra, intermediate algebra, coordinate geometry, plane geometry, and trigonometry.
Each question is standalone with no passage.
Return a JSON array of 60 objects with this exact shape (no other text, no markdown fences):
{ "id": number, "prompt": "question text with any equations described inline", "choices": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." }, "answer": "A" | "B" | "C" | "D" | "E" }`,

  reading: `Generate an ACT Reading section with exactly 4 passages and 10 questions per passage (40 questions total).
Passage types (one each): literary narrative, social science, humanities, natural science.
Return a JSON array of 40 objects with this exact shape (no other text, no markdown fences):
{ "id": number, "passage": "full passage text — questions 1-10 share passage 1, 11-20 share passage 2, etc.", "prompt": "question text", "choices": { "A": "...", "B": "...", "C": "...", "D": "..." }, "answer": "A" | "B" | "C" | "D" }`,
}

function parseAndValidate(text: string, section: 'english' | 'math' | 'reading'): Question[] {
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error('No JSON array found in response')
  const parsed = JSON.parse(match[0])
  if (!Array.isArray(parsed) || parsed.length !== SECTION_COUNTS[section]) {
    throw new Error(`Expected ${SECTION_COUNTS[section]} questions, got ${Array.isArray(parsed) ? parsed.length : 'non-array'}`)
  }
  return parsed as Question[]
}

export async function generateSection(section: 'english' | 'math' | 'reading'): Promise<Question[]> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const prompt = attempt === 1
      ? PROMPTS[section]
      : `${PROMPTS[section]}\nIMPORTANT: Return ONLY the raw JSON array. No explanation, no markdown code fences.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    try {
      return parseAndValidate(text, section)
    } catch (e) {
      if (attempt === 2) throw new Error(`${section} generation failed after 2 attempts: ${(e as Error).message}`)
    }
  }
  throw new Error(`${section} generation failed`)
}
