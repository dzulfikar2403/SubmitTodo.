import DashboardLayout from "@/components/DashboardLayout";
import EditForm from "@/components/EditForm";
import { getAllPriority, getListTypeByUsers, getTodoById } from "@/lib/query";
import React from "react";

const EdiPage = async ({params,searchParams}:any) => {
  const todoId = await searchParams.todoId;
  const priorityList = await getAllPriority();
  const typeList = await getListTypeByUsers();
  const detailTodo = await getTodoById(todoId);
  

  return (
    <DashboardLayout>
      <main className="w-full p-10 flex justify-center items-center flex-col">
        <div>
          <h1 className="text-4xl ">
          Refine Your Plan, <br />
          Reach Your Goals! 🎯
          </h1>
          <EditForm priorityList={priorityList?.rows as any[]} typeList={typeList?.rows as any[]} dataTodo={detailTodo?.rows[0]} />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default EdiPage;
