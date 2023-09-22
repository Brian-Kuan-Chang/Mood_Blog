import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const createNewUser = async () => {
  const user = await currentUser()
  console.log('user', user)
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  })
  if (!match) {
    console.log('start create function')
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }
  redirect('/journal')
}
const NewUserPage = async () => {
  await createNewUser()
  return <div>NewUserPage</div>
}

export default NewUserPage
