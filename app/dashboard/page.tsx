import React from "react";
import { GetUser, getUser } from "@/lib/auth/helper";
import { Plus } from "lucide-react";
import TaskItem from "@/components/TaskItem";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { getAllTodo, getAllTrashTodo } from "@/lib/query";

const DashboardPage = async () => {
  const { id, username, email } = (await getUser()) as GetUser;
  const getAllDataTodo = await getAllTodo();
  const dataTrash = await getAllTrashTodo();
  

  const groupDataByType = getAllDataTodo?.rows.reduce((acc,curr) => {
    if(!acc[curr.typename]){
      acc[curr.typename] = []
    }

    acc[curr.typename].push(curr)
    return acc;
  },{})

  const resultData = Object.keys(groupDataByType).map((key) => {
    const items = groupDataByType[key];
  
    return {typename: key ,items};
  });
  
  

  return (
    <DashboardLayout>
      <main className="w-full min-h-screen p-10 ">
        <h1 className="text-2xl font-extrabold">
          Welcome back, {username} ! <br />
          Ready to be productive ✨
        </h1>
        <small className="text-gray-500">Another productive day done right!</small>
        <div className="flex gap-2 p-4 rounded bg-gray-100 my-4 text-gray-400">
          <span>📜</span>
          <p>Feeling overwhelmed by endless tasks? Say goodbye to chaos! Our To-Do List app helps you crush your work, home chores, and personal goals — all while keeping life simple, organized, and actually fun. Let’s get stuff done!</p>
        </div>
        <span className="text-orange-500 text-sm ">* you have {dataTrash?.rows.length} trash, maximal trash is 20  </span>
        <Link href={"/dashboard/post"} className="my-6 flex gap-2 items-center rounded-md p-2 transition-all cursor-pointer border-2 border-dashed border-slate-200 hover:bg-gray-200">
          <Plus size={14} /> New Todo
        </Link>

        {(getAllDataTodo?.rows as any[]).length > 0 && resultData.map((el,i) => <TaskItem key={i} title={el.typename.toLowerCase()} data={el.items} />)}
      </main>
    </DashboardLayout>
  );
};

export default DashboardPage;
