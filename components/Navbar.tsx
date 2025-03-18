import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 items-center">
        <Link href={'/'} passHref className="flex gap-3 items-center font-semibold text-2xl text-gray-900">
          <div className="relative w-8 h-8">
            <Image src={'/images/logo-ico.png'} alt="icon-submitTodo" fill/>
          </div>
          SubmitTodo.
        </Link>
        <div className="flex gap-[24px] items-center px-4 text-sm font-semibold">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/pricing"}>Pricing</Link>
          <Link href={"/login"} className="px-2 py-1 bg-slate-100 rounded-md flex items-center gap-1">
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </nav>
  )
}

export default Navbar