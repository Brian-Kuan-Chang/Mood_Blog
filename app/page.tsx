import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'
export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'
  console.log('href:', href)
  return (
    <div className="w-screen h-screen text-white bg-black flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Best Journal App, You will ever used </h1>
        <p className="text-2xl text-white/60 mb-4 ">
          This is a app that can track your mood based on your daily journal
          with ai analytics
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-500 px-4 py-2 rounded-lg">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
