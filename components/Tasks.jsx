"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Tasks = ({ id, title, content, timestamp }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [taskState, setTaskState] = useState("view");
  const router = useRouter();

  const editTask = async (e) => {
    e.preventDefault();
    const data = await fetch("api/posts", {
      method: "PUT",
      body: JSON.stringify({ editTitle, editContent, id }),
    });
    const res = await data.json();
    setEditTitle("");
    setEditContent("");
    setTaskState("view");
    router.refresh();
    if (!res.ok) console.log(res.message);
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    const data = await fetch("api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const res = await data.json();
    router.refresh();
    if (!res.ok) console.log(res.message);
  };

  return (
    <>
      {taskState === "edit" && (
        <div className="flex justify-center py-7 ">
          {" "}
          <form
            onSubmit={editTask}
            className="flex flex-col justify-center items-center"
          >
            <input
              type="text"
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
              value={editTitle}
              key={id}
              className=" border border-solid border-gray-300 transition ease-in-out m-0  focus:bg-slate-100  focus:border-lime-500 focus:outline-none mb-5"
            />
            <textarea
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
              value={editContent}
              key={id}
              cols={40}
              rows={3}
              className=" block  px-3 py-1.5 text-base font-normal bg-clip-padding  border border-solid border-gray-300 transition ease-in-out m-0  focus:bg-slate-100  focus:border-lime-500 focus:outline-none "
            />
            <div>
              <button
                type="submit"
                className="bg-orange-400 rounded-lg p-1 px-3 my-3 mr-2 hover:bg-orange-300 shadow-sm transition duration-150 ease-in-out hover:shadow-lg"
              >
                {" "}
                Change
              </button>
              <button
                className="bg-lime-400 rounded-lg p-1 my-3 px-3 hover:bg-lime-300 shadow-sm transition duration-150 ease-in-out hover:shadow-lg"
                onClick={() => setTaskState("view")}
              >
                Cancle
              </button>
            </div>
          </form>
        </div>
      )}
      {taskState === "view" && (
        <div className="flex flex-col justify-center items-center  w-[90%] sm:w-[30%] mx-auto sm:flex sm:flex-row sm:items-baseline">
          <div
            key={id}
            className=" flex flex-col border-2 p-2 mb-5 sm:w-[300px]"
          >
            <p className="text-xl mb-3 border-b-2 ">{`Title:  ${title}`} </p>

            <p className="text-lg mb-5">{content}</p>
            <p className="">{timestamp}</p>
            <div className="flex mt-2 justify-end">
              <button
                onClick={() => setTaskState("edit")}
                className="bg-yellow-300 rounded-lg p-1 px-3 mr-1 hover:bg-yellow-200 shadow-sm transition duration-150 ease-in-out hover:shadow-lg"
              >
                edit
              </button>
              <button
                onClick={deleteTask}
                className="bg-red-500 rounded-lg p-1 hover:bg-red-400 shadow-sm transition duration-150 ease-in-out hover:shadow-lg"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
