"use client";
import React, { useActionState } from "react";
import InputImage from "./InputImage";
import { TrendingUp } from "lucide-react";
import { handlePostTodo } from "@/lib/todo/actionTodo";

type PostFormProps = {
  priorityList: any[];
  typeList: any[];
};

const PostForm = ({ priorityList, typeList }: PostFormProps) => {
  const [state, action, isPending] = useActionState(handlePostTodo, null);

  return (
    <form action={action} className=" px-4 py-8 space-y-4">
      <div className="flex items-center gap-12">
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input type="text" name="title" id="title" className="px-2 py-1 my-1 text-gray-500 bg-gray-50 border-2 border-black w-80" placeholder="task title" />
          {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.title}</p>}
        </div>
        <div>
          <label htmlFor="priority" className="block font-semibold">
            Priority
          </label>
          <select name="priority" id="priority" defaultValue={""} className="px-2 py-1.5 my-1 text-gray-500 bg-gray-50 border-2 border-black w-80">
            <option disabled value={""}>
              Choose Priority
            </option>
            {priorityList?.map((el, id) => (
              <option key={id} value={`${el.id}`}>
                {el.priority_level}
              </option>
            ))}
          </select>
          {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.priority}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="type" className="block font-semibold">
          Type
        </label>
        <select name="type" id="type" defaultValue={""} className="px-2 py-1.5 my-1 text-gray-500 bg-gray-50 border-2 border-black w-full">
          <option disabled value={""}>
            Choose Type
          </option>
          {typeList?.map((el, id) => (
            <option key={id} value={`${el.id}`}>
              {el.name}
            </option>
          ))}
        </select>
        {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.type}</p>}
      </div>
      <div>
        <label htmlFor="content" className="block font-semibold">
          Content
        </label>
        <textarea name="content" id="content" rows={8} className="px-2 py-1 my-1 text-gray-500 bg-gray-50 border-2 border-black" placeholder="Break down your task with extra notes..."></textarea>
      </div>
      <InputImage />
      {typeof state?.errors === "string" && <p className="text-red-400 text-sm">{state.errors}</p>}
      <button type="submit" disabled={isPending} className="w-1/2 ml-auto px-2 py-1 bg-black text-white flex gap-2 justify-center items-center disabled:bg-black/80">
        {isPending ? "Load..." : "Send"}
        <TrendingUp size={18} color="white" />
      </button>
    </form>
  );
};

export default PostForm;
