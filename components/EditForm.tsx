"use client";
import React, { useActionState } from "react";
import InputImage from "./InputImage";
import { ArrowDownRight, TrendingUp } from "lucide-react";
import { handleUpdateTodo } from "@/lib/todo/actionTodo";
import { Todo } from "@/lib/query";
import Image from "next/image";

type EditFormProps = {
  priorityList: any[];
  typeList: any[];
  dataTodo: Todo;
};

const EditForm = ({ priorityList, typeList, dataTodo }: EditFormProps) => {
  const [state, action, isPending] = useActionState(handleUpdateTodo, null);

  return (
    <form action={action} className=" px-4 py-8 space-y-4">
      <input type="hidden" name="id" value={dataTodo.id} />
      <div className="flex items-center gap-12">
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input type="text" name="title" id="title" className="px-2 py-1 my-1 text-gray-500 bg-gray-50 border-2 border-black w-80" placeholder="task title" defaultValue={dataTodo.title} />
          {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.title}</p>}
        </div>
        <div>
          <label htmlFor="priority" className="block font-semibold">
            Priority
          </label>
          <select name="priority" id="priority" defaultValue={dataTodo.priority_id} className="px-2 py-1.5 my-1 text-gray-500 bg-gray-50 border-2 border-black w-80">
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
        <select name="type" id="type" defaultValue={dataTodo.type_id} className="px-2 py-1.5 my-1 text-gray-500 bg-gray-50 border-2 border-black w-full">
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
        <textarea
          name="content"
          id="content"
          rows={8}
          defaultValue={(dataTodo.content as string) ? (dataTodo.content as string) : "null"}
          className="px-2 py-1 my-1 text-gray-500 bg-gray-50 border-2 border-black"
          placeholder="Break down your task with extra notes..."
        ></textarea>
      </div>
      <p className="flex gap-1 items-center">
        Previous Images<ArrowDownRight size={14} />
      </p>
      {dataTodo.image_url ? (
        dataTodo.image_url?.split("|").map((img, i) => <Image key={i} src={img} alt={`img - ${img}`} width={160} height={160} className="object-center object-cover bg-white shadow-xl" />)
      ) : (
        <Image src={"/images/image-placeholder.png"} alt="Doesnt have Image" width={160} height={160} className="object-center object-cover bg-white shadow-xl" />
      )}
      <InputImage editUI={true} />
      {typeof state?.errors === "string" && <p className="text-red-400 text-sm">{state.errors}</p>}
      <button type="submit" disabled={isPending} className="w-1/2 ml-auto px-2 py-1 bg-black text-white flex gap-2 justify-center items-center disabled:bg-black/80">
        {isPending ? "Load..." : "Send"}
        <TrendingUp size={18} color="white" />
      </button>
    </form>
  );
};

export default EditForm;
