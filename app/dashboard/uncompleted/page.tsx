import DashboardLayout from "@/components/DashboardLayout";
import Loading from "@/components/Loading";
import TaskItem from "@/components/TaskItem";
import { getAllTrashTodo, getAllUncompletedTodo, getPercentageUncompletedByUser } from "@/lib/query";
import { ChartColumn, Plus } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export const PercentageUncompleted = async () => {
  const totalUncompletedPercentage = await getPercentageUncompletedByUser();
  const percentage = totalUncompletedPercentage?.rows[0].precentage_todo_uncompleted ?? 0;

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
        <p className="font-semibold">{percentage}%</p> Uncompleted todo.
      </span>
    </>
  );
};

export const DataUncompletedList = async () => {
  const dataUncompleted = await getAllUncompletedTodo();
  return <>{dataUncompleted?.rows && <TaskItem title="Uncompleted Todo" data={dataUncompleted.rows} staticUI />}</>;
};

export const WarnLimitTrash = async () => {
  const dataTrash = await getAllTrashTodo();
  return <span className="text-orange-500 text-sm ">* you have {dataTrash?.rows.length} trash, maximal trash is 20 </span>;
};

const UncompletedPage = () => {
  return (
    <DashboardLayout>
      <main className="w-full p-10">
        <div className=" bg-orange-200 rounded-full p-4 w-fit">
          <ChartColumn size={25} color="orange" />
        </div>
        <h1 className="font-extrabold text-2xl py-2">Uncompleted</h1>
        <p className="text-sm text-gray-400 font-semibold">General</p>
        <div className="flex gap-2 p-4 rounded bg-gray-100 my-4 text-gray-400">
          <span>📜</span>
          <p>Keep Eager! Much task you must Completed. You can always check your uncompleted tasks here. If needed, you can restore items from the Trash. The maximum Trash capacity is 20 items per user — stay tidy and organized!</p>
        </div>
        <Suspense fallback={<Loading />}>
          <WarnLimitTrash />
        </Suspense>
        <Link href={"/dashboard/post"} className="my-6 flex gap-2 items-center rounded-md p-2 transition-all cursor-pointer border-2 border-dashed border-slate-200 hover:bg-gray-200">
          <Plus size={14} /> New Todo
        </Link>
        <Suspense fallback={<Loading />}>
          <PercentageUncompleted />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <DataUncompletedList />
        </Suspense>
      </main>
    </DashboardLayout>
  );
};

export default UncompletedPage;
