import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      analysis: true,
    },
  })
  return entry
}

const JournalEditorPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  console.log('entry:', entry)
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEditorPage
