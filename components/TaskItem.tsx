"use client";
import { Todo, updateStatusTodoFinish, updateStatusTodoProgress } from "@/lib/query";
import { handleDeleteTodo, handleDeleteTrashTodoById, handleRestoreTodo, handleUpdateTodoStatus } from "@/lib/todo/actionTodo";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";

type TaskItemProps = {
  title: string;
  data?: Todo[];
  staticUI?: boolean;
  trashUI?: boolean;
};

const TaskItem = ({ title, data, staticUI = false, trashUI = false }: TaskItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!staticUI ? false : true);
  const [isOverlayDelete, setIsOverlayDelete] = useState<null | number>(null);

  const handleOverlayDelete = (id: string) => {
    setIsOverlayDelete((prev) => (prev === Number(id) ? null : Number(id)));
  };

  return (
    <div className="my-2">
      {/* head */}
      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => (!staticUI ? setIsOpen((prev) => !prev) : null)}>
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        <h2 className="font-bold text-lg">{title}</h2>
        <span className="rounded px-1 text-xs bg-gray-200">{data?.length}</span>
      </div>

      {/* list */}
      <div
        className={clsx("py-4 space-y-3 transition-all duration-300 ", {
          "h-0 opacity-0": !isOpen,
          "h-full opacity-100": isOpen,
        })}
      >
        {/* nnti disini todo yg dimaping */}
        {data?.map((el) => (
          <div key={el.id} className="relative flex items-center justify-between border-b-2 pb-2 border-gray-200">
            <div className="flex items-center gap-1.5 px-8 ">
              <input
                type="checkbox"
                defaultChecked={el.status === "finish"}
                className={clsx("size-4", { hidden: trashUI })}
                onChange={async () => {
                  await handleUpdateTodoStatus(el.status, el.id);
                }}
              />
              <p className={"line-clamp-1"}>{el.title}</p>
            </div>
            <div className="flex items-center gap-1.5 px-4">
              <GripVertical id={el.id.toString()} size={20} className="cursor-pointer" onClick={(e) => handleOverlayDelete(e.currentTarget.id)} />
            </div>
            {isOverlayDelete === el.id && (
              <div className="absolute right-10 p-2 rounded bg-white shadow-lg">
                {!trashUI ? (
                  <button onClick={async () => await handleDeleteTodo(el.id)} className="flex gap-1.5 items-center text-red-500 cursor-pointer rounded hover:bg-black/10 p-1">
                    <Trash2 size={18} />
                    <p>Delete Task</p>
                  </button>
                ) : (
                  <div className="space-y-1 ">
                    <button onClick={async () => await handleRestoreTodo(el.id)} className="flex gap-1.5 items-center text-teal-500 cursor-pointer rounded hover:bg-black/10 p-1">
                      <Trash2 size={18} />
                      <p>Restore Task</p>
                    </button>
                    <button onClick={async () => await handleDeleteTrashTodoById(el.id)} className="flex gap-1.5 items-center text-red-500 cursor-pointer rounded hover:bg-black/10 p-1">
                      <Trash2 size={18} />
                      <p>Delete Permanent</p>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskItem;
