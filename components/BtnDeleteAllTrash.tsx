"use client";
import { handleDeleteAllTrashTodo } from "@/lib/todo/actionTodo";
import React from "react";

const BtnDeleteAllTrash = () => {
  return (
    <button onClick={async () => await handleDeleteAllTrashTodo()} className="bg-rose-500 shadow-xl hover:shadow-md text-white font-extrabold text-lg px-2 py-1 rounded cursor-pointer hover:bg-rose-400 transition-all duration-500 ">
      Delete All
    </button>
  );
};

export default BtnDeleteAllTrash;
