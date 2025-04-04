"use client";
import { Todo, updateStatusTodoFinish, updateStatusTodoProgress } from "@/lib/query";
import { handleDeleteTodo, handleDeleteTrashTodoById, handleRestoreTodo, handleUpdateTodoStatus } from "@/lib/todo/actionTodo";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp, GripVertical, Trash2, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type TaskItemProps = {
  title: string;
  data?: Todo[];
  staticUI?: boolean;
  trashUI?: boolean;
};

type modalDetailType = {
  modalOpen: boolean,
  data: null | Todo
}

const TaskItem = ({ title, data, staticUI = false, trashUI = false }: TaskItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!staticUI ? false : true);
  const [isOverlayDelete, setIsOverlayDelete] = useState<null | number>(null);
  const [modalDetail,setModalDetail] = useState<modalDetailType>({
    modalOpen: false,
    data: null
  })
  
  const handleModalDetail = (modal:boolean,data:Todo|null) => {
    setModalDetail((prev) => ({
      ...prev,
      modalOpen: modal,
      data
    }))
  }

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
              <div onClick={() => handleModalDetail(true,el)} className={"line-clamp-1 cursor-pointer"} >{el.title}</div>
            </div>
            <div className="flex items-center gap-1.5 px-4">
              <div className={clsx('py-0.5 px-2 rounded border-2 text-sm first-letter:uppercase',{
                'text-emerald-600 bg-emerald-100': el.status === 'in progress',
                'text-emerald-100 bg-emerald-600': el.priority_level === 'high',
              })}>{el.status}</div>
              <div className={clsx('py-0.5 px-2 rounded border-2 text-sm first-letter:uppercase',{
                'text-indigo-600 bg-indigo-100': el.priority_level === 'urgent',
                'text-orange-600 bg-orange-100': el.priority_level === 'high',
                'text-sky-600 bg-sky-100': el.priority_level === 'normal',
              })}>{el.priority_level}</div>
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
      {modalDetail.modalOpen === true && (
        <div className="absolute inset-0 bg-white/70">
          <div className="min-h-screen w-1/2 bg-white shadow-lg ml-auto p-4">
            <X size={24} onClick={() => handleModalDetail(false,null)} className="cursor-pointer" />
            <span className="text-sm">Dashboard / {modalDetail.data?.typename} / {modalDetail.data?.title}</span>
            <h1 className="py-4 text-2xl">{modalDetail.data?.title}</h1>
            <small className="text-gray-400">{new Date(modalDetail.data?.created_at as Date).toLocaleString()}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
