import { NextResponse } from 'next/server'
import { generateSection } from '@/lib/claude'
import { prisma } from '@/lib/db'
import type { GeneratedTestContent } from '@/types'

export async function POST() {
  try {
    const english = await generateSection('english')
    const math    = await generateSection('math')
    const reading = await generateSection('reading')

    const content: GeneratedTestContent = { english, math, reading }
    const test = await prisma.generatedTest.create({
      data: { content: JSON.stringify(content) },
    })

    return NextResponse.json({ id: test.id }, { status: 201 })
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
