import DashboardLayout from "@/components/DashboardLayout";
import Loading from "@/components/Loading";
import TaskItem from "@/components/TaskItem";
import { getAllCompletedTodo, getAllTrashTodo, getPercentageCompletedByUser } from "@/lib/query";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export const PercentageCompleted = async () => {
  const totalCompletedPercentage = await getPercentageCompletedByUser();
  const percentage = totalCompletedPercentage?.rows[0].precentage_todo_completed ?? 0;

  return (
    <>
      <div className="border-2 w-full rounded h-10 transition-all">
        <div
          className="bg-black h-full"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
      <span className="flex justify-center gap-2 py-1">
        <p className="font-semibold">{percentage}%</p> Completed todo.
      </span>
    </>
  );
};

export const DataCompletedList = async () => {
  const dataCompleted = await getAllCompletedTodo();
  return <>{dataCompleted?.rows && <TaskItem title="Trash Data" data={dataCompleted.rows} staticUI />}</>;
};

export const WarnLimitTrash = async () => {
  const dataTrash = await getAllTrashTodo();
  return <span className="text-orange-500 text-sm ">* you have {dataTrash?.rows.length} trash, maximal trash is 20 </span>;
};

const CompletedPage = () => {
  return (
    <DashboardLayout>
      <main className="w-full p-10">
        <div className=" bg-green-200 rounded-full p-4 w-fit">
          <Check size={25} color="green" />
        </div>
        <h1 className="font-extrabold text-2xl py-2">Completed</h1>
        <p className="text-sm text-gray-400 font-semibold">General</p>
        <div className="flex gap-2 p-4 rounded bg-gray-100 my-4 text-gray-400">
          <span>📜</span>
          <p>Congrats! There's nothing left to do. You can always review your completed tasks here. If needed, you can restore items from the Trash. The maximum Trash capacity is 20 items per user — stay tidy and organized!</p>
        </div>
        <Suspense fallback={<Loading />}>
          <WarnLimitTrash />
        </Suspense>
        <Link href={"/dashboard/post"} className="my-6 flex gap-2 items-center rounded-md p-2 transition-all cursor-pointer border-2 border-dashed border-slate-200 hover:bg-gray-200">
          <Plus size={14} /> New Todo
        </Link>
        <Suspense fallback={<Loading />}>
          <PercentageCompleted />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <DataCompletedList />
        </Suspense>
      </main>
    </DashboardLayout>
  );
};

export default CompletedPage;
