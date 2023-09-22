import React, { PropsWithChildren } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

export default function DashBoardLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/30">
        <div className="px-4 pt-2 border-b h-[60px]">
          <span className="text-3xl">MOOD</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px]">
        <header className="h-[60px] border-b border-black/">
          <div className="h-full w-full px-6 flex items-center justify-end ">
            <UserButton afterSignOutUrl="/"></UserButton>
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}
