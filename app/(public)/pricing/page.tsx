import Navbar from '@/components/Navbar'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const PricingPage = () => {
  return (
    <div>
      <Navbar />
      <main className='w-full  px-4 pt-[10rem]'>
        <h1 className='text-7xl text-center font-bold'>Free To Use.<br />simple as that.</h1>
        <div className="w-32 mt-40 ml-10">
            <p className="font-extrabold border-b-2 border-black">Follow us</p>
            <p className="border-b-2 border-black flex justify-between items-center py-1">
              Instagram <ArrowUpRight size={18} />
            </p>
            <p className="border-b-2 border-black flex justify-between items-center py-1">
              Linkedin <ArrowUpRight size={18} />
            </p>
          </div>
      </main>
    </div>
  )
}

export default PricingPage