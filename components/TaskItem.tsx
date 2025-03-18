"use client";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";

type TaskItemProps = {
  title: string;
  data?: any[];
};

const TaskItem = ({ title, data }: TaskItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isOverlayDelete, setIsOverlayDelete] = useState<null | number>(null);


  const handleOverlayDelete = (id: string) => {
    setIsOverlayDelete((prev) => (prev === Number(id) ? null : Number(id)));
  };

  return (
    <div className="my-2">
      {/* head */}
      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        <h2 className="font-bold text-lg">{title}</h2>
        <span className="rounded px-1 text-xs bg-gray-200">2</span>
      </div>

      {/* list */}
      <div
        className={clsx("py-4 space-y-3 transition-all duration-300 ", {
          "h-0 opacity-0": !isOpen,
          "h-full opacity-100": isOpen,
        })}
      >
        {/* nnti disini todo yg dimaping */}
        {[0, 1].map((_, id) => (
          <div key={id} className="relative flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-8 ">
              <input type="checkbox" onChange={() => setIsCheck((prev) => !prev)} className="size-4" />
              <p
                className={clsx("line-clamp-1", {
                  "line-through italic decoration-2 decoration-indigo-400 px-1": isCheck,
                })}
              >
                lorem1000
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-4">
              <GripVertical id={id.toString()} size={20} className="cursor-pointer" onClick={(e) => handleOverlayDelete(e.currentTarget.id)} />
            </div>
            {isOverlayDelete === id && (
              <div className="absolute right-10 p-2 rounded bg-white shadow-lg">
                <div className="flex gap-1.5 items-center text-red-500 cursor-pointer rounded hover:bg-black/10 p-1"><Trash2 size={18} /><p>Delete Task</p></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskItem;
