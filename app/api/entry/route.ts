import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      content: data.content,
      userId: user.id,
      analysis: {
        create: {
          mood: 'Neutral',
          subject: 'None',
          negative: 'true',
          summary: 'None',
          sentimentScore: 0,
          color: '#0101fe',
          userId: user.id,
        },
      },
    },
  })

  revalidatePath('/journal')
  console.log('entry:', entry)

  return NextResponse.json({ data: entry })
}
