import BtnDeleteAllTrash from "@/components/BtnDeleteAllTrash";
import DashboardLayout from "@/components/DashboardLayout";
import Loading from "@/components/Loading";
import TaskItem from "@/components/TaskItem";
import { getAllTrashTodo } from "@/lib/query";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export const DataTrashList = async () => {
  const dataTrash = await getAllTrashTodo();
  return (
    <>
      <div className="flex justify-end py-2">{(dataTrash?.rows as any[]).length > 0 && <BtnDeleteAllTrash />}</div>
      {dataTrash?.rows && <TaskItem title="Trash Data" data={dataTrash.rows} trashUI staticUI />}
    </>
  );
};

const TrashPage = () => {
  return (
    <DashboardLayout>
      <main className="w-full p-10">
        <div className=" bg-red-200 rounded-full p-4 w-fit">
          <Trash2 size={25} color="red" />
        </div>
        <h1 className="font-extrabold text-2xl py-2">Trash</h1>
        <p className="text-sm text-gray-400 font-semibold">General</p>
        <div className="flex gap-2 p-4 rounded bg-gray-100 my-4 text-gray-400">
          <span>📜</span>
          <p>Your deleted items are here. Don't worry, they’re not gone yet! You can restore them if needed, or empty the trash to permanently delete them. Let's keep things tidy and organized! Maximum Trash capacity is 20 every user.</p>
        </div>
        <Link href={"/dashboard/post"} className="my-6 flex gap-2 items-center rounded-md p-2 transition-all cursor-pointer border-2 border-dashed border-slate-200 hover:bg-gray-200">
          <Plus size={14} /> New Todo
        </Link>
        <Suspense fallback={<Loading />} >
          <DataTrashList />
        </Suspense>
      </main>
    </DashboardLayout>
  );
};

export default TrashPage;
