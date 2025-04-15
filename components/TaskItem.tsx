"use client";
import { getAllTrashTodo, Todo, updateStatusTodoFinish, updateStatusTodoProgress } from "@/lib/query";
import { handleDeleteTodo, handleDeleteTrashTodoById, handleRestoreTodo, handleUpdateTodoStatus } from "@/lib/todo/actionTodo";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp, GripVertical, Pen, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import Loading from "./Loading";

type TaskItemProps = {
  title: string;
  data?: Todo[];
  staticUI?: boolean;
  trashUI?: boolean;
  trashLength: number | string;
};

type modalDetailType = {
  modalOpen: boolean;
  data: null | Todo;
};

const TaskItem = ({ title, data, staticUI = false, trashUI = false, trashLength }: TaskItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!staticUI ? false : true);
  const [isOverlayDelete, setIsOverlayDelete] = useState<null | number>(null);
  const [modalDetail, setModalDetail] = useState<modalDetailType>({
    modalOpen: false,
    data: null,
  });

  const handleModalDetail = (modal: boolean, data: Todo | null) => {
    setModalDetail((prev) => ({
      ...prev,
      modalOpen: modal,
      data,
    }));
  };

  const handleOverlayDelete = (id: string) => {
    setIsOverlayDelete((prev) => (prev === Number(id) ? null : Number(id)));
  };

  return (
    <div className="my-2">
      {/* head */}
      <div className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100" onClick={() => (!staticUI ? setIsOpen((prev) => !prev) : null)}>
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
              <div onClick={() => handleModalDetail(true, el)} className={"line-clamp-1 cursor-pointer"}>
                {el.title}
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-4">
              <div
                className={clsx("py-0.5 px-2 rounded border-2 text-sm first-letter:uppercase", {
                  "text-emerald-600 bg-emerald-100": el.status === "in progress",
                  "text-emerald-100 bg-emerald-600": el.status === "finish",
                })}
              >
                {el.status}
              </div>
              <div
                className={clsx("py-0.5 px-2 rounded border-2 text-sm first-letter:uppercase", {
                  "text-indigo-600 bg-indigo-100": el.priority_level === "urgent",
                  "text-orange-600 bg-orange-100": el.priority_level === "high",
                  "text-sky-600 bg-sky-100": el.priority_level === "normal",
                })}
              >
                {el.priority_level}
              </div>
              <GripVertical id={el.id.toString()} size={20} className="cursor-pointer" onClick={(e) => handleOverlayDelete(e.currentTarget.id)} />
            </div>
            {isOverlayDelete === el.id && (
              <div className="absolute right-10 p-2 rounded bg-white shadow-lg">
                {!trashUI ? (
                  <>
                    <Link href={`/dashboard/edit?todoId=${el.id}`} className="flex gap-1.5 items-center text-orange-500 cursor-pointer rounded hover:bg-black/10 p-1">
                      <Pen size={18} />
                      <p>Edit Task</p>
                    </Link>
                    <button onClick={async () => await handleDeleteTodo(el.id)} className="flex gap-1.5 items-center text-red-500 cursor-pointer rounded hover:bg-black/10 p-1">
                      <Trash2 size={18} />
                      <p>Delete Task</p>
                    </button>
                  </>
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
        <div className="absolute inset-0 h-full bg-white/70 ">
          <div className={"h-full w-1/2 bg-white shadow-lg ml-auto p-4 transition-all duration-500"}>
            <X size={24} onClick={() => handleModalDetail(false, null)} className="cursor-pointer" />
            <span className="text-sm">
              Dashboard / {modalDetail.data?.typename} / {modalDetail.data?.title}
            </span>
            <div className="flex gap-2 items-center py-1.5">
              <Image src={"/images/avatar.png"} alt="avatar" width={20} height={20} title="avatar" className="rounded-full" />
              <small className="block">
                <strong>{modalDetail.data?.username}</strong>
              </small>
            </div>
            <div className="py-2">
              <h1 className=" text-2xl">{modalDetail.data?.title}</h1>
              <h4 className="text-sm text-slate-500">{modalDetail.data?.slug}</h4>
            </div>
            <small className="text-gray-400">Date Created: {new Date(modalDetail.data?.created_at as Date).toLocaleString()}</small>
            <small className="block text-gray-400">Date Updated: {modalDetail.data?.updated_at === null ? "null" : new Date(modalDetail.data?.updated_at as Date).toLocaleString()}</small>
            <div className="flex gap-2 py-2">
              <div
                className={clsx("py-0.5 px-2 rounded border-2 text-sm first-letter:uppercase", {
                  "text-emerald-600 bg-emerald-100": modalDetail.data?.status === "in progress",
                  "text-emerald-100 bg-emerald-600": modalDetail.data?.status === "finish",
                })}
              >
                {modalDetail.data?.status}
              </div>
              <div
                className={clsx("py-0.5 px-2 rounded border-2 text-sm first-letter:uppercase", {
                  "text-indigo-600 bg-indigo-100": modalDetail.data?.priority_level === "urgent",
                  "text-orange-600 bg-orange-100": modalDetail.data?.priority_level === "high",
                  "text-sky-600 bg-sky-100": modalDetail.data?.priority_level === "normal",
                })}
              >
                {modalDetail.data?.priority_level}
              </div>
            </div>
            <p className="py-4 bg-stone-100 rounded px-2 inset-shadow-sm h-72 overflow-y-auto">{modalDetail.data?.content === null ? <span className="text-slate-600">content kosong</span> : modalDetail.data?.content}</p>
            <div className="flex flex-wrap gap-2 py-4">
              {modalDetail.data?.image_url ? (
                <>
                {modalDetail.data.image_url.split("|").map((img,i) => <Image key={i} src={img} alt={`img - ${img}`} width={75} height={75} />)}
                </>
              ) : (
                <>
                  <Image src={"/images/image-placeholder.png"} alt={`img - placeholder`} width={75} height={75} title="doesn't have any photo" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
