import DashboardLayout from '@/components/DashboardLayout'
import TaskItem from '@/components/TaskItem';
import { getAllTodoByType } from '@/lib/query';
import { FolderOpen, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const subDashboardPage = async ({params}:{params:any}) => {
  const pathName = await params.slug;
  const getDataByType = await getAllTodoByType(pathName);
  
  return (
    <DashboardLayout>
      <main className='w-full p-10'>
        <div  className=' bg-gray-200 rounded-full p-4 w-fit'>
        <FolderOpen size={25} color='gray' />
        </div>
        <h1 className='font-extrabold text-2xl py-2'>{pathName}</h1>
        <p className='text-sm text-gray-400 font-semibold'>Private</p>
        <div className="flex gap-2 p-4 rounded bg-gray-100 my-4 text-gray-400">
          <span>📜</span>
          <p>Feeling overwhelmed by endless tasks? Say goodbye to chaos! Our To-Do List app helps you crush your work, home chores, and personal goals — all while keeping life simple, organized, and actually fun. Let’s get stuff done!</p>
        </div>
        <Link href={'/dashboard/post'} className="my-6 flex gap-2 items-center rounded-md p-2 transition-all cursor-pointer border-2 border-dashed border-slate-200 hover:bg-gray-200">
          <Plus size={14} /> New Todo
        </Link>
        <div>
          <small>Todo in this Type</small>
          <TaskItem title={pathName} staticUI data={getDataByType?.rows as any[]} />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default subDashboardPage