"use client";
import { ArchiveRestore, Grip, Lightbulb, PanelLeft, PanelRight, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import icon from "@/app/icon.png";
import { clsx } from "clsx";
import Link from "next/link";
import { postType } from "@/lib/query";
import { usePathname } from "next/navigation";

type SidebarProps = {
  listType: {
    name: string;
  }[];
  username: string;
};

const Sidebar = ({ listType, username }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [typeValue, setTypeValue] = useState<string>("");

  return (
    <>
      {/* sidebar */}
      <div
        className={clsx("relative p-4 min-h-screen space-y-8 bg-stone-50 drop-shadow-md transition-all duration-300 ", {
          "w-64": isOpen,
          "w-5": !isOpen,
        })}
      >
        <div
          className={clsx({
            "opacity-100": isOpen,
            "opacity-0 hidden": !isOpen,
          })}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative w-10 h-10 bg-blue-400 p-1.5 rounded">
                <Image src={icon} alt="submit-todo-ico" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">SubmitTodo.</h2>
                <p className="text-xs">{username}</p>
              </div>
            </div>
          </div>
          <div className="py-8 space-y-8">
            <div>
              <h3 className="font-bold">Private</h3>

              <div className="overflow-y-auto max-h-80 p-1 ">
                {/* component untuk di map dari filtering db, except span all */}
                {listType.map((el) => {
                  return (
                    <Link
                      href={`/dashboard/${el.name.toLowerCase()}`}
                      key={el.name}
                      className={clsx("group flex items-center justify-between cursor-pointer my-2 p-2 rounded hover:bg-gray-200 transition-all", {
                        "bg-gray-200": pathname === `/dashboard/${el.name.toLowerCase()}`,
                      })}
                    >
                      <div className="flex items-center gap-2">
                        <Grip size={12} />
                        <p>{el?.name}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <span className="my-2 mx-1 flex gap-2 items-center rounded-md p-2 transition-all cursor-pointer border-2 border-dashed border-slate-200 hover:bg-gray-200" onClick={() => setIsModalOpen((prev) => !prev)}>
                <Plus size={14} /> Create New Type
              </span>
            </div>
            <div>
              <h3 className="font-bold">General</h3>
              <div className="p-1">
                <Link
                  href={"/dashboard"}
                  className={clsx("group flex items-center justify-between cursor-pointer my-2 p-2 rounded hover:bg-gray-200 transition-all", {
                    "bg-gray-200": pathname === `/dashboard`,
                  })}
                >
                  <div className="flex items-center gap-1">
                    <Grip size={12} />
                    <p>🔥 All</p>
                  </div>
                </Link>
                <Link
                  href={"/dashboard/completed"}
                  className={clsx("group flex items-center justify-between cursor-pointer my-2 p-2 rounded hover:bg-gray-200 transition-all", {
                    "bg-gray-200": pathname === `/dashboard/completed`,
                  })}
                >
                  <div className="flex items-center gap-1">
                    <Grip size={12} />
                    <p>✅ Completed</p>
                  </div>
                </Link>
                <Link
                  href={"/dashboard/trash"}
                  className={clsx("group flex items-center justify-between cursor-pointer my-2 p-2 rounded hover:bg-gray-200 transition-all", {
                    "bg-gray-200": pathname === `/dashboard/trash`,
                  })}
                >
                  <div className="flex items-center gap-1">
                    <Grip size={12} />
                    <p className="flex items-center gap-1.5 px-1">
                      <ArchiveRestore size={18} />
                      Trash
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div onClick={() => setIsOpen((prev) => !prev)} className="absolute -right-2 top-1/2 p-1 rounded bg-stone-200">
          {isOpen ? <PanelLeft size={18} /> : <PanelRight size={18} />}
        </div>
      </div>

      {/* modal add type */}
      <div
        className={clsx("flex justify-center items-center", {
          "absolute inset-0 z-50 bg-white/90": isModalOpen,
          hidden: !isModalOpen,
        })}
      >
        <div className="rounded-lg w-1/3 p-4 bg-stone-200">
          <div className="flex justify-between items-center">
            <h1>
              <strong>Type Name</strong>
            </h1>
            <X size={18} onClick={() => setIsModalOpen((prev) => !prev)} className="cursor-pointer" />
          </div>
          <input type="text" name="type" id="type" placeholder="E.g. My Task Manager" className="w-full my-4 px-2 py-1 rounded border-2 border-stone-100 focus:outline-stone-100" onChange={(e) => setTypeValue(e.target.value)} />
          <span className="bg-stone-100 flex items-start gap-2 p-2 rounded">
            <Lightbulb size={40} />
            <div>
              <h2 className="text-sm">
                <strong>What's a type?</strong>
              </h2>
              <small className="text-xs leading-none">Projects help you organize your tasks, track progress, and manage deadlines efficiently. Use them to keep your to-do lists structured and productive.</small>
            </div>
          </span>
          <div className="my-4 flex justify-end gap-2">
            <button type="button" className="p-1.5 border-2 border-white bg-white/40 font-bold rounded-xl cursor-pointer hover:bg-black hover:border-black hover:text-white transition-all" onClick={() => setIsModalOpen((prev) => !prev)}>
              Cancel
            </button>
            <button
              type="button"
              disabled={typeValue.trim() === ""}
              className="p-1.5 border-2 border-white font-bold rounded-xl cursor-pointer transition-all bg-white disabled:opacity-50"
              onClick={async (e) => {
                await postType(typeValue.trim() as string);
                setIsModalOpen(false);
                setTypeValue("");
              }}
            >
              Create Type
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
