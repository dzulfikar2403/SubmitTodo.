import DashboardLayout from "@/components/DashboardLayout";
import PostForm from "@/components/PostForm";
import { getAllPriority, getListTypeByUsers } from "@/lib/query";
import React from "react";

const PostPage = async () => {
  const priorityList = await getAllPriority();
  const typeList = await getListTypeByUsers();

  return (
    <DashboardLayout>
      <main className="w-full p-10 flex justify-center items-center flex-col">
        <div>
          <h1 className="text-4xl ">
            Plan Your Tasks, <br />
            Achieve Your Goals! 🚀
          </h1>
          <PostForm priorityList={priorityList?.rows as any[]} typeList={typeList?.rows as any[]} />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default PostPage;
