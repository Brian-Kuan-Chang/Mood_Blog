import { prisma } from '@/utils/db'
import React from 'react'
import { getUserByClerkId } from '@/utils/auth'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import Question from '@/components/Question'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return journalEntries
}
export default async function JournalPage() {
  const entries = await getEntries()
  return (
    <div className="m-4">
      <h2 className="text-4xl">Journals</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4 m-2">
        <NewEntryCard />
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
