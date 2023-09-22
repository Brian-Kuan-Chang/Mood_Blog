import { getUserByClerkId } from '@/utils/auth'
import { useParams } from 'next/navigation'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { analyzeEntry } from '@/utils/ai'

export const DELETE = async (req: Request, { params }) => {
  const user = await getUserByClerkId()

  await prisma.journalEntry.delete({
    where: {
      id: params.id,
      userId: user.id,
    },
  })

  revalidatePath('/path')

  return NextResponse.json({ data: { id: params.id } })
}
export const PATCH = async (req: Request, { params }) => {
  const user = await getUserByClerkId()
  const { updates } = await req.json()

  const entry = await prisma.journalEntry.update({
    where: {
      userId: user.id,
      id: params.id,
    },
    data: updates,
  })
  const analysis = await analyzeEntry(entry)
  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: { ...analysis },
    create: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}
